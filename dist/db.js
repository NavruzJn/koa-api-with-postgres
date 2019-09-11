"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _knex = _interopRequireDefault(require("knex"));

var _config = require("./config");

var db = (0, _knex["default"])({
  client: 'pg',
  connection: _config.databaseUrl,
  migrations: {
    tableName: 'migrations'
  },
  debug: _config.databaseDebug === true
});
module.exports = db;