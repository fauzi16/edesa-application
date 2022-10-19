const {createServer} = require('http');
const {join} = require('path');
const {parse} = require('url');
const next = require('next');

const app = next({dev: process.env.NODE_ENV !== 'production'});
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const {pathname} = parsedUrl;
    const options = {
      root: __dirname + '/static/',
      headers: {
        'Content-Type': 'text/plain;charSet=UTF-8',
      },
    };
    server.get('/robots.txt', (req, res) =>
      res.status(200).sendFile('robots.txt', options),
    );
    // handle GET request to /service-worker.js
    if (pathname === '/service-worker.js') {
      const filePath = join(__dirname, '.next', pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, () => {
    console.log(`> Ready on http://localhost:${3000}`);
  });
});