const { User } = require('./model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config.json')
const multer = require('multer');



//Login
const loginUser = async (req, res) => {

    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "No user found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log("is password", isPasswordValid)

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            error: 'Invalid email or password'
        });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, username: user.username }, config.jwt.jwtSecret, { expiresIn: '1h' });

    res.status(200).json({
        success: true,
        // body: user,
        token: token
    })

}

//add an user, register
const createUser = async (req, res) => {

    const { username, password, email, department } = req.body

    try {

        //Check if user already exist or not
        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(200).json({
                success: false,
                message: "User already exist"
            })
        }

        //Hash the password
        hashedPassword = await bcrypt.hash(password, 10)


        // const newUser = new User(req.body)
        //add a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            department
        });

        const savedUser = await newUser.save()

        res.status(200).json({
            success: true,
            message: 'New user created',
            body: savedUser
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
}


//Show all users
const getAllUsers = async (req, res) => {

    try {
        const allUsers = await User.find()
        res.status(200).json({
            success: true,
            body: allUsers
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"

        })
    }
}

//Show individual user
const getIndividualUser = async (req, res) => {
    try {
        const { id } = req.query

        const user = await User.find({ _id: id })

        res.status(200).json({
            success: true,
            message: "All users displayed",
            body: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"

        })
    }
}

//update user
const updateUser = async (req, res) => {

    try {
        const { id } = req.query

        const updatedUser = await User.findByIdAndUpdate(id, {
            username: req.body.username,
            email: req.body.email,
            department: req.body.department
        }, { new: true })

        res.status(200).json({
            success: true,
            message: "User updated",
            body: updatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"

        })
    }


}

//delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.query

        const deleteUser = await User.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "User deleted",
            body: deleteUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Server Error"

        })
    }
}


//File upload using multer
// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '-' + file.originalname);
        cb(null, req.username + '-' + file.originalname);
    },
});
// Create the Multer upload instance
const upload = multer({ storage: storage });




const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }

    res.json({
        success: true,
        message: 'File uploaded successfully',
        // file: { originalname, filename, size }
    });
}


module.exports = {
    createUser,
    getAllUsers,
    getIndividualUser,
    updateUser,
    deleteUser,
    loginUser,
    upload,
    uploadFile
}