const {Schema, model} = require('mongoose');


const inventorySchema = new Schema({
    createdOn:{type:Date, default:Date.now},
    product:{type:Schema.Types.ObjectId, ref:'Product'},
    qtyInStock:{type:Number, required:true}
});


const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;