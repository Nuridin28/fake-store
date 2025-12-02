'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {ILoginForm} from '../types';
import {authService} from "@/app/services/authService";
import {useRouter} from "next/navigation";


export default function UsersPage() {
    const [formData, setFormData] = useState<ILoginForm>({
        username: '',
        password: '',
    });

    const router = useRouter();

    // @ts-ignore
    const handleSubmit = async (e): Promise<void> => {
        e.preventDefault();
        await authService.login(formData).then((res) => {
            console.log(res);
        })
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
                        <Link href="/carts" className="px-4 py-2 text-gray-600 hover:text-gray-900">
                            Carts
                        </Link>
                        <Link href="/users" className="px-4 py-2 text-gray-600 ">
                            Users
                        </Link>
                        <Link href="/auth" className="px-4 py-2 text-blue-600 font-semibold">
                            Auth
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <div className="flex flex-wrap items-center justify-center p-6">
                    <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
                        <div className="">
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

                            <div className="">
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
                        <div className="flex w-full gap-2 items-center">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-1/2"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    router.push('/');
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 w-1/2"
                            >
                                Back to Main
                            </button>
                        </div>
                    </form>
                </div>


            </main>

        </div>
    );
}

