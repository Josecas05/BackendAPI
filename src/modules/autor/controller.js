const TABLE = 'autor';
const commonQueries = require('../../DB/CommonQueries');

module.exports= function (dataBase){
    let db = dataBase;
    if(!db){
        db = require('../../DB/author');
    }
    function findAll (){
        return db.findAll(TABLE);
   }
   function find(id){
       return db.find(TABLE, id);
   }
   
   function delated(body){
       return commonQueries.delated(TABLE, body);
   }
   
   function add(body){
       return commonQueries.add(TABLE, body);
   }

   return {
    findAll,
    find,
    delated,
    add
   };
    
}