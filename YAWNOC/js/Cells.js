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
    constructor() {
        super();
    }

    contribute() {
        return 1;
    }

    drawText() {
        return "[#]";
    }
}
