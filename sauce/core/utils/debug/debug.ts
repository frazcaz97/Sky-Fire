let isEnabled: boolean = false;
/**
 * Allows you to enable/disable the debugger
 * @name enableDebugs
 * @param { boolean } value - true enables debugging, false by default
 */
const enableDebugs = (value: boolean) => {
    isEnabled = value;
}

export { enableDebugs, isEnabled }