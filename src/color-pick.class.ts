import { ColorCell } from "./color-cell.class";
import { Convert } from "./convert.class";
import { Pen } from "./pen.class";

/**
 * Object for user to pick a color and update the pen with it
 */
export class ColorPick {
    parent: HTMLDivElement;
    r: HTMLInputElement;
    g: HTMLInputElement;
    b: HTMLInputElement;
    square: ColorCell;
    pen: Pen;
    
    constructor(parent: HTMLDivElement, pen: Pen) {
        this.parent = parent;
        this.pen = pen;
        // table to lay out elements
        var table = document.createElement("table");
        this.parent.appendChild(table);
        table.className = "layouttable";
        var row = document.createElement("tr");
        table.appendChild(row);
        var cell1 = document.createElement("td");
        row.appendChild(cell1);
        var cell2 = document.createElement("td");
        row.appendChild(cell2);

        // "pixel" to show current color
        this.square = new ColorCell(20);
        cell1.appendChild(this.square.div);

        var span: HTMLSpanElement;

        // enter red value
        span = document.createElement("span") as HTMLSpanElement;
        span.innerText = "R: ";
        cell2.appendChild(span);
        this.r = this.getRGBInput();
        this.r.id = "r";
        cell2.appendChild(this.r);
        cell2.appendChild(document.createElement("br"));

        // enter green value
        span = document.createElement("span") as HTMLSpanElement;
        span.innerText = "G: ";
        cell2.appendChild(span);
        this.g = this.getRGBInput();
        this.g.id = "g";
        cell2.appendChild(this.g);
        cell2.appendChild(document.createElement("br"));

        // enter blue value
        span = document.createElement("span") as HTMLSpanElement;
        span.innerText = "B: ";
        cell2.appendChild(span);
        this.b = this.getRGBInput();
        this.b.id = "b";
        cell2.appendChild(this.b);
        
        this.setListeners();
        this.updateColor();
    }

    setListeners() {
        this.r.addEventListener("input", (e:Event) => this.updateColor());
        this.g.addEventListener("input", (e:Event) => this.updateColor());
        this.b.addEventListener("input", (e:Event) => this.updateColor());
    }

    updateColor() {
        // update preview square and pen with current color
        if (this.r.value == null || this.r.value == "" ||
            this.g.value == null || this.g.value == "" ||
            this.b.value == null || this.b.value == "") {
                return;
        }
        let hex = Convert.fixLength(Convert.numberToBase(Number(this.r.value), Convert.hexiDecimal), 2) +
            Convert.fixLength(Convert.numberToBase(Number(this.g.value), Convert.hexiDecimal), 2) +
            Convert.fixLength(Convert.numberToBase(Number(this.b.value), Convert.hexiDecimal), 2);
        
        this.square.setColor(hex);

        this.pen.setColor(hex);
    }

    // quickly get an input field for an rgb value
    getRGBInput() {
        var input = document.createElement("input") as HTMLInputElement;
        input.type = "number";
        input.min = "0";
        input.max = "255";
        input.value = "217";
        return input;
    }
}