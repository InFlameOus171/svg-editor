import { Shape } from '../Shape';
import { getCircleBoundaries } from './Ellipse.util';
export class Ellipse extends Shape {
    constructor(center, radiusX, radiusY, svgParams, countShapeCountUp, isLocked = false) {
        super(getCircleBoundaries(center, radiusX, radiusY), svgParams, countShapeCountUp, isLocked);
        this.getCenter = () => {
            return this.calculationCenter;
        };
        this.toSVGEllipseParams = () => (Object.assign({ cx: this.calculationCenter[0].toString(), cy: this.calculationCenter[1].toString(), rx: this.radiusX.toString(), ry: this.radiusY.toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            type: 'Ellipse',
            id: this.getId(),
            center: this.calculationCenter,
            radiusX: this.radiusX,
            radiusY: this.radiusY,
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toString = () => {
            return JSON.stringify({
                center: this.calculationCenter,
                radiusX: this.radiusX,
                radiusY: this.radiusY,
            });
        };
        this.calculationCenter = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }
}
//# sourceMappingURL=Ellipse.js.map