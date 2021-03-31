import { print, isEnabled } from "./utils/debug/print.js";
import EventManager from "./event/eventManager.js";
import State from "./state/state.js";
import Display from "./display/display.js";

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
         * Enables/ Disables debugs
         * @name isEnabled
         * @memberof fe.isEnabled
         * @param {boolean} value - Value to enable or disable the debugs
         */
        "isEnabled": isEnabled,
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
    "event": EventManager,
    /**
     * State System - Game state system controls the entire system
     * @name state
     * @memberof fe
     */
    "state": State,
    /**
     * Display System - Used to render onto the screen, runs webGL by default with canvasAPI fall back
     * @name display
     * @memberof fe
     */
    "display": Display,
}

export default fe;