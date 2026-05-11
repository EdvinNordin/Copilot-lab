/** Registered user account. */
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  address?: Address;
}

/** Postal address associated with a user. */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/** A customer review for a product. */
export interface Review {
  author: string;
  comment: string;
  date: string;
}

/** A product available in the store catalogue. */
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  reviews: Review[];
  inStock: boolean;
}

/** A product added to the shopping cart with a selected quantity. */
export interface CartItem extends Product {
  quantity: number;
}

/** The result returned after a successful checkout. */
export interface CheckoutResult {
  success: boolean;
  orderId: string;
  items: CartItem[];
  total: number;
}
