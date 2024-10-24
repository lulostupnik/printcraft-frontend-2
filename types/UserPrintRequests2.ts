export interface PrintRequestUser {
  requestID: number;
  userID: number;
  quantity: number;
  sellerID: number;
  seller_name?: string;
  direccion_del_vendedor? : string;
  stl_url?: string; // Optional for design-requests
  design_images: { image_url: string }[];
  description: string;
  material: string;
  status: string;
  price: string | null;
};
