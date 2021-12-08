const jwt = require('jsonwebtoken');

/**
 * Generates the token 
 * @param {*} user 
 * @returns 
 */
exports.generateToken = (user) => {

  //return jwt.sign({sub:user._id}, process.env.JWT_SECRET,{expiresIn:'1h'});
  return new Promise((resolve, reject) => {
    jwt.sign({sub:user._id}, process.env.JWT_SECRET,{expiresIn:'1h'},(err, asyncToken) => {
        if(err) {
            reject(err)
            return;
        }
   
        resolve(asyncToken);
     })
  });
}