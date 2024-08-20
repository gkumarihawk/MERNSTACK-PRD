let express = require("express");
let router = express.Router({}),
    OrderDataModel = require("../DataModels/orderDataModel");


//order api's
router.post("/api/placedOrder", (req, res) => {
    console.log("order data ", req.body);
            let orderObj = new OrderDataModel(req.body);
            //console.log("Hello:" + orderObj);
            //console.log("Hello:" + orderObj);
            orderObj.save().then((data) => {
                //console.log("Order Placed" + data);
                data
                res.json({data});
            }).catch((err) => {
                //console.log("we fucked up");
                console.log(err)
                res.json({err});
            });   
        });


router.post("/api/getRecentOrders", (req, res) => {
    //console.log("Get List Of orders");
    //let user = req.body.userid
    console.log(req.body)
    OrderDataModel.find({userid: req.body.userid}).then((data)=>{    
        console.log(data)
        res.json({data});
    }).catch((err)=>{
        //console.log("HEHE")
        res.json("Error Occurred" + err);
    })
})

const isWithinRange = (dateTime) => {
    const now = new Date();   
    const orderDate = new Date(dateTime);
    const diff = (now.getTime() - orderDate.getTime())< 2*24*60*60*1000;
    return diff;
}

router.post("/api/cancelOrder", (req, res) =>{
    const orderId = req.body.orderId;
    //console.log(req.body)
    OrderDataModel.findById(orderId)
    .then(order => {
        //console.log("CHICHI")
        if (!order){
            //console.log("Dong")
            return res.status(404).json({ error: "Order Not found"})
        }
        if(isWithinRange(order.dateTime)){
            //console.log("Ding")
            order.status = "Cancelled";
            order.save()
            .then(updatedOrder => res.json(updatedOrder))
            .catch(err => res.json(err))
        }else{
            order.status = "Delivered";
            //console.log("Ping")
            return res.status(400).json({ error: "Order cannot be cancelled"})
        }
    })
    .catch(err => res.json(err))
    }
        )

router.post("/api/getCancelledOrders", (req, res) => {
    OrderDataModel.find({status: "Cancelled"}).then((data)=>{
        res.json({data});
    }).catch((err)=>{
        res.json("Error Occurred" + err);
    })
})






/*router.post("/api/getAll", (req, res) => {
    OrderDataModel.find().then((data)=>{
        res.json({order:data});
    }).catch((err)=>{
        res.send("Error Occurred" + err);
    })
})

router.post("/api/cancelOrder", (req, res) => {
    OrderDataModel.updateOne({_id:req.body.id}, {status:"cancelled order", dateCancelled: new Date()}).then((data)=>{
        res.json({data:data});
    }).catch((err)=>{
            res.send("Error Occurred" + err);
    })
})

router.post("/api/updateOrder", (req, res) => {
    OrderDataModel.updateOne({_id:req.body.id}, {status:"delivered order"}).then((data)=>{
        res.json({data:data});
    }).catch((err)=>{
            res.send("Error Occurred" + err);
    })
})*/


module.exports = router;
