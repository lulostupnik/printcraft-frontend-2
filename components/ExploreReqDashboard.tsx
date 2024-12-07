import React from 'react';
import ExploreReqComponent from '@/components/ExploreReqComponent';
import usePrintRequests from '@/hooks/usePrintRequest';

interface ExploreReqDashboardProps {
  requestType: 'print-requests' | 'design-requests';
}

const ExploreReqDashboard: React.FC<ExploreReqDashboardProps> = ({ requestType }) => {
  const { loading } = usePrintRequests(requestType);

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">
          {requestType === 'design-requests' ? 'Explorar Design Request' : 'Explorar Print Request'}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white">Cargando datos...</div>
          </div>
        ) : (
          <ExploreReqComponent type={requestType} />
        )}
      </section>
    </div>
  );
};

export default ExploreReqDashboard;
