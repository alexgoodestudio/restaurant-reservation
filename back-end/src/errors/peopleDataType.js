function peopleDataType(req, res, next) {
    const { people } = req.body.data;
    // console.log(typeof people)
    // console.log(people, typeof people, "request body")
    if (!isNaN(people) || people === null) {
        // console.log("reached peopleDataType")
        return res.status(400).send("The 'people' field must be a number and cannot be null.");
    }
  
    next();
  }
  
  module.exports = peopleDataType;

  
  
  