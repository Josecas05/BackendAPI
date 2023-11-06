const db = require('../../DB/autorArticulo');
const controller = require('./controller');

module.exports = controller(db);