import User from '../models/userModel.js'
import { CatchAsync } from '../utils/CatchAsync.js'


export const isLoggedIn = CatchAsync(async (req,res,next) =>{
    if (req.session.user){
        next()
    }
    else{
        res.redirect('login')
    }
})

export const getLoginForm = CatchAsync(async (req, res) => {
    if(req.session.user){
        res.redirect('home')
    }
    res.render('login', {
        pageTitle: 'Login',
        msg : req.flash('info')[0]
    })
})

export const postLoginForm = CatchAsync(async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    let user = await User.findOne({
        where: {
            email
        }
    })

    if(user && user.isValidPassword(password)){
        user = user.get({raw : true})
        user.password = undefined
        req.session.user = user
        res.redirect('home')
    }
    else{
        req.flash('info','username or password incorrect')
        res.redirect('login')
    }
})

export const postLogoutForm = CatchAsync(async (req, res) => {
    req.session.destroy((err)=>{
        res.redirect('home')
    })
})

export const getRegisterForm = CatchAsync(async (req, res) => {
    res.render('register', {
        pageTitle: 'Register',
        msg : req.flash('info')[0]
    })
})

export const postRegisterForm = CatchAsync(async (req, res,next) => {
    const email = req.body.email

    const user = await User.findOne({
        where: {
            email
        }, raw: true
    })

    if(user){
        console.log('already exists');
        req.flash('info', 'User already exists with that email')
        res.redirect('/register')
    }
    await User.create(req.body)
    res.redirect('login')
})