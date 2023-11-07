const db = require('./db');

const connection = db.getConnection();

function findAll(table,fields){
  return new Promise ((resolve, reject)=> {
    if (!fields || fields.length === 0) {
        return reject('Debes proporcionar al menos un campo para seleccionar.');
    }
    const fieldList = fields.join(', ');
    connection.query(`SELECT ${fieldList}
    FROM ${table};`,(error,result)=> {
                        return error ? reject(error) : resolve(result);
                        });
  });

}

function find(table,idAutor,idArticulo,fields){
    return new Promise ((resolve, reject)=> {
        if (!fields || fields.length === 0) {
            return reject('Debes proporcionar al menos un campo para seleccionar.');
        }
        const fieldList = fields.join(', ');
        connection.query(`SELECT ${fieldList}
        FROM ${table} 
        WHERE ${table}.idAutor =${idAutor} AND ${table}.idArticulo = ${idArticulo};`,(error,result)=> {
                            return error ? reject(error) : resolve(result);
                            });
      });
}

function insert(table,data){
    return new Promise ((resolve, reject)=> {
        connection.query(`INSERT INTO ${table}  
        SET ?;`,data, (error,result)=> {
                            return error ? reject(error) : resolve(result);
                            });
      });
}




module.exports = {
    findAll,
    find,
    insert
}