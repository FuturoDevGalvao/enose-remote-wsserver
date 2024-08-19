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
    console.log("connected as id " +
        connection.threadId +
        "\nhost: " +
        process.env.DB_HOST +
        "\nport: " +
        process.env.DB_PORT);
    const SQL = `INSERT INTO sensors (name, active) VALUES ("MQ5", true), ("MQ3", false)`;
    connection.query(SQL, (err, rows) => {
        if (err)
            throw new Error(`Erro ao tentar executar a query: ${err.stack}`);
        console.log(`Resultado da consulta: ${rows}`);
        console.log(rows);
    });
    connection.end();
});
