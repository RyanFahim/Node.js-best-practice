const mongoose = require('mongoose')
const config = require('../config.json')

const mongoConnect = async () => {
    //connection with database
    await mongoose.connect(config.mongodb.mongoURL, config.mongodb.mongoOptions)
        .then(() => {
            console.log("Database connection successful")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = { mongoConnect }