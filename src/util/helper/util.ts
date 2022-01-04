import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Coordinates, Matrix, SVGParamsBase } from '../../types/types';
import { FlattenedElement, Partition } from '../../types/util.types';
import { acceptedTags, SVGParamFieldID, textPlaceHolder } from './constants';
import { hexColorCodeRegExp } from './regularExpressions';

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

const isShapeElement = (flattenedElement: FlattenedElement) => {
  return acceptedTags.includes(flattenedElement.element.tagName);
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
  if (!colorCode) {
    return { colorCode: '#000000', opacity: '0' };
  }
  if (colorCode.charAt(0) !== '#') {
    const numberMatcher = new RegExp(/\d*\.?\d+/g);
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

export const inputFieldGetterGenerator =
  (fieldRoot?: HTMLElement | null) => (id: SVGParamFieldID) => {
    return fieldRoot?.querySelector('#' + id) as HTMLInputElement | null;
  };

export const updateStyleInputFields = (
  self: EditorLayout,
  params: SVGParamsBase
) => {
  const getFieldByParamId = inputFieldGetterGenerator(
    self.shadowRoot?.getElementById('footer-input')
  );
  const defaultColor = { colorCode: '#000000', opacity: '1' };
  const strokeColor = params.stroke
    ? normalizeColorCode(params.stroke)
    : defaultColor;
  const fillColor = params.fill
    ? normalizeColorCode(params.fill)
    : defaultColor;

  const fillColorInput = getFieldByParamId(SVGParamFieldID.FILL_COLOR);
  const fillOpacityInput = getFieldByParamId(SVGParamFieldID.FILL_OPACITY);
  const lineCapInput = getFieldByParamId(SVGParamFieldID.LINE_CAP);
  const lineDashInput = getFieldByParamId(SVGParamFieldID.LINE_DASH);
  const strokeColorInput = getFieldByParamId(SVGParamFieldID.STROKE_COLOR);
  const strokeOpacityInput = getFieldByParamId(SVGParamFieldID.STROKE_OPACITY);
  const strokeWidthInput = getFieldByParamId(SVGParamFieldID.STROKE_WIDTH);
  const textFontFamilyInput = getFieldByParamId(
    SVGParamFieldID.TEXT_FONT_FAMILY
  );
  const textFontSizeInput = getFieldByParamId(SVGParamFieldID.TEXT_FONT_SIZE);
  const textInput = getFieldByParamId(SVGParamFieldID.TEXT);
  if (fillColorInput) {
    fillColorInput.value = fillColor.colorCode;
  }
  if (fillOpacityInput) {
    fillOpacityInput.value = fillColor.opacity;
    fillOpacityInput.dispatchEvent(new Event('change'));
  }
  if (lineCapInput) {
    lineCapInput.value = params.lineCap ?? 'butt';
  }
  if (lineDashInput) {
    lineDashInput.value = params.lineDash?.join(',') ?? '0';
  }
  if (strokeColorInput) {
    strokeColorInput.value = strokeColor.colorCode;
  }
  if (strokeOpacityInput) {
    strokeOpacityInput.value = strokeColor.opacity;
    strokeOpacityInput.dispatchEvent(new Event('change'));
  }
  if (strokeWidthInput) {
    strokeWidthInput.value = params.strokeWidth ?? '0';
  }
  if (textFontFamilyInput) {
    textFontFamilyInput.value = params.fontFamily ?? 'Arial';
  }
  if (textFontSizeInput) {
    textFontSizeInput.value = params.fontSize?.toString() ?? '18';
  }
  if (textInput) {
    textInput.value = params.text ?? textPlaceHolder;
  }
};
