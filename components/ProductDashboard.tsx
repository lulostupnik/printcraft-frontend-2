import React, { useEffect, useState } from 'react';
import ProductTable from '@/components/ProductTable';
import { SoldProductRequest } from '@/types/SoldProduct';
import { API_URL } from '@/api/api';
import SoldProdTable from './SoldProdTable';

type ProductFromBack = {
  orderid: number;
  userid: number; // Asegúrate de que userID tenga un campo email
  orderdate: string; // Cambié a string ya que la API normalmente devuelve una cadena
  quantity: number;
  productcode: number; // Cambié a un objeto con el campo name
  status: "Completada" | "En proceso" | "Entregada";
  preference_id: string;
  user_email: string;
  product_name: string;
  total_price: number;
};

const ProductDashboard: React.FC = () => {
  const [requests, setRequests] = useState<SoldProductRequest[]>([]);
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
        const data: ProductFromBack[] = (await response.json()).results;

        // Mapea los datos a SoldProductRequest
        const updatedRequests: SoldProductRequest[] = data.map((product) => ({
          requestID: product.orderid,
          email: product.user_email, // Asegúrate de que este campo existe
          quantity: product.quantity,
          name: product.product_name, // Asegúrate de que este campo existe
          date: new Date(product.orderdate).toISOString(), // Convierte a string
          status: product.status, // Valor por defecto
          productCode: product.productcode,
          price: product.total_price
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
 // Función para cambiar el estado de una solicitud a 'finalized'
const finalizeRequest = async (request: SoldProductRequest) => {
  const updatedRequest: SoldProductRequest = {
    ...request,
    status: 'Completada', // Assign 'finalized' status
  };

  // Check if the access token exists
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error('Access token not found');
    // Optionally, handle the case where the user is not authenticated, like redirecting to a login page
    return;
  }

  try {
    // Sending the POST request to your API
    const response = await fetch(`${API_URL}/orders/complete/${request.requestID}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRequest),
    });

    // If the request is successful, update the table
    if (response.ok) {
      setRequests((prevRequests) =>
        prevRequests.map((r) => (r.requestID === request.requestID ? updatedRequest : r))
      );
    } else {
      console.error('Failed to finalize the request');
      // Handle error as needed
    }
  } catch (error) {
    console.error('Error during the request:', error);
    // Handle network or other errors as needed
  }
};



const deliveredRequest = async (request: SoldProductRequest) => {
  const updatedRequest: SoldProductRequest = {
    ...request,
    status: 'Entregada', // Assign 'finalized' status
  };

  // Check if the access token exists
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error('Access token not found');
    // Optionally, handle the case where the user is not authenticated, like redirecting to a login page
    return;
  }

  try {
    // Sending the POST request to your API
    const response = await fetch(`${API_URL}/orders/deliver/${request.requestID}/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedRequest),
    });

    // If the request is successful, update the table
    if (response.ok) {
      setRequests((prevRequests) =>
        prevRequests.map((r) => (r.requestID === request.requestID ? updatedRequest : r))
      );
    } else {
      console.error('Failed to finalize the request');
      // Handle error as needed
    }
  } catch (error) {
    console.error('Error during the request:', error);
    // Handle network or other errors as needed
  }
};


  
  useEffect(() => {
    fetchRequests();
  }, []);

  const tables = [
    {
      key: 'proc',
      title: 'Solicitudes a imprimir',
      requests: requests.filter((request) => request.status === 'En proceso'),

    },
    {
      key: 'compl',
      title: 'Solicitudes listas a entregar',
      requests: requests.filter((request) => request.status === 'Completada'),
    },
    {
      key: 'entr',
      title: 'Entregadas',
      requests: requests.filter((request) => request.status === 'Entregada'),
    },
  ];

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">Product Dashboard</h2>

        {expandedTable === null
          ? tables.map((table) => (
              <SoldProdTable
                key={table.key}
                title={table.title}
                requests={table.requests}
                isExpanded={false}
                onExpand={() => setExpandedTable(table.key)}
                finalizeRequest={table.key === 'proc' ? finalizeRequest : deliveredRequest} // Pasa la función finalizeRequest al componente
              />
            ))
          : tables
              .filter((table) => table.key === expandedTable)
              .map((table) => (
                <SoldProdTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  isExpanded={true}
                  onExpand={() => setExpandedTable(null)}
                  finalizeRequest={table.key === 'proc' ? finalizeRequest : deliveredRequest} // Pasa la función finalizeRequest al componente
                />
              ))}
      </section>
    </div>
  );
};

export default ProductDashboard;


