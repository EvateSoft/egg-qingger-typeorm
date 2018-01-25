/**
 * Created by Qingger Corp.
 * User: jsspf
 * Date: 2018/1/24
 * Time: 0:37
 */
const qinggerTypeorm = require("./lib/qinggerTypeorm");
module.exports = function (agent) {
    if (agent.config.qinggerTypeorm) {
        return qinggerTypeorm(agent);
    }
};
//# sourceMappingURL=agent.js.map