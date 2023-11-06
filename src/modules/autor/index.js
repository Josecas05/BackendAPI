const db = require('../../DB/author');
const controller = require('./controller');

module.exports = controller(db);