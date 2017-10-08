class Storage {
    constructor() {
        this.items = [];
    }

    get(key) {
        return this.items[key];
    }

    set(key, data) {
        this.items[key] = data;
    }
}

module.exports = new Storage;
