import { TitleBuilder } from './build-title.class';
import { PicViewer } from './pic-viewer.class';
import { ColorPick } from './color-pick.class';
import { Pen } from './pen.class';
import { ColorCell } from './color-cell.class';
import { Convert } from './convert.class';

export class Page {
    editorView: PicViewer;
    centerView: PicViewer;
    leftView: PicViewer;
    rightView: PicViewer;
    pageInfo: HTMLDivElement;


    constructor() {
        const picSize = PicViewer.DEFAULT_PIC_SIZE;

        document.title = "Album of Babel";

        let div: HTMLDivElement;

        // title
        div = getDiv();
        div.id = "title";
        document.body.appendChild(div);

        TitleBuilder.build(div);

        // spacer
        div = getDiv();
        div.style.height = "30px";
        document.body.appendChild(div);

        // editor view
        let table = document.createElement("table");
        table.align = "center";
        document.body.appendChild(table);
        table.className = "layouttable";
        let row = document.createElement("tr");
        table.appendChild(row);
        let cell1 = document.createElement("td");
        row.appendChild(cell1);
        let cell2 = document.createElement("td");
        row.appendChild(cell2);

        // editor add viewer
        div = getDiv();
        div.id = "editor";
        document.body.appendChild(div);
        this.editorView = new PicViewer(picSize, picSize);
        div.appendChild(this.editorView.div);
        cell1.appendChild(div);

        // editor add color input
        let pen = new Pen(this.editorView);
        div = getDiv();
        let picker = new ColorPick(div, pen);
        cell2.appendChild(div);

        // get this or random
        let p = document.createElement("p");
        p.align = "center";
        document.body.appendChild(p);

        let a = document.createElement("a");
        a.setAttribute("align", "center");
        a.innerHTML = "Find this in album";
        a.onclick = () => this.findDrawnAndShow();
        p.appendChild(a);
        p.appendChild(getBr());


        a = document.createElement("a");
        a.setAttribute("align", "center");
        a.innerHTML = "Flip to random page";
        a.onclick = () => this.findRandomAndShow();
        p.appendChild(a);
        p.appendChild(document.createElement("br"));


        // spacer
        div = getDiv();
        div.style.height = "30px";
        document.body.appendChild(div);

        // viewer
        table = document.createElement("table");
        table.align = "center";
        document.body.appendChild(table);

        row = document.createElement("tr");
        table.appendChild(row);
        cell1 = document.createElement("td");
        row.appendChild(cell1);
        cell2 = document.createElement("td");
        row.appendChild(cell2);
        let cell3 = document.createElement("td");
        row.appendChild(cell3);

        div = getDiv();
        div.id = "leftview";
        cell1.appendChild(div);
        this.leftView = new PicViewer(picSize, picSize);
        this.leftView.setCellSize(0.6 * ColorCell.DEFAULT_SIZE)
        div.appendChild(this.leftView.div);

        div = getDiv();
        div.id = "centerview";
        cell2.appendChild(div);
        this.centerView = new PicViewer(picSize, picSize);
        div.appendChild(this.centerView.div);

        div = getDiv();
        div.id = "rightview";
        cell3.appendChild(div);
        this.rightView = new PicViewer(picSize, picSize);
        this.rightView.setCellSize(0.6 * ColorCell.DEFAULT_SIZE);
        div.appendChild(this.rightView.div);

        // page info
        this.pageInfo = getDiv();
        this.pageInfo.align = "center";
        this.pageInfo.id = "pageinfo";
        document.body.appendChild(this.pageInfo);
    }

    findDrawnAndShow() {
        console.log("findDrawnAndShow called")
        let hexData = this.editorView.getHexData();
        this.centerView.setFromHexData(hexData);
        this.updateNeighbors();
        this.updatePageInfo(hexData);
    }
    
    updateNeighbors() {
        let hexData = this.centerView.getHexData();
        let shuffled = Convert.shuffleHexString(hexData);
        let bi = Convert.baseToBigInt(shuffled, Convert.hexiDecimal);
        let one = BigInt("1");
    
        let leftBi = bi - one;
        let leftShuffledHex = Convert.bigIntToBase(leftBi, Convert.hexiDecimal);
        let leftHex = Convert.unShuffleHexString(leftShuffledHex);
        this.leftView.setFromHexData(leftHex);
    
        let rightBi = bi + one;
        let rightShuffledHex = Convert.bigIntToBase(rightBi, Convert.hexiDecimal);
        let rightHex = Convert.unShuffleHexString(rightShuffledHex);
        this.rightView.setFromHexData(rightHex);
    }
    
    updatePageInfo(hexData: string) {
        this.pageInfo.innerHTML = "";

        let shuffled = Convert.shuffleHexString(hexData);
        let bi = Convert.baseToBigInt(shuffled, Convert.hexiDecimal);
    
        let div = this.pageInfo;
        let span = document.createElement("span");
        span.innerText = "Page: " + Convert.bigIntShortForm(bi);
        div.appendChild(span);
        div.appendChild(getBr());
        
        span = document.createElement("span");
        span.innerText = "Of: " + Convert.bigIntShortForm(Convert.getMax());
        div.appendChild(span);
        div.appendChild(getBr());
        
        span = document.createElement("span");
        span.innerText = "Found " + Convert.getPercent(bi) + "% through book";
        div.appendChild(span);
        div.appendChild(getBr());
    }
    
    findRandomAndShow() {
        // todo
    }
}

function getBr() {
    return document.createElement("br");
}

function getDiv() {
    return document.createElement("div") as HTMLDivElement;
}