'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../../types';
import { productService } from '../../services/productService';
import {ArrowLeft} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      productService
        .getById(Number(params.id))
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (product && confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(product.id);
        router.push('/products');
      } catch (error) {
        alert('Failed to delete product' + error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Product not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Fake Store
          </Link>
          <div className="flex gap-4">
            <Link href="/products" className="px-4 py-2 text-blue-600 font-semibold">
              Products
            </Link>
            <Link href="/carts" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Carts
            </Link>
            <Link href="/users" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Users
            </Link>
              <Link href="/auth" className="px-4 py-2 text-gray-600 ">
                  Auth
              </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            <div className='flex gap-4 items-center'>
                <ArrowLeft/> Back to Products
            </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
              <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="flex gap-4">
                <Link
                  href={`/products?edit=${product.id}`}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

