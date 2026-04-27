# Movie Review API

A simple REST API built with vanilla Node.js for managing a collection of movie reviews. This project was created as part of a Web II assignment to demonstrate core backend skills without using external frameworks like Express.

## Features
- **GET /movies**: Fetch all movie records from the JSON database.
- **POST /movies**: Add a new movie (automatically generates a unique ID).
- **PUT /movies/:id**: Update details of an existing movie.
- **DELETE /movies/:id**: Remove a movie from the collection.

## Tech Stack
- **Backend**: Node.js (Standard `http` and `fs` modules)
- **Database**: `movies.json` file 

## How to Run Locally
1. Clone the repository to your machine.
2. Open your terminal in the project folder.
3. Run the server using Node:
   ```bash
   node server.js
   ```
4. The server will be running at `http://localhost:3000`.

## Testing the API
You can test the endpoints using a browser for GET requests or a tool like `cURL` for POST, PUT, and DELETE.
