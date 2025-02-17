// Import the HTTP module for creating an HTTP server.
const http = require('http');
// Import the FS module for file system operations.
const fs = require('fs');

// Create an HTTP server that listens for requests.
const server = http.createServer(function(req, res){
// Log the requested URL and HTTP method to the console.
    console.log(req.url, req.method);

// Store the requested URL in a constant.
    const url = req.url;
// Store the HTTP method of the request in a constant.
    const method = req.method;

// Check if the requested URL is the root path ("/").
    if(url === '/'){
// Start writing the HTML response.
        res.write('<html>')
// Write the <head> section of the HTML.
        res.write('<head><title>Enter the message</title>')
// Close the </head> tag.
        res.write('</head>')
// Write the <body> section of the HTML.
        res.write('<body>')
// Write the form element with POST method and action to /message.
        res.write('<form action="/message" method="POST">')
// Write the input field for the message.
        res.write('<input type="text" name="message">')
// Write the submit button.
        res.write('<button type="submit">Send</button>')
// Close the form tag.
        res.write('</form>')
// Close the body tag.
        res.write('</body>')
// Close the html tag.
        res.write('</html>')
// End the response.
        return res.end();
    }
// Check if the URL is '/message' and the method is 'POST'.
    if(url === '/message'  && method === 'POST'){
// Initialize an empty array to store the request body chunks.
        const body = [];
// Listen for the 'data' event to collect request body chunks.
        req.on('data', (chunk)=>{
// Push each received chunk to the 'body' array.
            body.push(chunk);
        })
// Listen for the 'end' event, which indicates the end of the request.
        req.on('end', ()=>{
// Concatenate all chunks, convert to string, and parse the message.
            const parsedBody = Buffer.concat(body).toString();
// Extract the message from the parsed body.
            const message = parsedBody.split('=')[1];
// Write the message to 'message.txt', then redirect.
            fs.writeFile('message.txt', message, err=>{
// Set the status code for redirecting.
                res.statusCode = 302;
// Set the 'Location' header for redirection.
                res.setHeader('Location', '/');
// End the response.
                return res.end();
            });
        })
    }
});

// Start the server and listen on port 3000.
server.listen(3000);
