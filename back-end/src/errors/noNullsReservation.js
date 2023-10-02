const requiredProperties = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  
  function noNulls(req, res, next) {
    if (!req.body.data) {
      return res.status(400).json({ error: "Missing data in request body" });
    }
    
    for (const property of requiredProperties) {
      if (!req.body.data[property]) {
        return res.status(400).json({ error: `Missing required property: ${property}` });
      }
    }
    next();
  }
  
  module.exports = noNulls;
  