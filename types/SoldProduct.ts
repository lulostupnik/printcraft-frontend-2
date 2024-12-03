export type SoldProductRequest = {
    requestID: number;
    email: string;
    quantity: number;
    name: string;
    date: string;
    status: "Completada" | "En proceso" | "Entregada";
    productCode: number;
    price: number;
};