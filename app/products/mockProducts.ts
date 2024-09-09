import { Product } from '@/types/Product'; // Adjust path as necessary

export const products: Product[] = [
  { id: 1, name: "3D PERRO SALCHICHA", price: 29.99, category: "Accessories", rating: 5, image: "/mock_products/images/dog.jpg", stlUrl: "/mock_products/models/dog.stl" },
  { id: 2, name: "Millennium Falcom", price: 14.99, category: "Accessories", rating: 4.2, image: "", stlUrl: "/mock_products/models/falcon.stl" },
  { id: 3, name: "Boat", price: 24.99, category: "Home Decor", rating: 4.7, image: "", stlUrl: "/mock_products/models/boat.stl" },
  { id: 4, name: "3D Printed Keychain", price: 9.99, category: "Accessories", rating: 4.0, image: "/mock_products/images/keychain.jpg", stlUrl: "" },
];

// // Mock product data
// export const products = [
//     { id: 1, name: "3D PERRO SALCHICHA", price: 29.99, category: "Accessories", rating: 5, image: "/mock_products/images/dog.jpg", stlUrl: "/mock_products/models/dog.stl" },
//     { id: 2, name: "Millennium Falcom", price: 14.99, category: "Accessories", rating: 4.2, image: "", stlUrl: "/mock_products/models/falcon.stl" },
//     { id: 3, name: "Boat", price: 24.99, category: "Home Decor", rating: 4.7, image: "", stlUrl: "/mock_products/models/boat.stl" },
//     { id: 4, name: "3D Printed Keychain", price: 9.99, category: "Accessories", rating: 4.0, image: "/mock_products/images/keychain.jpg", stlUrl: "" },
//     // { id: 5, name: "Desk Organizer", price: 19.99, category: "Office", rating: 4.6, image: "/images/organizer.png", stlUrl: "/models/organizer.stl" },
//     // { id: 6, name: "3D Printed Lamp Shade", price: 34.99, category: "Lighting", rating: 4.3, image: "/images/lamp-shade.png", stlUrl: null },
//     // { id: 7, name: "Customizable Coasters", price: 12.99, category: "Home Decor", rating: 4.1, image: "/images/coasters.png", stlUrl: "/models/coasters.stl" },
//     // { id: 8, name: "3D Printed Wall Art", price: 39.99, category: "Home Decor", rating: 4.8, image: "/images/wall-art.png", stlUrl: null },
//   ];