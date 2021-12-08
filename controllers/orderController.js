const Order = require('./../models/Order');
const Inventory = require('./../models/Inventory');


/**
 * Creates an order 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createOrder = async(req ,res) => {
    const { body } = req;   
    
    try {
       const newOrder = await Order.create({
           orderDescription:body.orderDescription,
           price:body.price,
           vat:body.vat, 
           totalInclVat:body.totalInclVat, 
           customer:body.customer,
           product:body.product
       })

       const inventory = await Inventory.findOneAndUpdate({product:body.product},{$inc:{qtyInStock:-1}},{new:true})


       return res.status(200).json({message:'Order Created', newOrder, inventory})
           
    } catch (error) {
       return res.status(400).json({message:'Error happened'})     
    }
}

/**
 * List all the orders using pagination
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.listOrders = async(req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    //example page = 2 and pageSize = 3
    // (2-1) = 1 * 3 = skip(3)
    //example page = 3 and pageSize = 3
    // (3-1) = 2 * 3 = skip(6)
    //example page = 4 and pageSize = 3
    // (4-1) = 3 * 3 = skip(9)
    const skipRows = (page - 1) * pageSize; //calculating how many items to skip. 

    try {
        const orders = await Order.find().skip(skipRows).limit(pageSize);

        return res.status(200).json({message:'list of orders', orders});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}

/**
 * Lists all the orders by customer ID (includes populate method)
 * @param {*} req 
 * @param {*} res 
 */
exports.listOrderByCustomer = async(req, res) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 10;

    //example page = 2 and pageSize = 3
    // (2-1) = 1 * 3 = skip(3)
    //example page = 3 and pageSize = 3
    // (3-1) = 2 * 3 = skip(6)
    //example page = 4 and pageSize = 3
    // (4-1) = 3 * 3 = skip(9)
    const skipRows = (page - 1) * pageSize; //calculating how many items to skip. 

    try {
        const orders = await Order.find({customer:req.params.customerid})
        .populate('customer')
        .skip(skipRows)
        .limit(pageSize);

        return res.status(200).json({message:'list of orders', orders});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}