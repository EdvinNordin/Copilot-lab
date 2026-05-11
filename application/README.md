# 🍎 The Daily Harvest API

A TypeScript/Node.js REST API for **The Daily Harvest** fruit e-commerce platform.

## Tech Stack

| Category     | Technology      |
| ------------ | --------------- |
| **Runtime**  | Node.js         |
| **Language** | TypeScript      |
| **Framework**| Express.js      |
| **Testing**  | Jest + Supertest |
| **Linting**  | ESLint          |

## Getting Started

```bash
cd application
npm install
npm run dev
```

The API will be available at `http://localhost:3000`.

## API Endpoints

### Products

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/products     | List all products    |
| GET    | /api/products/:id | Get a single product |
| POST   | /api/products     | Add a new product    |
| PUT    | /api/products/:id | Update a product     |
| DELETE | /api/products/:id | Delete a product     |

### Cart

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | /api/cart          | View cart contents    |
| POST   | /api/cart          | Add item to cart      |
| PUT    | /api/cart/:id      | Update item quantity  |
| DELETE | /api/cart/:id      | Remove item from cart |
| DELETE | /api/cart          | Clear the entire cart |
| POST   | /api/cart/checkout | Process checkout      |

### Authentication

| Method | Endpoint           | Description     |
| ------ | ------------------ | --------------- |
| POST   | /api/auth/register | Register a user |
| POST   | /api/auth/login    | Log in a user   |

### Reviews

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | /api/reviews/:productId | Get reviews for a product  |
| POST   | /api/reviews/:productId | Add a review for a product |

## Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Start compiled production server
npm run lint         # Run ESLint
npm test             # Run tests
npm run test:run     # Run tests (passWithNoTests)
npm run test:coverage # Run tests with coverage report
```

## Project Structure

```
application/
├── src/
│   ├── routes/          # Route handlers (products, cart, auth, reviews)
│   ├── types/           # TypeScript interfaces and types
│   ├── utils/           # Utility functions (formatPrice, calculateTotal, etc.)
│   ├── data/            # In-memory data (products)
│   ├── __tests__/       # Test files
│   │   └── routes/      # Route-level tests
│   ├── app.ts           # Express application setup
│   └── server.ts        # Server entry point
├── package.json
├── tsconfig.json
└── jest.config.js
```
