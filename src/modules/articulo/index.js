const db = require('../../DB/CommonQueries');
const controller = require('./controller');

module.exports = controller(db);