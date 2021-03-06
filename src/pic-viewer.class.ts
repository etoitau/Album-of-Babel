import { ColorCell } from './color-cell.class'
import { Convert } from './convert.class';

/**
 * Represents a picture
 * holds info about and manages "pixels"
 */
export class PicViewer {
    gridWidth: number;
    gridHeight: number;
    public static readonly DEFAULT_PIC_SIZE = 16;
    private cellSize: number = ColorCell.DEFAULT_SIZE;
    div: HTMLDivElement;
    private table: HTMLTableElement;
    cells: Array<Array<ColorCell>>;
    
    constructor(gridWidth: number, gridHeight: number) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.table = document.createElement("table") as HTMLTableElement;
        this.div = document.createElement("div") as HTMLDivElement;

        // build the cells
        this.cells = this.createCells();
        // build layout table and fill with cells
        this.populateTable();
    }

    // set all to default color
    reset() {
        for (let row of this.cells) {
            for (let cell of row) {
                cell.reset();
            }
        }
    }

    // set all to random colors
    setRandom() {
        for (let row of this.cells) {
            for (let cell of row) {
                cell.setRandom();
            }
        }
    }

    // get string representation of all cells colors in hexadecimal RGB
    getHexData() {
        let data = "";
        for (let row of this.cells) {
            for (let cell of row) {
                data = data + cell.getColor();
            }
        }
        return data;
    }

    // given string like getHexData produces, recreate image
    setFromHexData(data: string) {
        // two hex characters each for R, G, and B = 6
        let targetDataSize = this.gridHeight * this.gridWidth * 6;
        if (data.length > targetDataSize) {
            console.log("data wrong size " + data.length + " vs " + (this.gridHeight * this.gridWidth * 6));
            return;
        }

        data = Convert.fixLength(data, targetDataSize);

        let place = 0;
        for (let row of this.cells) {
            for (let cell of row) {
                cell.setColor(data.substring(place, place = place + 6));
            }
        }
    }

    // set size of each "pixel"
    setCellSize(size: number) {
        this.cellSize = size;
        for (let row of this.cells) {
            for (let cell of row) {
                cell.setSize(size);
            }
        }
    }

    // set color of a specific pixel
    setCellColor(row: number, col: number, color: string) {
        this.cells[row][col].setColor(color);
    }

    // create all the 'pixels' and put in data structure
    createCells() {
        let toReturn: Array<Array<ColorCell>> = new Array();
        
        for (var r = 0; r < this.gridHeight; r++) {
            // make each row
            let row: Array<ColorCell> = new Array();
            for (var c = 0; c < this.gridWidth; c++) {
                row.push(new ColorCell(this.cellSize));
            }
            toReturn.push(row);
        } 

        return toReturn;
    }

    // build the table and fill with 'pixels'
    populateTable() {
        this.table.className = "pictable";
        
        for (let row of this.cells) {
            let tableRow = document.createElement("tr");
            for (let cell of row) {
                let tableCell = document.createElement("td");
                tableCell.appendChild(cell.div);
                tableRow.appendChild(tableCell);
            }
            this.table.appendChild(tableRow);
        }
        this.div.appendChild(this.table);
    }

}