import { print } from "../utils/debug/print.js";
import eventManager from "../event/eventManager.js";
import fe from "../fe.js";

class State {

    private _states: any;
    private _currentState: string;
    private _request: number;

    constructor() {
        this._states = {
            notStarted: "notStarted",
            started: "started",
            running: "running",
            paused: "paused",
            resumed: "resumed",
            stopped: "stopped"
        }

        this._currentState = this._states.notStarted;
        this._request = 0;
        eventManager.subscribe("State", this.eventListener, this);
    }

    start(): void {
        this.updateState = "started";
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    stop(): void {
        this.updateState = "stopped";
        window.cancelAnimationFrame(this._request);
        fe.event.publish("purge");
    }

    pause(): void {
        this.updateState = "paused";
    }

    resume(): void {
        this.updateState = "resumed";
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    private running(dt: number): void {
        if (this.currentState !== "paused") {
            this.updateState = "running";

            this._request = window.requestAnimationFrame(this.running.bind(this));
        }
    }

    private eventListener(data: any, self: any): void {
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

    set updateState(value: string) {
        if (this.states.includes(value)) {
            this._currentState = value;
        }
        else {
            print(`State: ${ value } state doesn't exist`);
        }
    }
}

export default new State();