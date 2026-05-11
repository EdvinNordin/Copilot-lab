import { Router, Request, Response } from "express";
import { products } from "../data/products";
import { Review } from "../types/types";

const router = Router();

// GET /api/reviews/:productId - get all reviews for a product
router.get("/:productId", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json({ reviews: product.reviews });
});

// POST /api/reviews/:productId - add a review for a product
router.post("/:productId", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const { author, comment } = req.body as { author?: string; comment?: string };

  if (!author || !comment) {
    return res.status(400).json({ error: "author and comment are required" });
  }

  const newReview: Review = {
    author,
    comment,
    date: new Date().toISOString(),
  };

  product.reviews.push(newReview);
  res.status(201).json({ review: newReview });
});

export { router as reviewsRouter };
