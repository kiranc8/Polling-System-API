# Polling System API

A simple API for creating and managing polls with questions and options. This API is built using Express.js and MongoDB.

## Technology Stack
Node.js
Express.js
MongoDB (with Mongoose)

## Features

- Create questions with options
- Add options to specific questions
- Delete questions and associated options
- Delete individual options
- Increment vote count for options
- View questions and their options

## Endpoints

- POST /questions/create: Create a new question
- POST /questions/:id/options/create: Add options to a question
- DELETE /questions/:id/delete: Delete a question and its associated options
- DELETE /options/:id/delete: Delete an option
- POST /options/:id/add_vote: Increment the vote count for an option
- GET /questions/:id: View a question and its options

## Getting started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/polling-system-api.git
   cd polling-system-api
2. Install the required dependencies
   ```bash
   npm install
3. Start the server
   ```bash
   npm start
