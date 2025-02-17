// Import the HTTP module for creating an HTTP server.
const http = require('http');
const routes = require('./routes');

// Create an HTTP server that listens for requests.
const server = http.createServer(routes);

// Start the server and listen on port 3000.
server.listen(3000);
