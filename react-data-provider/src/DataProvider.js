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
        this.callbackCount = 0;
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

    getProviderProperties() {
        return {
            numberOfListeners: this.listeners.size,
            callbackCount: this.callbackCount
        };
    }

    async updateDataLoop() {
        let updateLoopNo = 0;
        while (true) {
            while (this.listeners.size == 0) {
                await new Promise(r => setTimeout(r, 500));
            }
            updateLoopNo += 1;
            this.numberProperties.number = updateLoopNo;
            this.numberProperties.square = updateLoopNo * updateLoopNo;
            this.numberProperties.isEven = updateLoopNo % 2 === 0;
            await new Promise(r => setTimeout(r, 2000));
            for (let callback of this.listeners) {
                this.callbackCount += 1;
                callback();
            }
        }
    }
}

let dataProvider = new DataProvider()
dataProvider.updateDataLoop()

export default dataProvider;
