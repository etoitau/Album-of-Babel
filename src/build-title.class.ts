export class TitleBuilder {
    static build(container: HTMLDivElement) {
        const style = require('./styles/style.css')

        container.classList.add('navi');
        let table = document.createElement("table");
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let h1 = document.createElement("h1");

        container.appendChild(table);
        table.appendChild(row);
        row.appendChild(cell);
        cell.appendChild(h1);

        h1.innerHTML = "Album of Babel";

        
    }
}