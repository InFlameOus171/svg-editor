// Matches any decimal number with or without decimal separator "."
export const decimalNumberRegExp = new RegExp(/(-?\d*\.?\d+)/);
const decimalNumber = decimalNumberRegExp.source;

export const decimalNumberRegExpGlobal = new RegExp(/(-?\d*\.?\d+)/g);

export const separatorRegExp = new RegExp(/((\s?,\s?)|\s)/);
const separator = separatorRegExp.source;

// Reads path string and groups each match in three groups: 1st: path command, 2nd: x coordinate and y coordinates "x,y"
export const pathCommandsRegExp = new RegExp(`${decimalNumber}|[a-zA-Z]`, 'g');

// Matches matrix string of a transform
export const matrixRegExp = new RegExp(
  `matrix\\(${decimalNumber}(${separator}${decimalNumber}){5}\\)`
);

// Matches translate string of a transform
export const translateRegExp = new RegExp(
  `translate\\(${decimalNumber}(${separator}${decimalNumber})?\\)`
);
// Matches scale string of a transform
export const scaleRegExp = new RegExp(
  `scale\\(${decimalNumber}(${separator}${decimalNumber})?\\)`
);

// Matches rotate string of a transform
export const rotateRegExp = new RegExp(
  `rotate\\(${decimalNumber}((${separator}${decimalNumber}){2})?\\)`
);

// Matches skewX and skewY string of a transform
export const skewXRegExp = new RegExp(`skewX\\(${decimalNumber}\\)`);
export const skewYRegExp = new RegExp(`skewY\\(${decimalNumber}\\)`);
