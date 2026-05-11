import { Router, Request, Response } from "express";
import { products } from "../data/products";
import { Product } from "../types/types";

const router = Router();
let productIdCounter = products.length + 1;

// GET /api/products - list all products
router.get("/", (_req: Request, res: Response) => {
  res.json({ products });
});

// GET /api/products/:id - get a single product
router.get("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ product });
});

// POST /api/products - add a new product
router.post("/", (req: Request, res: Response) => {
  const { name, price, description, image, inStock } =
    req.body as Partial<Product>;

  if (!name || price === undefined) {
    return res.status(400).json({ error: "name and price are required" });
  }

  if (typeof price !== "number" || price < 0) {
    return res
      .status(400)
      .json({ error: "price must be a non-negative number" });
  }

  const newProduct: Product = {
    id: String(productIdCounter++),
    name,
    price,
    description,
    image,
    reviews: [],
    inStock: inStock ?? true,
  };

  products.push(newProduct);
  res.status(201).json({ product: newProduct });
});

// PUT /api/products/:id - update a product
router.put("/:id", (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const updates = req.body as Partial<Product>;
  if (
    updates.price !== undefined &&
    (typeof updates.price !== "number" || updates.price < 0)
  ) {
    return res
      .status(400)
      .json({ error: "price must be a non-negative number" });
  }

  products[index] = { ...products[index], ...updates, id: products[index].id };
  res.json({ product: products[index] });
});

// DELETE /api/products/:id - delete a product
router.delete("/:id", (req: Request, res: Response) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products.splice(index, 1);
  res.status(204).send();
});

export { router as productsRouter };
