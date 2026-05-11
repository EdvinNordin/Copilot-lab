import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateEmail } from "../utils/helpers";
import { User } from "../types/types";

const router = Router();
const SALT_ROUNDS = 12;

// In-memory user storage
const users: User[] = [];
let userIdCounter = 1;

// POST /api/auth/register - register a new user
router.post("/register", async (req: Request, res: Response) => {
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

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser: User = {
    id: String(userIdCounter++),
    name,
    email,
    passwordHash,
  };

  users.push(newUser);

  // Never return the passwordHash in the response
  res.status(201).json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

// POST /api/auth/login - log in a user
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const user = users.find((u) => u.email === email);

  // Use bcrypt.compare even when user is not found (via a dummy hash) to prevent
  // timing-based user enumeration attacks
  const dummyHash = "$2b$12$invalidhashfortimingprotectiononly000000000000000000000";
  const hashToCompare = user?.passwordHash ?? dummyHash;
  const passwordMatch = await bcrypt.compare(password, hashToCompare);

  if (!user || !passwordMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // TODO: issue a signed JWT here instead of returning a plain userId
  res.json({ message: "Login successful", userId: user.id });
});

export { router as authRouter };
