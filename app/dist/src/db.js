import dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();
const connectionConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};
const connection = mysql.createConnection(connectionConfig);
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId + "\nhost: " + process.env.DB_HOST + "\nport: " + process.env.DB_PORT);
    connection.query(`INSERT INTO users (name, email, password_hash, validation_token) VALUES 
        ('biel', 'biel@gmail.com', '123456', '12345678901234567892345678912343'), 
        ('allyce', 'lyce@gmail.com', '12345678', '12345678901234567892345678912343');`, function (error, results, fields) {
        if (error)
            throw error;
        console.log(results);
        connection.end(); // Close the connection after the query is complete
    });
});
