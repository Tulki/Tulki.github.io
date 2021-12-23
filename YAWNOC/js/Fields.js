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

    // x is left to right
    // y is top to bottom
    getCell(x, y) {
        throw new Error("Method getCell(x, y) must be implemented.");
    }

    outOfBounds(x, y) {
        return (x < 0 || x >= this.#width || y < 0 || y >= this.#width);
    }

    drawText() {
        if (this.constructor == BaseField) {
            throw new Error("Cannot call method drawText() in BaseField. Must be inherited.");
        }

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
    #width;
    #height;

    #cells;

    constructor(width, height) {
        super(width, height);
    }

    getCell(x, y) {
        if (this.outOfBounds(x, y)) {
            return new DeadCell();
        }
        else {
            let index = y*width + x;
            return this.#cells[index];
        }
    }
}
