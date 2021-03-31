let _isEnabled: boolean = false;
/**
 * Allows you to enable/disable the debugger
 * @name isEnabled
 * @param { boolean } value - true enables debugging, false disables debugging
 */
const isEnabled = (value: boolean) => {
    _isEnabled = value;
}

/**
 * Prints value to console when debugs are enabled
 * @name print
 * @param { any } value - Prints anything you pass through as a parameter
 */
const print = (value: any) => {
    if (_isEnabled) {
        console.log(value);
    }
}

export { isEnabled, print };