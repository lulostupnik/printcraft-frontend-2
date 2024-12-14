"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { API_URL } from "@/api/api";
import { SizeType } from '@/types/Product';

interface ProductData {
  name: string;
  description: string;
  price: string;
  material: string;
  stock: string;
  stlFile: File | null; // Store the STL file
  imageFiles: File[];  // Store multiple image files
  size: SizeType;
}

interface ProductFormProps {
  onProductPublished?: (data: any) => void; // Optional callback when the product is published
}

interface Material {
  name: string;
  // Agrega otras propiedades si las hay
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductPublished }) => {
  const [productData, setProductData] = useState<ProductData>({
    name: '',
    description: '',
    price: '',
    material: '',
    stock: '',
    stlFile: null,
    imageFiles: [],
    size: 'Pequeño',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_URL}/materials/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMaterials(data);
        }
      } catch (error) {
        console.error('Error al cargar materiales:', error);
      }
    };

    fetchMaterials();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setProductData((prev) => ({ ...prev, imageFiles: files }));

      // Generate previews for each selected file
      const previews = files.map(file => {
        const reader = new FileReader();
        return new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(previews).then(previews => setImagePreviews(previews));
    }
  };

  const handleSTLFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setProductData((prev) => ({ ...prev, stlFile: file }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (productData.imageFiles.length === 0) {
      alert("Debes subir al menos una imagen del producto");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('material', productData.material);
      formData.append('stock', productData.stock);
      formData.append('size', productData.size);

      if (productData.stlFile) {
        formData.append('stl_file', productData.stlFile);
      }

      productData.imageFiles.forEach((file) => {
        formData.append('image_files', file);
      });

      const response = await fetch(`${API_URL}/products/create/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Producto publicado con éxito!");
        if (onProductPublished) {
          onProductPublished(result);
        }

        // Reset the form
        setProductData({
          name: '',
          description: '',
          price: '',
          material: '',
          stock: '',
          stlFile: null,
          imageFiles: [],
          size: 'Pequeño',
        });
        setImagePreviews([]);
      } else {
        // If there's an error detail in the response, show it
        const errorMessage = result?.detail || 'Error desconocido';
        alert(`Error al publicar el producto: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error al publicar el producto:', error);
      alert("Error de conexión al publicar el producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* If loading, show an overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-white text-xl">Cargando...</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Descripción (obligatorio)</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="material" className="block text-sm font-medium">Material</label>
          <select
            id="material"
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded font-sans text-sm text-white"
            required
          >
            <option value="">Selecciona un material</option>
            {materials.map((material, index) => (
              <option key={index} value={material.name} className="font-sans">
                {material.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-medium">Tamaño</label>
          <select
            id="size"
            name="size"
            value={productData.size}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded font-sans text-sm text-white"
            required
          >
            {(['Pequeño', 'Mediano', 'Grande'] as SizeType[]).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="stlFile" className="block text-sm font-medium">Archivo STL (opcional)</label>
          <input
            type="file"
            id="stlFile"
            name="stlFile"
            accept=".stl"
            onChange={handleSTLFileChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageFiles" className="block text-sm font-medium">Imágenes del Producto (mínimo una imagen)*</label>
          <input
            type="file"
            id="imageFiles"
            name="imageFiles"
            accept="image/*"
            multiple
            onChange={handleImageFileChange}
            className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded"
            required
          />
        </div>

        {/* Display image previews */}
        {imagePreviews.length > 0 && (
          <div className="mb-4">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Vista previa ${index + 1}`} className="max-w-full h-auto rounded mb-2" />
            ))}
          </div>
        )}

        <button
          type="submit"
          className={`bg-green-600 text-white py-2 px-4 rounded-full font-bold hover:bg-green-500 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Publicando...' : 'Publicar Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
