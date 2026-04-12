const http = require('http');

// create server 
const server = http.createServer((req, res) => {
    res.write("Hello from my Node server ");
    res.end();
});

// run server 
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

