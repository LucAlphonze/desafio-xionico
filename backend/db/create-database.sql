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

BEGIN
   IF NOT EXISTS (SELECT * FROM [users] 
                   WHERE Name = 'Admin' OR  NAME ='User'
                   AND Password = 'Admin123$' OR PASSWORD ='User123$') 
   BEGIN
INSERT INTO [users] (Name, Password)
VALUES 
('Admin', 'Admin123$'),
('User', 'User123$'); 
   END
END

