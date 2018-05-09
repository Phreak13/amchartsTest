const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = require();

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

app.use(express.static(__dirname + './public'));









app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});