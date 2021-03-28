import { enableDebugs, disableDebugs, print } from "./utils/debug/print.js";
import eventManager from "./event/eventManager.js";
import State from "./state/state.js";

/**
 * This is the engine namespace (fe = frosting engine)
 * We use this namespace to access our game engine
 * @const {Object} fe - creates namespace for all engine features
 */
const fe = {
    /**
     * Container for debug utilities
     * @name debugs
     * @memberof fe
     */
    "debugs": {
        /**
         * Enables debugs
         * @name enable
         * @memberof fe.debugs
         */
        "enable": enableDebugs,
        /**
         * Disables debugs
         * @name disable
         * @memberof fe.debugs
         */
        "disable": disableDebugs,
        /**
         * Logs a value to the console
         * @name log
         * @memberof fe.debugs
         * @param {any} value - Value to be logged to the console
         */
        "print": print,
    },
    /**
     * Event System - Allows objects and features publish events or subscribe to listen for them
     * @name event
     * @memberof fe
     */
    "event": eventManager,
    /**
     * State System - Game state system controls the entire system
     * @name state
     * @memberof fe
     */
    "state": State,
}

export default fe;