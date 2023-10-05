/**
 * Creates a middleware function that validates that req.body.data has the specified non-falsey properties.
 * @param properties
 *  one or more property name strings.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the specified non-falsey properties.
 */


function hasProperties(requiredProperties) {
  // console.log("hasProperties");
  return function (req, res, next) { 
    const { data = {} } = req.body; 
    // console.log("HASPROPERTIESDATA",data)
    try {
      requiredProperties.forEach((property) => {
        const value = data[property];
        if (!value) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          // console.log("hasProperties Error1 completed")
          throw error;
        }
      });
      // console.log("hasProperties Next completed")
      next();
    } catch (error) {
      // console.log("hasProperties Error2 completed",error)
      next(error);
    }
  };
}

  
module.exports = hasProperties;
  
  