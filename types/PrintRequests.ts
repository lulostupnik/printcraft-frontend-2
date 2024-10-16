export interface PrintRequest  {
    requestID: number;
    userID: number;
    quantity: number;
    sellerID: number;
    stl_url: string;
    description: string;
    material: string;
    status: string;
    price: string | null;
  };