var _Line_center;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { getLineBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';
export class Line extends Shape {
    constructor(startPoint, endPoint, svgParams, countShapeCountUp, isLocked = false) {
        super(getLineBoundaries(startPoint, endPoint), svgParams, countShapeCountUp, isLocked);
        _Line_center.set(this, void 0);
        this.moveTo = (coordinates) => {
            const xDifference = coordinates[0] - __classPrivateFieldGet(this, _Line_center, "f")[0];
            const yDifference = coordinates[1] - __classPrivateFieldGet(this, _Line_center, "f")[1];
            __classPrivateFieldSet(this, _Line_center, coordinates, "f");
            this.points = this.points.map(point => [
                point[0] + xDifference,
                point[1] + yDifference,
            ]);
            this.moveBoundaries([xDifference, yDifference]);
        };
        this.getCenter = () => {
            return __classPrivateFieldGet(this, _Line_center, "f");
        };
        this.toSVGLineParams = () => (Object.assign({ x1: this.points[0][0].toString(), y1: this.points[0][1].toString(), x2: this.points[1][0].toString(), y2: this.points[1][1].toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            id: this.getId(),
            type: 'Line',
            startPoint: this.points[0],
            endPoint: this.points[1],
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toString = () => {
            return JSON.stringify({
                start: { x: this.points[0][0], y: this.points[0][1] },
                end: { x: this.points[1][0], y: this.points[1][1] },
            });
        };
        this.points = [startPoint, endPoint];
        __classPrivateFieldSet(this, _Line_center, [
            (startPoint[0] + endPoint[0]) / 2,
            (startPoint[1] + endPoint[1]) / 2,
        ], "f");
    }
}
_Line_center = new WeakMap();
//# sourceMappingURL=Line.js.map