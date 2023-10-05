const service = require("../tables/tables.service")

async function tableOccupied(req, res, next){
    const {table_id} = req.params
    const data = await service.read(table_id)
    console.log(data,"STATUS")
  
    if(data.status !== "free"){
        console.log("tableOccupied If Statement!!!!!!!!!!")
        next({
            message: "occupied",
            status: 400,
        });
    }
    next()
}

module.exports= tableOccupied;