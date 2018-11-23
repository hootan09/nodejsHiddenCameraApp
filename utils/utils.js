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
  //todo if directory and file exist
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

  //todo must work on user path profile
  //todo if directory and file exist
  function removeImage(user, filename,cb){
      if(filename){
        fs.unlink(`./public/upload/${filename}`, function (err) {
          if (err){
            console.log('Error in utils removeImage');
            return cb(err);
          }
         cb(null,'success');  
      }); 
    }
  }

  //todo working on add geolocation
  function setLocation(location , fileName){
    //todo must add layer to save imageName and location in file/db
    
  }

  module.exports = {checkFileType, getListOfImage, removeImage, setLocation};