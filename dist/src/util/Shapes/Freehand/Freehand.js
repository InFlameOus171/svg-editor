var _Freehand_points, _Freehand_updateCenter;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { getFreehandBoundaries } from './Freehand.util';
import { Shape } from '../Shape';
export class Freehand extends Shape {
    constructor(points, svgParams, countShapecountUp, isLocked = false) {
        super(getFreehandBoundaries(points), svgParams, countShapecountUp, isLocked);
        _Freehand_points.set(this, void 0);
        _Freehand_updateCenter.set(this, () => {
            const sumOfCoordinates = this.boundaries.reduce((acc, boundaryCoordinate) => [
                acc[0] + boundaryCoordinate[0],
                acc[1] + boundaryCoordinate[1],
            ], [0, 0]);
            this.calculationCenter = [sumOfCoordinates[0] / 4, sumOfCoordinates[1] / 4];
        });
        this.getCenter = () => {
            return this.calculationCenter;
        };
        this.moveTo = (coordinates) => {
            const xDifference = coordinates[0] - this.calculationCenter[0];
            const yDifference = coordinates[1] - this.calculationCenter[1];
            __classPrivateFieldSet(this, _Freehand_points, __classPrivateFieldGet(this, _Freehand_points, "f").map(point => [
                point[0] + xDifference,
                point[1] + yDifference,
            ]), "f");
            __classPrivateFieldGet(this, _Freehand_updateCenter, "f").call(this);
            this.moveBoundaries([xDifference, yDifference]);
        };
        this.getPoints = () => {
            return __classPrivateFieldGet(this, _Freehand_points, "f");
        };
        this.toSVGFreehandParams = () => (Object.assign({ points: this.toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            id: this.getId(),
            type: 'Freehand',
            points: __classPrivateFieldGet(this, _Freehand_points, "f"),
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toString = () => {
            return __classPrivateFieldGet(this, _Freehand_points, "f")
                .reduce((acc, point) => {
                return acc.concat(`${point[0]}`, ',', `${point[1]}`, ' ');
            }, '')
                .trim();
        };
        __classPrivateFieldSet(this, _Freehand_points, points, "f");
        __classPrivateFieldGet(this, _Freehand_updateCenter, "f").call(this);
    }
}
_Freehand_points = new WeakMap(), _Freehand_updateCenter = new WeakMap();
//# sourceMappingURL=Freehand.js.map