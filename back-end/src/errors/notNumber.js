async function notNumber(req, res, next) {
    const { mobile_number } = req.body.data;  
    if (isNaN(mobile_number)) {
        next({
            message: `mobile_number must be a number`,
            status: 400,
        });
    } else {
        next();
    }
}


  module.exports = notNumber;