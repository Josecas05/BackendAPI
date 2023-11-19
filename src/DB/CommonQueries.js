const db = require("./db");

const connection = db.getConnection();

function findAll(table, fields) {
  return new Promise((resolve, reject) => {
    if (!fields || fields.length === 0) {
      return reject("Debes proporcionar al menos un campo para seleccionar.");
    }
    const fieldList = fields.join(", ");
    connection.query(
      `SELECT ${fieldList}
    FROM ${table}
    WHERE ${table}.activo = 1;`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function find(table, id, fields) {
  return new Promise((resolve, reject) => {
    if (!fields || fields.length === 0) {
      return reject("Debes proporcionar al menos un campo para seleccionar.");
    }
    const fieldList = fields.join(", ");
    connection.query(
      `SELECT ${fieldList}
        FROM ${table} 
        WHERE ${table}.id =${id} AND ${table}.activo = 1;`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${table}  
        SET ?;`,
      data,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} 
        SET ?  WHERE id = ?;`,
      [data, data.id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

function add(table, data) {
  if (data && data.id == 0) {
    return insert(table, data);
  } else {
    return update(table, data);
  }
}

function delated(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} 
      SET activo = 0  WHERE id = ?;`,
      [data.id],
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}

module.exports = {
  findAll,
  find,
  add,
  delated,
};
