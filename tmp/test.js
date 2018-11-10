var fs      = require('fs'),
data        = fs.readFileSync('./test.png', 'utf8'),
base64Data,
binaryData;

base64Data  =   data.replace(/^data:image\/png;base64,/, "");
base64Data  +=  base64Data.replace('+', ' ');
binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

fs.writeFile("out.png", binaryData, "binary", function (err) {
    console.log(err); // writes out file without error, but it's not a valid image
});