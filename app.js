const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.json')
const userRouter = require('./api/user/router')
const { mongoConnect } =  require('./components/mongodb')

const compression = require('compression');
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

//connection with mongoDB
mongoConnect()

//express app initialization
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))

// compress all responses
app.use(compression());

//connection with database
// await mongoConnect()

app.use('/users', userRouter)


app.listen(config.mongodb.port, () => {
    console.log(`Server is running on port ${config.mongodb.port}`)
})





