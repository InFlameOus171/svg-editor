var _Rectangle_startingCorner, _Rectangle_width, _Rectangle_height;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { getRectangleBoundaries } from './Rectangle.util';
import { Shape } from '../Shape';
export class Rectangle extends Shape {
    constructor(startingCorner, width, height, svgParams = {}, countShapecountUp, isLocked = false) {
        super(getRectangleBoundaries(startingCorner, width, height), svgParams, countShapecountUp, isLocked);
        _Rectangle_startingCorner.set(this, [-1, -1]);
        _Rectangle_width.set(this, 0);
        _Rectangle_height.set(this, 0);
        this.resize = (coordinates) => {
            __classPrivateFieldSet(this, _Rectangle_width, (coordinates[0] - __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[0]) * 2, "f");
            __classPrivateFieldSet(this, _Rectangle_height, (coordinates[1] - __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[1]) * 2, "f");
        };
        this.moveTo = (coordinates) => {
            const xDifference = coordinates[0] - __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[0];
            const yDifference = coordinates[1] - __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[1];
            __classPrivateFieldSet(this, _Rectangle_startingCorner, coordinates, "f");
            this.moveBoundaries([xDifference, yDifference]);
        };
        this.getCenter = () => {
            return __classPrivateFieldGet(this, _Rectangle_startingCorner, "f");
        };
        this.getWidth = () => {
            return __classPrivateFieldGet(this, _Rectangle_width, "f");
        };
        this.getHeight = () => {
            return __classPrivateFieldGet(this, _Rectangle_height, "f");
        };
        this.toPathParams = () => ({
            x: __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[0],
            y: __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[1],
            width: __classPrivateFieldGet(this, _Rectangle_width, "f"),
            height: __classPrivateFieldGet(this, _Rectangle_height, "f"),
        });
        this.toSvgRectParams = () => (Object.assign({ x: __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[0].toString(), y: __classPrivateFieldGet(this, _Rectangle_startingCorner, "f")[1].toString(), width: __classPrivateFieldGet(this, _Rectangle_width, "f").toString(), height: __classPrivateFieldGet(this, _Rectangle_height, "f").toString() }, this.getSvgParams()));
        this.getDeconstructedShapeData = () => ({
            id: this.getId(),
            type: 'Rectangle',
            startingCorner: __classPrivateFieldGet(this, _Rectangle_startingCorner, "f"),
            width: __classPrivateFieldGet(this, _Rectangle_width, "f"),
            height: __classPrivateFieldGet(this, _Rectangle_height, "f"),
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toString = () => {
            return JSON.stringify(this.boundaries);
        };
        __classPrivateFieldSet(this, _Rectangle_startingCorner, startingCorner, "f");
        __classPrivateFieldSet(this, _Rectangle_width, width, "f");
        __classPrivateFieldSet(this, _Rectangle_height, height, "f");
    }
}
_Rectangle_startingCorner = new WeakMap(), _Rectangle_width = new WeakMap(), _Rectangle_height = new WeakMap();
//# sourceMappingURL=Rectangle.js.map