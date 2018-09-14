const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const config = require('../config/config.json');
const file = process.argv[2];
const server = process.argv[3];
const options = {
 hostname: server,
 port: 4000,
 path: '/upload/',
 method: 'PUT',
 headers: {
 filename: path.basename(file),
 'Content-Type': 'application/octet-stream',
 'Content-Encoding': 'gzip'
 }
};
const req = http.request(options, res => {
 console.log('Server response: ' + res.statusCode);
});
fs.createReadStream(file)
 .pipe(zlib.createGzip())
 .pipe(crypto.createCipher('aes192', config.secret))
 .pipe(req)
 .on('finish', () => {
 console.log('File successfully sent')
})
.on('error', (err) =>{
    console.log('error in send file '+ err);
    
})