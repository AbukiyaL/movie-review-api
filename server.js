const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const filePath = path.join(__dirname, 'movies.json');

const server = http.createServer((req, res) => {
  
  if (req.method === 'GET' && req.url === '/movies') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Error reading file" }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } 

  else if (req.method === 'POST' && req.url === '/movies') {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      const newMovie = JSON.parse(body);
      newMovie.id = Date.now(); 
      fs.readFile(filePath, 'utf8', (err, data) => {
        let movies = JSON.parse(data || '[]');
        movies.push(newMovie);
        fs.writeFile(filePath, JSON.stringify(movies, null, 2), (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Error saving data" }));
            return;
          }
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(newMovie));
        });
      });
    });
  }
 
  else if (req.method === 'DELETE' && req.url.startsWith('/movies/')) {
    const parts = req.url.split('/');
    const id = parts[2];  

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Error reading file" }));
        return;
      }

      let movies = JSON.parse(data || '[]');
     
      const filteredMovies = movies.filter(movie => String(movie.id) !== id);

      fs.writeFile(filePath, JSON.stringify(filteredMovies, null, 2), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: "Error saving data" }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Movie deleted successfully" }));
      });
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


