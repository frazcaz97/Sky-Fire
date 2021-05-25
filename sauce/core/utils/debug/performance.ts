import eventManager from "../../event/eventManager.js";

class Performance {

    private _metrics: any;
    
    constructor() {
        this._metrics = {};

        eventManager.subscribe("performance", this.updateMetric, this);
    }

    private updateMetric(data: any, self: any): void {   
        for (let metric in self._metrics) {
            const arr = Object.keys(self._metrics);
            if (arr.includes(data.name)) {
                self._metrics[metric] = data.value;
            }
        }
    }

    public displayMetrics(): void {
        console.table(this._metrics);
    }

    set addMetric(name: string) {
        this._metrics[name] = null;
    }
}

export default new Performance();