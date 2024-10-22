export interface SoldProductRequest{
    requestID: number;
    email: string;        
    quantity: number;
    name: string;
    date: string;
    productCode: number;
    status:'Completada' | 'En proceso' | 'Entregada';
    price: number;
};