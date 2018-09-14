const config = require('../config/config');
// Get User by id
module.exports.getUserById = (id, callback) => {

    callback(null,config.user);
}
// Get User by username
module.exports.getUserByusername = (username, callback) => {
    console.log(config.user);
    
    if(username != config.user[0].username){
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