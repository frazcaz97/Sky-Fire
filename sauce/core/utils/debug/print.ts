import { isEnabled } from "../debug/debug.js";

/**
 * Prints value to console when debugs are enabled
 * @name print
 * @param { any } value - Prints anything you pass through as a parameter
 */
const print = (value: any) => {
    if (isEnabled) {
        console.log(value);
    }
}

export { print };