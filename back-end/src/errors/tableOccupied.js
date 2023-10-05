const service = require("../tables/tables.service")

async function tableOccupied(req, res, next){
    console.log("TABLE OCCUPIED");
    const {table_id} = req.params
    console.log(table_id,"*************");
    const data = await service.read(table_id)
    console.log(data,"data")
  
    if(data.status !== "free"){
        // console.log("tableOccupied If Statement!!!!!!!!!!")
        next({
            message: "not occupied",
            status: 400,
        });
    }
    next()
}

module.exports= tableOccupied;