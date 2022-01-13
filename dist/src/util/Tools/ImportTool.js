import { convertSVGDocumentToShapes } from '../helper/shapes';
import { Tool } from './Tool';
export class ImportTool extends Tool {
    constructor(drawLayer, self, onImport, offset) {
        super(drawLayer, self, onImport, offset);
        this.drawSvg = (svg) => {
            if (svg.firstChild) {
                const createdSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                const elementId = '#imported-svg#';
                createdSVG.setAttribute('id', elementId);
                createdSVG.appendChild(svg.firstChild);
                const appendedSvg = document.body.appendChild(createdSVG);
                const shapes = convertSVGDocumentToShapes(elementId);
                this.onUpdateEditor(shapes);
                document.body.removeChild(appendedSvg);
            }
        };
        this.destroy = () => {
            return this.allShapes;
        };
    }
}
//# sourceMappingURL=ImportTool.js.map