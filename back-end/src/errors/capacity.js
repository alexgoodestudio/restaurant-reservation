function capacity(req, res, next) {
    // console.log("capacity");
    const { capacity } = req.body.data;
    if (typeof capacity !== "number" || capacity < 1) {
   
      return next({
            status:400,
            message:"The 'capacity' field must be a number and cannot be null or empty."
        })
    }
    next();
}
module.exports = capacity;
