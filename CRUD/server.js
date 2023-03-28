// import required essentials
const http = require('http');
const express = require('express');
const itemsRouter = require('./items');

// create new app
const app = express();
app.use(express.json());
// use it before all route definitions

/* this '/items' URL will have two end-points:
→ localhost:3000/items/ (this returns array of objects)
→ localhost:3000/items/:id (this returns single object)
*/
app.use('/users', itemsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('API works!!! :D');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);