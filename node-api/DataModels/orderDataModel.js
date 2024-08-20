const mongooseObj = require('mongoose');
SchemaObj = mongooseObj.Schema;

mongooseObj.connect("mongodb://127.0.0.1/mernstack17");

let orderSchema = new SchemaObj({
    userid: { type: String, required: true },
    cart: Object,
    dateTime: { type: Date, Default: Date.now },
    dateCancelled: { type: Date },
    status: { type: String },
},
    {
        versionKey: false
    });

let orderModel = mongooseObj.model("order", orderSchema);
module.exports = orderModel;
