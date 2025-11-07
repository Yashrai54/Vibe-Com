# Vibe-Com

**Description:**  
This project implements a shopping cart and checkout system for an e-commerce application using MongoDB, Mongoose, Express, and React. It integrates products from the FakeStore API and allows users to manage their cart in real-time.

---

## Features
- **Add to Cart**: Users can add products from the product listing to their cart.
- **Update Quantity**: Increase or decrease product quantity directly in the cart.

- **Remove Items**: Delete individual products from the cart.

- **Cart Summary**: View itemized totals including subtotal, quantity, and price.

- **Checkout**: Processes cart items, calculates the total price from the API, creates an order object, and clears the cart.

- **Persistent Cart**: Stores cart per user in MongoDB, allowing session continuity.

- **Error Handling**: Handles empty carts, invalid requests, and API failures gracefully.

---

## Tech Stack
- Backend: Node.js, Express, Mongoose, Axios

- Frontend: React, React Router, Tailwind CSS, React Toastify

- Products: Fetched dynamically from FakeStore API

- Concurrency-safe cart clearing using atomic MongoDB operations to prevent versioning errors 

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Install Dependencies :
   ```bash
   npm install
   ```
3. Set up MongoDB and environment variables (.env) 
 ```bash
 MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

4. Start the server:
   ```bash
   node index.js
   ```
5. ```bash
   cd ../frontend
   npm install
   ```
6. ```bash
   npm run dev
   ```
7. Open http://localhost:5173 on your browser.

## Usage

- Browse the list of products fetched from the FakeStore API.
- Use the search bar to filter products by name.
- Click the “Add to Cart” button on a product to add it to your cart.
- Click the “Go to Cart” button in the header or on the homepage.
- Remove an item by clicking the Remove button.
- Click Proceed to Checkout to place an order.
- Use the Continue Shopping button to return to the products page.

