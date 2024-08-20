let express = require("express");
let router = express.Router({}),
    ReviewDataModel = require("../DataModels/reviewDataModel");

//review api's

router.post("/api/saveReviews", (req, res) => {
    console.log("review data ", req.body);
    let reviewObj = new ReviewDataModel(req.body);
    reviewObj.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send("Error Occurred" + err);
    });
}
);

router.post("/api/getReviews", (req, res) => {
    
    if(req.body.productid){
        ReviewDataModel.find({productid: req.body.productid}).then((data) => {
            res.json(data);
            //console.log("hehehehe" + data)    
        }).catch((err) => {
            res.send("Error Occurred" + err);
        });
    }
    else{
        ReviewDataModel.find().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.send("Error Occurred" + err);
        });
    }
    //console.log("Hello" + req.body.comments)
});

//Filter reviews based on product id
router.post("/api/viewReviews", (req, res) => {
    ReviewDataModel.find({productid
        : req.body.productid}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.send("Error Occurred" + err);
    });

}
);



module.exports = router;