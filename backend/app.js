const express =require('express')
const bodyParser=require('body-parser')
const path=require('path')
const helmet=require('helmet')
const userRoutes=require('./routes/user')

const app = express()
