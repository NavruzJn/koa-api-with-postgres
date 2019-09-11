import knex from 'knex';

import {databaseUrl , databaseDebug} from './config';

const db = knex({
    client: 'pg',
    connection: databaseUrl,
    migrations: {tableName: 'migrations'},
    debug: databaseDebug === true});

module.exports = db;
