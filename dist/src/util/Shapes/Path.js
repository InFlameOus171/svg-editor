var _Path_rawDrawPath, _Path_center;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { getPathBoundaries, sumOfCoordinates } from '../helper/coordinates';
import { singleDirectionCommands } from '../helper/util';
import { Shape } from './Shape';
export class Path extends Shape {
    constructor(drawPath, svgParams, dontCountUp, isLocked = false) {
        super(undefined, svgParams, dontCountUp, isLocked);
        _Path_rawDrawPath.set(this, void 0);
        _Path_center.set(this, [-1, -1]);
        this.getCenter = () => {
            return __classPrivateFieldGet(this, _Path_center, "f");
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
                coordinates[0] - __classPrivateFieldGet(this, _Path_center, "f")[0],
                coordinates[1] - __classPrivateFieldGet(this, _Path_center, "f")[1],
            ];
            this.moveTransformMatrix(dx, dy);
            __classPrivateFieldSet(this, _Path_center, [__classPrivateFieldGet(this, _Path_center, "f")[0] + dx, __classPrivateFieldGet(this, _Path_center, "f")[1] + dy], "f");
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
        __classPrivateFieldSet(this, _Path_center, [sumOfBoundaries[0] / 4, sumOfBoundaries[1] / 4], "f");
    }
}
_Path_rawDrawPath = new WeakMap(), _Path_center = new WeakMap();
//# sourceMappingURL=Path.js.map