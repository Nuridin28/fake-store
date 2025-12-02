'use client'

import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "../../types";
import { userService } from "../../services/userService";
import { ArrowLeft } from "lucide-react";

export default function UserDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // <-- состояние для глаза

    useEffect(() => {
        if (params.id) {
            userService
                .getById(Number(params.id))
                .then((data) => {
                    setUser(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [params.id]);

    const handleDelete = async () => {
        if (user && confirm("Are you sure you want to delete this user?")) {
            try {
                await userService.delete(user.id);
                router.push("/users");
            } catch (error) {
                alert("Failed to delete user" + error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading user...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">User not found</div>
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
                        <Link
                            href="/products"
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Products
                        </Link>
                        <Link
                            href="/carts"
                            className="px-4 py-2 text-gray-600 hover:text-gray-900"
                        >
                            Carts
                        </Link>
                        <Link
                            href="/users"
                            className="px-4 py-2 text-blue-600 font-semibold"
                        >
                            Users
                        </Link>
                        <Link href="/auth" className="px-4 py-2 text-gray-600 ">
                            Auth
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link
                    href="/users"
                    className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
                >
                    <div className="flex gap-4 items-center">
                        <ArrowLeft /> Back to Users
                    </div>
                </Link>

                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">@{user.username}</h1>
                            <p className="text-gray-600">ID: {user.id}</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                href={`/users?edit=${user.id}`}
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

                    <div className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">User Information</h2>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">ID:</span> {user.id}
                                </p>
                                <p>
                                    <span className="font-medium">Username:</span> {user.username}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span> {user.email}
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="font-medium">Password:</span>{" "}
                                    {showPassword ? user.password : "••••••••"}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-gray-600" />
                                        )}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
