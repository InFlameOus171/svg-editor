import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates } from '../../types/types';
import { convertElementToShapeType } from '../helper/util';
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
    const shapes = convertElementToShapeType(svg.documentElement);
    this.allShapes.push(...shapes);
    shapes.forEach(this.#draw);
  };

  destroy = () => {
    return this.allShapes;
  };
}
