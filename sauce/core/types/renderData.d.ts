/**
 * type defined for the renderData sent to the renderer
 * @name renderData
 * @typedef {
 *      type: string
 *      self: string
 *      data: imageData
 * }
 */
type renderData = {
    type: string;
    resourceName: string;
    data: imageData;
}