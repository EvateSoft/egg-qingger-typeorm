/**
 * Created by Qingger Corp.
 * User: jsspf
 * Date: 2018/1/24
 * Time: 0:43
 */
/// <reference path="./index.d.ts" />
import "reflect-metadata";
import {createConnection} from "typeorm";
import {Application} from "egg";
const assert = require("assert");

module.exports = function (app:Application) {
    app.addSingleton('qinggerTypeorm',createClient)
};

async function createClient(config,app:Application) {
    assert(config.type && config.database ,
        `[egg-typeorm] 'host: ${config.type}', 'database: ${config.database}' are required on config`);

    assert((config.username && config.password && config.host)||config.replication,
        `[egg-typeorm] 'username: ${config.username}','password: ${config.password}', 'host: ${config.host}' are required on config`);

    const client = await createConnection(config);

    // 做启动应用前的检查
    let count = 1;
    app.beforeStart(async function startMysql() {
        const rows = await client.manager.query('select now() as currentTime;');
        app.coreLogger.info(`[egg-typeorm] init instance success, rds currentTime: ${rows[0].currentTime}`);
    });


    app.qinggerTypeorm = client;

    return client;
}