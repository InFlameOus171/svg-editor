export const measureText = (text, params, layer, measureContext) => {
    var _a, _b;
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    let context = (_b = (_a = layer === null || layer === void 0 ? void 0 : layer.getContext('2d')) !== null && _a !== void 0 ? _a : measureContext) !== null && _b !== void 0 ? _b : canvas.getContext('2d');
    if (!context) {
        return;
    }
    context.font = `${params.fontSize}px ${params.fontFamily}`;
    if (params.stroke) {
        context.strokeStyle = params.stroke;
    }
    if (params.lineDash) {
        context.setLineDash(params.lineDash);
    }
    if (params.lineCap) {
        context.lineCap = params.lineCap;
    }
    const size = context.measureText(text);
    const width = size.width;
    const height = size.fontBoundingBoxAscent + size.fontBoundingBoxDescent;
    document.body.removeChild(canvas);
    return { width, height };
};
//# sourceMappingURL=shapes.js.map