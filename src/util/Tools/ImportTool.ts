import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates, SVGDrawPath, SVGParamsBase } from '../../types/types';
import { FlattenedElement } from '../../types/util.types';
import { getPathCommands } from '../helper/shapes';
import {
  getConvertedSVGShapes,
  pathCommandsRegExp,
  pathCommandValues,
} from '../helper/util';
import { Path } from '../Shapes/Path';
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

  #getPathStyleAttributes = (element: Element): Partial<SVGParamsBase> => {
    const fill = element.getAttribute('fill') ?? '';
    const stroke = element.getAttribute('stroke') ?? '';
    const strokeWidth = element.getAttribute('stroke-width') ?? '';
    return { fill, stroke, strokeWidth };
  };

  #createPathObject = ({ element, elementOffset }: FlattenedElement) => {
    const pathDString = element.getAttribute('d') ?? '';
    console.log(pathDString);
    const pathStyleAttributes = this.#getPathStyleAttributes(element);
    const pathCommands = getPathCommands(pathDString);
    const newPath = new Path(
      pathCommands,
      pathStyleAttributes,
      false,
      elementOffset
    );
    this.allShapes.push(newPath);
    this.#draw(newPath);
    console.log(newPath.toString());
  };

  #drawPaths = (paths?: FlattenedElement[]) => {
    const filteredPaths = paths?.filter(
      element => element.element.tagName === 'path'
    );
    filteredPaths?.length && filteredPaths.forEach(this.#createPathObject);
  };

  drawSvg = (svg: Document) => {
    const { shapes, paths } = getConvertedSVGShapes(svg.documentElement);
    this.allShapes.push(...shapes);
    this.#drawPaths(paths);
    shapes.forEach(this.#draw);
  };

  destroy = () => {
    return this.allShapes;
  };
}
