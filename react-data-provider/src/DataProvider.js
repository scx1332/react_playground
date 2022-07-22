export class NumberProperties {
    constructor() {
        this.number = 1;
        this.square = 1;
        this.isEven = false;
    }
}

class DataProvider {
    constructor() {
        this.listeners = new Set();
        this.numberProperties = new NumberProperties();
    }

    registerListener(eventHandler) {
        console.log("Registering component")
        this.listeners.add(eventHandler);
    }

    unregisterListener(eventHandler) {
        console.log("Unregistering component")
        this.listeners.delete(eventHandler);
    }

    getCurrentNumber() {
        return this.numberProperties.number;
    }

    getNumberSquare() {
        return this.numberProperties.square;
    }

    getIsEven() {
        return this.numberProperties.isEven;
    }

    async updateDataLoop() {
        let updateLoopNo = 0;
        while (true) {
            updateLoopNo += 1;
            this.numberProperties.number = updateLoopNo;
            this.numberProperties.square = updateLoopNo * updateLoopNo;
            this.numberProperties.isEven = updateLoopNo % 2 === 0;
            console.log("updates");
            await new Promise(r => setTimeout(r, 2000));
            console.log(this.listeners);
            for (let callback of this.listeners) {
                console.log(callback);
                callback();
            }
        }
    }
}

let dataProvider = new DataProvider()
dataProvider.updateDataLoop()

export default dataProvider;
