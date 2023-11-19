const db = require("./db");

const connection = db.getConnection();

function findAll(table) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${table}.id , ${table}.nombre,${table}.apellido,${table}.direccion,institucion.nombre AS institucion,${table}.modificado
    FROM ${table}
    LEFT JOIN institucion ON ${table}.idInstitucion = institucion.id
    WHERE ${table}.activo = 1;`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function find(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${table}.id,${table}.nombre,${table}.apellido,${table}.direccion,institucion.nombre AS institucion,${table}.modificado
        FROM ${table} LEFT JOIN institucion ON ${table}.idInstitucion = institucion.id
        WHERE ${table}.id =${id} AND ${table}.activo = 1;`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

module.exports = {
  findAll,
  find,
};
