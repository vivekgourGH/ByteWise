# CabConnect Backend Authentication Service

A complete authentication system built with Spring Boot, JWT, and MySQL.

## Features

- User Registration (Signup)
- User Authentication (Signin)
- JWT Token-based Authentication
- Role-based Access Control (USER, ADMIN, DRIVER)
- Password Encryption using BCrypt
- MySQL Database Integration
- CORS Support

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

## Setup Instructions

### 1. Database Setup

Create a MySQL database named `cabconnect_db`:

```sql
CREATE DATABASE cabconnect_db;
```

### 2. Configuration

Update the database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully!"
}
```

#### POST /api/auth/signin
Authenticate a user and get JWT token.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "USER"
}
```

### Test Endpoints

#### GET /api/test/all
Public endpoint - no authentication required.

#### GET /api/test/user
Requires authentication (USER, ADMIN, or DRIVER role).

#### GET /api/test/admin
Requires ADMIN role.

#### GET /api/test/driver
Requires DRIVER role.

## Usage Examples

### 1. Register a New User

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### 2. Sign In

```bash
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

### 3. Access Protected Endpoint

```bash
curl -X GET http://localhost:8080/api/test/user \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Schema

The application automatically creates the following table:

### users
- `id` (BIGINT, Primary Key, Auto Increment)
- `username` (VARCHAR(50), Unique)
- `email` (VARCHAR(100), Unique)
- `password` (VARCHAR(100), Encrypted)
- `first_name` (VARCHAR(100))
- `last_name` (VARCHAR(100))
- `phone_number` (VARCHAR(20))
- `role` (ENUM: USER, ADMIN, DRIVER)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)
- `is_enabled` (BOOLEAN)

## Security Features

- JWT tokens with configurable expiration (default: 24 hours)
- Password encryption using BCrypt
- Role-based access control
- CORS configuration for cross-origin requests
- Input validation using Bean Validation

## Configuration

Key configuration properties in `application.properties`:

- `jwt.secret`: Secret key for JWT token signing
- `jwt.expiration`: Token expiration time in milliseconds
- `spring.datasource.*`: Database connection properties
- `spring.jpa.hibernate.ddl-auto`: Database schema management

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid input or validation errors
- `401 Unauthorized`: Invalid credentials or missing token
- `403 Forbidden`: Insufficient permissions
- `500 Internal Server Error`: Server-side errors

