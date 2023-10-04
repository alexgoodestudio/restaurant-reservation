function tableIsOccupied(req, res, next) {
    let table = req.body.data.status;
    console.log(table);
    if (!table) {
        next({
            status: 400,
            message: "this table is occupied",
        });
    }
    next();
}

module.exports = tableIsOccupied