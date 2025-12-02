'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {Cart, CartProduct, Product} from '../types';
import { cardService } from '../services/cardService';

export default function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCart, setEditingCart] = useState<Cart | null>(null);
  const [formData, setFormData] = useState<Cart>({
    id: 0, userId: 0, products: [] as CartProduct[],
  });

  useEffect(() => {
      cardService
          .getAll()
          .then((data) => {
              setCarts(data);
              setLoading(false);
          })
          .catch(() => {
              setLoading(false);
          });
  }, []);

  const loadCarts = () => {
    cardService
      .getAll()
      .then((data) => {
        setCarts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this cart?')) {
      try {
        await cardService.delete(id);
        loadCarts();
      } catch (error) {
        alert('Failed to delete cart' + error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCart) {
        await cardService.update(editingCart.id, formData);
      } else {
        await cardService.create(formData);
      }
      setShowForm(false);
      setEditingCart(null);
      setFormData({ id: 0,  userId: 0, products: [] });
      loadCarts();
    } catch (error) {
      alert('Failed to save cart' + error);
    }
  };

  const handleEdit = (cart: Cart) => {
    setEditingCart(cart);
    setFormData({
      id: cart.id,
      userId: cart.userId,
      products: cart.products,
    });
    setShowForm(true);
  };

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Carts</h1>
          <button
            onClick={() => {
              setEditingCart(null);
              setFormData({id:0, userId: 0, products: [] });
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Cart
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingCart ? 'Edit Cart' : 'Create Cart'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">User ID</label>
                <input
                  type="number"
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Products (JSON)</label>
                <textarea
                  value={JSON.stringify(formData.products, null, 2)}
                  onChange={(e) => {
                    try {
                      setFormData({ ...formData, products: JSON.parse(e.target.value) });
                    } catch {}
                  }}
                  className="w-full px-4 py-2 border rounded-md font-mono text-sm"
                  rows={10}
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingCart(null);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-xl text-gray-600">Loading carts...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {carts.map((cart) => (
              <div key={cart.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <Link href={`/carts/${cart.id}`} className="flex-1">
                    <h3 className="text-lg font-semibold hover:text-blue-600">Cart #{cart.id}</h3>
                    <p className="text-gray-600">User ID: {cart.userId}</p>
                    <p className="text-gray-600">Products: {cart.products.length}</p>
                  </Link>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(cart)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cart.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

