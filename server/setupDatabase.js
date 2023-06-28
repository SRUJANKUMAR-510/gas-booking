const mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
});

createDatabase();

function createDatabase(){
    pool.query("CREATE DATABASE IF NOT EXISTS gasbooking", (err, result) => {
        if (err) throw err;
        console.log("database created");
        setupTable();
    });
};

function setupTable() {
    pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        database: "gasbooking",
    });

    setupAdminTable();
    setupCustomerTable();
    setupDealerTable();
    setupGasTypeTable();
    setupOrderTable();
    setupPaymentTable();
    setupOrderStatus();
    setupBackup_orders();
};

function setupAdminTable() {
    pool.query(
        "CREATE TABLE admin(username varchar(20) PRIMARY KEY,password varchar(20))",
        (err, _) => {
            if (err) throw err;
            console.log("admin table created");
        }
    );
};

function setupCustomerTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS customer (id int AUTO_INCREMENT,firstname varchar(40),lastname varchar(40),username varchar(40) unique not null,password varchar(40),pincode int,email varchar(40) unique not null,address varchar(40),phone_number bigint,company varchar(40),PRIMARY KEY (id))",
        (err, _) => {
            if (err) throw err;
            console.log("customer table created");
        }
    );
};

function setupDealerTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS dealer (dealer_id int AUTO_INCREMENT PRIMARY KEY,company_name varchar(40),License_No varchar(40) unique NOT NULL)",
        (err, result) => {
            if (err) throw err;
            console.log("dealer table created");
        }
    );
};

function setupGasTypeTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS gas_type (gas_id int AUTO_INCREMENT PRIMARY KEY,company_name varchar(40),gas_type varchar(40),price int,quantity int default 50)",
        (err, result) => {
            if (err) throw err;
            console.log("gas_type table created");
        }
    );
};

function setupOrderTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS orders (order_id int PRIMARY KEY,username varchar(40),company_name varchar(20),gas_type varchar(40),order_date varchar(20))",
        (err, result) => {
            if (err) throw err;
            console.log("payment table created");
        }
    );
}


function setupPaymentTable() {
    pool.query(
        "CREATE TABLE if not exists payment(transaction_id int AUTO_INCREMENT PRIMARY KEY,order_id int, payment_method varchar(20),amount int NOT NULL)",
        (err, result) => {
            if (err) throw err;
            console.log("payment table created");
        }
    );
}

function setupOrderStatus() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS order_status(order_id int,order_status varchar(10))",
        (err, result) => {
            if (err) throw err;
            console.log("order status table created");
        }
    )
}

function setupBackup_orders() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS backup_orders(order_id int,username varchar(40),company_name varchar(20),gas_type varchar(40),order_date varchar(20),order_status varchar(10))",
        (err, result) => {
            if (err) throw err;
            console.log("backup_orders table created");
        }
    )
}