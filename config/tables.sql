--CUSTOMER TABLE
CREATE TABLE customer(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(3000)
);

--PRODUCTS TABLE
CREATE TABLE products(
    productID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    price INT NOT NULL,
    description VARCHAR(2000)
);

--CART TABLE
CREATE TABLE cart(
    cartID INT AUTO_INCREMENT PRIMARY KEY,
    customerID INT,
    productID INT,
    quantity INT,
    FOREIGN KEY (customerID) REFERENCES customer(id),  
    FOREIGN KEY (productID) REFERENCES products(productID)
);

--STORE PROCEDURE TO INSERT INTO CUSTOMER TABLE
DELIMITER //
CREATE PROCEDURE insertIntoCustomer(IN name VARCHAR(200), IN email VARCHAR(200), IN password VARCHAR(3000))
BEGIN
INSERT INTO customer(name, email, password) VALUES(name, email, password);
END //
DELIMITER;


--EXAMPLE
-- CALL insertIntoCustomer("DEF", "def@gmail.com", "123456789");


--STORE PROCEDURE TO INSERT INTO PRODUCT TABLE
DELIMITER //
CREATE PROCEDURE insertIntoProducts(IN name VARCHAR(200), IN price INT, IN description VARCHAR(2000))
BEGIN
INSERT INTO products(name, price, description) VALUES(name, price, description);
END //
DELIMITER ;
--EXAMPLE
call insertIntoProducts("Shampoo", 199, "B&C");

--STORE PROCEDURE TO INSERT INTO CART
DELIMITER //
CREATE PROCEDURE insertIntoCart(IN customerID INT, IN productID INT, IN quantity INT)
BEGIN
INSERT INTO cart(customerID, productID, quantity) VALUES(customerID, productID, quantity);
END //
DELIMITER ;

--EXAMPLE
CALL insertIntoCart(1, 1, 1);

--GET CUSTOMER
DELIMITER //
CREATE PROCEDURE getAllCustomer()
BEGIN
SELECT * FROM customer;
END //
DELIMITER ;

CALL getAllCustomer();

--GET ALL PRODUCTS
DELIMITER //
CREATE PROCEDURE getProducts()
BEGIN
SELECT * FROM products;
END //
DELIMITER ;

CALL getProducts();

-- GET ALL CART DETAILS
DELIMITER //
CREATE PROCEDURE getCarts()
BEGIN
SELECT * FROM cart;
END //
DELIMITER ;

CALL getCarts();

--GET CUSTOMER BY EMAIL

DELIMITER //
CREATE PROCEDURE getCustomerByEmail(IN customerEmail VARCHAR(200))
BEGIN 
SELECT * FROM customer WHERE email=customerEmail;
END //
DELIMITER ;

--EXAMPLE
CALL getCustomerByEmail('mailto@gmail.com');

--GET CART BY ID

DELIMITER //
CREATE PROCEDURE getCartByID(IN id INT)
BEGIN 
SELECT * FROM cart WHERE cartID=id;
END //
DELIMITER ;

--EXAMPLE
call getCartByID(1);


--GET CART BY ID
DELIMITER //
CREATE PROCEDURE getProductByID(IN id INT)
BEGIN 
SELECT * FROM products WHERE productID=id;
END //
DELIMITER ;

--EXAMPLE
call getProductByID(2);
