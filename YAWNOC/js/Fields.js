class BaseField {
    #width;
    #height;

    #cells = []

    constructor(width, height) {
        if (this.constructor == BaseField) {
            throw new Error("Abstract class 'BaseField' can't be instantiated.");
        }

        this.#width = width;
        this.#height = height;

        this.#cells = []
        for (let i = 0; i < width*height; i++) {
            this.#cells.push(new DeadCell())
        }
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getCells() {
        return this.#cells;
    }

    // x is left to right
    // y is top to bottom
    getCell(x, y) {
        if (this.#outOfBounds(x, y)) {
            return this.resolveOutOfBoundsCell(x, y);
        }
        else {
            let index = this.#resolveCellIndex(x, y);
            return this.#cells[index];
        }
    }

    setCell(x, y, cell) {
        let index = this.#resolveCellIndex(x, y);
        this.#cells[index] = cell;
    }

    #resolveCellIndex(x, y) {
        return y*this.#width + x;
    }

    #outOfBounds(x, y) {
        return (x < 0 || x >= this.#width || y < 0 || y >= this.#height);
    }

    resolveOutOfBoundsCell(x, y) {
        throw new Error("Method #resolveOutOfBoundsCell(x, y) must be implemented.");
    }

    advanceTime(steps) {
        for (let i = 0; i < steps; i++) {
            this.timeStep();
        }
    }

    timeStep() {
        let nextCells = [];
        let adjacentTally = 0;
        for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
                adjacentTally = this.#tallyAdjacent(x, y);
                let currentCell = this.getCell(x, y);
                let nextCell = this.#nextCell(adjacentTally, currentCell);
                nextCells.push(nextCell);
            }
        }
        this.#cells = nextCells;
    }

    #tallyAdjacent(x, y) {
        let total = 0;
        total += this.getCell(x-1, y-1).contribute();
        total += this.getCell(x, y-1).contribute();
        total += this.getCell(x+1, y-1).contribute();
        total += this.getCell(x-1, y).contribute();
        total += this.getCell(x+1, y).contribute();
        total += this.getCell(x-1, y+1).contribute();
        total += this.getCell(x, y+1).contribute();
        total += this.getCell(x+1, y+1).contribute();
        return total;
    }

    #nextCell(adjacentTally, currentCell) {
        let nextCell;
        if (currentCell instanceof DeadCell) {
            if (adjacentTally == 3) {
                nextCell = new LiveCell();
            }
            else {
                nextCell = new DeadCell();
            }
        }
        else if (currentCell instanceof LiveCell) {
            if (adjacentTally == 2 || adjacentTally == 3) {
                nextCell = new LiveCell();
                nextCell.setLifespan(currentCell.getLifespan() + 1);
            }
            else {
                nextCell = new DeadCell();
            }
        }
        else {
            throw new Error("Unsupported cell type found when advancing time.");
        }

        return nextCell;
    }

    drawText() {
        let text = "";
        for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
                text += this.getCell(x, y).drawText();
            }
            text += "\n";
        }
        return text;
    }
}

class DeadBorderField extends BaseField {
    constructor(width, height) {
        super(width, height);
    }

    resolveOutOfBoundsCell(x, y) {
        return new DeadCell();
    }
}

class LiveBorderField extends BaseField {
    constructor(width, height) {
        super(width, height);
    }

    resolveOutOfBoundsCell(x, y) {
        return new LiveCell();
    }
}

class WrappedBorderField extends BaseField {
    constructor(width, height) {
        super(width, height);
    }

    resolveOutOfBoundsCell(x, y) {
        let wrappedX = x;
        let wrappedY = y;

        // Will resolve recursively if we somehow end up being more than one board length off-screen.
        if (wrappedX < 0) {
            wrappedX += this.getWidth();
        }
        else if (wrappedX >= this.getWidth()) {
            wrappedX -= this.getWidth();
        }

        if (wrappedY < 0) {
            wrappedY += this.getHeight();
        }
        else if (wrappedY >= this.getHeight()) {
            wrappedY -= this.getHeight();
        }

        return this.getCell(wrappedX, wrappedY);
    }
}
