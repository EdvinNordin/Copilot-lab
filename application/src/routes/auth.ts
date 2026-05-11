import { Router, Request, Response } from "express";
import { validateEmail } from "../utils/helpers";
import { User } from "../types/types";

const router = Router();

// In-memory user storage
const users: User[] = [];
let userIdCounter = 1;

// POST /api/auth/register - register a new user
router.post("/register", (req: Request, res: Response) => {
  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "name, email and password are required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: "Email already registered" });
  }

  // In a real application, always hash passwords before storing (e.g. using bcrypt)
  const newUser: User = {
    id: String(userIdCounter++),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({ user: newUser });
});

// POST /api/auth/login - log in a user
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // In a real application, compare hashed passwords and issue a JWT
  res.json({ message: "Login successful", userId: user.id });
});

export { router as authRouter };
