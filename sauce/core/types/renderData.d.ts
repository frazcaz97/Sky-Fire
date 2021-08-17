/**
 * type defined for the renderData sent to the renderer
 * @name renderData
 * @typedef {
 *      type: string
 *      self: string
 *      data: imageData3 | imageData7
 * }
 */
type renderData = {
    type: string;
    resourceName: string;
    data: imageData3 | imageData7;
}