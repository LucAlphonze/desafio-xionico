CREATE DATABASE [backoffice-db]
GO

USE [backoffice-db];
GO

CREATE TABLE users (
    Id INT NOT NULL IDENTITY,
    Name TEXT NOT NULL,
    Password TEXT NOT NULL,
    PRIMARY KEY (Id)
);
GO

INSERT INTO [users] (Name, Password)
VALUES 
('Admin', 'Admin123$'),
('User', 'User123$'); 
GO