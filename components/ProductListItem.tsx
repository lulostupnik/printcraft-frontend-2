import React, { useState } from 'react';
import { Product } from '@/types/Product';

interface ProductListItemProps {
    product: Product;
    onDelete: (productCode: string) => void;
    onIncreaseStock: (productCode: string) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onDelete, onIncreaseStock }) => {
    const [stock, setStock] = useState<number>(parseInt(product.stock));

    const handleIncreaseStock = () => {
        setStock(stock + 1);
        onIncreaseStock(product.code); // Llama a la función de aumento de stock proporcionada
    };

    return (
        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4 w-full">
            <div className="flex-grow">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-gray-400">Material: {product.material}</p>
                <p className="text-gray-400">Stock: {stock}</p>
            </div>
            <div className="flex-shrink-0 space-x-4">
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    onClick={handleIncreaseStock}
                >
                    Aumentar Stock
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={() => onDelete(product.code)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default ProductListItem;
