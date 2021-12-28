import { ShapeType } from '../../types/shapes';
import { BoundaryCoordinates, Coordinates, Matrix } from '../../types/types';
import { FlattenedElement, Partition } from '../../types/util.types';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Path } from '../Shapes/Path';
import { Rectangle } from '../Shapes/Rectangle';
import {
  matrixRegExp,
  rotateRegExp,
  scaleRegExp,
  skewXRegExp,
  skewYRegExp,
  translateRegExp,
} from '../constants/regularExpressions';
import { getPathCommands } from './shapes';
import { supportedStyles } from '../constants/styles';
import {
  SupportedStyle,
  SupportedStyles,
} from '../../types/globalStyles.types';

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

const getsvgParams = (
  element: SVGGraphicsElement,
  svgParentStyles?: SupportedStyles
): { styles?: SupportedStyles; transformMatrix?: DOMMatrix } => {
  const styles: SupportedStyles = Object.fromEntries(
    supportedStyles.map(style => {
      const key = style;
      const value = element.getAttribute(key) ?? svgParentStyles?.[key] ?? '';
      return [key, value];
    })
  );
  const transformMatrix = element.getCTM() ?? undefined;
  return {
    styles,
    transformMatrix,
  };
};

const getStyleObject = (
  style: string
): [SupportedStyle, string] | undefined => {
  const [key, value] = style.split(':').map(splitStyle => splitStyle.trim());
  if ((supportedStyles as ReadonlyArray<string>).includes(key)) {
    return [key as SupportedStyle, value];
  }
};

const convertToShapeType = (svgElementStyles?: string[]) => {
  const svgParentStyles: SupportedStyles = Object.fromEntries(
    svgElementStyles
      ?.map(getStyleObject)
      .filter(
        (value): value is [SupportedStyle, string] => value !== undefined
      ) ?? []
  );

  return (element: SVGGraphicsElement): ShapeType => {
    const directParent = element.parentElement;
    const svgParams = getsvgParams(element, svgParentStyles);
    console.log(svgParams);
    if (directParent?.tagName === 'g') {
      const fill = directParent.getAttribute('fill');
      const stroke = directParent.getAttribute('stroke');
      if (
        (!svgParams.styles?.fill || svgParams.styles.fill === 'none') &&
        fill
      ) {
        if (svgParams.styles) {
          console.log('fill set', svgParams.styles.fill, fill);
          svgParams.styles.fill = fill;
        } else {
          console.log(Object.assign(svgParams, { styles: { fill } }));
        }
      }
      if (
        (!svgParams.styles?.stroke || svgParams.styles.stroke === 'none') &&
        stroke
      ) {
        if (svgParams.styles) {
          svgParams.styles.stroke = stroke;
        } else {
          console.log(Object.assign(svgParams, { styles: { stroke } }));
        }
      }
    }
    console.log(svgParams);

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
        const d = element.getAttribute('d') ?? '';
        const pathCommands = getPathCommands(d);
        return new Path(pathCommands, svgParams, true);
      }
    }
  };
};
export const getAllSVGShapesFromElement = (element: Element) => {
  element;
};

export const convertSVGDocumentToShapes = (
  importedElementID: string
): ShapeType[] => {
  const svg = document.getElementById(
    importedElementID
  ) as unknown as SVGSVGElement;
  const styles = svg
    .getAttribute('style')
    ?.split(';')
    .map(styleValue => styleValue.trim());
  const convertToShape = convertToShapeType(styles);
  return acceptedTags
    .map(tag =>
      (Array.from(svg.getElementsByTagName(tag)) as SVGGraphicsElement[]).map(
        convertToShape
      )
    )
    .flat();
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
  ...relativeSingleDirectionCommands,
];
export const absoluteCommands = [
  ...absoluteCoordinatesCommands,
  ...absoluteSingleDirectionCommands,
];

export const singleDirectionCommands = [
  ...relativeSingleDirectionCommands,
  ...absoluteSingleDirectionCommands,
];

export const pathCommandValues = [...relativeCommands, ...absoluteCommands];
