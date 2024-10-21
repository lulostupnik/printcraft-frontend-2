export interface ProductRequest{
    requestID: number;
    email: string;        
    quantity: number;
    name: string;
    date: string;
    productCode: number;
    status: 'accepted' | 'finalized';
    price: number;
};