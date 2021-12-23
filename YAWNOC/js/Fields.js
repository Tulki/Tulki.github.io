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

class TruncatingField extends BaseField {
    constructor(width, height) {
        super(width, height);
    }

    resolveOutOfBoundsCell(x, y) {
        return new DeadCell();
    }
}
