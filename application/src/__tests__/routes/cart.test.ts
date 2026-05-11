import request from "supertest";
import app from "../../app";
import { resetCart } from "../../routes/cart";

describe("Cart API", () => {
  beforeEach(() => {
    resetCart();
  });

  it("returns an empty cart initially", async () => {
    const response = await request(app).get("/api/cart");

    expect(response.status).toBe(200);
    expect(response.body.items).toEqual([]);
    expect(response.body.total).toBe(0);
  });

  it("adds an item to the cart", async () => {
    const response = await request(app)
      .post("/api/cart")
      .send({ productId: "1", quantity: 1 });

    expect(response.status).toBe(201);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("Apple");
    expect(response.body.items[0].quantity).toBe(1);
  });
});
