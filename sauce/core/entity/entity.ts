/**
 * Base entity class
 * @class
 * @classdesc Base entity class used for everything in the game that needs to update
 */
export default class Entity {
    /**
     * Stores the ID number of the entity, number is assigned when added to a scene.
     * @private
     * @name _id
     * @type { number }
     */
    private _id: number;

    /**
     * Hashtable used to store components
     * @private
     * @name _components
     * @type { any }
     */
    private _components: any;

    constructor() {
        this._id = 0;
        this._components = {};
    }

    /**
     * Method is run by classes that extend this class, only runs the update method of the components
     * @method
     * @public
     * @name update
     * @namespace Entity
     */
    update(): void {
        for (let component in this.components) {
            this.components[component].update();
        }
    }

    /**
     * Method used to add a component to the base entity
     * @method
     * @public
     * @name addComponent
     * @namespace Entity
     * @param { string } name - Name of the component used for the key in the hashtable
     * @param { object } component - Reference to the component object
     */
    addComponent(name: string, component: object): void {
        this.components[name] = component;
    }

    /**
     * Method used to remove a component from the base entity
     * @method
     * @public
     * @name removeComponent
     * @namespace Entity
     * @param {string } name - Used to find the component in the hashtable and delete it 
     */
    removeComponent(name: string): void {
        delete this.components[name];
    }
    
    get id(): number {
        return this._id;
    }

    get components(): any {
        return this._components;
    }
}