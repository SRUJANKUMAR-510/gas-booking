const mysql = require("mysql");
const fs = require("fs");

class GasBookingDatabase {
    constructor() {
        this.pool = null;
    }

    connect() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            database: "gasbooking",
        });

        // this.pool = mysql.createPool({
        //     host: process.env.DATABASE_HOST,
        //     user: process.env.DATABASE_USER,
        //     password: process.env.DATABASE_PASSWORD,
        //     database: "gasbooking",
        //     port: 3306,
        //     ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") },
        // });

        this.pool.query("select * from Admin", (err, _) => {
            if (err) {
                console.log("unable to connect database");
                return;
            }
            console.log("connected to database");
        });
    }

    register(
        {
            firstname,
            lastname,
            username,
            password,
            pincode,
            email,
            address,
            phone_number,
        },
        callback
    ) {
        this.pool.query(
            `INSERT INTO customer (firstname,lastname,username,password,pincode,email,address,phone_number) VALUES ('${firstname}','${lastname}','${username}','${password}',${pincode},'${email}','${address}',${phone_number})`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully registered");
                callback(true);
            }
        );
    }

    checkUser({ username, password }, callback) {
        this.pool.query(
            `select username,password from customer where username='${username}' and password='${password}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        );
    }

    getEmail({ username }, callback) {
        this.pool.query(
            `select email from customer where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(result[0].email);
                else callback(false);
            }
        );
    }

    checkDealer({ username }, callback) {
        this.pool.query(
            `select License_No from dealer where license_no='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        );
    }

    updateProfile({ address, pincode, username }, callback) {
        this.pool.query(
            `UPDATE customer SET address='${address}',pincode='${pincode}' WHERE username='${username}'`,
            (err, _) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully updated");
                callback(true);
            }
        );
    }

    getProfile(username, callback) {
        this.pool.query(
            `select * from customer where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getOrders(username, callback) {
        this.pool.query(
            `select * from orders join payment on orders.order_id = payment.order_id where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getTotalSpendings({ username }, callback) {
        this.pool.query(
            `select get_total_spendings('${username}') as total_spendings`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getTotalOrders({ username }, callback) {
        this.pool.query(
            `select count(*) as total_orders from orders where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getGasTypesByUser({ username }, callback) {
        this.pool.query(
            `select g.gas_type,g.price,g.company_name from gas_type as g inner join customer as c on g.company_name=c.company where c.username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getGasTypes(callback) {
        this.pool.query(
            `select gas_type,price,company_name from gas_type`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getPendingOrders({username}, callback) {
        this.pool.query(
            `SELECT order_id,order_date,order_status from orders natural join (SELECT order_id,order_status from order_status EXCEPT SELECT order_id,order_status from order_status 
                WHERE order_status="shipped") as c where c.order_id=orders.order_id and orders.username='${username}' ORDER by order_date LIMIT 3;`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                console.log(result);
                callback(result);
            }
        );
    }

    getGasCompanies(callback) {
        this.pool.query(`select company_name from dealer`, (err, result) => {
            if (err) {
                console.log(err);
                callback([]);
                return;
            }
            callback(result);
        });
    }

    getGasTypesByCompany(company, callback) {
        this.pool.query(
            `select gas_type,price from gas_type where company_name='${company}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }
    updatePassword({ username, password, email }, callback) {
        console.log(username);
        this.pool.query(
            `update customer set password='${password}' where username='${username}' and email='${email}'`,
            (err, _) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                callback(true);
            }
        );
    }

    insertOrder(order, callback) {
        this.pool.query(
            `CALL insert_to_orders('${order.username}','${order.gas_type}','${order.payment_method}',${order.amount})`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully inserted");
                callback(true);
            }
        );
    }

    updateCompany({ username, company }, callback) {
        this.pool.query(
            `UPDATE customer SET company='${company}' WHERE username='${username}'`,
            (err, _) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully updated");
                callback(true);
            }
        );
    }

    getDealerOrders({ username }, callback) {
        this.pool.query(
            `SELECT * FROM get_dealer_orders WHERE License_No='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                console.log(result);
                callback(result);
            }
        );
    }

    getUserSpendingByCompany({ username }, callback) {
        this.pool.query(
            `select company_name,SUM(amount) as total_spending from (select order_id,company_name from orders where username='${username}') as c join payment where c.order_id=payment.order_id GROUP by company_name`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    updateOrderStatus({ order_id }, callback) {
        this.pool.query(
            `UPDATE order_status SET order_status='shipped' WHERE order_id=${order_id}`,
            (err, _) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully updated");
                callback(true);
            }
        );
    }

    getAllTables(callback) {
        this.pool.query(`Show tables`, (err, result) => {
            if (err) {
                console.log(err);
                callback([]);
                return;
            }
            callback(result);
        });
    }

    getTable(table, callback) {
        this.pool.query(`select * from ${table}`, (err, result) => {
            if (err) {
                console.log(err);
                callback([]);
                return;
            }
            callback(result);
        });
    }

    deleteRow({ table, row }, callback) {
        let condition = Object.keys(row)
            .filter((key) => (row[key] ? true : false))
            .map((key) => `${key}='${row[key]}'`)
            .join(" AND ");
        this.pool.query(`delete from ${table} where ${condition}`, (err, _) => {
            if (err) {
                console.log(err);
                callback(false);
                return;
            }
            callback(true);
        });
    }

    updateRow({ table, prevRow, row }, callback) {
        let condition = Object.keys(prevRow)
            .filter((key) => (prevRow[key] ? true : false))
            .map((key) => `${key}='${prevRow[key]}'`)
            .join(" AND ");
        let update = Object.keys(row)
            .map((key) => `${key}='${row[key]}'`)
            .join(",");
        console.log(update);
        console.log(condition);
        this.pool.query(
            `update ${table} set ${update} where ${condition}`,
            (err, _) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                callback(true);
            }
        );
    }

    insertRow({ table, row }, callback) {
        let keys = Object.keys(row).join(",");
        let values = Object.values(row)
            .map((value) => `'${value}'`)
            .join(",");
        this.pool.query(
            `insert into ${table} (${keys}) values (${values})`,
            (err, _) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                callback(true);
            }
        );
    }

    runQuery(query, callback) {
        this.pool.query(query, (err, result) => {
            callback(err, result);
        });
    }
}

module.exports = GasBookingDatabase;
