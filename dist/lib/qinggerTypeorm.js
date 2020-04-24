"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../index.d.ts" />
require("reflect-metadata");
const assert = require("assert");
const typeorm_1 = require("typeorm");
module.exports = async function (app) {
    let config = app.config.qinggerTypeorm;
    assert(config.type && config.database, `[egg-typeorm] 'host: ${config.type}', 'database: ${config.database}' are required on config`);
    assert((config.username && config.password && config.host) || config.replication, `[egg-typeorm] 'username: ${config.username}','password: ${config.password}', 'host: ${config.host}' are required on config`);
    let connection = await typeorm_1.createConnection(app.config.qinggerTypeorm).catch((e) => {
        if (e.name && e.name.match(/AlreadyHasActiveConnectionError/i)) {
            console.log("--------------------------->", e.message);
            return typeorm_1.getConnection();
        }
        throw e;
    });
    app.qinggerTypeorm = connection;
    ///@ts-ignore : assign app to connection object
    connection.app = app;
    let count = 1;
    app.beforeStart(async function startMysql() {
        const rows = await connection.manager.query('select 1 as column1;');
        const index = count++;
        app.coreLogger.info(`[egg-typeorm] instance[${index}] status OK, rds currentTime: ${rows[0].currentTime}`);
    });
    return connection;
};
