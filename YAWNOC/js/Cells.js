class BaseCell {
    constructor() {
        if (this.constructor == BaseCell) {
            throw new Error("Abstract class 'BaseCell' can't be instantiated.");
        }
    }

    contribute() {
        throw new Error("Method contribute() must be implemented.");
    }

    drawText() {
        throw new Error("Method draw() must be implemented.");
    }
}

class DeadCell extends BaseCell {
    constructor() {
        super();
    }

    contribute() {
        return 0;
    }

    drawText() {
        return "[.]";
    }
}

class LiveCell extends BaseCell {
    #lifespan;

    constructor() {
        super();
        this.lifespan = 0;
    }

    getLifespan() {
        return this.#lifespan;
    }

    setLifespan(lifespan) {
        this.#lifespan = lifespan;
    }

    contribute() {
        return 1;
    }

    drawText() {
        return "[#]";
    }
}
