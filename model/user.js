const config = require('../config/config');
// Get User by id
module.exports.getUserById = (id, callback) => {

    callback(null,config.user);
}
// Get User by mobile
module.exports.getUserByMobile = (mobile, callback) => {
    console.log(config.user);
    
    if(mobile != config.user[0].mobile){
        callback(null, {});
        return;
    }
    callback(null,config.user);
}


// compare password
module.exports.comparePassword = (password, dbPassword, callback) => {
    if (password == dbPassword) {
        callback(true);
        return;
    }
    callback(false)
}