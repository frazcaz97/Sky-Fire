import { print } from "../utils/debug/print.js";
import EventManager from "../event/eventManager.js";
import World from "../world/world.js";

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
    private _frameTime: number; //stores the time since the last cycle
    private _elapsedTime: number;   //stores the tune since last the last fixed update cycle
    private _tickRate: number;  //the number of times our fixed update should be ran every second
    private _isRunning: boolean;

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
        this._frameTime = 0;
        this._elapsedTime = 0;
        this._tickRate = 1000 / 20;
        this._isRunning = false;

        this._currentState = this._states[0];
        this._request = 0;
    }

    public start(): void {
        this._isRunning = true;
        this.updateState = 1;
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    public stop(): void {
        this._isRunning = false;
        this.updateState = 5;
        window.cancelAnimationFrame(this._request);
        EventManager.publish("purge");
    }

    public pause(): void {
        this._isRunning = false;
        this.updateState = 3;
        window.cancelAnimationFrame(this._request);
    }

    public resume(): void {
        this._isRunning = true;
        this.updateState = 4;
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    private running(step: number): void {
        //queue up the next frame
        this._request = window.requestAnimationFrame(this.running.bind(this));

        //update all the timings
        this._thisTime = step;
        this._frameTime = this._thisTime - this._lastTime;
        this._lastTime = this._thisTime;
        this._elapsedTime += this._frameTime;

        //run the fixed update cycle
        while (this._elapsedTime >= this._tickRate) {
            let delta = this._elapsedTime / this._tickRate;
            World.update(delta);
            this._elapsedTime -= this._tickRate;
        }

        let delta = this._elapsedTime / this._tickRate;
        World.draw(delta);
    }

    get currentState(): string {
        return this._currentState;
    }

    get states() {
        return Object.keys(this._states);
    }

    get frameTime() {
        return this._frameTime;
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