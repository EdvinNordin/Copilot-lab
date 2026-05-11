import request from "supertest";
import app from "../app";

describe("App", () => {
  describe("GET /health", () => {
    it("returns an ok health status", async () => {
      const response = await request(app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "ok" });
    });
  });
});