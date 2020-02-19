export class ColorCell {
    public static readonly DEFAULT_SIZE = 10;
    private cellSize: number;
    private color: string = "202020";
    div: HTMLDivElement;
    
    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.div = document.createElement("div") as HTMLDivElement;
        this.setSize(this.cellSize);
        this.setColor(this.color);
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