require('dotenv').config();
module.exports ={
    app:{
        port: process.env.PORT || 4000 ,
    },
    mysql: {
        host: process.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        dataBase: process.env.MYSQL_DB || 'proyecto',
        
    }

}