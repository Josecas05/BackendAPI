const TABLE = "autorarticulo";
const FIELDS = ["idAutor", "idArticulo", "fecha"];

module.exports = function (dataBase) {
  let db = dataBase;
  if (!db) {
    db = require("../../DB/autorArticulo");
  }
  function findAll() {
    return db.findAll(TABLE, FIELDS);
  }
  function findAllDate(startDate, endDate) {
    return db.findAllDate(TABLE, FIELDS,startDate, endDate);
  }

  function find(idAutor, idArticulo) {
    return db.find(TABLE, idAutor, idArticulo, FIELDS);
  }

  function add(body) {
    return db.insert(TABLE, body);
  }

  return {
    findAll,
    find,
    add,
    findAllDate
  };
};
