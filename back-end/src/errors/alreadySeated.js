const service = require("../tables/tables.service");

async function alreadySeated(req, res, next) {
    const { table_id } = req.params;
    const table = await service.read(table_id);
    if (table.status === 'seated') {
        return next({
            status: 400,
            message: 'seated',
        });
    }
    next();
}


module.exports = alreadySeated