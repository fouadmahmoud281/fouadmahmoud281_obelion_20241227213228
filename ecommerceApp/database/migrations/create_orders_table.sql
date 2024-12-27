CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255)
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    productDetails JSON NOT NULL,
    status ENUM('pending', 'completed', 'shipped', 'cancelled') NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

INSERT INTO Users (name, email, password, phone, address) VALUES
('John Doe', 'john@example.com', 'hashed_password', '1234567890', '123 Elm Street'),
('Jane Smith', 'jane@example.com', 'hashed_password', '0987654321', '456 Oak Avenue');

INSERT INTO Orders (userId, productDetails, status, totalAmount) VALUES
(1, '{"product": "Laptop", "quantity": 1}', 'pending', 1200.00),
(2, '{"product": "Phone", "quantity": 2}', 'completed', 800.00);

SELECT * FROM Users;

SELECT * FROM Orders;

UPDATE Users SET address = '789 Pine Road' WHERE id = 1;

UPDATE Orders SET status = 'shipped' WHERE id = 1;

DELETE FROM Users WHERE id = 2;

DELETE FROM Orders WHERE id = 2;
