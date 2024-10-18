
'use client'
//Opcion 1
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PrintReqDashboard from '@/components/printReqDashboard';
// import DesignReqDashboard from '@/components/designReqDashboard';
// import SellDashboard from '@/components/sellDashboard';

const SellerDashboardPage: React.FC = () => {
  const [selectedDashboard, setSelectedDashboard] = useState<'print' | 'design' | 'sell'>('print');

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case 'print':
        return <PrintReqDashboard requestType='print-requests'/>;
      case 'design':
        return <PrintReqDashboard requestType='design-requests'/>;
      case 'sell':
        return <div>Sell Dashboard Placeholder</div>;
      default:
        return <div>error</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <Header />
      
      {/* Flex container for sidebar and main content */}
      <div className="flex flex-grow h-full">
        {/* Sidebar */}
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <div className="py-8">
          <h2 className="text-xl font-bold mb-4">Dashboard Navigation</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => setSelectedDashboard('print')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'print' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Print Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('design')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Design Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedDashboard('sell')}
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedDashboard === 'sell' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                Sell Dashboard
              </button>
            </li>
          </ul>
          </div>
        
        </aside>

        {/* Main Content */}
        <main className="flex-grow px-4 py-12">
          {renderDashboard()}
        </main>

      </div>

   
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SellerDashboardPage;


//Opcion 2:


// 'use client'
// import React, { useState } from 'react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import PrintReqDashboard from '@/components/printReqDashboard';
// // import DesignReqDashboard from '@/components/designReqDashboard';
// // import SellDashboard from '@/components/sellDashboard';

// const SellerDashboardPage: React.FC = () => {
//   const [selectedDashboard, setSelectedDashboard] = useState<'print' | 'design' | 'sell'>('print');

//   const renderDashboard = () => {
//     switch (selectedDashboard) {
//       case 'print':
//         return <PrintReqDashboard />;
//       case 'design':
//         return <div>Design Dashboard Placeholder</div>;
//       case 'sell':
//         return <div>Sell Dashboard Placeholder</div>;
//       default:
//         return <PrintReqDashboard />;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900 text-white">
//       {/* Header */}
//       <Header />
      
//       {/* Flex container for sidebar and main content */}
//       <div className="flex flex-grow py-8 px-4">
//         {/* Sidebar */}
//         <aside className="bg-gray-800 p-6 rounded-lg shadow-lg mr-8">
//           <h2 className="text-xl font-bold mb-4">Dashboard Navigation</h2>
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => setSelectedDashboard('print')}
//                 className={`w-full text-left px-4 py-2 rounded-lg ${
//                   selectedDashboard === 'print' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
//                 }`}
//               >
//                 Print Requests
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedDashboard('design')}
//                 className={`w-full text-left px-4 py-2 rounded-lg ${
//                   selectedDashboard === 'design' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
//                 }`}
//               >
//                 Design Requests
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedDashboard('sell')}
//                 className={`w-full text-left px-4 py-2 rounded-lg ${
//                   selectedDashboard === 'sell' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
//                 }`}
//               >
//                 Sell Dashboard
//               </button>
//             </li>
//           </ul>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-grow">
//           {renderDashboard()}
//         </main>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default SellerDashboardPage;
