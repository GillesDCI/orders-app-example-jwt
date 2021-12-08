const Product = require('./../models/Product');

/**
 * Create a new product
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.createProduct = async(req, res) => {
     const { body } = req;   
    
     try {
        const newProduct = await Product.create({
            productName:body.productName,
            productDescription:body.productDescription,
            price:body.price
        })

        return res.status(200).json({message:'Product Created', newProduct})
            
     } catch (error) {
        return res.status(400).json({message:'Error happened'})     
     }
}

/**
 * This method shows a list of products using pagination. 
 * @param {*} req 
 * @param {*} res 
 */
 exports.listProducts = async(req, res) => {
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
        const products = await Product.find().skip(skipRows).limit(pageSize);

        return res.status(200).json({message:'list of products', products});

    } catch (error) {
        return res.status(400).json({message:'Error happened'})     
    }
}