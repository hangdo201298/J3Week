var express = require('express');
var sql = require("mssql");
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// config for your database
var config = {
    user: 'sa',
    password: '01647893905',
    server: 'localhost', 
    database: 'SHOP' 
};

function sqlQuery(sql_q, callback) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(sql_q, callback);
    });
}


app.get('/', function (req, res) {
    console.log('load API'); //results.recordsets
    res.send('load API hello mọi người');
});

app.get('/users/all', function (req, res) {
    console.log('load get ALL data');
    sqlQuery("select * from Users", function(err, results){
        if (err) throw err;
        
        console.log(results); //results.recordsets
        res.send(results);
    })
});

app.get('/users/:id', (req, res) => {
    console.log('load get id data');
    const id = req.params.id;
 
    sqlQuery(`select * from Users where UserID = \'${id}\'`, function(err, result) {
        var code = 0;
        if (err) {
            var dataresponse = {
                'code' : code,
                'data' : 'error'
            }
            res.send(dataresponse);
            throw err;
        };
        
        console.log(result); //results.recordsets
        console.log(result.rowsAffected);
        
        if(result.recordset.length == 1  ){
            console.log("đúng"); 
            code = 1;
        }

        var dataresponse = {
            'code' : code,
            'data' : result.recordset
        }
        res.send(dataresponse);

    });
});

app.post('/users/addUser', (request, response) => {
    console.log('add USER ---------------');
    var val = request.body;
    console.log('params add-----------');
    console.log(val);

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
    request.input('UserID', sql.Int, val.UserID);
    request.input('LastName', sql.VarChar(255), val.LastName);
    request.input('FirstName', sql.VarChar(255), val.FirstName);
    request.input('Passwords', sql.VarChar(255), val.Passwords);
    request.input('Email', sql.VarChar(255), val.Email);
    request.multiple = true;
    request.query("INSERT INTO Users (UserID, LastName, FirstName, Passwords, Email) VALUES (@UserID, @LastName, @FirstName, @Passwords, @Email)", function(err, recordsets) {
        console.log(recordsets); //results.recordsets
        response.send(recordsets);
        
    });
    });
    
});


app.put('/users/updateUser', (request, response) => {
    console.log('update USER ---------------');
    var val = request.body;
    console.log('params add-----------');
    console.log(val);

    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
    request.input('UserID', sql.Int, val.UserID);
    request.input('LastName', sql.VarChar(255), val.LastName);
    request.input('FirstName', sql.VarChar(255), val.FirstName);
    request.input('Passwords', sql.VarChar(255), val.Passwords);
    request.input('Email', sql.VarChar(255), val.Email);
    request.multiple = true;
    request.query("UPDATE Users SET LastName=@LastName, FirstName=@FirstName, Passwords = @Passwords, Email=@Email WHERE UserID=@UserID", function(err, recordsets) {
        console.log(recordsets); //results.recordsets
        response.send(recordsets);
        
    });
    });
    
});

app.post('/login', (req, res) => {
    console.log('load get id data');
    const email = req.body.Email;
    const pass = req.body.Passwords;

    var code = 0;
 
    sqlQuery(`select * from Users where Email = \'${email}\' AND Passwords = \'${pass}\'`, function(err, result) {
        if (err) {
            var dataresponse = {
                'code' : code,
                'data' : 'error'
            }
            res.send(dataresponse);
            throw err
        };
        if(result.recordset.length == 1  ){
            console.log("đúng"); 
            code = 1;
        }

        var dataresponse = {
            'code' : code,
            'data' : result.recordset
        }
        res.send(dataresponse);
    });
});


app.delete('/users/:id', (req, res) => {
    console.log('delete id data');
    const id = req.params.id;
 
    sqlQuery(`DELETE from Users where UserID = \'${id}\'`, function(err, result) {
        if (err) throw err;
        console.log(result); //results.recordsets
        res.send(result);
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

