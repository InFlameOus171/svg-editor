import { hexColorCodeRegExp } from './regularExpressions';
export const partition = (array, aggregateFunction, applyFunction = value => value) => {
    return array.reduce((acc, value) => {
        const result = aggregateFunction(value);
        if (result) {
            return [[...acc[0], applyFunction(value)], [...acc[1]]];
        }
        else {
            return [[...acc[0]], [...acc[1], applyFunction(value)]];
        }
    }, [[], []]);
};
export const getUniqueXandYCoordinatesFromBoundaries = (coordinates) => {
    const uniqueCoordinates = [...new Map(coordinates)];
    const splitXandYCoordinates = uniqueCoordinates.reduce((acc, innerArray) => {
        return [
            [...acc[0], innerArray[0]],
            [...acc[1], innerArray[1]],
        ];
    }, [[], []]);
    return [
        [...new Set(splitXandYCoordinates[0])],
        [...new Set(splitXandYCoordinates[1])],
    ];
};
export const arrayFrom = (arrayLike = []) => {
    return Array.from(arrayLike);
};
export const parseFloat = (value) => {
    if (value === undefined || value === null) {
        return 0;
    }
    if (typeof value === 'number') {
        return value;
    }
    return Number.parseFloat(value);
};
export const elementArrayToObject = (elements) => elements.reduce((acc, elem) => {
    var _a;
    return Object.assign(Object.assign({}, acc), { [elem.tagName]: [...((_a = acc[elem.tagName]) !== null && _a !== void 0 ? _a : []), elem] });
}, {});
// ref: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
export const transformCoordinatesByMatrix = (matrix) => (coordinates) => {
    const [a, b, c, d, e, f] = matrix;
    const [oldX, oldY] = coordinates;
    const newX = a * oldX + c * oldX + e;
    const newY = b * oldY + d * oldY + f;
    return [newX, newY];
};
export const transformAllCoordinatesByMatrix = (matrix, coordinates) => {
    return coordinates.map(transformCoordinatesByMatrix(matrix));
};
export const parseToFixed2HexString = (colorValue) => {
    let codeValue = parseInt(colorValue[0]).toString(16);
    if (codeValue.length < 2) {
        codeValue = '0'.concat(codeValue);
    }
    return codeValue;
};
export const hexToRGBA = (colorCode, opacity = '1') => {
    var _a;
    const [, r, g, b] = (_a = hexColorCodeRegExp.exec(colorCode)) !== null && _a !== void 0 ? _a : [
        '#000000',
        '00',
        '00',
        '00',
    ];
    const parsedColorCodes = [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
    return 'rgba('.concat(parsedColorCodes.join(','), ',', opacity, ')');
};
export const normalizeColorCode = (colorCode) => {
    var _a, _b;
    if (!colorCode) {
        return { colorCode: '#000000', opacity: '0' };
    }
    if (colorCode.charAt(0) !== '#') {
        const numberMatcher = new RegExp(/\d*\.?\d+/g);
        const parsedColorCodes = [...colorCode.matchAll(numberMatcher)];
        if (parsedColorCodes.length === 4) {
            const opacity = (_b = (_a = parsedColorCodes.pop()) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '0';
            const rgbColors = parsedColorCodes.map(parseToFixed2HexString);
            return { colorCode: '#'.concat(rgbColors.join('')), opacity };
        }
        else {
            const rgbColors = parsedColorCodes.map(parseToFixed2HexString);
            return { colorCode: '#'.concat(rgbColors.join('')), opacity: '1' };
        }
    }
    if (colorCode.length === 4) {
        const code = colorCode.substring(1);
        return {
            colorCode: '#'.concat(code[0], code[0], code[1], code[1], code[2], code[2]),
            opacity: '1',
        };
    }
    return { colorCode, opacity: '1' };
};
export const updateNextSiblingValue = (event) => {
    var _a, _b;
    if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.nextElementSibling)
        event.target.nextElementSibling.value = (_b = event.currentTarget) === null || _b === void 0 ? void 0 : _b.value;
};
export const updatePreviousSiblingValue = (event) => {
    var _a, _b;
    if ((_a = event.target) === null || _a === void 0 ? void 0 : _a.previousElementSibling)
        event.target
            .previousElementSibling.value = (_b = event.currentTarget) === null || _b === void 0 ? void 0 : _b.value;
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
//# sourceMappingURL=util.js.map