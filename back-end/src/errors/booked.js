function booked(req,res,next){
    const status = req.body.data.status;
    if(status === 'undefined'){
        next({
            status:201,
            message:"booked",
        })
    }
    next()
}

module.exports= booked;