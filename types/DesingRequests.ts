export interface DesingRequest {
    requestID: number;
    userID: number;
    quantity: number;
    sellerID: number;
    //stl_url?: string; // Making STL file optional
    images: string[];
    description: string;
    material: string;
    status: string;
    price: string | null;
  }
  