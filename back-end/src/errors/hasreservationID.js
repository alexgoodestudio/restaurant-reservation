function hasReservationID(req, res, next) {
    // console.log('hasReservationID Middleware Invoked'); // debugging
    // console.log('Request Params:', req.params); // debugging
    // console.log('Request Body:', req.body); // debugging
  
    const reservation_id = req.params.reservation_id || req.body?.data?.reservation_id;
  
    // console.log('Resolved reservation_id:', reservation_id); // debugging
  
    if (reservation_id) {
      res.locals.reservation_id = reservation_id;
      next();
    } else {
      console.error('Missing reservation_id'); // debugging
      next({
        status: 400,
        message: 'missing reservation_id',
      });
    }
  }
  
  module.exports = hasReservationID;
  