# Node.js E-Commerce API

An advanced e-commerce REST API built with Node.js and MongoDB, featuring comprehensive product, user, and order management.

## Overview

A feature-rich e-commerce backend API with user authentication, product catalog management, brand and category organization, coupon system, and email notifications.

## Features

- **User Management** — Registration, login, JWT authentication, refresh tokens
- **Product Catalog** — CRUD operations with categories and brands
- **Coupon System** — Create and apply discount coupons
- **Email Notifications** — Automated email sending
- **Brand Management** — Organize products by brand
- **Product Categories** — Category-based product organization

## Tech Stack

- **Node.js** + **Express** — Backend framework
- **MongoDB** + **Mongoose** — Database
- **JWT** — Authentication
- **Nodemailer** — Email service

## Getting Started

```bash
git clone https://github.com/okekefrancis112/NodeJs_Ecommerce_API.git
cd NodeJs_Ecommerce_API
npm install
# Configure .env with MongoDB URI and JWT secret
npm start
```

## API Endpoints

| Module | Endpoints |
|--------|-----------|
| **Users** | Register, login, profile management |
| **Products** | CRUD, search, filter |
| **Categories** | Create, list, update, delete |
| **Brands** | Create, list, update, delete |
| **Coupons** | Create, apply, manage discounts |

## Project Structure

```
├── config/
│   ├── dbConnect.js         # MongoDB connection
│   ├── jwtToken.js          # JWT helper
│   └── refreshtoken.js      # Refresh token logic
├── controller/
│   ├── userCtrl.js          # User operations
│   ├── productCtrl.js       # Product operations
│   ├── brandCtrl.js         # Brand management
│   ├── couponCtrl.js        # Coupon management
│   ├── productCategoryCtrl.js
│   └── emailCtrl.js         # Email sending
├── models/                  # Mongoose models
├── routes/                  # Express routes
├── middlewares/              # Auth & error handling
└── index.js                 # Entry point
```

## License

MIT
