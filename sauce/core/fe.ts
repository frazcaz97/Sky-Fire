import { enableDebugs, isEnabled } from "./utils/debug/debug.js";
import { print } from "./utils/debug/print.js";
import Performance from "./utils/debug/performance.js";
import fileType from "./utils/fileType.js";
import range from "./utils/math/range.js";
import vec2 from "./utils/math/vec2.js";
import EventManager from "./event/eventManager.js";
import State from "./state/state.js";
import Display from "./display/display.js";
import ResourceManager from "./resource/resourceManager.js";
import InputManager from "./input/inputManager.js";
import InputComponent from "./input/inputComponent.js";
import Renderer from "./render/renderer.js";
import SpriteComponent from "./render/components/spriteComponent.js";
import AnimationComponent from "./render/components/animationComponent.js";

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
         * @name enableDebugs
         * @memberof fe.debugs
         * @param {boolean} value - Value to enable or disable the debugs
         */
        "enableDebugs": enableDebugs,
        /**
         * check if debugs are enabled
         * @name isEnabled
         * @memberof fe.debugs
         */
        "isEnabled": isEnabled,
        /**
         * Logs a value to the console
         * @name log
         * @memberof fe.debugs
         * @param {any} value - Value to be logged to the console
         */
        "print": print,
        /**
         * logs performance metrics table to console
         * @name 
         * @memberof fe.debugs
         */
        "performance": Performance
    },
    /**
     * Utilities - functions provided by the game engine
     * @name utils
     * @memberof fe
     */
    "utils": {
        /**
         * returns the file extension of a file type
         * @name fileType
         * @memberof fe.utils
         */
        "fileType": fileType
    },
    /**
     * Math - functions and classes provided by the game engine
     * @name Math
     * @memberof fe
     */
    "Math": {
        /**
         * checks if a value is within range
         * @name isInRange
         * @memberof fe.Math
         * @param {number} value - value to check
         * @param {number} min - minimum range value
         * @param {number} max - maximum range value
         */
        "Range": range,
        /**
         * geometry vector class
         * @name vec3
         * @memberof fe.Math
         * @param {number} x - value of x positional
         * @param {number} y - value of y positional
         */
        "vec2": vec2,
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
    /**
     * Input System - Used to track input events from keyboard and attach keyboard events to an entity
     * @name input
     * @memberof fe
     */
    "input": {
        /**
         * Input Manager - handles any input events, triggers entity functionality when input is pressed
         * @name manager
         * @memberof fe.input
         */
        "manager": InputManager,
        /**
         * Input Component - Added to a player entity allows for functionality to be trigged by a input event
         * @name component
         * @memberof fe.input
         * @param { any } self - pass the player entity instance to hook them together
         */
        "component": InputComponent
    },
    "render": {
        "components": {
            "sprite": SpriteComponent,
            "animation": AnimationComponent
        }
    }
}

export default fe;