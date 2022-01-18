export const getCanvasRectangleValuesFromPoints = (startPoint, endPoint) => {
    const width = endPoint[0] - startPoint[0];
    const height = endPoint[1] - startPoint[1];
    return {
        startingCorner: startPoint,
        width,
        height,
    };
};
export const calculateDistanceBetweenPoints = (startPoint, endPoint) => {
    const cathete1 = startPoint[0] - endPoint[0];
    const cathete2 = startPoint[1] - endPoint[1];
    const result = Math.pow(cathete1, 2) + Math.pow(cathete2, 2);
    return Math.sqrt(result);
};
export const partitionCoordinates = (coordinates) => {
    return coordinates.reduce((acc, coordinate) => [
        [...acc[0], coordinate[0]],
        [...acc[1], coordinate[1]],
    ], [[], []]);
};
const betweenHelper = (coordinateToCheck) => {
    return (smallerCoordinate, biggerCoordinate) => {
        return (coordinateToCheck[0] >= smallerCoordinate[0] &&
            coordinateToCheck[1] >= smallerCoordinate[1] &&
            coordinateToCheck[0] <= biggerCoordinate[0] &&
            coordinateToCheck[1] <= biggerCoordinate[1]);
    };
};
const isBetweenTwoCoordinates = (firstCoord, secondCoord) => (coordinateToCheck) => {
    const isCoordinateBetween = betweenHelper(coordinateToCheck);
    if (firstCoord[0] <= secondCoord[0] && firstCoord[1] <= secondCoord[1]) {
        return isCoordinateBetween(firstCoord, secondCoord);
    }
    else {
        isCoordinateBetween(firstCoord, firstCoord);
    }
};
export const isPointInsideAnotherShape = (point) => (shape) => isShapeInsideAnotherShape(shape)({
    boundaries: [point, point, point, point],
});
export const isShapeInsideAnotherShape = (potentiallyBiggerShape) => (potentiallySmallerShape) => {
    var _a;
    if (!potentiallyBiggerShape) {
        return false;
    }
    const { boundaries: potentiallyBiggerCoordinates } = potentiallyBiggerShape;
    if (potentiallyBiggerCoordinates) {
        const [bigX, bigY] = partitionCoordinates(potentiallyBiggerCoordinates);
        const minCoordinates = [
            Math.min(...bigX),
            Math.min(...bigY),
        ];
        const maxCoordinates = [
            Math.max(...bigX),
            Math.max(...bigY),
        ];
        return (_a = potentiallySmallerShape.boundaries) === null || _a === void 0 ? void 0 : _a.every(isBetweenTwoCoordinates(minCoordinates, maxCoordinates));
    }
};
export const getTextBoundaries = (position, width, height) => {
    const x = parseInt(position[0].toString());
    const y = parseInt(position[0].toString());
    const pos1 = [x, position[1] + height / 4];
    const pos2 = [x, position[1] - height];
    const pos3 = [position[0] + width, position[1]];
    const pos4 = [position[0] + width, position[1] - height];
    console.debug(pos1, pos2, pos3, pos4);
    return [pos1, pos2, pos3, pos4];
};
export const splitCoordinates = (acc, point) => {
    return [
        [...acc[0], point[0]],
        [...acc[1], point[1]],
    ];
};
export const splitAllCoordinates = (coordinates) => {
    return coordinates.reduce(splitCoordinates, [[], []]);
};
export const getMinMaxValuesOfSplitCoordinates = (xCoordinates, yCoordinates) => {
    const xMin = Math.min(...xCoordinates);
    const yMin = Math.min(...yCoordinates);
    const xMax = Math.max(...xCoordinates);
    const yMax = Math.max(...yCoordinates);
    return { xMin, yMin, xMax, yMax };
};
export const getMinMaxValuesOfCoordinates = (coordinates) => {
    const [xCoords, yCoords] = splitAllCoordinates(coordinates);
    return getMinMaxValuesOfSplitCoordinates(xCoords, yCoords);
};
export const getBoundaryFromCoordinates = (coordinates) => {
    const { xMin, xMax, yMin, yMax } = getMinMaxValuesOfCoordinates(coordinates);
    return [
        [xMin, yMin],
        [xMax, yMin],
        [xMin, yMax],
        [xMax, yMax],
    ];
};
export const sumOfCoordinates = (coordinates1) => (coordinates2) => {
    return [
        coordinates1[0] + coordinates2[0],
        coordinates1[1] + coordinates2[1],
    ];
};
export const rectangleParamsFromBoundaries = (boundaries) => {
    const [xCoordinates, yCoordinates] = Array.from(new Set(splitAllCoordinates(boundaries)));
    const { xMin, yMin, xMax, yMax } = getMinMaxValuesOfSplitCoordinates(xCoordinates, yCoordinates);
    const startingCorner = [xMin, yMin];
    const width = xMax - xMin;
    const height = yMax - yMin;
    return { startingCorner, width, height };
};
//# sourceMappingURL=coordinates.js.map