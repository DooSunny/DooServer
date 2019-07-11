const { dbConfig } = require('.');

module.exports = {
  ...dbConfig,
  dialect: 'mysql',
  operatorsAliases: false,
};
