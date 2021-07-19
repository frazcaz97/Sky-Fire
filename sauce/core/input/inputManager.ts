
/**
 * Type defined for key state
 * @name key
 * @typedef { [key: string]: boolean }    - True means key is pressed
 */
type key = {
    [key: string]: boolean
}

/**
 * Input Manager - (Singleton) keeps track of any user input
 * @class
 * @classdesc listens for any user input (controller support to be added later)
 */
class InputManager {

    /**
     * Key Map - stores the state of each key using key type
     * @name _keymap
     * @type { key }
     */
    private _keymap: key

    constructor() {
        this._keymap = {}

        //add keyboard events listeners
        addEventListener("keydown", this.eventTriggered.bind(this));
        addEventListener("keyup", this.eventTriggered.bind(this));
    }

    /**
     * Method is called when key is pressed
     * @method eventTriggered
     * @private
     * @name eventTriggered
     * @namespace InputManager
     * @param e - event object passed from the event listener on callback
     */
    private eventTriggered(e: KeyboardEvent): void {
        const code = e.code;
        const type = e.type;
        this._keymap[code] = (type === "keydown") ? true : false;   //updates keymap with new value
    }

    get keymap() {
        return this._keymap;
    }
}

export default new InputManager();
