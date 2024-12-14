'use client';

import React, { useEffect, useState } from 'react';
import UserRequestsTable from './userRequestTable';
import usePrintRequestsUser from '@/hooks/usePrintRequestsUser';

type TableType = 'pending' | 'quoted' |  'delivered' | 'accepted-finalized';

interface UserPrintReqDashboardProps {
  requestType: 'print-requests' | 'design-requests' | 'design-reverse-auctions' | 'print-reverse-auctions';
}

const UserPrintReqDashboard: React.FC<UserPrintReqDashboardProps> = ({ requestType }) => {
  const {
    pendingRequests,
    quotedRequests,
    acceptedRequests,
    finalizedRequests,
    deliveredRequests,
    expandedTable,
    setExpandedTable,
    handleAcceptResponse,
    handleRequestResponses,
    responses,
    handleAcceptRequest,
    handleDeclineRequest,
  } = usePrintRequestsUser(requestType);

  const combinedAcceptedAndFinalizedRequests = [
    ...acceptedRequests,
    ...finalizedRequests,
  ];
  
  const tables = React.useMemo(() => {
    if (requestType === "design-reverse-auctions" || requestType === "print-reverse-auctions") {
      return [{
        key: 'pending',
        title: 'Subastas Activas',
        requests: pendingRequests,
        type: 'pending' as const,
        handleAcceptResponse,
        handleRequestResponses,
        responses,
      }];
    }

    return [
      {
        key: 'pending',
        title: 'Solicitudes Pendientes',
        requests: pendingRequests,
        type: 'pending',
        handleRequestResponses,
        responses,
      },
      {
        key: 'quoted',
        title: 'Solicitudes Cotizadas',
        requests: quotedRequests,
        type: 'quoted',
        handleAcceptResponse,
      },
      {
        key: 'accepted-finalized',
        title: 'Solicitudes Aceptadas y Finalizadas',
        requests: combinedAcceptedAndFinalizedRequests,
        type: 'accepted-finalized'
      },
      {
        key: 'delivered',
        title: 'Solicitudes Entregadas',
        requests: deliveredRequests,
        type: 'delivered',
      },
    ];
  }, [requestType, pendingRequests, quotedRequests, combinedAcceptedAndFinalizedRequests, deliveredRequests]);

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">
          {(() => {
            switch (requestType) {
              case 'design-requests':
                return 'Panel de Solicitudes de Diseño';
              case 'print-requests':
                return 'Panel de Solicitudes de Impresión';
              case 'design-reverse-auctions':
                return 'Panel de Subastas de Diseño';
              case 'print-reverse-auctions':
                return 'Panel de Subastas de Impresión';
              default:
                return 'Panel de Solicitudes';
            }
          })()}
        </h2>

        {tables.every(table => table.requests.length === 0) ? (
          <div className="text-center text-gray-300 py-8">
            <p className="text-xl">No hay solicitudes disponibles</p>
          </div>
        ) : (
          expandedTable === null
            ? tables.map((table) => (
                <UserRequestsTable
                  key={table.key}
                  title={table.title}
                  requests={table.requests}
                  type={table.type as 'pending' | 'quoted' | 'accepted-finalized' | 'delivered'}
                  handleAcceptResponse={table.handleAcceptResponse}
                  handleRequestResponses={table.handleRequestResponses}
                  handleAcceptRequest={handleAcceptRequest}
                  handleDeclineRequest={handleDeclineRequest}
                  responses={table.responses}
                  isExpanded={false}
                  onExpand={() => setExpandedTable(table.key)}
                  requestType={requestType}
                />
              ))
            : tables
                .filter((table) => table.key === expandedTable)
                .map((table) => (
                  <UserRequestsTable
                    key={table.key}
                    title={table.title}
                    requests={table.requests}
                    type={table.type as 'pending' | 'quoted' | 'accepted-finalized' | 'delivered'}
                    handleAcceptResponse={table.handleAcceptResponse}
                    handleRequestResponses={table.handleRequestResponses}
                    handleAcceptRequest={handleAcceptRequest}
                    handleDeclineRequest={handleDeclineRequest}
                    responses={table.responses}
                    isExpanded={true}
                    onExpand={() => setExpandedTable(null)}
                    requestType={requestType}
                  />
                ))
        )}
      </section>
    </div>
  );
};

export default UserPrintReqDashboard;
