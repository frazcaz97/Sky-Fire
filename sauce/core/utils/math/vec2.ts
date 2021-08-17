/**
 * Vector 2 class - handles vector maths
 * @class
 * @classdesc A vector 2 class used for positioning sprites on a screen
 */
export default class vec2 {

    /**
     * x axis
     * @private
     * @name _x
     * @type { number }
     */
    private _x: number;
    /**
     * y axis
     * @private
     * @name _y
     * @type { number }
     */
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
     * add a vectors x and y to this vector
     * @method
     * @name add
     * @memberof vec2
     */
    public add(vector: vec2): void {
        this._x += vector.x;
        this._y += vector.y;        
    }

    /**
     * subtract a vectors x and y to this vector
     * @method
     * @name sub
     * @memberof vec2
     */
    public sub(vector: vec2): void {
        this._x -= vector.x;
        this._y -= vector.y;
    }

    /**
     * multiply this vectors x and y with a scalar
     * @method
     * @name multi
     * @memberof vec2
     */
    public multi(scalar: number): void {
        this._x *= scalar;
        this._y *= scalar;
    }

    /**
     * divide this vectors x and y with a scalar
     * @method
     * @name div
     * @memberof vec2
     */
    public div(scalar: number): void {
        this._x /= scalar;
        this._y /= scalar;
    }

    /**
     * return the direction this vector is facing from another
     * @method
     * @name direction
     * @memberof vec2
     */
    public direction(vector: vec2): vec2 {
        return new vec2(this._x - vector.x, this._y - vector.y);
    }

    /**
     * return the absolute distance of this vector from another
     * @method
     * @name distance
     * @memberof vec2
     */
    public distance(vector: vec2): vec2 {
        const x = Math.abs(this._x - vector.x);
        const y = Math.abs(this._y - vector.y);
        return new vec2(x, y);
    }

    /**
     * return the dot product of this vector from another
     * @method
     * @name dot
     * @memberof vec2
     */
    public dot(vector: vec2): number {
        return ((this.x * vector.x) + (this.y * vector.y));
    }

    /**
     * return the magnitude of this vector
     * @method
     * @name magnitude
     * @memberof vec2
     */
    public magnitude(): number {
        return Math.sqrt((this._x * this._x) + (this._y * this._y));
    }

    /**
     * return the normal of this vector
     * @method
     * @name normalise
     * @memberof vec2
     */
    public normalise(): vec2 {
        let mag = this.magnitude();
        let nx = 0;
        let ny = 0;

        if (mag > 0) {
            nx = this._x / this.magnitude();
            ny = this._y / this.magnitude();
        }

        return new vec2(nx, ny); 
    }


    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }
}