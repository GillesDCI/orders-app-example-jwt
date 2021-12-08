const {Schema, model} = require('mongoose');


const orderSchema = new Schema({
    orderDescription:{type:String, required:true},
    price:{type:Number, required:true},
    vat:{type:Number, required:true},
    totalInclVat:{type:Number, required:true},
    customer:{type:Schema.Types.ObjectId, ref:'Customer'},
    product:{type:Schema.Types.ObjectId, ref:'Product'}
});


const Order = model('Order', orderSchema);

module.exports = Order;