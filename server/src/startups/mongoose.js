const mongoose = require('mongoose');

module.exports = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    } catch(e) {
        throw new Error(e);
    }

    mongoose.connection.on('error', err => console.log(err));
}



