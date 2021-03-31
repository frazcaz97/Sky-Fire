import { print } from "../utils/debug/print.js";

class EventManager {
    /**
     * Stores the total number of events that have been published during the life span of the game engine
     * @private
     * @name _totalEvents
     * @type { number }
     */
    private _totalEvents: number;
    
    /**
     * Stores an array of subscriptions by other files
     * @private
     * @name _subscriptions
     * @type { Array<any> }
     */
    private _subscriptions: Array<any>;

    constructor() {
        print("Event: initialising...");
        this._totalEvents = 0;
        this._subscriptions = [];
        print("Event: initialised");
    }

    /**
     * Subscribe function - Invoked by other files/ objects when they want to listen for specific events
     * @function
     * @name subscribe
     * @memberof EventManager
     * @param { string } type - A channel the subscription listens on to recieve events
     * @param { any } callback - What function to run when a subscription recieves an event
     * @param { object } [ self ] - Optional, reference to instance of an object, only needed for objects
     */
    subscribe(type: string, callback: any, self?: object):void {
        print(`Event: adding new subscription for: ${ self }, with callback: ${ callback } and type: ${ type }`);

        //add a new subscription ( hash table ) to the array
        this._subscriptions.push({
            "type": type,
            "self": self || null,
            "callback": callback
        });
    }

    /**
     * Publish function - Invoked by files/ objects when they want to publish data to a channel
     * @function
     * @name publish
     * @memberof EventManager
     * @param { string } type - A channel the publisher wants to publish data on
     * @param { any } [ data ] - Optional, data here will be published to the correct channel  
     */
    publish(type: string, data?: any): void {
        this._totalEvents++;
        print(`Event: publishing event with type: ${ type } and data: ${ data }`);

        //loop through the array of subscribers, if the types( A channel ) match then invoke the callback and pass in the data and an object reference or null 
        for (let subscriber in this._subscriptions) {
            if (this._subscriptions[subscriber].type === type) {
                const callback = this._subscriptions[subscriber].callback;
                const self = this._subscriptions[subscriber].self;
                callback(data, self);
            }
        }
    }

    get totalEvents(): number {
        print("Event: return total events number");
        return this._totalEvents;
    }
}

export default new EventManager();