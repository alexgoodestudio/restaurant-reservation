function hasReservationID(req, res, next) {
    console.log('hasReservationID Middleware Invoked'); 
    console.log('Request Params:', req.params); 
    console.log('Request Body:', req.body); 
  
    const reservation_id = req.params.reservation_id || req.body?.data?.reservation_id;
  
    console.log('Resolved reservation_id:', reservation_id); 
  
    if (reservation_id) {
      res.locals.reservation_id = reservation_id;
      next();
    } else {
      console.error('Missing reservation_id'); 
      next({
        status: 400,
        message: 'missing reservation_id',
      });
    }
  }
  
  module.exports = hasReservationID;
  