import vec2 from "../utils/math/vec2.js";
import Entity from "../entity/entity.js";

/**
 * Physics component
 * @class
 * @classdesc component to add movement to an entity
 */
export default class PhysicsComponent {
    /**
     * Stores the position of the entity locally, used to update the entities coords
     * @private
     * @name _position
     * @type { vec2 }
     */
    private _position: vec2;
    /**
     * Stores the current velocity of the component
     * @private
     * @name _velocity
     * @type { vec2 }
     */
    private _velocity: vec2;
    /**
     * Stores the max velocity the component is allowed to accelerate to
     * @private
     * @name _terminalVelocity
     * @type { number }
     */
    private _terminalVelocity: number;
    /**
     * constant used to slow down the component over time
     * @private
     * @name _friction
     * @type { number }
     */
    private _friction: number;

    constructor(position: vec2, terminalVelocity: number, friction: number) {
        this._position = new vec2(position.x, position.y);
        this._velocity = new vec2(0,0);
        this._terminalVelocity = terminalVelocity;
        this._friction = friction;
    }

    /**
     * Updated by the fixed update loop to update the currrent position of the entity using velocity and friction
     * @public
     * @method
     * @name update
     * @namespace PhysicsComponent
     * @param { Entity } parent 
     */
    public update(parent: Entity):void {
        this._velocity.multi(this._friction);
        this._position.add(this._velocity);
        parent.x = this._position.x;
        parent.y = this._position.y;
    }

    /**
     * updates the current velocity value and keeps it within the terminal velocity value
     * @public
     * @set
     * @name velocity
     * @namespace PhysicsComponent
     * @param { vec2 } value 
     */
    set velocity(value: vec2) {
        this._velocity.add(value);

        const x = this._velocity.x;
        const y = this._velocity.y;

        if (this._velocity.x > this._terminalVelocity) {
            this._velocity = new vec2(this._terminalVelocity, y);    
        }
        if (this._velocity.x < (this._terminalVelocity * -1)) {
            this._velocity = new vec2((this._terminalVelocity * -1), y);
        }
        if (this._velocity.y > this._terminalVelocity) {
            this._velocity = new vec2(x, this._terminalVelocity);
        }
        if (this._velocity.y < (this._terminalVelocity * -1)) {
            this._velocity = new vec2(x, (this._terminalVelocity * -1));
        }
    }

    get velocity(): vec2 {
        return this._velocity;
    }
}