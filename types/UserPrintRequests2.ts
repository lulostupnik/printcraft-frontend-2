export interface PrintRequestUser {
  requestID: number;
  userID: number;
  quantity: number;
  sellerID: number;
  store_name?: string;
  stl_url?: string; // Optional for design-requests
  design_images: { image_url: string }[];
  description: string;
  material: string;
  status: string;
  price: string | null;
};
