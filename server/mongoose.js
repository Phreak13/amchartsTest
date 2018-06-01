const mongoose = require('mongoose');

mongoose.Promsie = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};