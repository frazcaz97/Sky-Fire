import { print } from "../utils/debug/print.js";

class eventManager {

    private _totalEvents: number;
    private _subscriptions: Array<any>;

    constructor() {
        print("Event: initialising...");
        this._totalEvents = 0;
        this._subscriptions = [];
        print("Event: initialised");
    }

    subscribe(type: string, callback: any, self: any):void {
        console.log(self);
        this._subscriptions.push({
            "type": type,
            "self": self,
            "callback": callback
        });
    }

    publish(type: string, data: any): void {
        this._totalEvents++;
        print(`Event: publishing event with type: ${ type } and data: ${ data }`);

        for (let subscriber in this._subscriptions) {
            if (this._subscriptions[subscriber].type === type) {
                const callback = this._subscriptions[subscriber].callback;
                const self = this._subscriptions[subscriber].self;
                callback(data, self);
            }
        }
    }

    get totalEvents(): number {
        return this._totalEvents;
    }
}

export default new eventManager();