const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    department: {
        type: String,
    }
}, {timestamps: true})


//Joi schema 
const userValidate = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    department: Joi.string(),
    password: Joi.string()
});


const validateUser = (req, res, next) => {

    const { error } =  userValidate.validate(req.body, {abortEarly:false})
    if (error) {
        const errorDetails = error.details.map((detail )=> detail.message.replace(/\"/g, ''));
        // const errorDetails = error.details.map((detail) => detail.message.replace(/\"/g, ''));
        return res.status(400).json({
            
            // error: error.details[0].message
            error: errorDetails
        })
    }

    next()
}

const User = mongoose.model("User", userSchema)

module.exports = { User, validateUser }