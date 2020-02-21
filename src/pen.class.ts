import { PicViewer } from "./pic-viewer.class";
import { ColorCell } from "./color-cell.class";

/**
 * Pen object for user to draw picture
 */
export class Pen {
    isDown: boolean = false;
    color: string = "202020";
    viewer: PicViewer;
    
    constructor(domain: PicViewer) {
        this.viewer = domain;
        this.setListeners();
    }

    setListeners() {
        this.viewer.div.addEventListener("mousedown", (e:Event) => this.isDown = true);
        this.viewer.div.addEventListener("mouseup", (e:Event) => this.isDown = false);
        this.viewer.div.addEventListener("mouseleave", (e:Event) => this.isDown = false);

        for (let row of this.viewer.cells) {
            for (let cell of row) {
                cell.div.addEventListener("mouseenter", (e:Event) => this.onTouchAction(e, cell));
                cell.div.addEventListener("mousedown", (e:Event) => this.onTouchAction(e, cell));
            }
        }
    }

    onTouchAction(e: Event, cell: ColorCell) {
        if (this.isDown || e.type == "mousedown") { 
            cell.setColor(this.color); 
        }
    }

    setColor(hex:string) {
        this.color = hex;
    }
}