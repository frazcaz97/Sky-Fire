import Display from "../../display/display.js"
import { print } from "../../utils/debug/print.js";

/**
 * CanvasImage
 * @class
 * @classdesc uses the html canvas rendering context to draw an image to the screen
 */
class CanvasImage {

    /**
     * Stores the rendering context, in this case the canvas API
     * @private
     * @property
     * @name _ctx
     * @type { CanvasRenderingContext2D }
     */
    private _ctx: CanvasRenderingContext2D;

    constructor() {
        this._ctx = <CanvasRenderingContext2D> Display.context;
    }

    /**
     * getScaling - Used by the draw method to scale the image correctly before rendering it
     * @private
     * @method
     * @name getScaling
     * @memberof canvasImage
     * @param { number } scale - used to scale the width and height of the image
     * @param { ImageBitmap } image - image data from the resource manager
     */
    private getScaling(scale: number, image: ImageBitmap) {
        const imageWidth = image.width;
        const imageHeight = image.height;

        return [(imageWidth * scale), (imageHeight * scale)];
    }

    /**
     * draw - called by the master renderer to draw images to the screen, capable of batch rendering the same image multiple timer
     * @public
     * @method
     * @name draw
     * @memberof canvasImage
     * @param { ImageBitmap } image - image data from the resource manager
     * @param { any } batch - stores information about where and how many images to draw on the screen
     */
    public draw(image: ImageBitmap, batch: any): void { //batch type shouldn't be any, but right now its to complicated a type for me to be bothered
        for (let item in batch) {
            const asset = batch[item];
            const scaling = this.getScaling(asset.scale, image);
            this._ctx.drawImage(image, asset.sx, asset.sy, asset.sw, asset.sh, asset.dx, asset.dy, scaling[0], scaling[1]);
            this._ctx.drawImage(image, asset.dx, asset.dy, scaling[0], scaling[1]);
        }
    }
}

export default new CanvasImage();