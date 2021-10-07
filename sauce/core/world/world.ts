import Entity from "../entity/entity.js";

/**
 * type defined for entities when added to the world
 * @name gameObject
 * @typedef { [type: string]: {
 *      [id: number]: Entity
 *  }
 * }
 */
type gameObject = {
    [type: string]: {
        [id: number]: Entity
    }
}

/**
 * World manager - (Singleton) adds, removes and updates entities in the game
 * @class
 * @classdesc adds, removes and updates entities in the game
 */
class World {

    /**
     * counter used to assign id's to entities
     * @private
     * @name _nextID
     * @type { number }
     */
    private _nextID: number;

    /**
     * object to store all game objects
     * @private
     * @name _gameOnbjects
     * @type { gameObject }
     */
    private _gameObjects: gameObject;

    constructor() {
        this._nextID = 0;
        this._gameObjects = {};
    }

    /**
     * Method calls all entities update method
     * @method update
     * @private
     * @name update
     * @namespace World
     */
    private update(): void {
        for (let key of Object.keys(this._gameObjects)) {
            for (let entity in this._gameObjects[key]) {
                this._gameObjects[key][entity].update();
            }
        }
    }

    /**
     * Method adds an entity into the world
     * @method add
     * @public
     * @name add
     * @namespace World
     * @param { Entity } entity - the entity object
     * @param { string } type - the type of object it is, used for sorting
     */
    public add(entity: Entity, type: string): void {
        entity.id = this._nextID;
        this._nextID += 1;

        if (this._gameObjects[type] == undefined) {
            this._gameObjects[type] = {};    
        }

        this._gameObjects[type][entity.id] = entity;
    }

    /**
     * Method removes an entity from the world
     * @method remove
     * @public
     * @name remove
     * @namespace World
     * @param { number } id - the entity id used to find the entity in the gameObject parameter
     */
    public remove(id: number): void {
        for (let key of Object.keys(this._gameObjects)) {
            if (this._gameObjects[key] !== undefined) {
                for (let entity in this._gameObjects[key]) {
                    if (Number(entity) === id) {
                        delete this._gameObjects[key][id];        
                    }
                }
            }
            //clean up the gameObjects property if no entities exist for type
            if (Object.keys(this._gameObjects[key]).length === 0) {
                delete this._gameObjects[key];
            }
        }
    }
}

export default new World();