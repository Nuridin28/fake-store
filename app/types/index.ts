export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartProduct {
    productId: number;
    quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  products: CartProduct[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface ILoginForm {
    username: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}
