import { Router, Request, Response } from "express";
import { CartItem } from "../types/types";
import { calculateTotal } from "../utils/helpers";
import { products } from "../data/products";

const router = Router();

// In-memory cart storage
let cartItems: CartItem[] = [];

// GET /api/cart - get all cart items
router.get("/", (_req: Request, res: Response) => {
  res.json({ items: cartItems, total: calculateTotal(cartItems) });
});

// POST /api/cart - add an item to the cart
router.post("/", (req: Request, res: Response) => {
  const { productId, quantity = 1 } = req.body as {
    productId?: string;
    quantity?: number;
  };

  if (!productId) {
    return res.status(400).json({ error: "productId is required" });
  }

  if (typeof quantity !== "number" || quantity < 1) {
    return res
      .status(400)
      .json({ error: "quantity must be a positive number" });
  }

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (!product.inStock) {
    return res.status(400).json({ error: "Product is out of stock" });
  }

  const existingItem = cartItems.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ ...product, quantity });
  }

  res.status(201).json({ items: cartItems, total: calculateTotal(cartItems) });
});

// PUT /api/cart/:id - update item quantity
router.put("/:id", (req: Request, res: Response) => {
  const { quantity } = req.body as { quantity?: number };

  if (
    quantity === undefined ||
    typeof quantity !== "number" ||
    !Number.isFinite(quantity) ||
    quantity < 1
  ) {
    return res
      .status(400)
      .json({ error: "quantity must be a positive number" });
  }

  const item = cartItems.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  item.quantity = quantity;
  res.json({ items: cartItems, total: calculateTotal(cartItems) });
});

// DELETE /api/cart/:id - remove an item from the cart
router.delete("/:id", (req: Request, res: Response) => {
  const initialLength = cartItems.length;
  cartItems = cartItems.filter((item) => item.id !== req.params.id);

  if (cartItems.length === initialLength) {
    return res.status(404).json({ error: "Item not found in cart" });
  }

  res.json({ items: cartItems, total: calculateTotal(cartItems) });
});

// DELETE /api/cart - clear the entire cart
router.delete("/", (_req: Request, res: Response) => {
  cartItems = [];
  res.json({ items: cartItems, total: 0 });
});

// POST /api/cart/checkout - process checkout
router.post("/checkout", (_req: Request, res: Response) => {
  if (cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const orderId = `ORDER-${Date.now()}`;
  const processedItems = [...cartItems];
  const total = calculateTotal(cartItems);
  cartItems = [];

  res.json({
    success: true,
    orderId,
    items: processedItems,
    total,
  });
});

export { router as cartRouter };

// Exported for test setup/teardown
export const resetCart = (): void => {
  cartItems = [];
};
