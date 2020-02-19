import { ColorCell } from './color-cell.class'

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
        this.cells = this.createCells();
        this.populateTable();
    }

    getHexData() {
        let data = "";
        for (let row of this.cells) {
            for (let cell of row) {
                data = data + cell.getColor();
            }
        }
        return data;
    }

    setFromHexData(data: string) {
        if (data.length != this.gridHeight * this.gridWidth * 6) {
            console.log("data wrong size " + data.length + " vs " + (this.gridHeight * this.gridWidth * 6));
            return;
        }
        
        let place = 0;
        for (let row of this.cells) {
            for (let cell of row) {
                cell.setColor(data.substring(place, place = place + 6));
            }
        }
    }

    setCellSize(size: number) {
        this.cellSize = size;

        for (let row of this.cells) {
            for (let cell of row) {
                cell.setSize(size);
            }
        }
    }

    setCellColor(row: number, col: number, color: string) {
        this.cells[row][col].setColor(color);
    }

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