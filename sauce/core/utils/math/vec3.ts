/**
 * Vector 3 class - handles vector maths
 * @class
 * @classdesc A vector 3 class that uses the z axis for draw order, class allows you to perform vector math
 */
export default class vec3 {

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
    /**
     * z axis
     * @private
     * @name _z
     * @type { number }
     */
    private _z: number;

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    /**
     * add a vectors x and y to this vector
     * @method
     * @name add
     * @memberof vec3
     */
    public add(vector: vec3): void {
        this._x += vector.x;
        this._y += vector.y;        
    }

    /**
     * subtract a vectors x and y to this vector
     * @method
     * @name sub
     * @memberof vec3
     */
    public sub(vector: vec3): void {
        this._x -= vector.x;
        this._y -= vector.y;
    }

    /**
     * multiply this vectors x and y with a scalar
     * @method
     * @name multi
     * @memberof vec3
     */
    public multi(scalar: number): void {
        this._x *= scalar;
        this._y *= scalar;
    }

    /**
     * divide this vectors x and y with a scalar
     * @method
     * @name div
     * @memberof vec3
     */
    public div(scalar: number): void {
        this._x /= scalar;
        this._y /= scalar;
    }

    /**
     * return the direction this vector is facing from another
     * @method
     * @name direction
     * @memberof vec3
     */
    public direction(vector: vec3): vec3 {
        return new vec3(this._x - vector.x, this._y - vector.y, this._z);
    }

    /**
     * return the absolute distance of this vector from another
     * @method
     * @name distance
     * @memberof vec3
     */
    public distance(vector: vec3): vec3 {
        const x = Math.abs(this._x - vector.x);
        const y = Math.abs(this._y - vector.y);
        const z = this._z;
        return new vec3(x, y, z);
    }

    /**
     * return the dot product of this vector from another
     * @method
     * @name dot
     * @memberof vec3
     */
    public dot(vector: vec3): number {
        return ((this.x * vector.x) + (this.y * vector.y));
    }

    /**
     * return the magnitude of this vector
     * @method
     * @name magnitude
     * @memberof vec3
     */
    public magnitude(): number {
        return Math.sqrt((this._x * this._x) + (this._y * this._y));
    }

    /**
     * return the normal of this vector
     * @method
     * @name normalise
     * @memberof vec3
     */
    public normalise(): vec3 {
        let mag = this.magnitude();
        let nx = 0;
        let ny = 0;

        if (mag > 0) {
            nx = this._x / this.magnitude();
            ny = this._y / this.magnitude();
        }

        return new vec3(nx, ny, this._z); 
    }


    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get z(): number {
        return this._z;
    }

    set z(value: number) {
        this._z = value;
    }
}