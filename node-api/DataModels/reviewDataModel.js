const mongooseObj = require('mongoose');
SchemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack17");

let reviewSchema = new SchemaObj({
    userid: { type: String, required: true },
    productid: { type: String, required: true },
    rating: { type: Number, required: true },
    comments: { type: String, required: true },
    //date: { type: Date, Default: Date.now },
},
    {
        versionKey: false
    });
let reviewModel = mongooseObj.model("reviews", reviewSchema);
module.exports = reviewModel;