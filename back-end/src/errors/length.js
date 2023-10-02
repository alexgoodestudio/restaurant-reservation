function length(req, res, next) {
  const  {table_name}  = req.body.data;
  console.log(table_name,"%%%%%%%%%%%%")
  try {
    if (table_name.length == 1) {
      return res.status(400).json({ error: "Length must be greater than 2 characters" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = length;