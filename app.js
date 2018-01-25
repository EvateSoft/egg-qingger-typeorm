"use strict";
/**
 * Created by Qingger Corp.
 * User: jsspf
 * Date: 2018/1/24
 * Time: 0:43
 */
Object.defineProperty(exports, "__esModule", { value: true });
const qinggerTypeorm = require("./lib/qinggerTypeorm");
module.exports = function (app) {
    if (app.config.qinggerTypeorm) {
        qinggerTypeorm(app);
    }
};
//# sourceMappingURL=app.js.map