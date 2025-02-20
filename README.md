# Profile Management System

A full-stack mini project built to understand and demonstrate the development of a MERN (MongoDB, Express, React, Node.js) framework application using React (with Vite & TypeScript), Node.js, and Express. This project focuses on managing user profiles and their documents through a modern UI and RESTful APIs.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

---

## Overview

The **Profile Management System** is designed as a learning project to explore the MERN stack using modern tools and libraries. The application consists of three main pages:

1. **User Profile List** – Perform CRUD (Create, Read, Update, Delete) operations on user profiles stored in MongoDB Atlas.
2. **User Document List** – Display and manage documents uploaded by users. This grid view allows for document deletion and downloading.
3. **Document Upload** – Upload new documents from your system. Files are handled by the backend using Multer and stored locally on the server’s filesystem.

The frontend communicates with the backend via Axios, while the backend handles data operations and file management using Express, Node.js, and MongoDB Atlas.

---

## Features

- **User Profile Management**
  - Create, read, update, and delete user profiles.
  - Data stored in a cloud MongoDB Atlas database.
  - Uses Axios for seamless API communication.

- **Document Management**
  - Upload documents via a dedicated page.
  - List uploaded documents with options to delete or download.
  - Files are uploaded using Multer and managed on the local filesystem.

- **Modern UI**
  - Built with React and styled using Material UI.
  - Utilizes MUI DataGrid Pro for efficient and feature-rich grid views.
  - Responsive design for optimal usability across devices.

- **Backend API**
  - RESTful API design using Express.
  - Robust routing and error handling.
  - Integration with both MongoDB Atlas (for user data) and Node.js File System (for document storage).

---

## Tech Stack

### Frontend

- **React** – Component-based UI development.
- **Vite** – Fast build tool for development and bundling.
- **TypeScript** – Enhances code quality and maintainability with static typing.
- **Material UI & MUI DataGrid Pro** – Provides a polished, professional, and highly interactive user interface.
- **Axios** – Handles HTTP requests to backend APIs.

### Backend

- **Node.js** – JavaScript runtime for building scalable server applications.
- **Express** – Web framework for creating robust APIs and handling routing.
- **Multer** – Middleware for handling multipart/form-data, primarily for file uploads.
- **MongoDB Atlas** – Cloud-based database service for storing user profiles.
- **File System (fs)** – Node.js module used to manage local file storage for uploaded documents.

---

## Architecture

The application follows a typical MERN stack architecture:

- **Frontend:**  
  The React application (built with Vite and TypeScript) is responsible for rendering the user interface, handling client-side logic, and making API calls via Axios. Key UI elements include the DataGrid Pro component for tabular data display and forms for user input.

- **Backend:**  
  The Node.js/Express server exposes RESTful endpoints that the frontend consumes. The server interacts with two data sources:
  - **MongoDB Atlas:** For persistent storage of user profiles.
  - **Local File System:** For managing uploaded documents (using Multer for handling uploads).

This separation of concerns ensures a modular, maintainable, and scalable codebase.

---

## Installation & Setup

### Prerequisites

- **Node.js** (v14.x or later)
- **npm** (or yarn)
- **Git**
- A **MongoDB Atlas** account for hosting your database

### Steps to Install

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/profile-management-system.git
   cd profile-management-system
   ```

2. **Setup the Backend:**

   - Navigate to the backend directory:
     
     ```bash
     cd backend
     ```

   - Create a `.env` file (if not already present) and add your environment variables:

     ```env
     MONGO_URI=your_mongodb_atlas_connection_string
     PORT=5000
     ```
     
   - Install backend dependencies:

     ```bash
     npm install
     ```

3. **Setup the Frontend:**

   - Navigate to the frontend directory:
     
     ```bash
     cd ../frontend
     ```
     
   - Install frontend dependencies:

     ```bash
     npm install
     ```

---

## Usage

### Running the Application

1. **Start the Backend Server:**

   From the `backend` directory, run:

   ```bash
   npm run dev
   ```

   The server will start on the port specified in your `.env` file (default is `http://localhost:5000`).

2. **Start the Frontend Development Server:**

   From the `frontend` directory, run:

   ```bash
   npm run dev
   ```

   The React application will typically be available on `http://localhost:3000` (or the port specified by Vite).

### Application Pages

- **User Profile List:**  
  Manage user profiles including adding, editing, and deleting users. Data is fetched from MongoDB Atlas through API calls.

- **User Document List:**  
  View a grid of documents uploaded by users. Options include deleting and downloading files. The grid is rendered using MUI DataGrid Pro for a responsive and feature-rich experience.

- **Document Upload:**  
  Upload documents from your local system. The file is processed by Multer in the backend and stored locally using Node.js's file system.

---

## API Documentation

### User Profiles API

- **GET `/api/users`**  
  Fetches the list of all user profiles.

- **POST `/api/users`**  
  Creates a new user profile.  
  **Request Body Example:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30
  }
  ```

- **PUT `/api/users/:user_id`**  
  Updates an existing user profile identified by `user_id`.

- **DELETE `/api/users/:user_id`**  
  Deletes the user profile identified by `user_id`.

### Document Management API

- **GET `/api/documents`**  
  Retrieves a list of all uploaded documents.

- **POST `/api/documents`**  
  Uploads a new document.  
  *Note:* This endpoint uses Multer middleware to handle file uploads.

- **GET `/api/documents/:filename`**  
  Downloads the document identified by `filename`.

- **DELETE `/api/documents/:ifilename`**  
  Deletes the document identified by `filename` from the local storage.

---

*Thankyou for exploring the Profile Management System.*
