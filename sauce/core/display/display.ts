import { print } from "../utils/debug/print.js";
import EventManager from "../event/eventManager.js";

/**
 * Display class (Singleton) creates and controls the display
 * @class
 * @classdesc A singleton object that creates and controls the display (html canvas)
 */
class Display {

    /**
     * Contains a reference to the canvas element in index.html
     * @private
     * @name _canvas
     * @type { HTMLCanvasElement }
     */
    private _canvas: HTMLCanvasElement;

    /**
     * Contains the rendering context, only returns the canvasAPI rendering context
     * @private
     * @name _context
     * @type { WebGLRenderingContext | CanvasRenderingContext2D }
     */
    private _context: WebGLRenderingContext | CanvasRenderingContext2D;

    /**
     * Contains the type of rendering context as a string, by default is set to canvasAPI
     * @private
     * @name _ctxType
     * @type { string }
     */
    private _ctxType: string;

    /**
     * Contains the width of the canvas
     * @private
     * @name _width
     * @type { number }
     */
    private _width: number;
    
    /**
     * Contains the height of the canvas
     * @private
     * @name _height
     * @type { number }
     */
    private _height: number;

    /**
     * Enable/ disable full screen mode
     * @private
     * @name _isFullscreen
     * @type { boolean }
     */
    private _isFullscreen: boolean;

    constructor() {
        print("Display: initialising...");
        this._canvas = <HTMLCanvasElement>document.querySelector("#canvas");
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._context = <WebGLRenderingContext | CanvasRenderingContext2D>this._canvas.getContext("2d");    //we are defaulting to canvasAPI until we are ready to learn webGL
        this._ctxType = "canvasAPI";
        this._isFullscreen = false;
        window.onresize = this.resizeFullscreen.bind(this); //dynamically resizes the canvas when window.onresize is triggered
        print("Display: initialised");
    }

    /**
     * resizes the canvas to be fullscreen when window.onresize is triggered
     * @function
     * @name resizeFullscreen
     * @memberof Display
     */
    private resizeFullscreen(): void {
        if (this._isFullscreen) {
            print("Display: setting to fullscreen");
            this._canvas.width = window.innerWidth;
            this._canvas.height = window.innerHeight;
            this._width = this._canvas.width;
            this._height = this._canvas.height;
            EventManager.publish("Display");
        }
    }

    get contextType(): any {
        print("Display: returning context type");
        return this._ctxType;
    }

    get context(): any {
        print("Display: returning context");
        return this._context;
    }

    get width(): number {
        print("Display: returning canvas width");
        return this._width;
    }

    set width(value: number) {
        print("Display: setting canvas width");
        this._canvas.width = value;
    }

    get height(): number {
        print("Display: returning canvas height");
        return this._height;
    }

    set height(value: number) {
        print("Display: setting canvas height");
        this._canvas.height = value;
    }

    get isFullscreen(): boolean {
        print("Display: returning isFullscreen value");
        return this._isFullscreen;
    }

    set isFullscreen(value: boolean) {
        print("Display: running fullscreen function");
        if (value) {
            print("Display: setting to fullscreen");
            this._isFullscreen = true;
            this.resizeFullscreen();
        }
        else {
            print("Display: setting to fixed size");
            this._isFullscreen = false;
        }
    }
}

export default new Display();