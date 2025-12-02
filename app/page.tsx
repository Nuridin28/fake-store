'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Fake Store</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">Products</h2>
            <p className="text-gray-600">Manage products</p>
          </Link>

          <Link
            href="/carts"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">Carts</h2>
            <p className="text-gray-600">Manage carts</p>
          </Link>

          <Link
            href="/users"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">Users</h2>
            <p className="text-gray-600">Manage users</p>
          </Link>

            <Link
                href="/auth"
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
            >
                <h2 className="text-xl font-bold mb-2">Auth</h2>
                <p className="text-gray-600">Manage auth</p>
            </Link>
        </div>
      </main>
    </div>
  );
}
