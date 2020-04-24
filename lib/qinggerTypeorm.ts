/// <reference path="../index.d.ts" />
import "reflect-metadata";
const assert = require("assert");
import {createConnection,getConnection} from "typeorm";
import {Application} from "egg";

module.exports = async function (app:Application) {
    let config = app.config.qinggerTypeorm;
    assert(config.type && config.database ,
        `[egg-typeorm] 'host: ${config.type}', 'database: ${config.database}' are required on config`);

    assert((config.username && config.password && config.host)||config.replication,
        `[egg-typeorm] 'username: ${config.username}','password: ${config.password}', 'host: ${config.host}' are required on config`);

    let connection = await createConnection(app.config.qinggerTypeorm).catch((e)=>{
        if (e.name && e.name.match(/AlreadyHasActiveConnectionError/i))  {
            console.log("--------------------------->",e.message);
            return getConnection();
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

