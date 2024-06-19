import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "NEAGUsorinel2003",
  database: "db_reactapp",
});
