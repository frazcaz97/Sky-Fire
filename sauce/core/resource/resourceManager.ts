import { print } from "../utils/debug/print.js";
import fileType from "../utils/fileType.js";
import EventManager from "../event/eventManager.js";

/**
 * Resouce Manager - (Singleton) loads and stores assets needed for the game
 * @class
 * @classdesc preloads, loads, stores and allowsd access of game assets
 */
class ResourceManager {
    
    /**
     * Stores all the assets
     * @private
     * @name _resources
     * @type { any }
     */
    private _resources: any;

    /**
     * Stores the total number of assets loaded
     * @private
     * @name _totalResources
     * @type { number }
     */
    private _totalResources: number;
    
    constructor() {
        print("Resource: Initialising resource manager...");
        this._resources = {};
        this._totalResources = 0;
        EventManager.subscribe("purge", this.purge.bind(this));
        print("Resource: Initialised");
    }

    /**
     * Method is used to add an asset to the resource pool
     * @method
     * @public
     * @name addResource
     * @namespace ResourceManager
     */
    public addResource(name: string, path: string): void {
        this._totalResources++;
        const type: string = fileType(path);

        this.resources[name] = {    //create empty data structure for asset
            "data": null,
            "isLoaded": false
        }

        switch(type) {
            case "jpg":
            case "png":
                this.loadImage(name, path);
                break;
            case "mp3":
                this.loadAudio(name, path);
            default:
                print("Resource: Asset file type not supported");
                break
        }
    }

    /**
     * Method is used to remove an asset from the resource pool
     * @method
     * @public
     * @name removeResource
     * @namespace ResourceManager
     */
    public removeResource(name: string): void {
        delete this.resources[name];
    }

    /**
     * Method is run only when a purge event is published to delete all asset data
     * @method
     * @private
     * @name purge
     * @namespace ResourceManager
     */
    private purge(): void {
        delete this._resources;
        print("Resource: Assets purged");
    }

    /**
     * Method is called when a file wants to use the asset
     * @method
     * @public
     * @name request
     * @namespace ResourceManager
     */
    public request(name: string): any {
        print("Resource: Requesting asset data...");
        if (this.resources[name].isLoaded) {
            return this.resources[name].data;    
        }
        else {
            console.error(`Resource: ${ name } should have loaded already hahahaha, if not then you are probably going to have to rewrite this class`);
        }
    }

    /**
     * Method is run by addResource method when we need to load an image file
     * @method
     * @private
     * @name loadImage
     * @namespace ResourceManager
     */
    private loadImage(name: string, path: string): void {
        print("Resouce: Loading image asset...");
        let img = new Image();
        img.onload = () => {
            this.resources[name].data = img;
            this.resources[name].isLoaded = true;
            print("Resource: Image Asset loaded");
        }
        img.src = path;    
    }

    /**
     * Method is run by addResource method when we need to load an audio file
     * @method
     * @private
     * @name loadAudio
     * @namespace ResourceManager
     */
    private loadAudio(name: string, path: string): void {
        print("Resource: Loading audio asset...");
        let audio = new Audio(path);
        const trigger = (event: any) => {
            this.resources[name].data = audio;
            this.resources[name].isLoaded = true;
            audio.removeEventListener("canplaythrough", trigger);   //resource add, no longer need the listener
            print("Resource: Audio asset loaded");
        }
        audio.addEventListener("canplaythrough", trigger);  //when audio file is loaded add it to the resource pool
    }

    /**
     * Method is run by the game to preload any and all assets it needs before starting the game
     * @method
     * @public
     * @name preLoad
     * @namespace ResourceManager
     */
    public preLoad(callback: any): void {
        print("Resource: Preloading assets...");
        EventManager.subscribe("preload", callback);
        
        let timer = setInterval(() => {
            let totalLoaded: number = 0;
            const assetTotal: number = Object.keys(this.resources).length;

            for (let asset in this.resources) {
                if (this.resources[asset].isLoaded) {
                    totalLoaded++;
                }
            }
            if (totalLoaded === assetTotal) {
                clearInterval(timer);   //assets all loaded, delete the timer
                print("Resource: All assets preloaded");
                EventManager.publish("preload");
                EventManager.unsubscribe("preload", callback);  //delete sub now that preload is complete
            }
        },0);
    }

    get resources(): any {
        return this._resources;
    }

    get total(): number {
        return this._totalResources;
    }
}

export default new ResourceManager();