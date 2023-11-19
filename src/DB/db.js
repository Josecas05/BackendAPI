const mysql = require("mysql2");
const config = require("../config");

const dataBaseConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.dataBase,
};

let connection;

function createMysqlConnection() {
  return mysql.createConnection(dataBaseConfig);
}

function getConnection() {
  if (!connection) {
    connection = createMysqlConnection();
    connection.connect((error) => {
      if (error) {
        console.log("[Database error]", error);
        setTimeout(createConnection, 200);
      } else {
        console.log("Base de datos conectada");
      }
    });

    connection.on("error", (error) => {
      console.log("[Database error]", error);
      if (error.code === "PROTOCOL_CONNECTION_LOST") {
        connection = null; // Restablecer la conexión en caso de pérdida
        createMysqlConnection(); // Crear una nueva conexión
      } else {
        throw error;
      }
    });
  }
  return connection;
}
module.exports = {
  getConnection,
};
