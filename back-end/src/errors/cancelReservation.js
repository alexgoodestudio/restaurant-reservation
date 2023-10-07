function cancelReservation(req, res, next) {
    const { status } = req.body.data; // Extract the new status from the request body
    const existingStatus = res.locals.reservation.status; // Extract the existing status from res.locals
  
    // If the existing status is already "cancelled", return a 400 error
    if (existingStatus === "cancelled") {
      return next({
        status: 400,
        message: "Reservation is already cancelled",
      });
    }
  
    // If the new status is "cancelled", proceed to the next middleware
    if (status === "cancelled") {
      return next();
    }
  
    // If the new status is not "cancelled", return a 400 error
    return next({
      status: 400,
      message: `Status must be "cancelled", received ${status}`,
    });
  }
  
  module.exports = cancelReservation;
  