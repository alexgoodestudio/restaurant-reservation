function peopleDataType(req, res, next) {
    const { people } = req.body.data;
    if (!Number.isInteger(people) && !people > 0) {
        console.log("reached peopleDataType")
        return res.status(400).error("A 'people' property is required.");
    }
    next();
  }
  
  module.exports = peopleDataType;

  
  
  