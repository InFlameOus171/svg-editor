import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { flattenSVG } from 'flatten-svg';
import { convertSVGDocumentToShapes } from '../helper/util';
import { Tool } from './Tool';

export class ImportTool extends Tool<ShapeType> {
  #draw: (shape: ShapeType) => void;

  constructor(
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(drawLayer, self, offset);
    this.#draw = this.pen.generatePen(this.context).draw;
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
      console.log(shapes);
      shapes.forEach(shape => console.log(shape.toString()));
      document.body.removeChild(appendedSvg);
      this.allShapes.push(...shapes);
      shapes.forEach(this.#draw);
    }
  };

  destroy = () => {
    return this.allShapes;
  };
}
