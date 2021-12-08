const {Schema, model} = require('mongoose');


const customerSchema = new Schema({
    createdOn:{type:Date, default:Date.now},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true}
})


const Customer = model('Customer', customerSchema);

module.exports = Customer;