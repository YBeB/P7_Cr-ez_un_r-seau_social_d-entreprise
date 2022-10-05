const express =require('express')
const bodyParser=require('body-parser')
const path=require('path')
const helmet=require('helmet')
var cors = require('cors')
const app = express()


app.use(cors()) // Use this after the variable declaration
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;