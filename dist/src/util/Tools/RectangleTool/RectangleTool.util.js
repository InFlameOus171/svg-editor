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
//# sourceMappingURL=RectangleTool.util.js.map