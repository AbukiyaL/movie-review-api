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

  } else {
 
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

