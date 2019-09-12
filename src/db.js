import knex from 'knex';
import setupPaginator from 'knex-paginator';

import {databaseUrl , databaseDebug} from './config';

const db = knex({
    client: 'pg',
    connection: databaseUrl,
    migrations: {tableName: 'migrations'},
    debug: databaseDebug === true});

setupPaginator(db);

module.exports = db;
