import eventManager from "../event/eventManager.js";
import fe from "../fe.js";
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
        fe.event.publish("purge");
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
            print(dt);

            this._request = window.requestAnimationFrame(this.running.bind(this));
        }
    }

    private eventListener(data: any, self: any): void {
        print("State: event listener has been triggered");
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
        print("State: returning current state");
        return this._currentState;
    }

    get states() {
        print("State: return list of valid states");
        return Object.keys(this._states);
    }

    set updateState(value: string) {
        print("State: trying to update game state...");
        if (this.states.includes(value)) {
            this._currentState = value;
            print(`State: game state updated to ${ value }`);
        }
        else {
            print(`State: ${ value } state doesn't exist`);
        }
    }
}

export default new State();