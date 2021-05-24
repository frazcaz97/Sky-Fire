import { enableDebugs } from "./utils/debug/debug.js";
import { print } from "./utils/debug/print.js";
import fileType from "./utils/fileType.js";
import EventManager from "./event/eventManager.js";
import State from "./state/state.js";
import Display from "./display/display.js";
import ResourceManager from "./resource/resourceManager.js";

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
        "enableDebugs": enableDebugs,
        /**
         * Logs a value to the console
         * @name log
         * @memberof fe.debugs
         * @param {any} value - Value to be logged to the console
         */
        "print": print,
    },
    "utils": {
        "fileType": fileType,
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
    /**
     * Resource System - Used to preload resources into the game, objects access resources from the manager,
     * this optimises the amount of loading and memory needed when the game is running.
     * @name resource
     * @memberof fe
     */
    "resource": ResourceManager,
}

export default fe;