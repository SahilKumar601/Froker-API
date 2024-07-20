# Node.js User Registration and Financial Operations API

This is a Node.js application using Express and MongoDB for user registration, login, and financial operations. The application allows users to register, log in, and perform various financial operations.

## Features

- User registration with validation
- User login with authentication
- User profile management
- Financial operations including monthly salary and purchase power management

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/your-db-name
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```sh
   npm start
   ```

### API Endpoints

#### User Schema

```json
{
  "phoneNumber": { "type": "String", "required": true },
  "email": { "type": "String", "required": true },
  "name": { "type": "String", "required": true },
  "dateOfRegistration": { "type": "Date", "default": "Date.now" },
  "dob": { "type": "Date", "required": true },
  "monthlySalary": { "type": "Number", "required": true },
  "status": { "type": "String", "default": "pending" },
  "password": { "type": "String", "required": true },
  "purchasePower": { "type": "Number", "default": 0 }
}
```

#### Example JSON

```json
{
  "phoneNumber": "+1234567890",
  "email": "example@example.com",
  "name": "John Doe",
  "dateOfRegistration": "2024-07-21T00:00:00.000Z",
  "dob": "1990-01-01T00:00:00.000Z",
  "monthlySalary": 35000,
  "status": "pending",
  "password": "securepassword123",
  "purchasePower": 0
}
```

#### User Registration

- **URL:** `/api/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "phoneNumber": "+1234567890",
    "email": "example@example.com",
    "name": "John Doe",
    "dob": "1990-01-01",
    "monthlySalary": 5000,
    "password": "securepassword123"
  }
  ```
-**Postman:**
      <img width="960" alt="signup" src="https://github.com/user-attachments/assets/656a0db5-766f-49fd-9809-eb8074fee643">


#### User Login

- **URL:** `/api/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "example@example.com",
    "password": "securepassword123"
  }
  ```
-**Postman:**
    <img width="960" alt="user-login" src="https://github.com/user-attachments/assets/2f97a7ab-2740-4f50-ba1d-44a01c760f8c">

#### Get User info

- **URL:** `/api/user`
- **Method:** `GET`
- **Headers:**
  ```json
  {
      "x-authorization":eyJhbGciOiJ......---F-nUlEMLOZ9hC6OmfXe6q0LGo
  }
  ```
-**Postman:**
    <img width="960" alt="user" src="https://github.com/user-attachments/assets/b6ec4c9a-6270-4f54-a041-b036b36cc82b">

#### Borrowing Money

- **URL:** `/api/borrow`
- **Method:** `POST`
- **Headers:**
  ```object
  {
      "x-authorization":eyJhbGciOiJ......---F-nUlEMLOZ9hC6OmfXe6q0LGo
  }
  ```
  - **Request Body:**
  ```json
    {
        "amount":5000,
        "tenure":4000
    }
  ```
-**Postman:**
    <img width="960" alt="borrow_req" src="https://github.com/user-attachments/assets/c9292434-ce31-4722-a675-97b5a25467dd">

    
