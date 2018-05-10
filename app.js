const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
let app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.')
        }
    })
    next();
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/node_modules/amcharts3/amcharts'));

app.get('/', (req, res) => {
    res.render('home.hbs');
});



app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});