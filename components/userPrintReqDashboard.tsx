import React from 'react';
import UserRequestsTable from './userRequestTable';
import usePrintRequests from '@/hooks/usePrintRequest';

type TableType = 'pending' | 'quoted' | 'accepted' | 'finalized' | 'delivered';


interface UserPrintReqDashboardProps {
  requestType: 'print-requests' | 'design-requests';
}

const UserPrintReqDashboard: React.FC<UserPrintReqDashboardProps> = ({ requestType }) => {
  const {
    pendingRequests,
    quotedRequests,
    acceptedRequests,
    finalizedRequests,
    deliveredRequests,
    priceInputs,
    expandedTable,
    setExpandedTable,
    handlePriceChange,
    handleAcceptRequest,
    handleDeclineRequest,
    handleFinalizeRequest,
    handleMarkAsDelivered,
  } = usePrintRequests(requestType); 

  const tables: {
    key: TableType;
    title: string;
    requests: any[]; // You can type this based on your actual request data model
    type: TableType;
    priceInputs?: { [key: number]: string };
    handlePriceChange?: (requestID: number, value: string) => void;
    handleAcceptRequest?: (requestID: number) => void;
    handleDeclineRequest?: (requestID: number) => void;
    handleFinalizeRequest?: (requestID: number) => void;
    handleMarkAsDelivered?: (requestID: number) => void;
  }[] = [
    {
      key: 'pending',
      title: 'Solicitudes Pendientes',
      requests: pendingRequests,
      type: 'pending',
      handleAcceptRequest,
      handleDeclineRequest,
    },
    {
      key: 'quoted',
      title: 'Solicitudes Cotizadas',
      requests: quotedRequests,
      type: 'quoted',
    },
    {
      key: 'accepted',
      title: 'Solicitudes Aceptadas',
      requests: acceptedRequests,
      type: 'accepted',
      handleFinalizeRequest,
    },
    {
      key: 'finalized',
      title: 'Solicitudes Finalizadas',
      requests: finalizedRequests,
      type: 'finalized',
      handleMarkAsDelivered,
    },
    {
      key: 'delivered',
      title: 'Solicitudes Entregadas',
      requests: deliveredRequests,
      type: 'delivered',
    },
  ];


  return (
    <div className="container mx-auto">
        
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
   
        <h2 className="text-4xl font-bold mb-4 text-center">
          {requestType === 'design-requests' ? 'Design Request Dashboard' : 'Print Request Dashboard'}
        </h2> 

        {expandedTable === null
          ? tables.map((table) => (
              <UserRequestsTable
                key={table.key}
                title={table.title}
                requests={table.requests}
                type={table.type}
                priceInputs={table.priceInputs}
                handleAcceptRequest={table.handleAcceptRequest}
                handleDeclineRequest={table.handleDeclineRequest}
                handleFinalizeRequest={table.handleFinalizeRequest}
                handleMarkAsDelivered={table.handleMarkAsDelivered}
                isExpanded={false}
                onExpand={() => setExpandedTable(table.key)}
                requestType={requestType} // Pass requestType here
              />
            ))
          : tables
              .filter((table) => table.key === expandedTable)
              .map((table) => (
                <UserRequestsTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  type={table.type}
                  priceInputs={table.priceInputs}
                  handleAcceptRequest={table.handleAcceptRequest}
                  handleDeclineRequest={table.handleDeclineRequest}
                  handleFinalizeRequest={table.handleFinalizeRequest}
                  handleMarkAsDelivered={table.handleMarkAsDelivered}
                  isExpanded={true}
                  onExpand={() => setExpandedTable(null)}
                  requestType={requestType} // Pass requestType here
                />
              ))}
      </section>

    </div>
  );
};

export default UserPrintReqDashboard;
