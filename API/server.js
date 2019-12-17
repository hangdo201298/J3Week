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
    password: '123456',
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
    console.log('connect API'); 
    res.send('connect API success');
});

app.get('/users/all', function (req, res) {
    console.log('load all user');
    sqlQuery("select * from Users", function(err, results){

        var code = 0;
        if (err) {
            var dataresponse = {
                'code' : code,
                'data' : 'error'
            }
            res.send(dataresponse);
            throw err;
        }
        
        else {
            console.log(results);
            code = 1;
            var dataresponse = {
                'code' : code,
                'data' : results.recordset
            }
            res.send(dataresponse);
        }
        
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
        
        console.log(result);
        
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
        
        var code = 0;
        if (err) {
            var dataresponse = {
                'code' : code,
                'data' : 'error'
            }
            response.send(dataresponse);
            throw err;
        }
        else{
            console.log(recordsets);
            code = 1;
            var dataresponse = {
                'code' : code,
                'data' : 'Thêm thành công'
            }
            response.send(dataresponse);    
        }
        
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
        var code = 0;
        if (err) {
            var dataresponse = {
                'code' : code,
                'data' : 'error'
            }
            response.send(dataresponse);
            throw err;
        }
        else{
            console.log(recordsets);
        
            code = 1;
            var dataresponse = {
                'code' : code,
                'data' : 'Cập nhật thành công'
            }
            response.send(dataresponse);    
        }
        
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
        }
        else {
        if(result.recordset.length == 1  ){
            console.log("Login success"); 
            code = 1;
        }

        var dataresponse = {
            'code' : code,
            'data' : result.recordset
        }
        res.send(dataresponse);
        }
    });
});


app.delete('/users/:id', (req, res) => {
    console.log('delete id data');
    const id = req.params.id;
 
    sqlQuery(`DELETE from Users where UserID = \'${id}\'`, function(err, result) {
        var code = 0;
        if (err) {
            var dataresponse = {
                'code' : code,
                'data' : 'error'
            }
            res.send(dataresponse);
            throw err;
        }
        else{
            
            console.log(result);
        
            code = 1;
            var dataresponse = {
                'code' : code,
                'data' : 'Xóa thành công'
            }
            res.send(dataresponse);    
        }
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});

