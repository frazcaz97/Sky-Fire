import eventManager from "../event/eventManager.js";
import { print } from "../utils/debug/print.js";

class State {

    private _states: any;
    private _currentState: string;
    private _request: number;

    constructor() {
        print("State: initialising...");
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
        print("State: initialised");
    }

    start(): void {
        print("state: game loop started");
        this.updateState = "started";
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    stop(): void {
        print("state: game loop stopped");
        this.updateState = "stopped";
        window.cancelAnimationFrame(this._request);
    }

    pause(): void {
        print("state: game loop paused");
        this.updateState = "paused";
    }

    resume(): void {
        print("state: game loop resumed");
        this.updateState = "resumed";
        this._request = window.requestAnimationFrame(this.running.bind(this));
    }

    private running(dt: number): void {
        print("state: game loop running");
        if (this.currentState !== "paused") {
            this.updateState = "running";
            console.log(dt);

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
        print("state: trying to update game state...");
        if (this.states.includes(value)) {
            this._currentState = value;
            print(`state: game state updated to ${ value }`);
        }
        else {
            print(`state: ${ value } state doesn't exist on enum: state`);
        }
    }
}

export default new State();