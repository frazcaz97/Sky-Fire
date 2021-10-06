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
     * Stores the entities location in the game world on the x axis
     * @private
     * @name _x
     * @type { number }
     */
    private _x: number;

    /**
     * Stores the entities location in the game world on the y axis
     * @private
     * @name _y
     * @type { number }
     */
    private _y: number;

    /**
     * Hashtable used to store components
     * @private
     * @name _components
     * @type { any }
     */
    private _components: any;

    constructor() {
        this._id = 0;
        this._x = 0;
        this._y = 0;
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
            this.components[component].update(this);    //reference this instance of the entity for components that need to access to class properties
        }
    }

    /**
     * Method used to add a component to the base entity
     * @method
     * @public
     * @name addComponent
     * @namespace Entity
     * @param { object } component - Reference to the component object
     */
    addComponent(component: object): void {
        const componentName = component.constructor.name;
        this.components[componentName] = component;
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

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }
    
    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get components(): any {
        return this._components;
    }
}