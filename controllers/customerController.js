const Customer = require('./../models/Customer');

/**
 * Create a new customer, we extract information from the http body and create a new customer in the database
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createCustomer = async(req, res) => {
     const { body } = req;   
    
     try {
        const newCustomer = await Customer.create({
            firstname:body.firstname, 
            lastname:body.lastname,
            email:body.email
        })

        return res.status(200).json({message:'Customer Created', newCustomer})
            
     } catch (error) {
        return res.status(400).json({message:'Error happened'})     
     }
}


/**
 * Update the customer by Id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateCustomerById = async(req, res) => {
    const { body } = req;

    try {
        //verify first
        const customerToUpdate = await Customer.findByIdAndUpdate(req.params.id, {
            firstname:body.firstname,
            lastname:body.lastname, 
            email:body.email
        }, {new:true})

        if(!customerToUpdate) return res.status(404).json({message:'Customer not found'});

        return res.status(200).json({message:'Customer updated', customerToUpdate})
    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}

/**
 * This method shows a list of customers using pagination. 
 * @param {*} req 
 * @param {*} res 
 */
exports.listCustomers = async(req, res) => {
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
        const customers = await Customer.find().skip(skipRows).limit(pageSize);

        return res.status(200).json({message:'list of customers', customers});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}
