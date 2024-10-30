# CourseSellingApplication-Backend
Course Selling backend with various functionality

The **CourseSelling-Backend** is a Node.js-powered backend server for an online course selling platform. This backend manages user registration and login, course management, and administrative controls, with secure authentication through JWT.

## Overview

This project features:
- **User Authentication** - Secure JWT-based authentication for users and admin.
- **Role-based Access Control** - Access control differentiating between regular users and administrators.
- **Course Management** - Admins can create, update, or delete courses, while users can browse and enroll in courses.

## Project Structure

- **`index.js`** - Initializes database connection, defines route handlers, and starts the server.
- **`Routers/`** - Includes routers for handling User, Admin, and Course operations.
- **`Models/`** - Defines MongoDB models for users, courses, and potentially other entities.

## Key Functionalities

### User Management
1. **User Registration & Login**
   - **Users** can register, log in, and access their profiles.
   - JWT tokens are issued upon successful login to ensure secure access to the backend.
   
2. **User Role Distinction**
   - **Regular Users** have access to course browsing and enrollment.
   - **Admins** have higher privileges, such as course creation and management.

### Course Management
1. **Course Browsing**
   - Available to all registered users, allowing them to view the list of courses offered.
   
2. **Course Enrollment**
   - Users can enroll in courses through the `/Course` route.

3. **Admin Course Control**
   - Admins can **create**, **update**, or **delete** courses via the `/Admin` route.

### JWT Authentication
- **JWT (JSON Web Token)** is used for secure, stateless user authentication.
- Tokens are issued upon user login and validated for subsequent requests to protected routes.

## Routing Structure

1. **User Routes (`/Users`)**
   - **POST** `/register` - Registers a new user with details such as username, email, and password.
   - **POST** `/login` - Logs in a user and returns a JWT token.
   - **GET** `/profile` - Retrieves user profile information.
   - **Protected Routes** - Only accessible to authenticated users with valid JWT tokens.

2. **Admin Routes (`/Admin`)**
   - **POST** `/addCourse` - Admins can add new courses with details such as title, description, price, and content.
   - **PUT** `/updateCourse/:id` - Updates course details by course ID.
   - **DELETE** `/deleteCourse/:id` - Deletes a course by course ID.
   - **Admin-Only Access** - Accessible only to authenticated users with admin privileges.

3. **Course Routes (`/Course`)**
   - **GET** `/list` - Retrieves a list of all available courses.
   - **GET** `/details/:id` - Gets detailed information for a specific course by ID.
   - **POST** `/enroll/:id` - Allows a user to enroll in a specific course by ID.
   - **User Access** - Accessible to all authenticated users.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
