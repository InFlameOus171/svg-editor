import { ShapeType } from '../../types/shapes';
import { BoundaryCoordinates, Coordinates, Matrix } from '../../types/types';
import { FlattenedElement, Partition } from '../../types/util.types';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Path } from '../Shapes/Path';
import { Rectangle } from '../Shapes/Rectangle';
import {
  hexColorCodeRegExp,
  matrixRegExp,
  rotateRegExp,
  scaleRegExp,
  skewXRegExp,
  skewYRegExp,
  translateRegExp,
} from './regularExpressions';
import { getPathCommands } from './shapes';

export const partition = <T>(
  array: Array<T>,
  aggregateFunction: (value: T) => boolean,
  applyFunction: (value: T) => T = value => value
): Partition<T> => {
  return array.reduce(
    (acc: Partition<T>, value) => {
      const result = aggregateFunction(value);
      if (result) {
        return [[...acc[0], applyFunction(value)], [...acc[1]]];
      } else {
        return [[...acc[0]], [...acc[1], applyFunction(value)]];
      }
    },
    [[], []]
  );
};

export const getUniqueXandYCoordinatesFromBoundaries = (
  coordinates: Coordinates[]
): [number[], number[]] => {
  const uniqueCoordinates = [...new Map(coordinates)];

  const splitXandYCoordinates = uniqueCoordinates.reduce(
    (acc: Array<number[]>, innerArray) => {
      return [
        [...acc[0], innerArray[0]],
        [...acc[1], innerArray[1]],
      ];
    },
    [[], []]
  );
  return [
    [...new Set(splitXandYCoordinates[0])],
    [...new Set(splitXandYCoordinates[1])],
  ];
};

export const arrayFrom = <T>(arrayLike: ArrayLike<T> = []): T[] => {
  return Array.from(arrayLike);
};

export const parseFloat = (value?: string | number | null) => {
  if (value === undefined || value === null) {
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  return Number.parseFloat(value);
};

export const elementArrayToObject = (elements: Element[]) =>
  elements.reduce((acc: Record<string, Element[]>, elem) => {
    return { ...acc, [elem.tagName]: [...(acc[elem.tagName] ?? []), elem] };
  }, {});

const acceptedTags = ['circle', 'ellipse', 'rect', 'polyline', 'line', 'path'];

const isShapeElement = (flattenedElement: FlattenedElement) => {
  return acceptedTags.includes(flattenedElement.element.tagName);
};

Element.prototype.getFloatAttribute = function (attribute: string) {
  return parseFloat(this.getAttribute(attribute));
};

const getsvgParams = (element: SVGGraphicsElement) => {
  const fillValues = normalizeColorCode(element.getAttribute('fill'));
  const strokeValues = normalizeColorCode(element.getAttribute('stroke'));
  const fill = hexToRGBA(fillValues.colorCode, fillValues.opacity);
  const stroke = hexToRGBA(strokeValues.colorCode, strokeValues.opacity);
  const strokeWidth = element.getAttribute('stroke-width') ?? '';
  const transformMatrix = element.getCTM() ?? undefined;
  const bBox = element.getBBox();
  return {
    fill,
    stroke,
    strokeWidth,
    transformMatrix,
    bBox,
  };
};

const convertToShapeType = (element: SVGGraphicsElement): ShapeType => {
  const svgParams = getsvgParams(element);
  switch (element.tagName) {
    case acceptedTags[0]: {
      const cx = element.getFloatAttribute('cx');
      const cy = element.getFloatAttribute('cy');
      const r = element.getFloatAttribute('r');
      return new Ellipse([cx, cy], r, r, svgParams);
    }
    case acceptedTags[1]: {
      {
        const cx = element.getFloatAttribute('cx');
        const cy = element.getFloatAttribute('cy');
        const rx = element.getFloatAttribute('rx');
        const ry = element.getFloatAttribute('ry');
        return new Ellipse([cx, cy], rx, ry, svgParams);
      }
    }
    case acceptedTags[2]: {
      {
        const x = element.getFloatAttribute('x');
        const y = element.getFloatAttribute('y');
        const width = element.getFloatAttribute('width');
        const height = element.getFloatAttribute('height');
        return new Rectangle([x, y], width, height, svgParams);
      }
    }
    case acceptedTags[3]: {
      {
        const points = (element.getAttribute('points') ?? '')
          .split(' ')
          .map((coordinate): [number, number] => {
            const [x, y] = coordinate.split(',');
            return [parseFloat(x), parseFloat(y)];
          });
        return new Freehand(points, svgParams);
      }
    }
    case acceptedTags[4]: {
      {
        const x1 = element.getFloatAttribute('x1');
        const x2 = element.getFloatAttribute('x2');
        const y1 = element.getFloatAttribute('y1');
        const y2 = element.getFloatAttribute('y2');
        return new Line([x1, y1], [x2, y2], svgParams);
      }
    }
    default: {
      const pathDString = element.getAttribute('d') ?? '';
      const pathCommands = getPathCommands(pathDString);
      return new Path(pathCommands, svgParams, true);
    }
  }
};

export const getAllSVGShapesFromElement = (element: Element) => {
  element;
};

export const convertSVGDocumentToShapes = (id: string): ShapeType[] => {
  const svg = document.getElementById(id);
  if (svg) {
    return acceptedTags
      .map(tag =>
        (Array.from(svg.getElementsByTagName(tag)) as SVGGraphicsElement[]).map(
          convertToShapeType
        )
      )
      .flat();
  }
  return [];
};

// ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
export const transformCoordinatesByMatrix =
  (matrix: Matrix) =>
  (coordinates: Coordinates): Coordinates => {
    const [a, b, c, d, e, f] = matrix;
    const [oldX, oldY] = coordinates;
    const newX = a * oldX + c * oldX + e;
    const newY = b * oldY + d * oldY + f;
    return [newX, newY];
  };

export const transformAllCoordinatesByMatrix = (
  matrix: Matrix,
  coordinates: Coordinates[]
) => {
  return coordinates.map(transformCoordinatesByMatrix(matrix));
};

export const parseToFixed2HexString = (colorValue: RegExpMatchArray) => {
  let codeValue = parseInt(colorValue[0]).toString(16);
  if (codeValue.length < 2) {
    codeValue = '0'.concat(codeValue);
  }

  return codeValue;
};

export const hexToRGBA = (colorCode: string, opacity: string = '1') => {
  const [, r, g, b] = hexColorCodeRegExp.exec(colorCode) ?? [
    '#000000',
    '00',
    '00',
    '00',
  ];
  const parsedColorCodes = [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  return 'rgba('.concat(parsedColorCodes.join(','), ',', opacity, ')');
};

export const normalizeColorCode = (
  colorCode?: string | null
): { colorCode: string; opacity: string } => {
  console.log(colorCode);
  if (!colorCode) {
    return { colorCode: '#000000', opacity: '0' };
  }
  if (colorCode.charAt(0) !== '#') {
    const numberMatcher = new RegExp(/\d+/g);
    const parsedColorCodes = [...colorCode.matchAll(numberMatcher)];
    if (parsedColorCodes.length === 4) {
      const opacity = parsedColorCodes.pop()?.[0] ?? '0';
      const rgbColors = parsedColorCodes.map(parseToFixed2HexString);
      return { colorCode: '#'.concat(rgbColors.join('')), opacity };
    } else {
      const rgbColors = parsedColorCodes.map(parseToFixed2HexString);
      return { colorCode: '#'.concat(rgbColors.join('')), opacity: '1' };
    }
  }
  if (colorCode.length === 4) {
    const code = colorCode.substring(1);
    return {
      colorCode: '#'.concat(
        code[0],
        code[0],
        code[1],
        code[1],
        code[2],
        code[2]
      ),
      opacity: '1',
    };
  }
  return { colorCode, opacity: '1' };
};

// https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
/*
The first two parameters are the X and Y coordinates of the central point 
(the origin around which the second point will be rotated). The next two parameters are the 
coordinates of the point that we'll be rotating. The last parameter is the angle, in degrees.
- theftprevention, https://stackoverflow.com/users/2038227/theftprevention
*/
export const rotate = (
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number
): Coordinates => {
  var radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
};

export const updateNextSiblingValue = (event: InputEvent) => {
  if ((event.target as HTMLInputElement)?.nextElementSibling)
    (
      (event.target as HTMLInputElement).nextElementSibling as HTMLInputElement
    ).value = (event.currentTarget as HTMLInputElement)?.value;
};

export const updatePreviousSiblingValue = (event: InputEvent) => {
  if ((event.target as HTMLInputElement)?.previousElementSibling)
    (
      (event.target as HTMLInputElement)
        .previousElementSibling as HTMLInputElement
    ).value = (event.currentTarget as HTMLInputElement)?.value;
};

export const relativeCoordinatesCommands = [
  'a',
  'c',
  'm',
  's',
  'q',
  't',
  'l',
  'z',
];

export const absoluteCoordinatesCommands = [
  'A',
  'C',
  'L',
  'M',
  'Q',
  'S',
  'T',
  'Z',
];

export const relativeSingleDirectionCommands = ['h', 'v'];

export const absoluteSingleDirectionCommands = ['H', 'V'];

export const relativeCommands = [
  ...relativeCoordinatesCommands,
  relativeSingleDirectionCommands,
];
export const absoluteCommands = [
  ...absoluteCoordinatesCommands,
  absoluteSingleDirectionCommands,
];

export const singleDirectionCommands = [
  ...relativeSingleDirectionCommands,
  ...absoluteSingleDirectionCommands,
];

export const pathCommandValues = [
  ...relativeCoordinatesCommands,
  ...absoluteCoordinatesCommands,
  ...singleDirectionCommands,
];
