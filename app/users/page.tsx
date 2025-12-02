'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '../types';
import { userService } from '../services/userService';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    id: 0,
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
      userService
          .getAll()
          .then((data) => {
              setUsers(data);
              setLoading(false);
          })
          .catch(() => {
              setLoading(false);
          });
  }, []);

  const loadUsers = () => {
    userService
      .getAll()
      .then((data) => {
        setUsers(data);
      })
      .catch(() => {});
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await userService.delete(id);
        loadUsers();
      } catch (error) {
        alert('Failed to delete user' + error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await userService.update(editingUser.id, formData);
      } else {
        await userService.create(formData);
      }
      setShowForm(false);
      setEditingUser(null);
      setFormData({
          id: 0,
          email: '',
          username: '',
          password: '',
      });
      loadUsers();
    } catch (error) {
      alert('Failed to save user' + error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
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
            <Link href="/carts" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Carts
            </Link>
            <Link href="/users" className="px-4 py-2 text-blue-600 font-semibold">
              Users
            </Link>
              <Link href="/auth" className="px-4 py-2 text-gray-600 font-semibold">
                  Auth
              </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({
                  id: 0,
                  email: '',
                  username: '',
                  password: '',
              });
              setShowForm(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Create User'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
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
                    setEditingUser(null);
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
            <div className="text-xl text-gray-600">Loading users...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
                <Link href={`/users/${user.id}`} className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">
                    @{user.username}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                </Link>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

