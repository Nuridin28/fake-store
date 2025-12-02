import {ILoginResponse, ILoginForm} from "@/app/types";


const API_BASE_URL = 'https://fakestoreapi.com';

export const authService = {
    async login(user: ILoginForm): Promise<ILoginResponse> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Failed to create cart');
        }
        return response.json();
    },
};

