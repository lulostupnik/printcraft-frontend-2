/*import React from 'react';
import ProductTable from '@/components/ProductTable';
import usePrintRequests from '@/hooks/usePrintRequest';

interface UserReqDashboardProps {
  requestType: 'print-requests' | 'design-requests';
}

const ProductDashboard: React.FC<UserReqDashboardProps> = ({ requestType }) => {
  const {
    acceptedRequests,
    finalizedRequests,
    expandedTable,
    setExpandedTable,
  } = usePrintRequests(requestType);

  const tables = [
    {
      key: 'accepted',
      title: 'Solicitudes Aceptadas',
      requests: acceptedRequests,
    },
    {
      key: 'finalized',
      title: 'Solicitudes Finalizadas',
      requests: finalizedRequests,
    },
  ];

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Product Dashboard
        </h2>

        {expandedTable === null
          ? tables.map((table) => (
              <ProductTable
                key={table.key}
                title={table.title}
                requests={table.requests}
                isExpanded={false}
                onExpand={() => setExpandedTable(table.key)}
              />
            ))
          : tables
              .filter((table) => table.key === expandedTable)
              .map((table) => (
                <ProductTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  isExpanded={true}
                  onExpand={() => setExpandedTable(null)}
                />
              ))}
      </section>
    </div>
  );
};

export default ProductDashboard;*/

/*import React, { useEffect, useState } from 'react';
import ProductTable from '@/components/ProductTable';
import {ProductRequest} from '@/types/ProductRequests';
import { API_URL } from '@/api/api';

type ProductFromBack = {
  orderID: number; // Usa 'number' en lugar de 'Number'
  userID: string[]; // Si se espera un array de IDs, típicamente son strings
  orderDate: Date; // Correcto, mantén 'Date' si se usa un objeto Date
  quantity: number; // Usa 'number' en lugar de 'Number'
  productCode: string[]; // Usa 'string[]' para un array de códigos de producto
  status: string; // Usa 'string' en lugar de 'String'
  preference_id: string; // Usa 'string' en lugar de 'String'
};

const ProductDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  // Función para obtener el token de acceso desde localStorage
  const getAccessToken = () => {
    return localStorage.getItem('accessToken') || '';
  };

  // Fetch de las solicitudes
  const fetchRequests = async () => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/seller-orders/`, 
        {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Inicializa el estado de cada solicitud como 'accepted'
        const updatedRequests = data.map((request: any) => ({
          ...request,
          status: 'accepted',
        }));
        setRequests(updatedRequests);
      } else {
        console.error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error('Error en el fetch:', error);
    }
  };


// Función para cambiar el estado de una solicitud a 'finalized'
const finalizeRequest = (request: ProductRequest) => {
  const updatedRequest: ProductRequest = {
    ...request,
    status: 'finalized', // Asignar directamente el valor 'finalized'
  };
  
  setRequests((prevRequests) =>
    prevRequests.map((r) => (r.requestID === request.requestID ? updatedRequest : r))
  );
};



  useEffect(() => {
    fetchRequests();
  }, []);

  const tables = [
    {
      key: 'accepted',
      title: 'Solicitudes Aceptadas',
      requests: requests.filter((request) => request.status === 'accepted'),
    },
    {
      key: 'finalized',
      title: 'Solicitudes Finalizadas',
      requests: requests.filter((request) => request.status === 'finalized'),
    },
  ];

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">Product Dashboard</h2>

        {expandedTable === null
          ? tables.map((table) => (
              <ProductTable
                key={table.key}
                title={table.title}
                requests={table.requests}
                isExpanded={false}
                onExpand={() => setExpandedTable(table.key)}
                finalizeRequest={finalizeRequest} // Pasa la función finalizeRequest al componente
              />
            ))
          : tables
              .filter((table) => table.key === expandedTable)
              .map((table) => (
                <ProductTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  isExpanded={true}
                  onExpand={() => setExpandedTable(null)}
                  finalizeRequest={finalizeRequest} // Pasa la función finalizeRequest al componente
                />
              ))}
      </section>
    </div>
  );
};

export default ProductDashboard;*/

import React, { useEffect, useState } from 'react';
import ProductTable from '@/components/ProductTable';
import { ProductRequest } from '@/types/ProductRequests'; // Asegúrate de que este tipo esté correctamente definido
import { API_URL } from '@/api/api';

type ProductFromBack = {
  orderID: number;
  userID: { email: string }; // Asegúrate de que userID tenga un campo email
  orderDate: string; // Cambié a string ya que la API normalmente devuelve una cadena
  quantity: number;
  productCode: { name: string }; // Cambié a un objeto con el campo name
  status: string;
  preference_id: string;
};

const ProductDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  const getAccessToken = () => {
    return localStorage.getItem('accessToken') || '';
  };

  // Fetch de las solicitudes
  const fetchRequests = async () => {
    const token = getAccessToken();

    try {
      const response = await fetch(`${API_URL}/seller-orders/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: ProductFromBack[] = await response.json();

        // Mapea los datos a ProductRequest
        const updatedRequests: ProductRequest[] = data.map((product) => ({
          requestID: product.orderID,
          email: product.userID.email, // Asegúrate de que este campo existe
          quantity: product.quantity,
          name: product.productCode.name, // Asegúrate de que este campo existe
          date: new Date(product.orderDate).toISOString(), // Convierte a string
          status: 'accepted', // Valor por defecto
        }));

        setRequests(updatedRequests);
      } else {
        console.error('Error al obtener las solicitudes');
      }
    } catch (error) {
      console.error('Error en el fetch:', error);
    }
  };

  // Función para cambiar el estado de una solicitud a 'finalized'
  const finalizeRequest = (request: ProductRequest) => {
    const updatedRequest: ProductRequest = {
      ...request,
      status: 'finalized', // Asignar directamente el valor 'finalized'
    };

    setRequests((prevRequests) =>
      prevRequests.map((r) => (r.requestID === request.requestID ? updatedRequest : r))
    );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const tables = [
    {
      key: 'accepted',
      title: 'Solicitudes Aceptadas',
      requests: requests.filter((request) => request.status === 'accepted'),
    },
    {
      key: 'finalized',
      title: 'Solicitudes Finalizadas',
      requests: requests.filter((request) => request.status === 'finalized'),
    },
  ];

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">Product Dashboard</h2>

        {expandedTable === null
          ? tables.map((table) => (
              <ProductTable
                key={table.key}
                title={table.title}
                requests={table.requests}
                isExpanded={false}
                onExpand={() => setExpandedTable(table.key)}
                finalizeRequest={finalizeRequest} // Pasa la función finalizeRequest al componente
              />
            ))
          : tables
              .filter((table) => table.key === expandedTable)
              .map((table) => (
                <ProductTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  isExpanded={true}
                  onExpand={() => setExpandedTable(null)}
                  finalizeRequest={finalizeRequest} // Pasa la función finalizeRequest al componente
                />
              ))}
      </section>
    </div>
  );
};

export default ProductDashboard;


