import { SVGEditor } from '../../../components/organisms/SVGEditor';
import type { ShapeType } from '../../../types/shapes.types';
import type { Coordinates } from '../../../types/types';
import { convertSVGDocumentToShapes } from '../../helper/svgUtil';
import { Tool } from '../Tool';

export class ImportTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    self: SVGEditor,
    onImport: (shape: ShapeType | ShapeType[] | null) => void,
    offset: Coordinates
  ) {
    super(drawLayer, self, onImport, offset);
  }

  drawSvg = (svg: Document) => {
    if (svg.firstChild) {
      const createdSVG = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      const elementId = '#imported-svg#';
      createdSVG.setAttribute('id', elementId);
      createdSVG.appendChild(svg.firstChild);
      const appendedSvg = document.body.appendChild(createdSVG);
      const shapes = convertSVGDocumentToShapes(elementId);
      this.onUpdateEditor(shapes);
      document.body.removeChild(appendedSvg);
    }
  };

  destroy = () => {
    return this.allShapes;
  };
}
