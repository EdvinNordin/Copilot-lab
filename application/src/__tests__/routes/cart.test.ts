import request from "supertest";
import app from "../../app";
import { resetCart } from "../../routes/cart";

// Named constants for product IDs to avoid magic strings in tests
const PRODUCT_IN_STOCK = "1";       // Apple, £1.99
const PRODUCT_IN_STOCK_2 = "2";     // Grapes, £3.49
const PRODUCT_OUT_OF_STOCK = "4";   // Pear
const PRODUCT_NONEXISTENT = "999";

describe("Cart API", () => {
  beforeEach(() => {
    resetCart();
  });

  describe("GET /api/cart", () => {
    it("returns an empty cart with zero total when no items have been added", async () => {
      // Act
      const response = await request(app).get("/api/cart");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual([]);
      expect(response.body.total).toBe(0);
    });
  });

  describe("POST /api/cart", () => {
    it("adds an in-stock product and returns the updated cart", async () => {
      // Act
      const response = await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 1 });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].name).toBe("Apple");
      expect(response.body.items[0].quantity).toBe(1);
    });

    it("increments quantity when the same product is added a second time", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 1 });

      // Act
      const response = await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 2 });

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].quantity).toBe(3);
    });

    it("returns 400 when productId is missing from the request body", async () => {
      // Act
      const response = await request(app)
        .post("/api/cart")
        .send({ quantity: 1 });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("productId is required");
    });

    it("returns 404 when the given productId does not match any product", async () => {
      // Act
      const response = await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_NONEXISTENT, quantity: 1 });

      // Assert
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Product not found");
    });

    it("returns 400 when the product is out of stock", async () => {
      // Act
      const response = await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_OUT_OF_STOCK, quantity: 1 });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Product is out of stock");
    });

    it("returns 400 when quantity is zero", async () => {
      // Act
      const response = await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 0 });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("quantity must be a positive number");
    });
  });

  describe("PUT /api/cart/:id", () => {
    it("updates the quantity of an existing cart item", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 1 });

      // Act
      const response = await request(app)
        .put(`/api/cart/${PRODUCT_IN_STOCK}`)
        .send({ quantity: 5 });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.items[0].quantity).toBe(5);
    });

    it("returns 404 when the item to update is not in the cart", async () => {
      // Act
      const response = await request(app)
        .put(`/api/cart/${PRODUCT_NONEXISTENT}`)
        .send({ quantity: 2 });

      // Assert
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Item not found in cart");
    });

    it("returns 400 when the new quantity is a negative number", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 1 });

      // Act
      const response = await request(app)
        .put(`/api/cart/${PRODUCT_IN_STOCK}`)
        .send({ quantity: -1 });

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("quantity must be a positive number");
    });
  });

  describe("DELETE /api/cart/:id", () => {
    it("removes the specified item from the cart", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 1 });

      // Act
      const response = await request(app).delete(`/api/cart/${PRODUCT_IN_STOCK}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(0);
    });

    it("returns 404 when the item to delete is not in the cart", async () => {
      // Act
      const response = await request(app).delete(`/api/cart/${PRODUCT_NONEXISTENT}`);

      // Assert
      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Item not found in cart");
    });
  });

  describe("DELETE /api/cart", () => {
    it("removes all items and resets the total to zero", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 1 });
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK_2, quantity: 2 });

      // Act
      const response = await request(app).delete("/api/cart");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.items).toEqual([]);
      expect(response.body.total).toBe(0);
    });
  });

  describe("POST /api/cart/checkout", () => {
    it("returns a successful order with the correct items and total", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 2 });

      // Act
      const response = await request(app).post("/api/cart/checkout");

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.orderId).toMatch(/^ORDER-/);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.total).toBeCloseTo(3.98);
    });

    it("clears the cart after a successful checkout", async () => {
      // Arrange
      await request(app)
        .post("/api/cart")
        .send({ productId: PRODUCT_IN_STOCK, quantity: 2 });
      await request(app).post("/api/cart/checkout");

      // Act
      const cartResponse = await request(app).get("/api/cart");

      // Assert
      expect(cartResponse.body.items).toEqual([]);
    });

    it("returns 400 when attempting to checkout with an empty cart", async () => {
      // Act
      const response = await request(app).post("/api/cart/checkout");

      // Assert
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Cart is empty");
    });
  });
});
