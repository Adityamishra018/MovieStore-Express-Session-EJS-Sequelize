import Movie from '../models/movieModel.js'
import User from '../models/userModel.js'
import AppError from '../utils/AppError.js'
import { CatchAsync } from '../utils/CatchAsync.js'

export const getMovies = CatchAsync(async (req,res)=>{
    const movies = await Movie.findAll({raw : true})

    //logged in
    if (req.session.user){
        const user = await User.findOne({where : {id :  req.session.user.id}})
        const favMovies = await user.getMovies();

        movies.forEach(m =>{
            favMovies.forEach(f=>{
                if (f.id === m.id ){
                    m.isFav = true;
                }
            })
        })
    }
    res.render('home',{
        pageTitle : 'Home',
        user :  req.session.user,
        movies
    })
})

export const getAddMovieForm = CatchAsync(async (req,res)=>{
    res.render('add',{
        pageTitle : 'Add movie',
    })
})

export const postAddMovieForm = CatchAsync(async (req,res)=>{
    await Movie.create(req.body)
    res.redirect('/home')
})

export const getFavs = CatchAsync(async (req,res)=>{
    const user = await User.findOne({where : {id :  req.session.user.id}})
    const favMovies = await user.getMovies()
    res.render('fav',{
        pageTitle : 'Fav movies',
        movies : favMovies,
        user : req.session.user
    })
})

export const postAddFavForm = CatchAsync(async (req,res)=>{
    const movie = await Movie.findOne({where : { id : req.body.movie_id}})
    const user = await User.findOne({where : {id : req.session.user.id}, include : Movie})

    if (!movie)
        throw new AppError("Movie not found",400)
    if (!user)
        throw new AppError("User not found | Fatal", 500)

    await user.addMovies([movie])
    res.redirect('/favs')
})

export const postRemoveFavForm = CatchAsync(async (req,res)=>{
    const movie = await Movie.findOne({where : { id : req.body.movie_id}})
    const user = await User.findOne({where : {id : req.session.user.id}, include : Movie})

    if (!movie)
        throw new AppError("Movie not found",400)
    if (!user)
        throw new AppError("User not found | Fatal", 500)

    let movies = await user.getMovies()
    movies = movies.filter(m => m.id !== movie.id)
    await user.setMovies(movies)
    res.redirect('favs')
})