import { calculateDistanceBetweenPoints } from '../helper/coordinates';
import { Ellipse } from '../Shapes/Ellipse';
export const generateEllipse = (startCoordinates, endCoordinates, svgParams, countShapecountUp) => {
    const center = [
        (startCoordinates[0] + endCoordinates[0]) / 2,
        (startCoordinates[1] + endCoordinates[1]) / 2,
    ];
    const radiusX = calculateDistanceBetweenPoints(center, [
        endCoordinates[0],
        (startCoordinates[1] + endCoordinates[1]) / 2,
    ]);
    const radiusY = calculateDistanceBetweenPoints(center, [
        (startCoordinates[0] + endCoordinates[0]) / 2,
        endCoordinates[1],
    ]);
    return new Ellipse(center, radiusX, radiusY, svgParams, countShapecountUp);
};
export const generateCircle = (startCoordinates, endCoordinates, svgParams, countShapecountUp) => {
    const center = startCoordinates;
    const radius = calculateDistanceBetweenPoints(startCoordinates, endCoordinates);
    return new Ellipse(center, radius, radius, svgParams, countShapecountUp);
};
//# sourceMappingURL=EllipseTool.util.js.map