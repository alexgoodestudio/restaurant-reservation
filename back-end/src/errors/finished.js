const service = require("../reservations/reservations.service");
function finished(req, res, next){
        console.log("finished function")
        
        const  id  = req.params.reservation_id;
        console.log(id,"LLL")
        // console.log(id,"AWQE")
        // const reservationId = await service.read(id);
    
        // if (reservationId.status === "seated") {
        //     console.log(reservationId,"HHHHHHH")
        //     next({
        //         message: `reservation is now finished`,
        //         status: 200,
        //     });
        // }
        // next();
      }
    

    

module.exports= finished;