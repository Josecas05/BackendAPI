function error (massage, code){
    let error = new Error(massage);
    if(code){
        error.statusCode = code;
    }
    return error;
}

module.exports = error;