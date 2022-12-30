const { default: mongoose } = require('mongoose');

mongoose.set("strictQuery", false);

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connection established');
    } catch (err) {
        console.log("Database connection error");
    }
};

module.exports = dbConnect;