const { default: mongoose } = require('mongoose');

mongoose.set("strictQuery", false);

const dbConnect = () => {
    try {
        const conn = mongoose.connect('mongodb://localhost:27017/digitic');
        console.log('Database connection established');
    } catch (err) {
        console.log("Database connection error");
    }
};

module.exports = dbConnect;