import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates, SVGDrawPath } from '../../types/types';
import {
  arrayFrom,
  elementArrayToObject,
  flattenElementsAndCalculateOffset,
  getConvertedSVGShapes,
  pathCommandsRegExp,
} from '../helper/util';
import { Path } from '../Shapes/Path';
import { Tool } from './Tool';

export class ImportTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    self: EditorLayout,
    offset: Coordinates
  ) {
    super(drawLayer, self, offset);
    this.#draw = this.pen.generatePen(this.context).draw;
  }

  #draw: (shape: ShapeType) => void;

  #translateRegExp = new RegExp(/(?<=translate)\((\w*) (\w*)\)/);

  drawSvg = (svg: Document) => {
    const svgElement = svg.documentElement;
    const allElements = flattenElementsAndCalculateOffset(svgElement);
    const { shapes, paths } = getConvertedSVGShapes(svgElement);
    console.log(paths);
    const pathValues = paths
      .map(({ element, elementOffset }) => {
        if (element.tagName !== 'path') return;
        const pathDString = element.getAttribute('d') ?? '';
        const matches = Array.from(pathDString.matchAll(pathCommandsRegExp));
        const pathCommands: Array<{ command: string; points: Coordinates[] }> =
          matches.map((match): { command: string; points: Coordinates[] } => ({
            command: match[1].trim(),
            points: match[2]
              .trim()
              .split(' ')
              .map(coordinatesString => {
                const [x, y] = coordinatesString.trim().split(',');
                return [parseFloat(x), parseFloat(y)];
              }),
          }));
        return { pathCommands, elementOffset, pathDString };
      })
      .filter(value => !!value) as Array<{
      pathCommands: SVGDrawPath[];
      elementOffset: Coordinates;
    }>;
    console.log(pathValues);
    const pathShapes = pathValues.map(
      path => new Path(path.pathCommands, false, path.elementOffset)
    );
    console.log(pathShapes);
    const pathConstructor = new Path2D();
    pathShapes.forEach(path => {
      pathConstructor.moveTo(...path.offset);
      console.log(path.toPathDString());
      pathConstructor.addPath(new Path2D(path.toPathDString()));
      this.context?.stroke(pathConstructor);
    });
  };

  destroy = () => {
    return this.allShapes;
  };
}
