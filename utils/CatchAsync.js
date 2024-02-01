export function CatchAsync(fn){
    return function(res,req,next){
        fn(res,req,next).catch(e => next(e))
    }
}