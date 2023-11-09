const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
exports.connectDatabase = () => {
    mongoose.connect('mongodb://localhost:27018/Boo').then(() => {
        console.log('Database Connected')
    }).catch((error) => {
        console.log(error);
    });   
}