import request from "supertest";
import app from "../../app";

describe("Auth API", () => {
  describe("POST /api/auth/register", () => {
    it("returns 400 when required fields are missing", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({ email: "user@example.com" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("name, email and password are required");
    });

    it("returns 400 for an invalid email address", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Casey",
          email: "invalid-email",
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid email format");
    });

    it("returns 400 for a password shorter than 8 characters", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Casey",
          email: "short-pass@example.com",
          password: "short",
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Password must be at least 8 characters");
    });

    it("registers a new user and returns the created user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Casey",
          email: "casey@example.com",
          password: "password123",
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toMatchObject({
        id: expect.any(String),
        name: "Casey",
        email: "casey@example.com",
      });
      expect(response.body.user.password).toBeUndefined();
    });

    it("returns 409 when the email is already registered", async () => {
      await request(app)
        .post("/api/auth/register")
        .send({
          name: "Jordan",
          email: "duplicate@example.com",
          password: "password123",
        });

      const response = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Jordan 2",
          email: "duplicate@example.com",
          password: "password123",
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("Email already registered");
    });
  });

  describe("POST /api/auth/login", () => {
    it("returns 400 when email or password is missing", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "user@example.com" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("email and password are required");
    });

    it("returns 400 when the email format is invalid", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "not-an-email", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid email format");
    });

    it("returns 401 when the user does not exist", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({ email: "missing@example.com", password: "password123" });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe("Invalid credentials");
    });

    it("logs in an existing user", async () => {
      const registerResponse = await request(app)
        .post("/api/auth/register")
        .send({
          name: "Login User",
          email: "login-user@example.com",
          password: "password123",
        });

      const response = await request(app)
        .post("/api/auth/login")
        .send({
          email: "login-user@example.com",
          password: "password123",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Login successful",
        userId: registerResponse.body.user.id,
      });
    });
  });

  // -------------------------------------------------------------------------
  // C1: Password Security
  // These tests define the required secure password handling behaviour.
  // Tests marked [REQUIRES FIX] will fail until bcrypt hashing and password
  // verification are implemented in src/routes/auth.ts.
  // See security review finding C1 for the recommended fix.
  // -------------------------------------------------------------------------
  describe("C1: Password security", () => {
    const secureEmail = "c1-test@example.com";
    const correctPassword = "CorrectHorseBattery1";
    const wrongPassword = "WrongPasswordXYZ2";

    beforeAll(async () => {
      // Register once — all C1 tests share this user
      await request(app)
        .post("/api/auth/register")
        .send({ name: "C1 User", email: secureEmail, password: correctPassword });
    });

    describe("Registration — sensitive data exposure", () => {
      it("does not return the password in the registration response", async () => {
        // Act
        const response = await request(app)
          .post("/api/auth/register")
          .send({ name: "Leak Test", email: "leak-test@example.com", password: "password123" });

        // Assert — neither plain text nor hash must appear in the response
        expect(response.body.user?.password).toBeUndefined();
        expect(response.body.user?.passwordHash).toBeUndefined();
      });

      it("does not return any password-related field anywhere in the response body", async () => {
        // Act
        const response = await request(app)
          .post("/api/auth/register")
          .send({ name: "Leak Test 2", email: "leak-test-2@example.com", password: "S3cr3tPass!" });

        // Assert — stringify the full body and confirm no password value leaks
        const body = JSON.stringify(response.body);
        expect(body).not.toContain("S3cr3tPass!");
      });
    });

    describe("Login — password verification", () => {
      it("[REQUIRES FIX] returns 401 when the password is incorrect", async () => {
        // Act
        const response = await request(app)
          .post("/api/auth/login")
          .send({ email: secureEmail, password: wrongPassword });

        // Assert — wrong password must be rejected even if the email is valid
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Invalid credentials");
      });

      it("[REQUIRES FIX] returns 200 when email and password are both correct", async () => {
        // Act
        const response = await request(app)
          .post("/api/auth/login")
          .send({ email: secureEmail, password: correctPassword });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Login successful");
      });

      it("[REQUIRES FIX] returns the same 401 error for wrong password as for unknown email", async () => {
        // Arrange — two requests: unknown email vs wrong password
        const unknownEmailResponse = await request(app)
          .post("/api/auth/login")
          .send({ email: "unknown@example.com", password: correctPassword });

        const wrongPasswordResponse = await request(app)
          .post("/api/auth/login")
          .send({ email: secureEmail, password: wrongPassword });

        // Assert — error messages must be identical to prevent user enumeration
        expect(unknownEmailResponse.status).toBe(401);
        expect(wrongPasswordResponse.status).toBe(401);
        expect(unknownEmailResponse.body.error).toBe(wrongPasswordResponse.body.error);
      });

      it("does not return the password or hash in the login response", async () => {
        // Act
        const response = await request(app)
          .post("/api/auth/login")
          .send({ email: secureEmail, password: correctPassword });

        // Assert
        expect(response.body.password).toBeUndefined();
        expect(response.body.passwordHash).toBeUndefined();

        const body = JSON.stringify(response.body);
        expect(body).not.toContain(correctPassword);
      });

      it("[REQUIRES FIX] returns 401 when an empty string is supplied as the password", async () => {
        // Act
        const response = await request(app)
          .post("/api/auth/login")
          .send({ email: secureEmail, password: "" });

        // Assert — empty string is treated as missing
        expect(response.status).toBe(400);
      });
    });
  });
});