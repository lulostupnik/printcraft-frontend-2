// export interface Product {
//     id: number;
//     name: string;
//     price: number;
//     category: string;
//     rating: number;
//     image: string;
//     stlUrl: string;
//   }
  

  // Product.ts
export interface Product {

  code: string;           // The product's unique code
  name: string;           // The name of the product
  material: string;       // The material the product is made from
  stock: string;          // The stock level of the product
  description: string;    // Description of the product
  image_url: string;      // URL to the product's image
  seller: string;         // The seller of the product
  price: string;          // The price of the product
}
