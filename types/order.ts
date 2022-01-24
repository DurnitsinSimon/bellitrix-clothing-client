import { Clothe } from "./clothe";

export interface Product {
    clothe: Clothe,
    currentSize: string;
}

export interface Order {
    _id: string;

    paymentId: string;
  
    fullName?: string;
  
    address: string;
  
    email: string;
  
    phone: string;
  
    worldWideShipping: boolean;
  
    sumPaid: number;
  
    products: Product[];

    date: string;
  }
  