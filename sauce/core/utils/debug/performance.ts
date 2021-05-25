import eventManager from "../../event/eventManager.js";

/**
 * type defined for this._metrics dynamic object
 * @name metric
 * @typedef { [name: string]: any }
 */
type metric = {
    [name: string]: any
}

class Performance {

    /**
     * Dynamically stores metric names and values using the metrics interface
     * @name _metrics
     * @private
     * @property
     * @type { metrics }
     */
    private _metrics: metric;
    
    constructor() {
        this._metrics = {};
        eventManager.subscribe("performance", this.updateMetric, this); //only used if debugs are enabled
    }

    /**
     * updates the KPI metrics value if the metric exists
     * @private
     * @method
     * @name updateMetric
     * @param data - Stores the data it recieves for the metrics 
     * @param self - Stores the object instance
     */
    private updateMetric(data: any, self: any): void {   
        for (let metric in self._metrics) {
            const arr = Object.keys(self._metrics);
            if (arr.includes(data.name)) {
                self._metrics[metric] = data.value;
            }
        }
    }

    /**
     * Displays a table in the console containing the KPI metrics
     * @public
     * @method
     * @name displayMetrics
     */
    public displayMetrics(): void {
        console.table(this._metrics);
    }

    /**
     * Adds a new metric to the _metrics object
     * @public
     * @method
     * @name addMetric
     */
    public set addMetric(name: string) {
        this._metrics[name] = null;
    }
}

export default new Performance();