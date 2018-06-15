require('./config/config');

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const moment = require('moment');
const http = require('http');
const socketIO = require('socket.io');


const { mongoose } = require('./server/mongoose');
const { InsertCountries } = require('./db/InsertData');
const { Daten } = require('./models/daten');


const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);


app.set('view engine', 'hbs');
InsertCountries();

app.get('/data.json', (req, res) => {
    Daten.find().then((countries) => {
        res.send(countries);

    }, (e) => {
        res.status(400).send(e);
    })
});




app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    })
    next();
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/node_modules/amcharts3/amcharts'));

io.on('connection', (socket) => {
    console.log('Connected');

    socket.on('addData', (data, callback) => {
        console.log(data);
        Daten.insertMany(data);

        app.get('/data.json', (req, res) => {
            Daten.find().then((countries) => {
                res.send(countries);

            });
        });
        callback();
    });
});


app.get('/', (req, res) => {
    res.render('home.hbs');
});




server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});