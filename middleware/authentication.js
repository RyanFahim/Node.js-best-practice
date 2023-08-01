const jwt = require('jsonwebtoken');
const config = require('../config.json')

const checkToken = (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        // console.log(authorization);

        if (!authorization) {
            res.status(400).json({
                success: false,
                message: "No authentication"
            });
        }
        else if (authorization.split(' ')[0] != 'Bearer') {
            res.status(400).json({
                success: false,
                message: "Not a bearer token"
            });
        }
        else {
            const token = authorization.split(' ')[1];

            jwt.verify(token, config.jwt.jwtSecret , (err, decoded) => {

                const { username, userId } = decoded;
                req.username = username;
                req.userId = userId;

                console.log("The decoded id is ", userId);

                if (!err) {
                    console.log('token pass successfully');
                    next();
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }
            });

        }

    } catch (error) {
        res.status(400).json({
            success: false,
            // message: "JWT has expired"
            message: error.message

        })
    }


};

module.exports = checkToken;