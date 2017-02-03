const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    return console.log('an error occured', err);
  }
  console.log(`Server is listening on ${port}`);
});
