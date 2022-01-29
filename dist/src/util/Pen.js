import { __rest } from "tslib";
import { typeOfShape } from './helper/typeguards';
const Pen = {
    draw: (shape, svgParams, context) => {
        const shapeType = typeOfShape(shape);
        switch (shapeType) {
            case 'Ellipse':
                Pen.drawEllipse(shape, context, svgParams);
                break;
            case 'Rectangle':
                Pen.drawRectangle(shape, context, svgParams);
                break;
            case 'Line':
                Pen.drawLine(shape, context, svgParams);
                break;
            case 'Freehand':
                Pen.drawFreehand(shape, context, svgParams);
                break;
            case 'Path':
                Pen.drawPath(shape, context, svgParams);
                break;
            case 'TextShape':
                Pen.drawText(shape, context, svgParams);
                break;
        }
    },
    setStyles: (pathConstructor, styles, context) => {
        const { fill, stroke, strokeWidth, transformMatrix, lineCap, lineDash } = styles;
        if (transformMatrix) {
            const newPath = new Path2D();
            newPath.addPath(pathConstructor, transformMatrix);
            pathConstructor = newPath;
        }
        if (lineDash) {
            context.setLineDash(lineDash);
        }
        if (lineCap) {
            context.lineCap = lineCap;
        }
        if (!stroke && !fill && !strokeWidth) {
            context.stroke(pathConstructor);
            context.fill(pathConstructor);
            return pathConstructor;
        }
        if (strokeWidth) {
            context.lineWidth = parseFloat(strokeWidth);
        }
        if (fill && fill !== 'none') {
            context.fillStyle = fill;
        }
        if (stroke && stroke !== 'null') {
            context.strokeStyle = stroke;
        }
        return pathConstructor;
    },
    drawPath: (path, context, svgParams) => {
        let pathConstructor = new Path2D(path.toString());
        if (context) {
            const params = Object.assign(Object.assign({}, path.getSvgParams()), svgParams);
            pathConstructor = Pen.setStyles(pathConstructor, params, context);
            params.stroke && context.stroke(pathConstructor);
            params.fill && context.fill(pathConstructor);
            context.closePath();
        }
    },
    drawText: (textShape, context, svgParams) => {
        var _a, _b;
        const _c = textShape.toSVGTextParams(), { position } = _c, params = __rest(_c, ["position"]);
        const _d = svgParams !== null && svgParams !== void 0 ? svgParams : params, { text, fontSize, fontFamily } = _d, rest = __rest(_d, ["text", "fontSize", "fontFamily"]);
        if (context && text) {
            if (rest.stroke) {
                context.strokeStyle = rest.stroke;
            }
            if (params.lineDash) {
                context.setLineDash(params.lineDash);
            }
            if (params.lineCap) {
                context.lineCap = params.lineCap;
            }
            if (params.strokeWidth) {
                context.lineWidth = parseInt(params.strokeWidth);
            }
            context.fillStyle = (_a = rest.fill) !== null && _a !== void 0 ? _a : '#000000';
            context.font = ((_b = fontSize === null || fontSize === void 0 ? void 0 : fontSize.toString()) !== null && _b !== void 0 ? _b : '12').concat('px ', (fontFamily !== null && fontFamily !== void 0 ? fontFamily : 'Arial').toLowerCase());
            context.fillText(text, ...position);
            context.strokeText(text, ...position);
            context === null || context === void 0 ? void 0 : context.closePath();
        }
    },
    drawFreehand: (freehand, context, svgParams) => {
        let pathConstructor = new Path2D();
        const points = freehand.getPoints();
        const start = points[0];
        const rest = points.slice(1);
        const params = svgParams !== null && svgParams !== void 0 ? svgParams : freehand.getSvgParams();
        if (context) {
            Pen.setStyles(pathConstructor, params, context);
            pathConstructor.moveTo(...start);
            rest.forEach(point => {
                pathConstructor.lineTo(...point);
            });
            context === null || context === void 0 ? void 0 : context.stroke(pathConstructor);
            context === null || context === void 0 ? void 0 : context.closePath();
        }
    },
    drawLine: (line, context, svgParams) => {
        let pathConstructor = new Path2D();
        if (context) {
            const params = svgParams !== null && svgParams !== void 0 ? svgParams : line.getSvgParams();
            Pen.setStyles(pathConstructor, params, context);
            const { fill, stroke } = params;
            pathConstructor.moveTo(...line.points[0]);
            pathConstructor.lineTo(...line.points[1]);
            stroke && context.stroke(pathConstructor);
            fill && context.fill(pathConstructor);
            context.closePath();
        }
    },
    drawRectangle: (rectangle, context, svgParams) => {
        let path = new Path2D();
        const _a = rectangle.toSvgRectParams(), { x, y, width, height } = _a, rest = __rest(_a, ["x", "y", "width", "height"]);
        const values = [x, y, width, height].map(parseFloat);
        if (context) {
            const params = svgParams !== null && svgParams !== void 0 ? svgParams : rest;
            path = Pen.setStyles(path, params, context);
            const { fill, stroke } = params;
            path.rect(...values);
            stroke && context.stroke(path);
            fill && context.fill(path);
            context.closePath();
        }
    },
    drawEllipse: (ellipse, context, svgParams) => {
        const path = new Path2D();
        const _a = ellipse.toSVGEllipseParams(), { cx, cy, rx, ry } = _a, rest = __rest(_a, ["cx", "cy", "rx", "ry"]);
        const values = [cx, cy, rx, ry].map(parseFloat);
        if (context) {
            const params = svgParams !== null && svgParams !== void 0 ? svgParams : rest;
            Pen.setStyles(path, params, context);
            const { fill, stroke } = params;
            path.ellipse(...values, 0, 0, 2 * Math.PI);
            stroke && context.stroke(path);
            fill && context.fill(path);
            context === null || context === void 0 ? void 0 : context.closePath;
        }
    },
    clearCanvas: (canvas, canvasContext) => {
        if (canvas) {
            let context = canvasContext;
            if (!context) {
                context = canvas.getContext('2d');
            }
            context && context.clearRect(0, 0, canvas.width, canvas.height);
        }
    },
};
Object.freeze(Pen);
export { Pen };
//# sourceMappingURL=Pen.js.map