import { Product } from "../types/types";

/**
 * In-memory product catalogue for The Daily Harvest.
 *
 * NOTE: This array is mutable at runtime — route handlers may push new items
 * or splice existing ones. Changes are lost when the server restarts.
 */
export const products: Product[] = [
  {
    id: "1",
    name: "Apple",
    price: 1.99,
    description: "Fresh red apples, perfect for snacking",
    image: "apple.jpg",
    reviews: [],
    inStock: true,
  },
  {
    id: "2",
    name: "Grapes",
    price: 3.49,
    description: "Sweet seedless grapes, great for sharing",
    image: "grapes.jpg",
    reviews: [],
    inStock: true,
  },
  {
    id: "3",
    name: "Orange",
    price: 2.29,
    description: "Juicy navel oranges, rich in vitamin C",
    image: "orange.jpg",
    reviews: [],
    inStock: true,
  },
  {
    id: "4",
    name: "Pear",
    price: 2.79,
    description: "Ripe Bartlett pears with a sweet, buttery taste",
    image: "pear.jpg",
    reviews: [],
    inStock: false,
  },
];
