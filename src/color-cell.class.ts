export class ColorCell {
    cellSize: number;
    color: string = "#FF00FF";
    div: HTMLDivElement;
    
    constructor(cellSize: number) {
        this.cellSize = cellSize;
        this.div = document.createElement("div") as HTMLDivElement;
        this.setSize(this.cellSize);
        this.setColor(this.color);
        this.div.addEventListener("mouseenter", (e:Event) => this.onTouchAction(e));
    }

    setSize(size:number) {
        this.cellSize = size;
        this.div.style.width = size.toString() + "px";
        this.div.style.height = size.toString() + "px";
    }

    setColor(hex:string) {
        this.color = hex;
        this.div.style.backgroundColor = this.color;
    }

    onTouchAction(e: Event) {
        if (this.color == "#FFFFFF") {
            this.setColor("#000000");
        } else {
            this.setColor("#FFFFFF");
        }
    }

    

}