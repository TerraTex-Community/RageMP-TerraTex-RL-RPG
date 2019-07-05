export class HtmlHelper {
    static generateTable (colums: {title: string, property: string}[], data: any[]): string {
        let returnValue = "<table class='table table-hover table-dark table-sm'><tr>";
        for (const col of colums) {
            returnValue += `<th>${col.title}</th>`;
        }
        returnValue+= "</tr>";

        for (const row of data) {
            returnValue += "<tr>";
            for (const col of colums) {
                returnValue += `<td>${row[col.property]}</td>`;
            }
            returnValue += "</tr>";
        }

        returnValue += "</table>";

        return returnValue;
    }
}
