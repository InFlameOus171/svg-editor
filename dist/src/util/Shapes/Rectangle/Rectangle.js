var _Rectangle_width, _Rectangle_height;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { getRectangleBoundaries } from './Rectangle.util';
import { Shape } from '../Shape';
export class Rectangle extends Shape {
    constructor(startingCorner, width, height, svgParams = {}, countShapecountUp, isLocked = false) {
        super(getRectangleBoundaries(startingCorner, width, height), svgParams, countShapecountUp, isLocked);
        _Rectangle_width.set(this, 0);
        _Rectangle_height.set(this, 0);
        this.resize = (coordinates) => {
            __classPrivateFieldSet(this, _Rectangle_width, (coordinates[0] - this.calculationCenter[0]) * 2, "f");
            __classPrivateFieldSet(this, _Rectangle_height, (coordinates[1] - this.calculationCenter[1]) * 2, "f");
        };
        this.moveTo = (coordinates) => {
            const xDifference = coordinates[0] - this.calculationCenter[0];
            const yDifference = coordinates[1] - this.calculationCenter[1];
            this.calculationCenter = coordinates;
            this.moveBoundaries([xDifference, yDifference]);
        };
        this.getCenter = () => {
            return this.calculationCenter;
        };
        this.getWidth = () => {
            return __classPrivateFieldGet(this, _Rectangle_width, "f");
        };
        this.getHeight = () => {
            return __classPrivateFieldGet(this, _Rectangle_height, "f");
        };
        this.toSvgRectParams = () => (Object.assign({ x: this.calculationCenter[0].toString(), y: this.calculationCenter[1].toString(), width: __classPrivateFieldGet(this, _Rectangle_width, "f").toString(), height: __classPrivateFieldGet(this, _Rectangle_height, "f").toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            id: this.getId(),
            type: 'Rectangle',
            startingCorner: this.calculationCenter,
            width: __classPrivateFieldGet(this, _Rectangle_width, "f"),
            height: __classPrivateFieldGet(this, _Rectangle_height, "f"),
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toString = () => {
            return JSON.stringify(this.boundaries);
        };
        this.calculationCenter = startingCorner;
        __classPrivateFieldSet(this, _Rectangle_width, width, "f");
        __classPrivateFieldSet(this, _Rectangle_height, height, "f");
    }
}
_Rectangle_width = new WeakMap(), _Rectangle_height = new WeakMap();
//# sourceMappingURL=Rectangle.js.map