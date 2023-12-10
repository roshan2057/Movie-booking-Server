# Movie Ticket Booking Backend

This repository contains the backend codebase for a Movie Ticket Booking web application developed using Node.js with MongoDB and Mongoose ORM.

## Overview

This backend is built to handle HTTP requests and provides various endpoints for functionalities like movie listing, user authentication, and ticket booking. It integrates MongoDB as the database using Mongoose as the ORM to store information about movies, users, and booked tickets. Server-side validation ensures secure user input handling, while proper error handling and logging enhance application reliability.

## Features

- **HTTP Server:** Handles incoming requests using Node.js and Express.js.
- **RESTful API Endpoints:** Implements endpoints for various functionalities, including:
  - Movie listing and details retrieval.
  - User authentication and profile management.
  - Ticket booking and reservation.
- **Database Integration:** Stores data related to movies, users, and bookings in MongoDB using Mongoose ORM.
- **Validation & Error Handling:** Implements server-side validation for user inputs and ensures robust error handling for a reliable user experience.

## Setup Instructions

### Prerequisites
- Node.js (version x.x.x)
- MongoDB installed and running locally or remotely.
- Mongoose ORM

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-ticket-backend.git
   cd movie-ticket-backend
   npm install
2. Configure environment variables:
   - Rename .env.example to .env
   - Update .env with your MongoDB connection string and any required configuration.
3. Start the Server:
   ```bash
   npm start
5. The server will start at http://localhost:4000 by default. Ensure the port is available and not in use.

### Live Demo

https://main--beautiful-faloodeh-e4d8c6.netlify.app/
