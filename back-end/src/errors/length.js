function length(req, res, next) {
  const  {table_name}  = req.body.data;

    if (table_name.length <= 1) {
     return res.status(400).send("Length must be greater than 2 characters")

    }
    next();
}

module.exports = length;