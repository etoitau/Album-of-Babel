
import { TitleBuilder } from './build-title.class';
import { PicViewer } from './pic-viewer.class';

const style = require('./styles/style.css');


document.title = "Album of Babel";

var div: HTMLDivElement;

div = document.createElement("div") as HTMLDivElement;
div.id = "title";
document.body.appendChild(div);

TitleBuilder.build(div);

div = document.createElement("div") as HTMLDivElement;
div.id = "editor";
document.body.appendChild(div);

div = document.createElement("div") as HTMLDivElement;
div.id = "viewer";
document.body.appendChild(div);

var viewer = new PicViewer(16, 16);
div.appendChild(viewer.div);


