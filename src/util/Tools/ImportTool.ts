import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates, SVGDrawPath } from '../../types/types';
import { FlattenedElement } from '../../types/util.types';
import {
  getConvertedSVGShapes,
  pathCommandsRegExp,
  pathCommandValues,
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

  #convertMatchesToSVGDrawPath = (match: RegExpMatchArray): SVGDrawPath => {
    const command = match[0].trim();
    const matchedCoordinates = match.slice(1);
    const points = matchedCoordinates.reduce(
      (acc: Coordinates[], point, index) => {
        if (index % 2 === 0) {
          return acc;
        }
        const coordinates: Coordinates = [
          parseFloat(matchedCoordinates[index - 1]),
          parseFloat(point),
        ];
        return [...acc, coordinates];
      },
      []
    );
    return { command, points };
  };

  #createPathObject = ({ element, elementOffset }: FlattenedElement) => {
    const pathDString = element.getAttribute('d') ?? '';

    const matches = Array.from(pathDString.matchAll(pathCommandsRegExp)).map(
      match => match[0]
    );
    const indices = matches.reduce((acc: number[], match, index) => {
      if (pathCommandValues.includes(match)) {
        return [...acc, index];
      } else {
        return acc;
      }
    }, []);
    const segments = indices.reduce(
      (acc: string[][], commandIndex, currentIndex) => {
        if (currentIndex === 0) {
          return acc;
        }
        acc.push(matches.slice(indices[currentIndex - 1], commandIndex));
        return acc;
      },
      []
    );
    const pathCommands: SVGDrawPath[] = segments.map(
      this.#convertMatchesToSVGDrawPath
    );
    const newPath = new Path(pathCommands, false, elementOffset);
    this.allShapes.push(newPath);
    this.#draw(newPath);
  };

  #drawPaths = (paths: FlattenedElement[]) => {
    const filteredPaths = paths.filter(
      element => element.element.tagName === 'path'
    );
    filteredPaths.forEach(this.#createPathObject);
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
