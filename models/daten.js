const mongoose = require('mongoose');


let Daten = mongoose.model('Daten', {
    country: {
        type: String,
        required: true,
        trim: true
    },
    visits: {
        type: Number,
        required: true,
        trim: true
    }

});
   

module.exports = {Daten};