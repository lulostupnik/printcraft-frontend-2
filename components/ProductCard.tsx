import Image from 'next/image';
import { Product } from '@/types/Product'; // Import the Product type from Product.ts
import Link from 'next/link';

interface ProductCardProps {
  product: Product;  // Use the Product type from Product.ts
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div key={product.code} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col justify-between h-full">
      {/* Product Image */}
      <div className="h-48 w-full flex items-center justify-center bg-gray-700">
        <Image
          src={""}  // Replace with product.image_url if available
          alt={product.name}
          width={200}
          height={200}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Details */}
      <Link href={`/product/${product.code}`} className="flex-grow p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-400 mb-2">{product.material}</p>
          <p className="text-gray-400 mb-2">Stock: {product.stock}</p>
          <p className="text-gray-400 mb-4">{product.description}</p>
        </div>
        {/* Product Price at the Bottom */}
        <div className="mt-auto text-right">
          <span className="text-xl font-bold">${parseFloat(product.price).toFixed(2)}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
