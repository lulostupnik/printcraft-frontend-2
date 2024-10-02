// Product.ts
export interface Product {
  code: string;           // The product's unique code
  name: string;           // The name of the product
  material: string;       // The material the product is made from
  stock: string;          // The stock level of the product
  description: string;    // Description of the product
  stl_file_url: string | null;   // URL to the STL file of the product
  seller: string;         // The seller of the product
  price: string;          // The price of the product
  images_url: string[] ;   // An array of URLs to the product's images, should always be defined
}
