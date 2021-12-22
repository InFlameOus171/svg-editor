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
      const appendedSvg = document.body.appendChild(svg);
      const shapes = convertSVGDocumentToShapes(appendedSvg);
      document.body.removeChild(appendedSvg);
      this.allShapes.push(...shapes);
      shapes.forEach(this.#draw);
    }
  };

  destroy = () => {
    return this.allShapes;
  };
}
