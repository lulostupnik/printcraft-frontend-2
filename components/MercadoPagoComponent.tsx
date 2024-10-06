'use client';
import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Define the props for the Wallet component if needed
interface WalletProps {
  initialization: {
    preferenceId: string;
  };
}

const MercadoPagoComponent: React.FC = () => {
  useEffect(() => {
    // Initialize MercadoPago with the provided public key from the .env file
    const mercadoPagoPublicKey = process.env.REACT_APP_MP_SECRET;

    if (mercadoPagoPublicKey) {
      initMercadoPago(mercadoPagoPublicKey, { locale: 'es-AR' });
    } else {
      console.error('MercadoPago public key is missing.');
    }
  }, []);

  return (
    <div>
      {/* Render the Wallet component with the required initialization props */}
      <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />
    </div>
  );
};

export default MercadoPagoComponent;
