DELIMITER $$
DROP TRIGGER IF EXISTS insert_date_to_orders $$
CREATE TRIGGER insert_date_to_orders
BEFORE INSERT ON orders FOR EACH ROW
BEGIN
	SET NEW.order_date = NOW();
END $$
DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS insert_to_orders $$
CREATE PROCEDURE insert_to_orders(IN username varchar(40),IN gas_type varchar(40),IN payment_method varchar(20),IN amount INT)
	BEGIN
    	DECLARE id int;
        SET foreign_key_checks = 0;
        SET id = FLOOR(RAND()*100000000);
        INSERT INTO order_status(order_id,order_status) VALUES(id,"pending");
		INSERT INTO orders(order_id,username,company_name,gas_type) VALUES(id,username,getUserCompany(username),gas_type);
        INSERT INTO payment(order_id,payment_method,amount) VALUES(id,payment_method,amount);
        SET foreign_key_checks = 1;
	END $$
 DELIMITER ;

DELIMITER $$
DROP FUNCTION IF EXISTS getUserCompany $$
CREATE FUNCTION getUserCompany(username varchar(40)) RETURNS varchar(20)
BEGIN
  DECLARE company_name varchar(20);
  Select company into company_name FROM customer WHERE customer.username = username;
  RETURN company_name;
END $$
DELIMITER ;


CREATE VIEW IF NOT EXISTS get_dealer_orders AS
SELECT order_id,customer.username,gas_type,address,License_No from customer join (select order_id,username,gas_type,License_No from dealer join (select orders.order_id,username,company_name,gas_type from order_status join orders on order_status.order_id = orders.order_id WHERE order_status.order_status ="pending") as t on t.company_name = dealer.company_name) as c on customer.username = c.username;

ALTER TABLE dealer ADD UNIQUE (company_name);
alter TABLE gas_type add FOREIGN key(company_name) REFERENCES dealer(company_name) on DELETE CASCADE on update cascade ;

DELIMITER $$
DROP TRIGGER IF EXISTS decrease_quantity $$
CREATE TRIGGER decrease_quantity
after INSERT ON orders FOR EACH ROW
BEGIN
	DECLARE variable int;
    select quantity into variable from gas_type WHERE company_name=NEW.company_name and gas_type=NEW.gas_type;
	update gas_type SET quantity=variable-1 where company_name=NEW.company_name and gas_type=NEW.gas_type;
END $$
DELIMITER ;


DELIMITER $$
DROP FUNCTION IF EXISTS getOrderStatus $$
CREATE FUNCTION getOrderStatus(order_id int) RETURNS varchar(10)
BEGIN
  DECLARE variable varchar(10);
  Select order_status into variable FROM order_status WHERE order_status.order_id = order_id;
  RETURN variable;
END $$
DELIMITER ;


-- trigger to backup orders table
DELIMITER $$
DROP TRIGGER IF EXISTS backup_orders $$
CREATE TRIGGER backup_orders
AFTER INSERT ON orders FOR EACH ROW
BEGIN
  INSERT INTO backup_orders VALUES(NEW.order_id,NEW.username,NEW.company_name,NEW.gas_type,NEW.order_date,getOrderStatus(NEW.order_id));
END $$
DELIMITER ;

alter table backup_orders ADD PRIMARY KEY (order_id);

DELIMITER $$
DROP PROCEDURE IF EXISTS update_backup_orders $$
CREATE PROCEDURE update_backup_orders(IN order_id int,IN order_status varchar(10))
	BEGIN 
    	UPDATE backup_orders SET order_status = order_status WHERE backup_orders.order_id = order_id;
	END $$
 DELIMITER ;


DELIMITER $$
DROP TRIGGER IF EXISTS update_backup_orders_status $$
CREATE TRIGGER update_backup_orders_status
AFTER UPDATE ON order_status FOR EACH ROW
BEGIN
  CALL update_backup_orders(NEW.order_id,NEW.order_status);
END $$
DELIMITER ;

-- create a cursor to get orders of particular date(varchar(20)) from orders table
-- DELIMITER $$
-- DROP PROCEDURE IF EXISTS get_orders_by_date $$
-- CREATE PROCEDURE get_orders_by_date(IN date varchar(20))
--   BEGIN 
--     	DECLARE done INT DEFAULT FALSE;
--         DECLARE order_id int;
--         DECLARE username varchar(40);
--         DECLARE company_name varchar(20);
--         DECLARE gas_type varchar(40);
--         DECLARE order_date varchar(20);
--         DECLARE cur CURSOR FOR SELECT * FROM orders WHERE substring(order_date,1,10) = substring(date,1,10);
--         DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
--         OPEN cur;
--         read_loop: LOOP
--         	FETCH cur INTO order_id,username,company_name,gas_type,order_date;
--             IF done THEN
--             	LEAVE read_loop;
--             END IF;
--             SELECT order_status INTO order_status FROM order_status WHERE order_id = order_id;
--             INSERT INTO backup_orders VALUES(order_id,username,company_name,gas_type,order_date,order_status);
--         END LOOP;
--         CLOSE cur;
--   END $$
--  DELIMITER ;

-- cursor to get total spendings of a customer
DELIMITER $$
DROP FUNCTION IF EXISTS get_total_spendings $$
CREATE FUNCTION get_total_spendings(username varchar(40))
RETURNS int
  BEGIN 
    	DECLARE done INT DEFAULT FALSE;
        DECLARE variable_amount int;
        Declare total int DEFAULT 0;
        DECLARE cur CURSOR FOR SELECT amount FROM payment WHERE payment.order_id IN (SELECT order_id FROM orders WHERE orders.username = username);
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
        OPEN cur;
        read_loop: LOOP
        	FETCH cur INTO variable_amount;
            IF done THEN
            	LEAVE read_loop;
            END IF;
            SET total = total + variable_amount;
        END LOOP;
        CLOSE cur;
        RETURN total;
  END $$
 DELIMITER ;

ALTER TABLE orders ADD FOREIGN key(company_name) REFERENCES dealer(company_name) on DELETE CASCADE on update cascade ;

ALTER TABLE orders ADD FOREIGN key(username) REFERENCES customer(username) on DELETE CASCADE on update cascade ;

ALTER TABLE order_status ADD FOREIGN key(order_id) REFERENCES orders(order_id) on DELETE CASCADE on update cascade ;


ALTER TABLE order_status ADD FOREIGN key(order_id) REFERENCES orders(order_id) on DELETE CASCADE on update cascade ;

ALTER TABLE payment ADD FOREIGN key(order_id) REFERENCES orders(order_id) on DELETE CASCADE on update cascade ;

ALTER TABLE customer ADD FOREIGN KEY(company) REFERENCES dealer(company_name) on DELETE SET NULL on update CASCADE; 

SELECT order_id,order_date,order_status from orders  natural join(SELECT order_id,order_status from order_status except SELECT order_id,order_status from order_status WHERE order_status="pending") as c where c.order_id=orders.order_id and orders.username="girish" ORDER by order_date LIMIT 3;