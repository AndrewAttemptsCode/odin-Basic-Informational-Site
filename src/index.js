// const http = require('http');
// const fs = require('fs').promises;

// const server = http.createServer(async (req, res) => {
//   try {
//     let filePath = req.url === '/' ? './index.html': `.${req.url}.html`;

//     const data = await fs.readFile(filePath, 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(data);
//   } catch (err) {
//     const notFound = await fs.readFile('404.html', 'utf-8');
//     console.error('Error: ', err);
//     res.writeHead(404, { 'Content-Type': 'text/html' });
//     res.end(notFound);
//   }
// });

// server.listen(8080, () => {
//   console.log('Server connected on: http://localhost:8080');
// });

const express = require('express');
const path = require('path');

const app = express();

const handleError = (err, res) => {
  console.error('Error: ', err);
  if (err.code === 'ENOENT') {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  } else {
    res.status(500).send('Internal Server Error');
  }
};

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');

  res.sendFile(filePath, (err) => {
    if (err) handleError(err, res);
  });
});

app.get('/:name', (req, res) => {
  const filePath = path.join(__dirname, `${req.params.name}.html`);
  
  res.sendFile(filePath, (err) => {
    if (err) handleError(err, res);
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server connected on: http://localhost:${PORT}`);
});