const TABLE = 'autorarticulo';
const FIELDS = ['idAutor','idArticulo','fecha'];

module.exports= function (dataBase){
    let db = dataBase;
    if(!db){
        db = require('../../DB/autorArticulo');
    }
    function findAll (){
        return db.findAll(TABLE,FIELDS);
   }
   function find(idAutor,idArticulo){
       return db.find(TABLE, idAutor,idArticulo,FIELDS);
   }
   
   function add(body){
       return db.add(TABLE, body);
   }

   return {
    findAll,
    find,
    add
   };
    
}