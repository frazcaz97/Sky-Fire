import ResourceManager from "../../resource/resourceManager.js";
import EventManager from "../../event/eventManager.js";
import { print } from "../../utils/debug/print.js";

/**
 * Sprite Component
 * @class
 * @classdesc can be added to an entity class for static sprite rendering 
 */
export default class SpriteComponent {

    /**
     * fileURL - backup in case sprite isn't loaded into resource manager
     * @private
     * @property
     * @name _fileURL
     * @type { string }
     */
    private _fileURL: string;
    /**
     * resourceName - used to access sprite from resource manager
     * @private
     * @property
     * @name _resourceName
     * @type { string }
     */
    private _resourceName: string;
    /**
     * sx - starting x axis point to draw from the image
     * @private
     * @property
     * @name _sx
     * @type { number }
     */
    private _sx: number | undefined;
    /**
     * sy - starting y axis point to draw from the image
     * @private
     * @property
     * @name _sy
     * @type { number }
     */
    private _sy: number | undefined;
    /**
     * sw - width from x axis to draw from the image
     * @private
     * @property
     * @name _sx
     * @type { number }
     */
    private _sw: number | undefined;
    /**
     * sh - height from xyaxis to draw from the image
     * @private
     * @property
     * @name _sx
     * @type { number }
     */
    private _sh: number | undefined;
    /**
     * dx - x axis point on the canvas to start drawing the image 
     * @private
     * @property
     * @name _dx
     * @type { number }
     */
    private _dx: number;
    /**
     * dy - y axis point on the canvas to start drawing the image 
     * @private
     * @property
     * @name _dy
     * @type { number }
     */
    private _dy: number;
    /**
     * scale - used to scale the image on the canvas. a scale of 1 draws the image at it's native size 
     * @private
     * @property
     * @name _scale
     * @type { number }
     */
    private _scale: number | undefined;
    /**
     * isAssetLoaded - flag to check if the asset is loaded into the resource manager before we start drawing it to the screen
     * @private
     * @property
     * @name _isAssetLoaded
     * @type { boolean }
     */
    private _isAssetLoaded: boolean;
    /**
     * isFullImage - flag to check if we are using the full source image or a part of it
     * @private
     * @property
     * @name _isFullImage
     * @type { boolean }
     */
    private _isFullImage: boolean;
    /**
     * renderData - type used to store the data used in the rendering process
     * @private
     * @property
     * @name _dx
     * @type { number }
     */
    private _renderData: renderData | null;

    constructor(fileURL: string, resourceName: string, dx: number, dy: number, sx?: number, sy?: number, sw?: number, sh?: number, scale?: number) {
        this._fileURL = fileURL;
        this._resourceName = resourceName;
        this._sx = sx;
        this._sy = sy;
        this._sh = sh;
        this._sw = sw;
        this._dx = dx;
        this._dy = dy;
        this._scale = scale;
        this._isAssetLoaded = false;
        this._isFullImage = false;
        this._renderData = null;

        this.checkAssetLoaded()
        this.checkFullImage()
    }

    /**
     * checkAssetLoaded - checks if the asset is already loaded into the resource manager and if not, starts to load it in
     * @private
     * @method
     * @name checkAssetLoaded
     * @memberof SpriteComponent
     */
    private checkAssetLoaded(): void {
        const isLoaded: boolean = ResourceManager.request(this._resourceName) ? true : false;
        
        if (isLoaded === false) {
            print("SpriteComponent: Asset not preloaded, loading into Resource Manager now");

            this._isAssetLoaded = false;
            EventManager.subscribe(`resource-image-${this._resourceName}`, this.eventListener.bind(this));
            ResourceManager.addResource(this._resourceName, this._fileURL);
        }
        else {
            this._isAssetLoaded = true;
        }
    }

    /**
     * checkFullImage - checks if we are using part of an image or the full image
     * @private
     * @method
     * @name checkFullImage
     * @memberof SpriteComponent
     */
    private checkFullImage(): void {
        if (this._sx === undefined || this._sy === undefined || this._sh === undefined || this._sw === undefined) { //using full image file
            this._isFullImage = false;
        }
        else {  //using part of an image file, probably a texture atlas
            this._isFullImage = true;
        }
    }

    /**
     * eventListener - callback when asset is loaded into the resource manager
     * @private
     * @method
     * @name eventListener
     * @memberof SpriteComponent
     */
    private eventListener(): void {
        print("SpriteComponent: Asset now loaded into Resource Manager");

        this._isAssetLoaded = true;
        EventManager.unsubscribe(`resource-image-${this._resourceName}`, this.eventListener.bind(this));
    }

    /**
     * position - updates the coordinates of the sprite on the canvas
     * @public
     * @method
     * @name position
     * @memberof SpriteComponent
     */
    public position(x:number, y:number): void {    //update the position of the  sprite on screen
        this._dx = x;
        this._dy = y;
    }

    /**
     * update - called by the base entity class on an update loop, updates the render data for the next time it needs to be rendered
     * @public
     * @method
     * @name update
     * @memberof SpriteComponent
     */
    public update(): void {
        if (this._isAssetLoaded === true) {
            let data: imageData3 | imageData7;

            if (this._isFullImage === true) {   //send both source position and destination position to renderer
                data = {
                    "sx": this._sx || 0,
                    "sy": this._sy || 0,
                    "sw": this._sw || 0,
                    "sh": this._sh || 0,
                    "dx": this._dx,
                    "dy": this._dy,
                    "scale": this._scale || 1
                }
            }
            else {  //send just the destination position
                data = {
                    "dx": this._dx,
                    "dy": this._dy,
                    "scale": this._scale || 1
                }
            }
            
            this._renderData = {    //stores rendering data ready to be accessed by the scene manager and sent to the renderer
                "type": "image",
                "resourceName": this._resourceName,
                "data": data
            };
        }
    }

    get x(): number {   //returns x postion in game world
        return this._dx;
    }

    get y(): number {   //returns y position in game world
        return this._dy;
    }

    get renderData(): renderData | null {
        return this._renderData;
    }
}