/** * Created by Qingger Corp.
 * User: jsspf
 * Date: 2018/1/24
 * Time: 0:27
 */
import {Connection} from "typeorm";

declare module 'egg' {

    export interface Application {
        qinggerTypeorm : Connection,
        config : any
    }

}