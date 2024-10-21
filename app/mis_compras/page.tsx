// 'use client';
// import React, { useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import UserPrintReqDashboard from "@/components/userPrintReqDashboard";
// import { useRouter } from "next/navigation"; // Import useRouter
// import UserExploreAnsTableComponent from "@/components/UserExploreAnsTable";

// const MisComprasPage: React.FC = () => {
//   const [selectedSection, setSelectedSection] = useState<
//     "products" | "designRequests" | "printRequests"
//   >("products");

//   const router = useRouter(); // Initialize useRouter

//   // Function to navigate to designer's profile page
//   const handleNavigateToDesigner = (sellerID: number) => {
//     router.push(`/designers/designer/${sellerID}`);
//   };

//   // Placeholder render functions for each section
//   const renderProducts = () => {
//     return (
//       <div className="bg-gray-700 p-6 rounded-lg mb-8">
//         <h2 className="text-3xl font-bold mb-4">Mis Compras</h2>
//         {/* Add dynamic product list here */}
//         <div className="flex flex-col space-y-6">
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-bold mb-2">Producto Ejemplo 1</h3>
//             <p className="text-gray-400 mb-2">Entregado el 3 de octubre</p>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               Ver compra
//             </button>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg">
//             <h3 className="text-xl font-bold mb-2">Producto Ejemplo 2</h3>
//             <p className="text-gray-400 mb-2">Entregado el 7 de agosto</p>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               Ver compra
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderDesignRequests = () => {
//     return (
//       <div>
//          <UserPrintReqDashboard
//         requestType="design-requests"
//       />
//       <UserExploreAnsTableComponent type='design-requests' ></UserExploreAnsTableComponent>
//       </div>
     
//     );
//   };

//   const renderPrintRequests = () => {
//     return (
//       <div>
//       <UserPrintReqDashboard
//         requestType="print-requests"
//       />

// <UserExploreAnsTableComponent type='print-requests' ></UserExploreAnsTableComponent>
//       </div>

//     );
//   };

//   const renderSection = () => {
//     switch (selectedSection) {
//       case "products":
//         return renderProducts();
//       case "designRequests":
//         return renderDesignRequests();
//       case "printRequests":
//         return renderPrintRequests();
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-900 text-white">
//       <Header />
//       <div className="flex flex-grow">
//         <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
//           <h2 className="text-xl font-bold mb-4">Navegación</h2>
//           <ul className="space-y-4">
//             <li>
//               <button
//                 onClick={() => setSelectedSection("products")}
//                 className={`w-full text-left px-4 py-2 rounded-lg ${
//                   selectedSection === "products"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-700 text-gray-300"
//                 }`}
//               >
//                 Products
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedSection("designRequests")}
//                 className={`w-full text-left px-4 py-2 rounded-lg ${
//                   selectedSection === "designRequests"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-700 text-gray-300"
//                 }`}
//               >
//                 Design Requests
//               </button>
//             </li>
//             <li>
//               <button
//                 onClick={() => setSelectedSection("printRequests")}
//                 className={`w-full text-left px-4 py-2 rounded-lg ${
//                   selectedSection === "printRequests"
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-700 text-gray-300"
//                 }`}
//               >
//                 Print Requests
//               </button>
//             </li>
//           </ul>
//         </aside>

//         <main className="flex-1 container mx-auto px-4 py-8">
//           {renderSection()}
//         </main>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MisComprasPage;
'use client';
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserPrintReqDashboard from "@/components/userPrintReqDashboard";
import { useRouter } from "next/navigation"; // Import useRouter
import UserExploreAnsTableComponent from "@/components/UserExploreAnsTable";

const MisComprasPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<
    "products" | "designRequests" | "printRequests"
  >("products");

  const [loading, setLoading] = useState<boolean>(false); // Add loading state
  const router = useRouter(); // Initialize useRouter

  const handleSectionChange = (section: "products" | "designRequests" | "printRequests") => {
    setSelectedSection(section); // Set the new section after a small delay (simulates loading)
  };

  // Function to navigate to designer's profile page
  const handleNavigateToDesigner = (sellerID: number) => {
    router.push(`/designers/designer/${sellerID}`);
  };

  // Placeholder render functions for each section
  const renderProducts = () => {
    return (
      <div className="bg-gray-700 p-6 rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Mis Compras</h2>
        {/* Add dynamic product list here */}
        <div className="flex flex-col space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Producto Ejemplo 1</h3>
            <p className="text-gray-400 mb-2">Entregado el 3 de octubre</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Ver compra
            </button>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Producto Ejemplo 2</h3>
            <p className="text-gray-400 mb-2">Entregado el 7 de agosto</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Ver compra
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDesignRequests = () => {
    return (
      <div>
         <UserPrintReqDashboard
        requestType="design-requests"
      />
      <UserExploreAnsTableComponent type='design-requests' ></UserExploreAnsTableComponent>
      </div>
     
    );
  };

  const renderPrintRequests = () => {
    return (
      <div>
      <UserPrintReqDashboard
        requestType="print-requests"
      />

<UserExploreAnsTableComponent type='print-requests' ></UserExploreAnsTableComponent>
      </div>

    );
  };

  const renderSection = () => {
    if (loading) {
      return <p className="text-center text-white"></p>; // Show loading indicator
    }
    
    switch (selectedSection) {
      case "products":
        return renderProducts();
      case "designRequests":
        return renderDesignRequests();
      case "printRequests":
        return renderPrintRequests();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-grow">
        <aside className="w-1/5 bg-gray-800 p-10 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Navegación</h2>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => handleSectionChange("products")} // Use handleSectionChange
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSection === "products"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("designRequests")} // Use handleSectionChange
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSection === "designRequests"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Design Requests
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionChange("printRequests")} // Use handleSectionChange
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  selectedSection === "printRequests"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Print Requests
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-1 container mx-auto px-4 py-8">
          {renderSection()} {/* Render section based on loading state */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MisComprasPage;
