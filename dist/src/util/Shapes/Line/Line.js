import { Shape } from '../Shape';
import { getLineBoundaries } from './Line.util';
export class Line extends Shape {
    constructor(startPoint, endPoint, svgParams, countShapeCountUp, isLocked = false) {
        super(getLineBoundaries(startPoint, endPoint), svgParams, countShapeCountUp, isLocked);
        this.moveTo = (coordinates) => {
            const xDifference = coordinates[0] - this.calculationCenter[0];
            const yDifference = coordinates[1] - this.calculationCenter[1];
            this.calculationCenter = coordinates;
            this.points = this.points.map(point => [
                point[0] + xDifference,
                point[1] + yDifference,
            ]);
            this.moveBoundaries([xDifference, yDifference]);
        };
        this.getCenter = () => {
            return this.calculationCenter;
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
        this.calculationCenter = [
            (startPoint[0] + endPoint[0]) / 2,
            (startPoint[1] + endPoint[1]) / 2,
        ];
    }
}
//# sourceMappingURL=Line.js.map