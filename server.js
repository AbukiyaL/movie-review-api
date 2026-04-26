const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Movie API is running');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
