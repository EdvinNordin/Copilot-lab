import { beforeEach, describe, expect, it } from "@jest/globals";
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

describe("Products API", () => {
  beforeEach(() => {
    resetProducts();
  });

  describe("GET /api/products", () => {
    it("returns the full product catalogue", async () => {
      const response = await request(app).get("/api/products");

      expect(response.status).toBe(200);
      expect(response.body.products).toHaveLength(initialProducts.length);
      expect(response.body.products[0].name).toBe("Apple");
    });
  });

  describe("GET /api/products/:id", () => {
    it("returns a single product when the id exists", async () => {
      const response = await request(app).get("/api/products/1");

      expect(response.status).toBe(200);
      expect(response.body.product).toMatchObject({
        id: "1",
        name: "Apple",
      });
    });

    it("returns 404 when the product does not exist", async () => {
      const response = await request(app).get("/api/products/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });
  });

  describe("POST /api/products", () => {
    it("returns 400 when name or price is missing", async () => {
      const response = await request(app)
        .post("/api/products")
        .send({ name: "Mango" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("name and price are required");
    });

    it("returns 400 when price is negative", async () => {
      const response = await request(app)
        .post("/api/products")
        .send({ name: "Mango", price: -1 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("price must be a non-negative number");
    });

    it("creates a product with default inStock and empty reviews", async () => {
      const response = await request(app)
        .post("/api/products")
        .send({
          name: "Mango",
          price: 4.99,
          description: "Tropical fruit",
          image: "mango.jpg",
        });

      expect(response.status).toBe(201);
      expect(response.body.product).toMatchObject({
        id: expect.any(String),
        name: "Mango",
        price: 4.99,
        description: "Tropical fruit",
        image: "mango.jpg",
        reviews: [],
        inStock: true,
      });
      expect(products).toHaveLength(initialProducts.length + 1);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("returns 404 when updating a product that does not exist", async () => {
      const response = await request(app)
        .put("/api/products/999")
        .send({ name: "Updated" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });

    it("returns 400 when updating a product with an invalid price", async () => {
      const response = await request(app)
        .put("/api/products/1")
        .send({ price: -2 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("price must be a non-negative number");
    });

    it("updates a product while preserving its id", async () => {
      const response = await request(app)
        .put("/api/products/1")
        .send({ name: "Green Apple", inStock: false });

      expect(response.status).toBe(200);
      expect(response.body.product).toMatchObject({
        id: "1",
        name: "Green Apple",
        inStock: false,
      });
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("returns 404 when deleting a product that does not exist", async () => {
      const response = await request(app).delete("/api/products/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });

    it("deletes an existing product", async () => {
      const response = await request(app).delete("/api/products/1");

      expect(response.status).toBe(204);
      expect(products.find((product) => product.id === "1")).toBeUndefined();
    });
  });
});