import vec2 from "../utils/math/vec2.js";
import Display from "../display/display.js";
import eventManager from "../event/eventManager.js";

/**
 * Camera
 * @class
 * @classdesc Main game camera 
 */
class Camera {
    /**
     * _width - Total camera units on the x axis
     * @private
     * @property
     * @name _width
     * @type { number }
     */
    private _width: number;
    /**
     * _height - Total camera units on the y axis
     * @private
     * @property
     * @name _height
     * @type { number }
     */
    private _height: number;
    /**
     * _pxielsPerX - number of pixels per camera unit on the x axis
     * @private
     * @property
     * @name _pixelsPerX
     * @type { number }
     */
    private _pixelsPerX: number;
    /**
     * _pixelsPerY - number of pixels per canera unit on the y axis
     */
    private _pixelsPerY: number;

    constructor() {
        this._width = 160;
        this._height = 90;
        this._pixelsPerX = 0;
        this._pixelsPerY = 0;
        this._updateCoordinates();

        eventManager.subscribe("Display", this._updateCoordinates.bind(this));
    }

    /**
     * _updateCoordinates - updates the pixels per X and Y unit on Display resize
     * @private
     * @method
     * @name _updateCoordinates
     * @memberof Camera
     */
    private _updateCoordinates(): void {
        const screenWidth = Display.width;
        const screenHeight = Display.height;
        this._pixelsPerX = (screenWidth / this._width);
        this._pixelsPerY = (screenHeight / this._height);
    }

    /**
     * toScreenSpace - converts an entities x and y position to screen coordinates
     * @public
     * @method
     * @name toScreenSpace
     * @memberof Camera
     * @param { number } x 
     * @param { number } y 
     * @returns { vec2 }
     */
    public toScreenSpace(x: number, y: number): vec2 {
        const screenX = x * this._pixelsPerX;
        const screenY = y * this._pixelsPerY;
        
        return new vec2(screenX, screenY);
    }

    /**
     * toWorldSpace - converts an entities screen coordinate x and y to world coordinates
     * @public
     * @method
     * @name toWorldSpace
     * @memberof Camera
     * @param { number } x 
     * @param { number } y 
     * @returns { vec2 }
     */
    public toWorldSpace(x: number, y: number): vec2 {
        const worldX = Math.round(x / this._pixelsPerX);
        const worldY = Math.round(y / this._pixelsPerY);
        
        return new vec2(worldX, worldY);
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}

export default new Camera();