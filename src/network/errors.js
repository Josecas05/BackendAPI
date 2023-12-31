const answer = require ('./answers');

function errors( error, req, res, next){
    console.error('[error]', error);
    const massage = error.massage || 'Error interno';
    const status = error.statusCode || 500;
    if (error.code === 'ER_DUP_ENTRY') {
      return answer.error(req, res, 'La entrada ya existe en la base de datos', 409); // HTTP 409, "Conflict"
    }
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
         return answer.error(req, res, 'La refencia no existe', 404); // 404 para Not Found
      }
    answer.error(req,res,massage,status);
}

module.exports = errors;