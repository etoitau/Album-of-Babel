import { TitleBuilder } from './build-title.class';
import { PicViewer } from './pic-viewer.class';
import { ColorPick } from './color-pick.class';
import { Pen } from './pen.class';
import { ColorCell } from './color-cell.class';
import { Convert } from './convert.class';
import { Cipher } from './cipher.class';

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
        a.innerHTML = "Clear";
        a.href = "#";
        a.onclick = () => this.clearEditor();
        p.appendChild(a);
        p.appendChild(getBr());

        a = document.createElement("a");
        a.setAttribute("align", "center");
        a.innerHTML = "Find this in album";
        a.href = "#";
        a.onclick = () => this.findDrawnAndShow();
        p.appendChild(a);
        p.appendChild(getBr());


        a = document.createElement("a");
        a.setAttribute("align", "center");
        a.innerHTML = "Flip to random page";
        a.href = "#";
        a.onclick = () => this.findRandomAndShow();
        p.appendChild(a);

        // spacer
        // div = getDiv();
        // div.style.height = "30px";
        // document.body.appendChild(div);

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
        div.onclick = () => this.panLeft();

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
        div.onclick = () => this.panRight();

        // page info
        this.pageInfo = getDiv();
        this.pageInfo.align = "center";
        this.pageInfo.id = "pageinfo";
        document.body.appendChild(this.pageInfo);

        // initialize view
        this.initViews();
        
        // credits
        p = document.createElement("p");
        p.align = "center";
        document.body.appendChild(p);
        let text = document.createTextNode("by ");
        p.appendChild(text);
        a = document.createElement("a");
        a.setAttribute("align", "center");
        a.innerHTML = "Kyle Chatman";
        a.href = "http://cs.kchatman.com";
        p.appendChild(a);
        p.appendChild(getBr());
        text = document.createTextNode("inspired by: ");
        p.appendChild(text);
        a = document.createElement("a");
        a.setAttribute("align", "center");
        a.innerHTML = "Library of Babel";
        a.href = "https://libraryofbabel.info/";
        p.appendChild(a);
    }

    clearEditor() {
        this.editorView.reset();
    }

    initViews() {
        let name = new URLSearchParams(window.location.search).get("name");
        if (name == null) {
            console.log("no name");
            this.findRandomAndShow();
        } else {
            console.log("name provided");
            let size = this.editorView.gridHeight * this.editorView.gridWidth * 6;
            this.editorView.setFromHexData(Convert.nameToHex(name, size));
            this.findDrawnAndShow();
        }
    }

    panLeft() {
        // center moves to right
        let centHex = this.centerView.getHexData();
        this.rightView.setFromHexData(centHex);
        // left moves to center
        let leftHex = this.leftView.getHexData();
        this.centerView.setFromHexData(leftHex);
        // left gets next
        this.updateNeighbors(true, false);
        this.updatePageInfo(leftHex);
    }

    panRight() {
        // center moves to left
        let centHex = this.centerView.getHexData();
        this.leftView.setFromHexData(centHex);
        // right moves to center
        let rightHex = this.rightView.getHexData();
        this.centerView.setFromHexData(rightHex);
        // right gets next
        this.updateNeighbors(false, true);
        this.updatePageInfo(rightHex);
    }

    findDrawnAndShow() {
        console.log("findDrawnAndShow called")
        let hexData = this.editorView.getHexData();
        this.centerView.setFromHexData(hexData);
        this.updateNeighbors(true, true);
        this.updatePageInfo(hexData);
    }
    
    updateNeighbors(left: boolean, right: boolean) {
        let centerHexData = this.centerView.getHexData();
        // let ciphered = Cipher.streamIn(centerHexData);
        // let bi = Convert.baseToBigInt(ciphered, Convert.hexiDecimal);
        let bi = Cipher.cipherToBigInt(centerHexData);
        
        let neighborBi: bigint;
        let one = BigInt("1");
        let asHex: string;
    
        if (left) {
            neighborBi = bi - one;
            // asHex = Convert.fixLength(Convert.bigIntToBase(neighborBi, Convert.hexiDecimal), centerHexData.length);
            // this.leftView.setFromHexData(Cipher.streamOut(asHex));
            this.leftView.setFromHexData(Cipher.cipherFromBigInt(neighborBi, centerHexData.length));
        }

        if (right) {
            neighborBi = bi + one;
            // asHex = Convert.fixLength(Convert.bigIntToBase(neighborBi, Convert.hexiDecimal), centerHexData.length);
            // this.rightView.setFromHexData(Cipher.streamOut(asHex));
            this.rightView.setFromHexData(Cipher.cipherFromBigInt(neighborBi, centerHexData.length));
        }
    }
    
    updatePageInfo(hexData: string) {
        this.pageInfo.innerHTML = "";

        // let ciphered = Cipher.streamIn(hexData);
        // let bi = Convert.baseToBigInt(ciphered, Convert.hexiDecimal);
        let bi = Cipher.cipherToBigInt(hexData);
    
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

        let name = Convert.hexToName(hexData);

        window.history.replaceState(null, document.title, "?name=" + name);
    }
    
    findRandomAndShow() {
        this.centerView.setRandom();
        this.updateNeighbors(true, true);
        this.updatePageInfo(this.centerView.getHexData());
    }
}

function getBr() {
    return document.createElement("br");
}

function getDiv() {
    return document.createElement("div") as HTMLDivElement;
}