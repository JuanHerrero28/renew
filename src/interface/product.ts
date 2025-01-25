export interface Product {
    id: string; // Cambiar a string
    title: string;
    image: string;
    type: string;
    price: number;
  }

export interface CartProduct {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }

