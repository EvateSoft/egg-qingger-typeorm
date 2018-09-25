"use strict";
/**
 * Created by Qingger Corp.
 * User: jsspf
 * Date: 2018/1/24
 * Time: 0:37
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const assert = require("assert");
module.exports = function (agent) {
    agent.addSingleton('qinggerTypeorm', createClient);
};
async function createClient(config, agent) {
    assert(config.type && config.database, `[egg-typeorm] 'host: ${config.type}', 'database: ${config.database}' are required on config`);
    assert((config.username && config.password && config.host) || config.replication, `[egg-typeorm] 'username: ${config.username}','password: ${config.password}', 'host: ${config.host}' are required on config`);
    const client = await typeorm_1.createConnection(config);
    // 做启动应用前的检查
    let count = 1;
    agent.beforeStart(async function startMysql() {
        const rows = await client.manager.query('select now() as currentTime;');
        agent.coreLogger.info(`[egg-typeorm] init instance success, rds currentTime: ${rows[0].currentTime}`);
    });
    agent.qinggerTypeorm = client;
    return client;
}
