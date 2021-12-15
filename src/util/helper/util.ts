import { ShapeType } from '../../types/shapes';
import { BoundaryCoordinates, Coordinates } from '../../types/types';
import { FlattenedElement, Partition } from '../../types/util.types';
import { Ellipse } from '../Shapes/Ellipse';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Rectangle } from '../Shapes/Rectangle';

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

const translateRegExp = new RegExp(/(?<=translate)\((\w*) (\w*)\)/);

export const flattenElementsAndCalculateOffset = (
  element: Element,
  elementOffset: [number, number] = [0, 0]
): FlattenedElement[] => {
  const children: Element[] = arrayFrom(element.children);
  if (!!children.length) {
    return children.reduce((acc: FlattenedElement[], innerElement: Element) => {
      const translate = innerElement
        .getAttribute('transform')
        ?.match(translateRegExp);
      const offset = [parseFloat(translate?.[1]), parseFloat(translate?.[2])];

      const addedOffset: [number, number] = [
        elementOffset[0] + offset[0],
        elementOffset[1] + offset[1],
      ];

      const result = flattenElementsAndCalculateOffset(
        innerElement,
        addedOffset
      );
      return [...acc, ...result];
    }, []);
  } else {
    return [{ element, elementOffset }];
  }
};

const acceptedTags = [
  'circle',
  'ellipse',
  'rect',
  'polyline',
  'line' /* 'path' */,
];

const isShapeElement = (flattenedElement: FlattenedElement) => {
  return acceptedTags.includes(flattenedElement.element.tagName);
};

Element.prototype.getFloatAttribute = function (attribute: string) {
  return parseFloat(this.getAttribute(attribute));
};

const convertToShapeType = ({ element, elementOffset }: FlattenedElement) => {
  const [dx, dy] = elementOffset;
  switch (element.tagName) {
    case acceptedTags[0]: {
      const cx = element.getFloatAttribute('cx') + dx;
      const cy = element.getFloatAttribute('cy') + dy;
      const r = element.getFloatAttribute('r');
      return new Ellipse([cx, cy], r, r);
    }
    case acceptedTags[1]: {
      {
        const cx = element.getFloatAttribute('cx') + dx;
        const cy = element.getFloatAttribute('cy') + dy;
        const rx = element.getFloatAttribute('rx');
        const ry = element.getFloatAttribute('ry');
        return new Ellipse([cx, cy], rx, ry);
      }
    }
    case acceptedTags[2]: {
      {
        const x = element.getFloatAttribute('x') + dx;
        const y = element.getFloatAttribute('y') + dy;
        const width = element.getFloatAttribute('width');
        const height = element.getFloatAttribute('height');
        return new Rectangle([x, y], width, height);
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
        return new Freehand(points);
      }
    }
    case acceptedTags[4]: {
      {
        const x1 = element.getFloatAttribute('x1');
        const x2 = element.getFloatAttribute('x2');
        const y1 = element.getFloatAttribute('y1');
        const y2 = element.getFloatAttribute('y2');
        return new Line([x1, y1], [x2, y2]);
      }
    }
  }
};
type ReturnType = [FlattenedElement[], FlattenedElement[]];
export const getConvertedSVGShapes = (
  element: Element
): { shapes: ShapeType[]; paths: FlattenedElement[] } => {
  const useableElements = flattenElementsAndCalculateOffset(element);
  const [shapeElements, pathElements] = useableElements.reduce(
    (acc: ReturnType, elem): ReturnType => {
      if (isShapeElement(elem)) {
        return [[...acc[0], elem], [...acc[1]]];
      }
      return [[...acc[0]], [...acc[1], elem]];
    },
    [[], []]
  );
  return {
    shapes: shapeElements
      .map(convertToShapeType)
      .filter(value => value !== undefined) as ShapeType[],
    paths: pathElements,
  };
};

export const relativeCommandValues = [
  'a',
  'c',
  'h',
  'm',
  's',
  'q',
  't',
  'l',
  'v',
  'z',
];

export const absoluteCommandValues = [
  'A',
  'C',
  'H',
  'L',
  'M',
  'Q',
  'S',
  'T',
  'V',
  'Z',
];

export const pathCommandValues = [
  ...relativeCommandValues,
  ...absoluteCommandValues,
];

// Reads path string and groups each match in three groups: 1st: path command, 2nd: x coordinate and y coordinates "x,y"
export const pathCommandsRegExp = new RegExp(/(-?\d+\.?\d*)|[a-zA-Z]/g);
