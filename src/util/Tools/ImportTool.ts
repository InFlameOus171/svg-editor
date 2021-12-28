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
    offset: Coordinates,
    allShapes: ShapeType[]
  ) {
    super(drawLayer, self, offset);
    this.allShapes = allShapes;
    this.#draw = this.pen.generatePen(this.context).draw;
  }

  drawSvg = (svg: Document) => {
    if (svg.firstElementChild) {
      // TODO document not appendable ?
      const id = '#imported-svg-element#';
      svg.firstElementChild.id = id;
      const appendedSvg = document.body.appendChild(svg.firstElementChild);
      const shapes = convertSVGDocumentToShapes(id);
      console.log(shapes);
      document.body.removeChild(appendedSvg);
      this.allShapes.push(...shapes);
      this.resetView();
      this.resetPreview();
      this.allShapes.forEach(this.#draw);
    }
  };

  destroy = () => {
    return this.allShapes;
  };
}
