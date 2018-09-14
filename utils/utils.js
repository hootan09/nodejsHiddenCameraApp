  const path = require('path');
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/; 

    // Check ext
    const extname = filetypes.test(path.extname(file).toLowerCase());

    if(extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

  module.exports = {checkFileType};