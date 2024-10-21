export interface ProductRequest{
    requestID: number;
    email: string;        
    quantity: number;
    name: string;
    date: string;
    status: 'accepted' | 'finalized';
};