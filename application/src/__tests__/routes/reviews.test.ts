import request from "supertest";
import app from "../../app";
import { products } from "../../data/products";

const initialProducts = products.map((product) => ({
  ...product,
  reviews: product.reviews.map((review) => ({ ...review })),
}));

const resetProducts = (): void => {
  products.splice(
    0,
    products.length,
    ...initialProducts.map((product) => ({
      ...product,
      reviews: product.reviews.map((review) => ({ ...review })),
    })),
  );
};

describe("Reviews API", () => {
  beforeEach(() => {
    resetProducts();
  });

  describe("GET /api/reviews/:productId", () => {
    it("returns reviews for an existing product", async () => {
      products[0].reviews.push({
        author: "Sam",
        comment: "Great apples",
        date: "2024-01-01T00:00:00.000Z",
      });

      const response = await request(app).get("/api/reviews/1");

      expect(response.status).toBe(200);
      expect(response.body.reviews).toEqual(products[0].reviews);
    });

    it("returns 404 when the product does not exist", async () => {
      const response = await request(app).get("/api/reviews/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });
  });

  describe("POST /api/reviews/:productId", () => {
    it("returns 404 when adding a review to a missing product", async () => {
      const response = await request(app)
        .post("/api/reviews/999")
        .send({ author: "Sam", comment: "Great" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });

    it("returns 400 when author or comment is missing", async () => {
      const response = await request(app)
        .post("/api/reviews/1")
        .send({ author: "Sam" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("author and comment are required");
    });

    it("adds a review to an existing product", async () => {
      const response = await request(app)
        .post("/api/reviews/1")
        .send({ author: "Sam", comment: "Great apples" });

      expect(response.status).toBe(201);
      expect(response.body.review).toMatchObject({
        author: "Sam",
        comment: "Great apples",
      });
      expect(response.body.review.date).toEqual(expect.any(String));
      expect(products[0].reviews).toHaveLength(1);
    });
  });
});