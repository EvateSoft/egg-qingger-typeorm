/**
 * Created by Qingger Corp.
 * User: jsspf
 * Date: 2018/1/24
 * Time: 0:43
 */

const qinggerTypeorm = require("./lib/qinggerTypeorm");
import {Application} from "egg";

module.exports = function (app:Application) {
    if (app.config.qinggerTypeorm) {
        qinggerTypeorm(app);
    }
};