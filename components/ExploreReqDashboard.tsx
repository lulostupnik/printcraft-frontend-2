import React from 'react';
import ExploreReqComponent from '@/components/ExploreReqComponent';
import usePrintRequests from '@/hooks/usePrintRequest';


const ExploreReqDashboard: React.FC = () => {
  const { loading } = usePrintRequests('print-requests');   //solamente tiene el loading

  return (
    <div className="container mx-auto">
      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Explorar Print Request
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white">Cargando datos...</div>
          </div>
        ) : (
          <ExploreReqComponent type="print-requests" />
        )}
      </section>

      <section className="mb-12 bg-gray-800 p-8 rounded-lg">
        <h2 className="text-4xl font-bold mb-4 text-center">
          Explorar Design Request
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white">Cargando datos...</div>
          </div>
        ) : (
          <ExploreReqComponent type="design-requests" />
        )}
      </section>
    </div>
  );
};

export default ExploreReqDashboard;
