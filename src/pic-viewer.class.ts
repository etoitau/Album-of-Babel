import { ColorCell } from './color-cell.class'

export class PicViewer {
    gridWidth: number;
    gridHeight: number;
    cellSize: number = 10;
    color: string = "#FFFFFF";
    div: HTMLDivElement;
    table: HTMLTableElement;
    cells: Array<Array<ColorCell>>;
    
    constructor(gridWidth: number, gridHeight: number) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.table = document.createElement("table") as HTMLTableElement;
        
        this.div = document.createElement("div") as HTMLDivElement;
        this.cells = this.createCells();
        this.populateTable();
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