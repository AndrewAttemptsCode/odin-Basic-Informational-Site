const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
  try {
    let filePath = req.url === '/' ? './index.html': `.${req.url}.html`;

    const data = await fs.readFile(filePath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    const notFound = await fs.readFile('404.html', 'utf-8');
    console.error('Error: ', err);
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(notFound);
  }
});

server.listen(8080, () => {
  console.log('Server connected on: http://localhost:8080');
});