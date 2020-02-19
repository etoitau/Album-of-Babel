import { Page } from "./page.class";
import { Convert } from "./convert.class";

let page = new Page();

// test
let input = "ff3301";
let one = BigInt("1");
console.log(input);
let cipher = Convert.shuffleHexString(input);
console.log(cipher);
let asBi = Convert.baseToBigInt(cipher, Convert.hexiDecimal);
console.log(asBi);
let minusOne = asBi - one;
console.log(minusOne);
let hexFrom = Convert.bigIntToBase(minusOne, Convert.hexiDecimal);
console.log(hexFrom);
let decipher = Convert.unShuffleHexString(hexFrom);
console.log(decipher);

// import { TitleBuilder } from './build-title.class';
// import { PicViewer } from './pic-viewer.class';
// import { ColorPick } from './color-pick.class';
// import { Pen } from './pen.class';
// import { ColorCell } from './color-cell.class';
// import { Convert } from './convert.class';

// const style = require('./styles/style.css');

// const picSize = PicViewer.DEFAULT_PIC_SIZE;

// document.title = "Album of Babel";

// let div: HTMLDivElement;

// // test
// // let input = "ff3301";
// // console.log(input);
// // let cipher = Convert.shuffleHexString(input);
// // console.log(cipher);
// // let decipher = Convert.unShuffleHexString(cipher);
// // console.log(decipher);


// // title
// div = getDiv();
// div.id = "title";
// document.body.appendChild(div);

// TitleBuilder.build(div);

// // spacer
// div = getDiv();
// div.style.height = "30px";
// document.body.appendChild(div);

// // editor view
// let table = document.createElement("table");
// table.align = "center";
// document.body.appendChild(table);
// table.className = "layouttable";
// let row = document.createElement("tr");
// table.appendChild(row);
// let cell1 = document.createElement("td");
// row.appendChild(cell1);
// let cell2 = document.createElement("td");
// row.appendChild(cell2);

// // editor add viewer
// div = getDiv();
// div.id = "editor";
// document.body.appendChild(div);
// let editorView: PicViewer = new PicViewer(picSize, picSize);
// div.appendChild(editorView.div);
// cell1.appendChild(div);

// // editor add color input
// let pen = new Pen(editorView);
// div = getDiv();
// let picker = new ColorPick(div, pen);
// cell2.appendChild(div);

// // get this or random
// let p = document.createElement("p");
// p.align = "center";
// document.body.appendChild(p);

// let a = document.createElement("a");
// a.setAttribute("align", "center");
// a.innerHTML = "Find this in album";
// a.onclick = () => findDrawnAndShow();
// p.appendChild(a);
// p.appendChild(getBr());


// a = document.createElement("a");
// a.setAttribute("align", "center");
// a.innerHTML = "Flip to random page";
// a.onclick = () => findRandomAndShow();
// p.appendChild(a);
// p.appendChild(document.createElement("br"));


// // spacer
// div = getDiv();
// div.style.height = "30px";
// document.body.appendChild(div);

// // viewer
// table = document.createElement("table");
// table.align = "center";
// document.body.appendChild(table);

// row = document.createElement("tr");
// table.appendChild(row);
// cell1 = document.createElement("td");
// row.appendChild(cell1);
// cell2 = document.createElement("td");
// row.appendChild(cell2);
// let cell3 = document.createElement("td");
// row.appendChild(cell3);

// div = getDiv();
// div.id = "leftview";
// cell1.appendChild(div);
// var leftView = new PicViewer(picSize, picSize);
// leftView.setCellSize(0.6 * ColorCell.DEFAULT_SIZE)
// div.appendChild(leftView.div);

// div = getDiv();
// div.id = "centerview";
// cell2.appendChild(div);
// var centerView = new PicViewer(picSize, picSize);
// div.appendChild(centerView.div);

// div = getDiv();
// div.id = "rightview";
// cell3.appendChild(div);
// var rightView = new PicViewer(picSize, picSize);
// rightView.setCellSize(0.6 * ColorCell.DEFAULT_SIZE);
// div.appendChild(rightView.div);

// // page info
// div = getDiv();
// div.align = "center";
// div.id = "pageinfo";
// document.body.appendChild(div);


// function findDrawnAndShow() {
//     console.log("findDrawnAndShow called")
//     let hexData = editorView.getHexData();
//     centerView.setFromHexData(hexData);

//     updatePageInfo(hexData);
// }

// function updateNeighbors(center: PicViewer, left: PicViewer, right: PicViewer) {
//     let hexData = center.getHexData();
//     let shuffled = Convert.shuffleHexString(hexData);
//     let bi = Convert.baseToBigInt(hexData, Convert.hexiDecimal);
//     let one = BigInt("1");

//     let leftBi = bi - one;
//     let leftShuffledHex = Convert.bigIntToBase(leftBi, Convert.hexiDecimal);
//     let leftHex = Convert.unShuffleHexString(leftShuffledHex);
//     left.setFromHexData(leftHex);

//     let rightBi = bi + one;
//     let rightShuffledHex = Convert.bigIntToBase(rightBi, Convert.hexiDecimal);
//     let rightHex = Convert.unShuffleHexString(rightShuffledHex);
//     left.setFromHexData(rightHex);
    
// }

// function updatePageInfo(hexData: string) {
//     let shuffled = Convert.shuffleHexString(hexData);
//     let bi = Convert.baseToBigInt(hexData, Convert.hexiDecimal);

//     let div = <HTMLDivElement> document.getElementById("pageinfo");
//     let span = document.createElement("span");
//     span.innerText = "Page: " + Convert.bigIntShortForm(bi);
//     div.appendChild(span);
//     div.appendChild(getBr());
    
//     span = document.createElement("span");
//     span.innerText = "Of: " + Convert.bigIntShortForm(Convert.getMax());
//     div.appendChild(span);
//     div.appendChild(getBr());
    
//     span = document.createElement("span");
//     span.innerText = "Found " + Convert.getPercent(bi) + "% through book";
//     div.appendChild(span);
//     div.appendChild(getBr());
// }

// function findRandomAndShow() {
//     // todo
// }

// function getBr() {
//     return document.createElement("br");
// }

// function getDiv() {
//     return document.createElement("div") as HTMLDivElement;
// }



