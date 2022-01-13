var _TextShape_position, _TextShape_height, _TextShape_width;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { getTextBoundaries } from '../helper/coordinates';
import { Shape } from './Shape';
export class TextShape extends Shape {
    constructor(width, height, position, svgParams, countShapecountUp, isLocked = false) {
        super(getTextBoundaries(position, width, height), svgParams, countShapecountUp, isLocked);
        _TextShape_position.set(this, void 0);
        _TextShape_height.set(this, void 0);
        _TextShape_width.set(this, void 0);
        this.getText = () => {
            return this.text;
        };
        this.getHeight = () => {
            return __classPrivateFieldGet(this, _TextShape_height, "f");
        };
        this.getWidth = () => {
            return __classPrivateFieldGet(this, _TextShape_width, "f");
        };
        this.moveTo = (coordinates) => {
            const [dx, dy] = [
                coordinates[0] - __classPrivateFieldGet(this, _TextShape_position, "f")[0],
                coordinates[1] - __classPrivateFieldGet(this, _TextShape_position, "f")[1],
            ];
            __classPrivateFieldSet(this, _TextShape_position, coordinates, "f");
            this.moveBoundaries([dx, dy]);
        };
        this.toPathParams = () => ({
            position: __classPrivateFieldGet(this, _TextShape_position, "f"),
        });
        this.getCenter = () => __classPrivateFieldGet(this, _TextShape_position, "f");
        this.getDeconstructedShapeData = () => ({
            id: this.getId(),
            type: 'TextShape',
            width: __classPrivateFieldGet(this, _TextShape_width, "f"),
            height: __classPrivateFieldGet(this, _TextShape_height, "f"),
            position: __classPrivateFieldGet(this, _TextShape_position, "f"),
            isLocked: this.isLocked,
            svgParams: this.getSvgParams(),
        });
        this.toSVGTextParams = () => {
            return Object.assign({ position: __classPrivateFieldGet(this, _TextShape_position, "f") }, this.getSvgParams());
        };
        __classPrivateFieldSet(this, _TextShape_width, width, "f");
        __classPrivateFieldSet(this, _TextShape_height, height, "f");
        __classPrivateFieldSet(this, _TextShape_position, position, "f");
    }
}
_TextShape_position = new WeakMap(), _TextShape_height = new WeakMap(), _TextShape_width = new WeakMap();
//# sourceMappingURL=Text.js.map