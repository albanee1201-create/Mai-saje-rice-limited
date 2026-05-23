# Backend API Documentation

## MAI - SAJE LIMITED REST API v1.0

### Base URL
```
Production: https://api.mai-saje.com/v1
Development: http://localhost:5000/v1
```

### Authentication
All endpoints (except auth) require JWT token in header:
```
Authorization: Bearer <jwt_token>
```

---

## 📋 Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+2348012345678",
  "userType": "customer"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "customer",
    "createdAt": "2024-05-23T10:00:00Z"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response (200):
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "userType": "customer"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "expiresIn": 86400
}
```

### Refresh Token
```
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}

Response (200):
{
  "success": true,
  "accessToken": "eyJhbGc...",
  "expiresIn": 86400
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <jwt_token>

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 📦 Products Endpoints

### Get All Products
```
GET /products?page=1&limit=10&category=parboiled&sortBy=price&order=asc

Query Parameters:
- page (default: 1)
- limit (default: 10, max: 100)
- category (optional)
- sortBy (default: createdAt)
- order (asc/desc)
- search (optional)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Premium Parboiled Rice",
      "sku": "PR-001",
      "description": "High-quality parboiled rice",
      "category": "parboiled",
      "price": 5500,
      "currency": "NGN",
      "packages": [
        {
          "size": "5kg",
          "price": 2750,
          "stock": 1000
        },
        {
          "size": "10kg",
          "price": 5000,
          "stock": 500
        },
        {
          "size": "25kg",
          "price": 12000,
          "stock": 200
        },
        {
          "size": "50kg",
          "price": 22000,
          "stock": 50
        }
      ],
      "rating": 4.8,
      "reviews": 245,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

### Get Product by ID
```
GET /products/:id

Response (200):
{
  "success": true,
  "data": { /* product object */ }
}
```

### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Premium Parboiled Rice",
  "sku": "PR-001",
  "description": "High-quality parboiled rice",
  "category": "parboiled",
  "basePrice": 5500,
  "packages": [
    {
      "size": "5kg",
      "price": 2750,
      "stock": 1000
    }
  ]
}

Response (201):
{
  "success": true,
  "data": { /* created product */ }
}
```

---

## 🛒 Orders Endpoints

### Create Order
```
POST /orders
Authorization: Bearer <customer_token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "uuid",
      "packageSize": "10kg",
      "quantity": 5,
      "price": 5000
    }
  ],
  "shippingAddress": {
    "street": "123 Main Street",
    "city": "Lagos",
    "state": "Lagos",
    "postalCode": "100001",
    "country": "Nigeria"
  },
  "notes": "Please handle with care"
}

Response (201):
{
  "success": true,
  "data": {
    "id": "ORD-20240523-001",
    "customerId": "uuid",
    "items": [ /* order items */ ],
    "subtotal": 25000,
    "shippingCost": 2000,
    "tax": 2500,
    "total": 29500,
    "status": "pending",
    "createdAt": "2024-05-23T10:00:00Z"
  }
}
```

### Get My Orders
```
GET /orders?page=1&limit=10&status=pending
Authorization: Bearer <customer_token>

Response (200):
{
  "success": true,
  "data": [ /* array of orders */ ],
  "pagination": { /* pagination info */ }
}
```

### Get Order by ID
```
GET /orders/:orderId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": { /* order details */ }
}
```

### Update Order Status (Admin/Staff)
```
PUT /orders/:orderId/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "processing"
}

Response (200):
{
  "success": true,
  "data": { /* updated order */ }
}
```

---

## 💳 Payments Endpoints

### Initialize Payment
```
POST /payments/initialize
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "ORD-20240523-001",
  "amount": 29500,
  "paymentMethod": "paystack"
}

Response (200):
{
  "success": true,
  "data": {
    "reference": "PAY-20240523-001",
    "authorizationUrl": "https://checkout.paystack.com/...",
    "accessCode": "dvz985hv1r"
  }
}
```

### Verify Payment
```
POST /payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "reference": "PAY-20240523-001"
}

Response (200):
{
  "success": true,
  "data": {
    "status": "success",
    "amount": 29500,
    "orderId": "ORD-20240523-001",
    "transactionId": "trans_123456"
  }
}
```

---

## 📊 Analytics Endpoints

### Sales Analytics
```
GET /analytics/sales?period=month&startDate=2024-05-01&endDate=2024-05-31
Authorization: Bearer <admin_token>

Response (200):
{
  "success": true,
  "data": {
    "totalSales": 5000000,
    "totalOrders": 200,
    "averageOrderValue": 25000,
    "dailySales": [ /* daily breakdown */ ],
    "topProducts": [ /* best sellers */ ],
    "topCustomers": [ /* best customers */ ]
  }
}
```

### Revenue Analytics
```
GET /analytics/revenue?period=quarter&year=2024
Authorization: Bearer <admin_token>

Response (200):
{
  "success": true,
  "data": {
    "totalRevenue": 15000000,
    "grossProfit": 4500000,
    "netProfit": 3000000,
    "expenseBreakdown": { /* cost analysis */ },
    "projections": { /* forecast */ }
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required or token invalid"
  }
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You don't have permission to access this resource"
  }
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

---

**Last Updated**: May 2024
**API Version**: 1.0.0
**Contact**: api-support@mai-saje.com
