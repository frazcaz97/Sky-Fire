let _isEnabled: boolean = false;

const enableDebugs = () => {
    _isEnabled = true;
}

const disableDebugs = () => {
    _isEnabled = false;
}

const print = (value: any) => {
    if (_isEnabled) {
        console.log(value);
    }
}

export { enableDebugs, disableDebugs, print };