import ResourceManager from "../resource/resourceManager.js";
import EventManager from "../event/eventManager.js";
import InputManager from "./inputManager.js";

/**
 * type defined for callback Function
 * @name callbackFunction
 * @typedef { callback: Function; input: string }
 */
 type callbackFunction = {
    callback: Function,
    input: string,
}

/**
 * type defined for keybinding
 * @name binding
 * @typedef { [actionName: string]: string}
 */
type binding = {
    [actionName: string]: string
}

export default class InputComponent {
    private _filePath: string;
    private _JSON: binding | null;
    private _callbackFunction: callbackFunction[];
    private _parent: any;   //getting the type right on this is stupid, so leaving it as any for now

    constructor(parent: any) {
        this._filePath = "./sauce/core/input/keybinds.json";
        this._JSON = null;
        this._callbackFunction = [];
        this._parent = parent;

        EventManager.subscribe("resource-json-keybinds", this.fileLoaded, this);
        ResourceManager.addResource("keybinds", this._filePath);
    }

    /**
     * Method is called as part of the gameloop when updating the player entity
     * @method update
     * @public
     * @name eventTriggered
     * @namespace InputComponent
     */
    public update(): void {
        const keymap = InputManager.keymap;
        
        for (let binding in this._callbackFunction) {
            const key = this._callbackFunction[binding].input;
            const keyMapValue = keymap[key];
            this._callbackFunction[binding]["callback"](keyMapValue);
        }
    }

    /**
     * Method is called when keybinds file is loaded to match key to function
     * @method match
     * @private
     * @name match
     * @namespace InputComponent
     */
    private match(): void {
        for (let binding in this._JSON) {
            if (this._parent[binding] !== undefined) {
                this._callbackFunction.push({
                    "callback": this._parent[binding].bind(this._parent),
                    "input": this._JSON[binding]
                });
            }
            else {
                console.error(`${binding} method doesn't exist on parent: ${this._parent.constructor}`);
            }
        }
    }

    /**
     * Method is a callback function when keybinds file is loaded
     * @method fileLoaded
     * @private
     * @name fileLoaded
     * @namespace InputComponent
     */
    private fileLoaded(self: this): any {
        self._JSON = ResourceManager.request("keybinds");
        self.match();
    }

    get JSON(): any {
        return this._JSON;
    }
}