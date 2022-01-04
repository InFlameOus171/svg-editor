import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { convertSVGDocumentToShapes } from '../helper/shapes';
import { Pen } from '../Pen';
import { Tool } from './Tool';

export class ImportTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    onImport: (shape: ShapeType | ShapeType[] | null) => void,
    offset: Coordinates
  ) {
    super(drawLayer, self, onImport, offset);
  }

  drawSvg = (svg: Document) => {
    if (svg.firstChild) {
      // TODO document not appendable ?
      const createdSVG = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      const elementId = '#imported-svg#';
      createdSVG.setAttribute('id', elementId);
      createdSVG.appendChild(svg.firstChild);
      const appendedSvg = document.body.appendChild(createdSVG);
      const shapes = convertSVGDocumentToShapes(elementId);
      document.body.removeChild(appendedSvg);
      this.onUpdateEditor(shapes);
    }
  };

  destroy = () => {
    return this.allShapes;
  };
}
