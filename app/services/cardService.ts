import { Cart } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const cardService = {
    async getAll(): Promise<Cart[]> {
        const response = await fetch(`${API_BASE_URL}/carts`);
        if (!response.ok) {
            throw new Error('Failed to fetch carts');
        }
        return response.json();
    },
    

    async getById(id: number): Promise<Cart> {
        const response = await fetch(`${API_BASE_URL}/carts/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch cart with id ${id}`);
        }
        return response.json();
    },

    async create(cart: Cart): Promise<Cart> {
        const response = await fetch(`${API_BASE_URL}/carts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });
        if (!response.ok) {
            throw new Error('Failed to create cart');
        }
        return response.json();
    },

    async update(id: number, cart: Cart): Promise<Cart> {
        const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cart),
        });
        if (!response.ok) {
            throw new Error(`Failed to update cart with id ${id}`);
        }
        return response.json();
    },

    async delete(id: number): Promise<Cart> {
        const response = await fetch(`${API_BASE_URL}/carts/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Failed to delete cart with id ${id}`);
        }
        return response.json();
    },
};

