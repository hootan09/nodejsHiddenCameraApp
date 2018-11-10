  const path = require('path');
  const fs = require('fs');
  // Check File Type
  function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/; 

    // Check ext
    const extname = filetypes.test(path.extname(file).toLowerCase());
    if(extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only! '+ path.extname(file).toLowerCase());
    }
  }

  //todo must work on user path profile
  function getListOfImage(user, cb){
    fs.readdir('./public/upload', function (err, files) {
      // "files" is an Array with files names
      if(err){
        console.log('Error in Utils getListOfImage ' , err);
        return cb(err);
      }
      cb(null,files);
  });
  }

  module.exports = {checkFileType, getListOfImage};