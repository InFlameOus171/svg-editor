import type { Coordinates } from '../../types/types';
import { hexColorCodeRegExp } from './regularExpressions';

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
