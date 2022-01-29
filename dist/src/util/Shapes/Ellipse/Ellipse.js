var _Ellipse_center;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Shape } from '../Shape';
import { getCircleBoundaries } from './Ellipse.util';
export class Ellipse extends Shape {
    constructor(center, radiusX, radiusY, svgParams, countShapeCountUp, isLocked = false) {
        super(getCircleBoundaries(center, radiusX, radiusY), svgParams, countShapeCountUp, isLocked);
        _Ellipse_center.set(this, void 0);
        this.moveTo = (coordinates) => {
            const xDifference = coordinates[0] - __classPrivateFieldGet(this, _Ellipse_center, "f")[0];
            const yDifference = coordinates[1] - __classPrivateFieldGet(this, _Ellipse_center, "f")[1];
            __classPrivateFieldSet(this, _Ellipse_center, coordinates, "f");
            this.moveBoundaries([xDifference, yDifference]);
        };
        this.getCenter = () => {
            return __classPrivateFieldGet(this, _Ellipse_center, "f");
        };
        this.toSVGEllipseParams = () => (Object.assign({ cx: __classPrivateFieldGet(this, _Ellipse_center, "f")[0].toString(), cy: __classPrivateFieldGet(this, _Ellipse_center, "f")[1].toString(), rx: this.radiusX.toString(), ry: this.radiusY.toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            type: 'Ellipse',
            id: this.getId(),
            center: __classPrivateFieldGet(this, _Ellipse_center, "f"),
            radiusX: this.radiusX,
            radiusY: this.radiusY,
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toString = () => {
            return JSON.stringify({
                center: __classPrivateFieldGet(this, _Ellipse_center, "f"),
                radiusX: this.radiusX,
                radiusY: this.radiusY,
            });
        };
        __classPrivateFieldSet(this, _Ellipse_center, center, "f");
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }
}
_Ellipse_center = new WeakMap();
//# sourceMappingURL=Ellipse.js.map