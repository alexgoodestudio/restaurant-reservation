
  
  function noNulls(req, res, next) {
    if (!req.body.data) {
      return res.status(400).send("Missing data in request body");
    }
  
    for (const property of requiredProperties) {
      if (!req.body.data[property]) {
        // console.log(" reached noNulls validation");
        return res.status(400).send(`Missing required property: ${property}`);
      }
    }
    next();
  }
  
  
  module.exports = noNulls;