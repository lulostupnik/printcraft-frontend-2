'use client';
import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Define the props for the MercadoPagoComponent
interface MercadoPagoComponentProps {
  preferenceId: string;
}

const MercadoPagoComponent: React.FC<MercadoPagoComponentProps> = ({ preferenceId }) => {
  useEffect(() => {
    // Initialize MercadoPago with the provided public key from the .env file
    const mercadoPagoPublicKey = process.env.NEXT_PUBLIC_MP;
    if (mercadoPagoPublicKey) {
      initMercadoPago(mercadoPagoPublicKey, { locale: 'es-AR' });
    } else {
      console.error('MercadoPago public key is missing.');
    }
  }, []);

  return (
    <div>
      {/* Render the Wallet component with the dynamic preferenceId */}
      <Wallet initialization={{ preferenceId }} />
    </div>
  );
};

export default MercadoPagoComponent;