export const getRectangleBoundaries = (startingCorner, width, height) => {
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
//# sourceMappingURL=Rectangle.util.js.map