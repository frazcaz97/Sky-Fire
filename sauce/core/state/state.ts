import { isEnabled } from "../utils/debug/debug.js"
import Performance from "../utils/debug/performance.js"
import { print } from "../utils/debug/print.js";
import eventManager from "../event/eventManager.js";
import fe from "../fe.js";

/**
 * type defined for this._states dynamic object
 * @name states
 * @typedef { [name: string]: string }
 */
type states = {
    [name: string]: string;
}

class State {

    private _states: states;
    private _currentState: string;
    private _request: number;
    private _lastTime: number;
    private _thisTime: number;
    private _isRunning: boolean;
    private _metricsClock: number;

    constructor() {
        this._states = {
            0: "notStarted",
            1: "started",
            2: "running",
            3: "paused",
            4: "resumed",
            5: "stopped",
        };
        this._lastTime = 0;
        this._thisTime = 0;
        this._metricsClock = 0;
        this._isRunning = false;

        Performance.addMetric = "FPS";

        this._currentState = this._states[0];
        this._request = 0;
        eventManager.subscribe("State", this.eventListener, this);
    }

    start(): void {
        this._isRunning = true;
        this.updateState = 1;
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    stop(): void {
        this._isRunning = false;
        this.updateState = 5;
        window.cancelAnimationFrame(this._request);
        fe.event.publish("purge");
    }

    pause(): void {
        this._isRunning = false;
        this.updateState = 3;
        window.cancelAnimationFrame(this._request);
    }

    resume(): void {
        this._isRunning = true;
        this.updateState = 4;
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    private running(step: number): void {
        this.updateState = 2;
        this._lastTime = this._thisTime;
        this._thisTime = step;
        const delta: number = this._thisTime - this._lastTime;  
        const FPS: number = 1000 / delta;

        if (this._isRunning) {

            //TODO: when we have inputs working we should have this be triggered by a key press instead
            //when debugs are enabled display the metrics and update the FPS metrics
            if (isEnabled) {
                if (fe.utils.isInRange(this._metricsClock, 1000, 1100)) {    //only display metrics once a second with 100ms leeway
                    this._metricsClock = 0;
                    const fpsData: metricData = {"name": "FPS", "value": FPS}
                    eventManager.publish("performance", fpsData);
                    fe.debugs.performance.displayMetrics();
                }
                else {
                    this._metricsClock += delta;
                }
            }
            this._request = window.requestAnimationFrame(this.running.bind(this));
        }
    }

    private eventListener(data: string, self: this): void {
        const actions = ["start", "stop", "pause", "resume"];
        if (actions.includes(data)) {
            switch (data) {
                case "start":
                    self.start();
                    break;
                case "stop":
                    self.stop();
                    break;
                case "pause":
                    self.pause();
                    break;
                case "resume":
                    self.resume();
                    break;
            }
        }
        else {
            print(`State: invalid value: ${ data }`);
        }
    }

    get currentState(): string {
        return this._currentState;
    }

    get states() {
        return Object.keys(this._states);
    }

    set updateState(value: number) {
        if (this._states[value] !== undefined) {
            this._currentState = this._states[value];
        }
        else {
            print(`State: ${ value } state doesn't exist`);
        }
    }
}

export default new State();