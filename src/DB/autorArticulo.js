const db = require("./db");

const connection = db.getConnection();

function findAll(table, fields) {
  return new Promise((resolve, reject) => {
    if (!fields || fields.length === 0) {
      return reject("Debes proporcionar al menos un campo para seleccionar.");
    }

    const fieldList = fields
      .map((field) => {
        if (field === "idAutor") {
          return "autor.nombre AS nombreAutor";
        } else if (field === "idArticulo") {
          return "articulo.titulo AS tituloArticulo";
        } else {
          return `${table}.${field}`;
        }
      })
      .join(", ");

    const query = `SELECT idArticulo,${fieldList}, DATE_FORMAT(${table}.fecha, '%Y-%m-%d') AS fecha
                     FROM ${table}
                     LEFT JOIN autor ON ${table}.idAutor = autor.id
                     LEFT JOIN articulo ON ${table}.idArticulo = articulo.id`;

    connection.query(query, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}



function find(table, idAutor, idArticulo, fields) {
  return new Promise((resolve, reject) => {
    if (!fields || fields.length === 0) {
      return reject("Debes proporcionar al menos un campo para seleccionar.");
    }
    const fieldList = fields.join(", ");
    connection.query(
      `SELECT ${fieldList}
        FROM ${table} 
        WHERE ${table}.idAutor =${idAutor} AND ${table}.idArticulo = ${idArticulo};`,
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

function findAllDate(table, fields, startDate, endDate) {
  return new Promise((resolve, reject) => {
    if (!fields || fields.length === 0) {
      return reject("Debes proporcionar al menos un campo para seleccionar.");
    }

    let dateFilter = "";
    if (startDate && endDate) {
      dateFilter = `WHERE ${table}.fecha BETWEEN '${startDate}' AND '${endDate}'`;
    }

    const fieldList = fields
      .map((field) => {
        if (field === "idAutor") {
          return "autor.nombre AS nombreAutor";
        } else if (field === "idArticulo") {
          return "articulo.titulo AS tituloArticulo";
        } else {
          return `${table}.${field}`;
        }
      })
      .join(", ");

    const query = `SELECT idAutor ,idArticulo,${fieldList} 
                     FROM ${table}
                     LEFT JOIN autor ON ${table}.idAutor = autor.id
                     LEFT JOIN articulo ON ${table}.idArticulo = articulo.id
                     ${dateFilter}`;

    connection.query(query, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}
function delate(table,idArticulo, fields) {
  return new Promise((resolve, reject) => {
    if (!fields || fields.length === 0) {
      return reject("Debes proporcionar al menos un campo para seleccionar.");
    }
    const fieldList = fields.join(", ");
    connection.query(
      `DELETE FROM ${table} 
        WHERE ${table}.idArticulo = ${idArticulo};`,
      (error, result) => {
        return error ? reject(error) : resolve(result);
      }
    );
  });
}



module.exports = {
  findAll,
  find,
  insert,
  findAllDate,
  delate
};
