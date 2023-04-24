// import the necessary modules
const express = require('express');
const http = require('http');
const fs= require('fs');
const cors=require ('cors');
const bodyParser = require('body-parser');
const data=JSON.parse(fs.readFileSync('data.json','utf-8'));

const app = express();

// use body-parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.post('/submit', (req, res) => {
    const formData = req.body.name; // get the form data from request body
    //console.log(formData); // log the form data to the console
    let found=data.users.find(e => e.firstName === formData);
    if (found){
        res.status(200).send(found);
    }
    else{
        res.status(404).send(found);
    }
    /*
    // write the form data to data.json
    fs.appendFile('data.json', JSON.stringify(formData) + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
        } else {
            res.send('Form submitted successfully');
        }
    });
     */
});
app.get('/update', (req, res) => {
    console.log("I also made it here");
    /*const formData = req.body; // get the form data from request body
    console.log(formData); // log the form data to the console

    // write the form data to data.json
    fs.appendFile('data.json', JSON.stringify(formData) + '\n', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing to file');
        } else {
            res.send('Form submitted successfully');
        }
    });*/
});
// create a server that responds to AJAX requests

const server = http.createServer(app)
/*=> {

    if (req.method === 'GET' && req.url === '/update') {
        // generate the updated HTML content
        const time = new Date().toLocaleTimeString();
        let found=JSON.stringify(data.users[0]);
        console.log("I found it");
        const html = `<p> ${found}.</p>`;
        // set the response headers
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Access-Control-Allow-Origin', '*'); // allow cross-origin requests

        // send the response data
        res.end(html);
    }
    else if(req.method==='POST' && req.url==='/submit')
    {
        console.log("I made it");
    }
    else {
        // handle other requests
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});
     */

// start the server on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
