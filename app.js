import Express  from 'express';
import path from 'path'
import session from "express-session"
import connect from 'connect-session-sequelize'
import flash from 'connect-flash'

import sequelize from "./utils/database.js"
import movieRouter from './routes/movieRoutes.js'
import AppError from './utils/AppError.js';

const app = Express()

app.set('views',path.join(process.cwd(),'views'))
app.set('view engine','ejs')

app.use('/public',Express.static(path.resolve('.','public')))

//middlewares
const SequelizeSession = connect(session.Store)
const sequelizeStore  = new SequelizeSession({db : sequelize, 
    checkExpirationInterval : 1000*60*3})

app.use(session({
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : false,
    store : sequelizeStore,
    cookie : {
        httpOnly : true,
        maxAge : 1000*60*15 //15 mins
    }
}))
app.use(Express.urlencoded({extended : true}))
app.use(flash())

//routes
app.use('/',movieRouter)

//404 error found
app.all('*',(req,res,next)=>{
    const err = new AppError('Page not found')
    next(err)
})

//error handling middleware
app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).send(
        `An error occured : ${err}`
    )
})

//sync sequelize
sequelizeStore.sync()
sequelize.sync()

export default app.listen(3000,(err)=>{
    if(!err){
        console.log("Listening at http://127.0.0.1:3000/")
    }
})
