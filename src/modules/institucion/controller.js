const TABLE = 'institucion';
const FIELDS = ['id','nombre','activo'];

module.exports= function (dataBase){
    let db = dataBase;
    if(!db){
        db = require('../../DB/CommonQueries');
    }
    function findAll (){
        return db.findAll(TABLE,FIELDS);
   }
   function find(id){
       return db.find(TABLE, id,FIELDS);
   }
   
   function delated(body){
       return db.delated(TABLE, body);
   }
   
   function add(body){
       return db.add(TABLE, body);
   }

   return {
    findAll,
    find,
    delated,
    add
   };
    
}