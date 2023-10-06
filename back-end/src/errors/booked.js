function booked(req,res,next){
    const status = req.body.data.status;
    console.log(status,"yeet")
    if(status === 'undefined'){
        next({
            status:201,
            message:"booked",
        })
    }
    next()
}

module.exports= booked;