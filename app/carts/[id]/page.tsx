'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Link from 'next/link';
import {Cart, Product} from '../../types';
import {cardService} from '../../services/cardService';
import {productService} from "@/app/services/productService";
import {ArrowLeft} from "lucide-react";

export default function CartDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    if (params.id) {
      cardService
        .getById(Number(params.id))
        .then((data) => {
          setCart(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [params.id]);

    const getProducts = async (ids: number[]) => {
        return await Promise.all(
            ids.map(id => productService.getById(id))
        );
    };

    const ids = useMemo(() => cart?.products.map(p => p.productId) || [], [cart]);

    useEffect(() => {
        if (ids.length === 0) return;

        const fetchData = async () => {
            try {
                const data = await getProducts(ids);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchData();
    }, [ids]);


    const handleDelete = async () => {
    if (cart && confirm('Are you sure you want to delete this cart?')) {
      try {
        await cardService.delete(cart.id);
        router.push('/carts');
      } catch (error) {
        alert('Failed to delete cart' + error);
      }
    }
  };

    if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading cart...</div>
      </div>
    );
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Cart not found</div>
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
            <Link href="/products" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href="/carts" className="px-4 py-2 text-blue-600 font-semibold">
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
        <Link href="/carts" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            <div className='flex gap-4 items-center'>
                <ArrowLeft/> Back to Carts
            </div>
        </Link>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Cart #{cart.id}</h1>
              <p className="text-gray-600">User ID: {cart.userId}</p>
              <p className="text-gray-600">Total Products: {cart.products.length}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href={`/carts?edit=${cart.id}`}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products && (
                  products.map((product, index) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                          <div className="h-64 bg-gray-100 flex items-center justify-center p-4">
                              <img
                                  src={product.image}
                                  alt={product.title}
                                  className="max-h-full max-w-full object-contain"
                              />
                          </div>
                          <div className="p-4 flex flex-col h-full">
                              <Link href={`/products/${product.id}`} className="flex-1">
                                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-600">{product.title}</h3>
                                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                                  <p className="text-xl font-bold text-blue-600 mb-2">${product.price}</p>
                                  <p className="text-xs text-gray-500 mb-4">{product.category}</p>
                                  <p className="text-xs text-blue-600 mb-4">quantity : {cart.products[index].quantity}</p>
                              </Link>
                          </div>
                      </div>
                  ))
              )}
          </div>
        </div>
      </main>
    </div>
  );
}

