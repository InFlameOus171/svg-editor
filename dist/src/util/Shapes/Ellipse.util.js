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
//# sourceMappingURL=Ellipse.util.js.map