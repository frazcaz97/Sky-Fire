import { print } from "../utils/debug/print.js";
import CanvasImage from "./canvasAPI/canvasImage.js";
import ResourceManager from "../resource/resourceManager.js";
import Display from "../display/display.js";

/**
 * Renderer
 * @class
 * @classdesc Main engine renderer
 */
class Renderer {

    /**
     * images - Array storage for all images to be rendered
     * @private
     * @property
     * @name _images
     * @type { any[] }
     */
    private _images: any[];
    /**
     * queue - hashtable storing sorted render items for batch rendering
     * @private
     * @property
     * @name _queue
     * @type { any }
     */
    private _queue: any;
    /**
     * ctx - graphics context used to call the right render function
     * @private
     * @property
     * @name _fctx
     * @type { CanvasRenderingContext2D }
     */
    private _context: CanvasRenderingContext2D;
    /**
     * display - Used to get the width and height to clear the screen
     * @private
     * @property
     * @name _display
     * @type { Display }
     */
    private _display: typeof Display;

    constructor() {
        this._images = [];
        this._queue = {};
        this._display = Display;
        this._context = this._display.context;
    }

    /**
     * addToQueue - Adds a renderable item to the render queue
     * @public
     * @method
     * @name addToQueue
     * @memberof Renderer
     * @param { any } data - render item data   //Need to update this type at a later date when we have the scene manager class written
     * @param { string } type - render item type
     * @param { string } asset - used to sort the render items for batch rendering
     */
    public addToQueue(data: any, type: string, asset: string): void {    //adds render item to queue ready to be drawn on update
        switch(type) {
            case "image":
                this._images.push({"data": data, "asset": asset});
                break;
            
            default:
                print("asset type not support in renderer");
        }
    }

    /**
     * update - sorts render items ready for batch rendering and calls the draw function
     * @public
     * @method
     * @name update
     * @memberof Renderer
     */
    public update(): void {    //sort the render queue for batch rendering
        for (let image in this._images) {
            const asset = this._images[image]["asset"];
            const data = this._images[image]["data"];

            if (this._queue["image"] === undefined) {
                this._queue["image"] = {};
                this._queue["image"][asset] = {};
                this._queue["image"][asset][image] = data;
            }
            else {
                if (this._queue["image"][asset] === undefined) {
                    this._queue["image"][asset] = {};
                    this._queue["image"][asset][image] = data;
                }
                else {
                    this._queue["image"][asset][image] = data;
                }   
            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }

        this._images = [];
        
        //now that everything is sorted call the draw function to draw everything to the screen
        this.draw();
    }

    /**
     * draw - draws everything in the render queue
     * @private
     * @method
     * @name draw
     * @memberof Renderer
     */
    private draw(): void {  //draw everything in the render queue

        if (Display.contextType === "Canvas2D") {

            // before we can draw the next frame we need to clear the current one
            this._context.clearRect(0,0, this._display.width, this._display.height);
            
            for (let type in this._queue) {
                switch (type) {
                    case "image":
                        for (let item in this._queue[type]) {
                            const imageData = ResourceManager.request(item);
                            const batch = this._queue[type][item];
                            CanvasImage.draw(imageData, batch);
                        }
                        break;
                    
                    default:
                        print("asset type not supported in renderer");
                        break;
                }
            }
        }
        
        //after drawing everything clear out assets from the queue
        this._queue = {};
    }
}

export default new Renderer();