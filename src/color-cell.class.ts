import { Convert } from "./convert.class";

export class ColorCell {
    public static readonly DEFAULT_SIZE = 10;
    public static readonly DEFAULT_COLOR = "202020";
    private cellSize: number;
    private color: string = ColorCell.DEFAULT_COLOR;
    div: HTMLDivElement;
    
    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.div = document.createElement("div") as HTMLDivElement;
        this.setSize(this.cellSize);
        this.setColor(this.color);
    }

    reset() {
        this.setColor(ColorCell.DEFAULT_COLOR);
    }

    setRandom() {
        let result = "";
        for (let i = 0; i < this.color.length; i++) {
            result += Convert.hexiDecimal[Math.floor(Math.random() * Convert.hexiDecimal.length)];
        }
        this.setColor(result);
    }

    setSize(size:number) {
        this.cellSize = size;
        this.div.style.width = size.toString() + "px";
        this.div.style.height = size.toString() + "px";
    }

    setColor(hex:string) {
        this.color = hex;
        this.div.style.backgroundColor = "#" + this.color;
    }

    getColor() {
        return this.color;
    }
}