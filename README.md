# Basic CRUD App — Backend (Node.js / Express / MongoDB)

A **real-world backend API** built with Node.js, Express, and MongoDB. This project goes beyond a toy CRUD example and demonstrates authentication, file uploads, role-based routes, and integration-ready payment services.

This repository is intentionally practical: clear structure, real dependencies, and patterns you would actually see in a junior backend role.

---

## What this project is

This backend powers a simple e-commerce / course-style system with:

* Users & authentication
* Products
* Courses
* Admin-level actions
* File uploads

It is designed to show how to structure a Node.js backend using **Express + Mongoose**, with middleware, controllers, and routes separated cleanly.

---

## Tech Stack (actual, from the code)

**Runtime & Framework**

* Node.js (ES Modules)
* Express.js

**Database**

* MongoDB Atlas
* Mongoose ODM

**Authentication & Security**

* bcrypt (password hashing)
* JSON Web Tokens (JWT)

**Middleware & Utilities**

* cors
* dotenv
* multer (file uploads)
* uuid

**Email (integration-ready)**

* nodemailer
  

**Dev Tools**

* nodemon
* prettier

---

## Project Structure

```
server/
├── controllers/        # Business logic for each resource
├── middlewares/        # Auth & request middlewares
├── models/             # Mongoose schemas
├── routes/             # Express route definitions
├── uploads/            # Uploaded files (served statically)
├── index.js            # App entry point
├── package.json
```

This follows a **controller–route–model** separation to keep the code readable and maintainable.

---

## API Overview

### Base URL

```
http://localhost:3000
```

### Routes

**Users & Auth**

* `POST /api/register`
* `POST /api/login`
* `GET /api/profile` (protected)

**Products**

* `GET /api/products`
* `POST /api/products`
* `PUT /api/products/:id`
* `DELETE /api/products/:id`

**Courses**

* `GET /api/courses`
* `POST /api/courses`
* `PUT /api/courses/:id`
* `DELETE /api/courses/:id`

**Admin**

* Admin-specific routes protected by middleware

> All protected routes use JWT-based authentication.

---

## Middleware & Key Concepts

* **JWT Auth Middleware** — protects private routes
* **Password hashing** using bcrypt
* **File uploads** handled via multer and served from `/uploads`
* **Centralized routing** with modular route files
* **Environment variables** via dotenv

---

## Environment Variables

Create a `.env` file in `server/`:

```
MONGO_PASSWORD=your_mongodb_password
JWT_SECRET=your_jwt_secret
```

MongoDB connection uses MongoDB Atlas:

```
mongodb+srv://admin:<password>@crud-database.../Node-API
```

---

## Running the Project Locally

```bash
cd server
npm install
npm run dev
```

Server will start on:

```
http://localhost:3000
```

---

## project features   

This project demonstrates:

* Real authentication flow (not mocked)
* Proper backend folder structure
* Secure password handling
* MongoDB schema design with Mongoose
* Middleware-based authorization
* Readiness for real integrations

It is intentionally **simple but realistic**, focusing on backend fundamentals rather than overengineering.

---

## Possible Improvements

* Add role-based access control (RBAC)
* Add request validation (Joi / Zod)
* Add centralized error handler
* Add tests (Jest + Supertest)
* Add Swagger (OpenAPI) documentation
* Dockerize the backend

---

## Author

**Yousef Samir Saadeldin**
Computer Science (software engineer ) graduate focused on backend development. This project reflects my understanding of real backend workflows using Node.js, Express, and MongoDB.

---

## License

ISC
