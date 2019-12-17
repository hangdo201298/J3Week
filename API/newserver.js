var Connection = require('tedious').Connection;  
var config = {  
    server: 'DESKTOP-A73NUDM',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', //update me
            password: '123456'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'SHOP'  //update me
    }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
    // If no error, then good to proceed.
    console.log("Connected");  
});  

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

