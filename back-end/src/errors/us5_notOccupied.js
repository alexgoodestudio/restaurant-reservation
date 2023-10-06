function us5_notOccupied(req, res, next) {
    const { reservation_id } = res.locals.table
    console.log(res.locals.table, "RES ID*****")
    if (reservation_id !== "occupied") {
        console.log("us5_notOccupied function")
        return next({
            message: "Table is not occupied",
            status: 400,
        });
    }
    next()
}

module.exports = us5_notOccupied;