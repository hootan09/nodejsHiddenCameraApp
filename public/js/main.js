"use strict";

const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const crypto = require('crypto');
const stream = require('stream');

window.sendImage = function (file , fileName = "pic.png") {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/upload/',
        method: 'PUT',
        headers: {
            filename: fileName,
            'Content-Type': 'application/octet-stream',
            'Content-Encoding': 'gzip'
        }
    };
    const req = http.request(options, res => {
        console.log('Server response: ' + res.statusCode);
    });

    var a = new stream.PassThrough()
    a.write(file);
    a.end();
    a.pipe(zlib.createGzip())
        .pipe(crypto.createCipher('aes192', 'niki'))
        .pipe(req)
        .on('finish', () => {
            console.log('File successfully sent')
        })
        .on('error', (err) => {
            console.log('error in send file ' + err);

        });
}