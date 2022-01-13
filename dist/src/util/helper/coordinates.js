import { relativeCommands, singleDirectionCommands } from './util';
export const getCanvasRectangleValuesFromPoints = (startPoint, endPoint) => {
    const width = endPoint[0] - startPoint[0];
    const height = endPoint[1] - startPoint[1];
    return {
        startingCorner: startPoint,
        width,
        height,
    };
};
export const getFormattedRectangleValuesFromPoints = (startPoint, endPoint) => {
    const width = Math.abs(endPoint[0] - startPoint[0]);
    const height = Math.abs(endPoint[1] - startPoint[1]);
    const newStartingCorner = [
        Math.min(startPoint[0], endPoint[0]),
        Math.min(startPoint[1], endPoint[1]),
    ];
    return {
        startingCorner: newStartingCorner,
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
export const calculateVectorFromCoordinates = (vectorCoordinates) => {
    const [point1, point2] = vectorCoordinates;
    return [point1[0] - point2[0], point1[1] - point2[1]];
};
export const sumOfVectors = (vectorCoordinates) => {
    const vectors = vectorCoordinates.map(calculateVectorFromCoordinates);
    return vectors.reduce((newVector, currentVector) => {
        return [newVector[0] + currentVector[0], newVector[1] + currentVector[1]];
    }, [0, 0]);
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
const isPointInside = (shape, point) => {
    const boundaries = shape.boundaries;
    let pointIsIside = false;
    if (!boundaries)
        return false;
    for (let i = 0; i < boundaries.length; i++) {
        const j = (i + 1) % boundaries.length;
        if ((boundaries[i][1] < point[1] && boundaries[j][1] >= point[1]) ||
            (boundaries[j][1] < point[1] && boundaries[i][1] >= point[1])) {
            if ((point[1] - boundaries[i][1]) * (boundaries[j][0] - boundaries[i][0]) <
                (point[0] - boundaries[i][0]) * (boundaries[j][1] - boundaries[i][1])) {
                pointIsIside = !pointIsIside;
            }
        }
    }
    return pointIsIside;
};
export const getCircleBoundaries = (center, radiusX, radiusY) => {
    const topLeftCorner = [center[0] - radiusX, center[1] + radiusY];
    const topRightCorner = [
        center[0] + radiusX,
        center[1] + radiusY,
    ];
    const bottomLeftCorner = [
        center[0] - radiusX,
        center[1] - radiusY,
    ];
    const bottomRightCorner = [
        center[0] + radiusX,
        center[1] - radiusY,
    ];
    return [topLeftCorner, topRightCorner, bottomLeftCorner, bottomRightCorner];
};
export const getRectBoundaries = (startingCorner, width, height) => {
    const xMin = startingCorner[0];
    const yMax = startingCorner[1];
    const xMax = startingCorner[0] + width;
    const yMin = startingCorner[1] + height;
    return [
        [xMin, yMin],
        [xMin, yMax],
        [xMax, yMin],
        [xMax, yMax],
    ];
};
export const getLineBoundaries = (startingPoint, endPoint) => {
    const x1 = startingPoint[0];
    const x2 = endPoint[0];
    const y1 = startingPoint[1];
    const y2 = endPoint[1];
    return [
        [x1, y1],
        [x1, y2],
        [x2, y1],
        [x2, y2],
    ];
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
export const relativePathToAbsolutePath = (drawPath, offset) => {
    let lastAbsolutePoint = [0, 0];
    const drawPathWithAbsolutePoints = drawPath.reduce((acc, innerDrawPath) => {
        if (!Array.isArray(innerDrawPath.points)) {
            return [
                ...acc,
                {
                    command: innerDrawPath.command.toUpperCase(),
                    points: innerDrawPath.points,
                },
            ];
        }
        if (relativeCommands.includes(innerDrawPath.command)) {
            const newDrawPathPoints = innerDrawPath.points.reduce((allNewPoints, point, index) => {
                if (innerDrawPath.command === 'c') {
                    if (index % 3 === 2) {
                        lastAbsolutePoint = [
                            lastAbsolutePoint[0] + 1.05 * point[0],
                            lastAbsolutePoint[1] + 1.05 * point[1],
                        ];
                        return [...allNewPoints, lastAbsolutePoint];
                    }
                    return allNewPoints;
                }
                if (index === 0) {
                    lastAbsolutePoint = [
                        lastAbsolutePoint[0] + point[0],
                        lastAbsolutePoint[1] + point[1],
                    ];
                    return [lastAbsolutePoint];
                }
                else {
                    lastAbsolutePoint = [
                        lastAbsolutePoint[0] + point[0],
                        lastAbsolutePoint[1] + point[1],
                    ];
                    return [...allNewPoints, lastAbsolutePoint];
                }
            }, []);
            return [
                ...acc,
                {
                    command: innerDrawPath.command.toUpperCase(),
                    points: newDrawPathPoints,
                },
            ];
        }
        else {
            return [
                ...acc,
                {
                    command: innerDrawPath.command,
                    points: offset
                        ? innerDrawPath.points.map(sumOfCoordinates(offset))
                        : innerDrawPath.points,
                },
            ];
        }
    }, []);
    return drawPathWithAbsolutePoints;
};
export const getPointsOfDrawPath = (drawPath) => {
    return drawPath.reduce((acc, currentDrawPath) => {
        if (!currentDrawPath.points) {
            return acc;
        }
        if (Array.isArray(currentDrawPath.points)) {
            if (singleDirectionCommands.includes(currentDrawPath.command)) {
                switch (currentDrawPath.command) {
                    case 'H':
                    case 'h': {
                        return [
                            ...acc,
                            [0, parseFloat(currentDrawPath.points[0])],
                        ];
                    }
                    case 'V':
                    case 'v': {
                        return [
                            ...acc,
                            [parseFloat(currentDrawPath.points[0]), 0],
                        ];
                    }
                }
            }
        }
        return [...acc, ...currentDrawPath.points];
    }, []);
};
export const splitCoordinate = (acc, point) => {
    return [
        [...acc[0], point[0]],
        [...acc[1], point[1]],
    ];
};
export const splitAllCoordinates = (coordinates) => {
    return coordinates.reduce(splitCoordinate, [[], []]);
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
export const getPathBoundaries = (drawPath) => {
    const absoluteDrawPath = relativePathToAbsolutePath(drawPath);
    const absolutePointsOfDrawPath = getPointsOfDrawPath(absoluteDrawPath);
    return getBoundaryFromCoordinates(absolutePointsOfDrawPath);
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