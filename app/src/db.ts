import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const connectionConfig: { [key: string]: string } = {
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASS,
  database: process.env.DB_NAME,
};

const connection: mysql.Connection = mysql.createConnection(connectionConfig);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log(
    "connected as id " +
      connection.threadId +
      "\nhost: " +
      process.env.MARIADB_HOST +
      "\nport: " +
      process.env.MARIADB_PORT
  );
});

connection.query("SELECT * FROM users", function (error, results, fields) {
  if (error) throw error;

  console.log(results);
});

connection.end();
