/// <reference path="../index.d.ts" />

const assert = require("assert");
import {createConnection} from "typeorm";
import {Application} from "egg";

module.exports = function (app:Application) {
    return app.addSingleton('qinggerTypeorm',createOneClient);
};

function createOneClient(config:any,app:Application) {
    assert(config.type && config.database,
        `[egg-typeorm] 'host: ${config.type}', 'database: ${config.database}' are required on config`);

    assert((config.username && config.password && config.host)||config.replication,
        `[egg-typeorm] 'username: ${config.username}','password: ${config.password}', 'host: ${config.host}' 
            are required on config`);

    app.coreLogger.info('[egg-typeorm] connecting %s@%s:%s/%s',
        config.user, config.host, config.port, config.database);


    const connectConfig = config;

    let count = 1;
    app.beforeStart(async function startMysql() {
        const connection = await createConnection(connectConfig);
        const rows = await connection.manager.query('select 1 as column1;');
        const index = count++;
        app.coreLogger.info(`[egg-typeorm] instance[${index}] status OK, rds currentTime: ${rows[0].currentTime}`);
        app.typeorm = connection;
    });

    // const connectConfig : any = {
    //     // Database type. You must specify what database engine you use.
    //     // Possible values are "mysql", "postgres", "mariadb",
    //     //      "sqlite", "cordova", "oracle", "mssql", "websql", "mongodb", "sqljs".
    //     type : config.type || 'mysql',
    //     host : config.host,
    //     port : config.port,
    //     username : config.user,
    //     password : config.password,
    //     database : config.database,
    //     synchronize: !!config.synchronize,
    //     logging : config.logging || false
    // };
    //
    // /**
    //  * Entities to be loaded and used for this connection.
    //  * Accepts both entity classes and directories paths to load from.
    //  * Directories support glob patterns.
    //  * Example: entities: [Post, Category, "entity/*.js", "modules/entity.js"]
    //  */
    // if (config.entities) {
    //     connectConfig.entities = config.entities;
    // }
    //
    // /**
    //  * - Subscribers to be loaded and used for this connection.
    //  *   Accepts both entity classes and directories to load from.
    //  *   Directories support glob patterns.
    //  *   Example: subscribers: [PostSubscriber, AppSubscriber, "subscriber.js", "modulessubscriber.js"]
    //  */
    // if (config.subscribers) {
    //     connectConfig.subscribers = config.subscribers;
    // }
    //
    // /**
    //  * Entity schemas to be loaded and used for this connection.
    //  * Accepts both entity schema classes and directories to load from.
    //  * Directories support glob patterns
    //  */
    // if (config.entitySchemas) {
    //     connectConfig.entitySchemas = config.entitySchemas;
    // }
    //
    // /**
    //  * Migrations to be loaded and used for this connection.
    //  * Accepts both migration classes and directories to load from
    //  */
    // if (config.migrations) {
    //     connectConfig.migrations = config.migrations;
    // }
}