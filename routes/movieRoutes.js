import Express from 'express'

import * as  movieController from "../controllers/movieController.js"
import * as authController from '../controllers/authContoller.js'

const movieRouter = Express.Router()

movieRouter.get('/', movieController.getMovies)
movieRouter.get('/home', movieController.getMovies)

movieRouter.get('/login', authController.getLoginForm)
movieRouter.post('/login', authController.postLoginForm)
movieRouter.post('/logout', authController.postLogoutForm)

movieRouter.get('/register', authController.getRegisterForm)
movieRouter.post('/register', authController.postRegisterForm)

movieRouter.get('/add', authController.isLoggedIn, movieController.getAddMovieForm)
movieRouter.post('/add',authController.isLoggedIn, movieController.postAddMovieForm)

movieRouter.get('/favs', authController.isLoggedIn, movieController.getFavs)
movieRouter.post('/add-fav', authController.isLoggedIn, movieController.postAddFavForm)
movieRouter.post('/remove-fav', authController.isLoggedIn, movieController.postRemoveFavForm)

export default movieRouter
