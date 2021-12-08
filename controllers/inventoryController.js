const Inventory = require('./../models/Inventory');

/**
 * Creates a new inventory
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createInventory = async(req, res) => {
     const { body } = req;   
    
     try {
        const newInventory = await Inventory.create({
            product:body.product,
            qtyInStock:body.qtyInStock
        })

        return res.status(200).json({message:'Inventory Created', newInventory})
            
     } catch (error) {
        return res.status(400).json({message:'Error happened'})     
     }
}

/**
 * This method shows a list of inventorylines using pagination. 
 * @param {*} req 
 * @param {*} res 
 */
 exports.listInventory = async(req, res) => {
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
        const inventoryItems = await Inventory.find().skip(skipRows).limit(pageSize);

        return res.status(200).json({message:'list of inventoryItems', inventoryItems});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}

/**
 * Get sthe inventory by product
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getInventoryByProduct = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findOne({product:req.params.productid})
        .populate('product')

        return res.status(200).json({message:'The inventory item is ', inventoryItem});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}