import { sumOfCoordinates, getBoundaryFromCoordinates, } from '../helper/coordinates';
import { relativeCommands, singleDirectionCommands } from '../helper/util';
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
export const getPathBoundaries = (drawPath) => {
    const absoluteDrawPath = relativePathToAbsolutePath(drawPath);
    const absolutePointsOfDrawPath = getPointsOfDrawPath(absoluteDrawPath);
    return getBoundaryFromCoordinates(absolutePointsOfDrawPath);
};
//# sourceMappingURL=Path.util.js.map