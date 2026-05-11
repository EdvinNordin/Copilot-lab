import {
  calculateTotal,
  formatPrice,
  validateEmail,
} from "../../utils/helpers";

describe("Helper utilities", () => {
  describe("formatPrice", () => {
    it("formats a number as USD currency", () => {
      expect(formatPrice(12.5)).toBe("$12.50");
    });
  });

  describe("calculateTotal", () => {
    it("returns zero for an empty cart", () => {
      expect(calculateTotal([])).toBe(0);
    });

    it("sums price multiplied by quantity for all items", () => {
      expect(
        calculateTotal([
          { price: 1.99, quantity: 2 },
          { price: 3.5, quantity: 1 },
        ]),
      ).toBeCloseTo(7.48);
    });
  });

  describe("validateEmail", () => {
    it("returns true for a valid email address", () => {
      expect(validateEmail("user@example.com")).toBe(true);
    });

    it("returns false for an invalid email address", () => {
      expect(validateEmail("invalid-email")).toBe(false);
    });
  });
});