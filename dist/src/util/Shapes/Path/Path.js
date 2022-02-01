var _Path_rawDrawPath;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { sumOfCoordinates } from '../../helper/coordinates';
import { singleDirectionCommands } from '../../helper/util';
import { getPathBoundaries } from './Path.util';
import { Shape } from '../Shape';
export class Path extends Shape {
    constructor(drawPath, svgParams, countShapeCountUp, isLocked = false) {
        super(undefined, svgParams, countShapeCountUp, isLocked);
        _Path_rawDrawPath.set(this, void 0);
        this.getCenter = () => {
            return this.calculationCenter;
        };
        this.toSVGPathParams = () => (Object.assign({ d: this.toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            id: this.getId(),
            type: 'Path',
            drawPath: __classPrivateFieldGet(this, _Path_rawDrawPath, "f"),
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.moveTo = (coordinates) => {
            const [dx, dy] = [
                coordinates[0] - this.calculationCenter[0],
                coordinates[1] - this.calculationCenter[1],
            ];
            this.moveTransformMatrix(dx, dy);
            this.calculationCenter = [
                this.calculationCenter[0] + dx,
                this.calculationCenter[1] + dy,
            ];
            this.boundaries = this.boundaries.map(boundary => [
                boundary[0] + dx,
                boundary[1] + dy,
            ]);
        };
        this.toString = () => {
            const result = this.drawPath.reduce((acc, pathValue) => {
                var _a;
                return acc
                    .concat(' ', pathValue.command, ' ', Array.isArray(pathValue.points)
                    ? pathValue.points.reduce((acc, point) => acc.concat([point[0].toString(), point[1].toString()].join(), ' '), '')
                    : (_a = pathValue.points) !== null && _a !== void 0 ? _a : '', ' ')
                    .trim();
            }, '');
            return result;
        };
        __classPrivateFieldSet(this, _Path_rawDrawPath, drawPath, "f");
        this.drawPath = drawPath.map(path => {
            if (singleDirectionCommands.includes(path.command)) {
                return { command: path.command, points: path.points };
            }
            return {
                command: path.command,
                points: path.points,
            };
        });
        if (svgParams === null || svgParams === void 0 ? void 0 : svgParams.bBox) {
            const { x, y, width, height } = svgParams.bBox;
            const boundaries = [
                [x, y],
                [x, y + height],
                [x + width, y],
                [x + width, y + height],
            ];
            this.boundaries = boundaries.map(boundary => {
                const point = new DOMPoint(boundary[0], boundary[1]);
                const transformedPoint = point.matrixTransform(this.transformMatrix);
                return [transformedPoint.x, transformedPoint.y];
            });
        }
        else {
            this.boundaries = getPathBoundaries(this.drawPath);
        }
        const sumOfBoundaries = this.boundaries.reduce((acc, curr) => sumOfCoordinates(acc)(curr), [0, 0]);
        this.calculationCenter = [sumOfBoundaries[0] / 4, sumOfBoundaries[1] / 4];
    }
}
_Path_rawDrawPath = new WeakMap();
//# sourceMappingURL=Path.js.map