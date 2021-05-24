class EventManager {
    /**
     * Stores the total number of events that have been published during the life span of the game engine
     * @private
     * @property
     * @name _totalEvents
     * @type { number }
     */
    private _totalEvents: number;
    
    /**
     * Stores an array of subscriptions by other files
     * @private
     * @property
     * @name _subscriptions
     * @type { Array<any> }
     */
    private _subscriptions: Array<any>;

    constructor() {
        this._totalEvents = 0;
        this._subscriptions = [];
    }

    /**
     * Subscribe function - Invoked by other files/ objects when they want to listen for specific events
     * @method
     * @name subscribe
     * @memberof EventManager
     * @param { string } type - A channel the subscription listens on to recieve events
     * @param { any } callback - function to run then event is published to subscriber
     * @param { object } [ self ] - Optional, reference to instance of an object, only needed for objects
     */
    subscribe(type: string, callback: any, self?: object):void {

        //add a new subscription ( hash table ) to the array
        this.subscriptions.push({
            "type": type,
            "self": self || null,
            "callback": callback
        });
    }

    /**
     * Unsubscribe function - When invoked removes the subscriber passed through from the subscription array
     * @method
     * @name unsubscribe
     * @memberof EventManager
     * @param { string } type - A channel the subscription listens on to receives events 
     * @param { any } callback - function to run then event is published to subscriber 
     */
    unsubscribe(type: string, callback: any): void {

        for (let sub in this.subscriptions) {
            if (this.subscriptions[sub].type === type && this.subscriptions[sub].callback === callback) {
                delete this.subscriptions[sub];
            }
        }
        this._subscriptions = this._subscriptions.filter(Boolean);
    }

    /**
     * Publish function - Invoked by files/ objects when they want to publish data to a channel
     * @method
     * @name publish
     * @memberof EventManager
     * @param { string } type - A channel the publisher wants to publish data on
     * @param { any } [ data ] - Optional, data here will be published to the correct channel  
     */
    publish(type: string, data?: any): void {
        this._totalEvents++;

        //loop through the array of subscribers, if the types( A channel ) match then invoke the callback and pass in the data and an object reference or null 
        for (let subscriber in this.subscriptions) {
            if (this.subscriptions[subscriber].type === type) {
                const callback = this.subscriptions[subscriber].callback;
                const self = this.subscriptions[subscriber].self;
                callback(data, self);
            }
        }
    }

    get totalEvents(): number {
        return this._totalEvents;
    }

    get subscriptions(): any {
        return this._subscriptions;
    }
}

export default new EventManager();