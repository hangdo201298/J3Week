Create database SHOP
use SHOP

CREATE TABLE Users (
    UserID int,
    LastName varchar(255),
    FirstName varchar(255),
    Passwords varchar(255),
    Email varchar(255)
);


INSERT INTO Users VALUES ('5', 'Tom B', 'Erichsen', '123', 'eri@email');
INSERT INTO Users VALUES ('1', 'Com A', 'LopiP', '124', 'com@email');
INSERT INTO Users VALUES ('3', 'Xiza', 'Pamp', '124', 'xiza@email');


select * from Users where UserID = '' AND Passwords = ${pass}

SELECT * FROM Users WHERE UserID = 1

SELECT * FROM Users;

DELETE FROM Users;