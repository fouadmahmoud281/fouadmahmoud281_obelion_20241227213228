CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
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

INSERT INTO Users (name, email, password, phone, address) VALUES ('John Doe', 'john.doe@example.com', 'password123', '1234567890', '123 Main St');
INSERT INTO Users (name, email, password, phone, address) VALUES ('Jane Smith', 'jane.smith@example.com', 'password456', '0987654321', '456 Elm St');

SELECT * FROM Users;

UPDATE Users SET name = 'John Doe Jr.' WHERE id = 1;

DELETE FROM Users WHERE id = 2;
