var _a, _Shape_counter, _Shape_fill, _Shape_id, _Shape_stroke, _Shape_strokeWidth, _Shape_lineCap, _Shape_lineDash, _Shape_fontSize, _Shape_fontFamily;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { nanoid } from 'nanoid';
import { textPlaceHolder } from '../helper/constants';
import { getTextBoundaries } from '../helper/coordinates';
import { measureText } from '../helper/shapes';
import { isText } from '../helper/typeguards';
export class Shape {
    constructor(boundaries = [
        [-1, -1],
        [-1, -1],
        [-1, -1],
        [-1, -1],
    ], svgParams = {}, countShapecountUp = true, isLocked = false) {
        var _b, _c, _d, _e, _f, _g, _h;
        var _j, _k;
        _Shape_fill.set(this, void 0);
        _Shape_id.set(this, void 0);
        _Shape_stroke.set(this, void 0);
        _Shape_strokeWidth.set(this, void 0);
        _Shape_lineCap.set(this, void 0);
        _Shape_lineDash.set(this, void 0);
        _Shape_fontSize.set(this, void 0);
        _Shape_fontFamily.set(this, void 0);
        this.isLocked = false;
        this.text = textPlaceHolder;
        this.index = 0;
        this.moveTransformMatrix = (x, y) => {
            const { a, b, c, d, e, f } = this.transformMatrix || new DOMMatrix();
            this.transformMatrix = new DOMMatrix([a, b, c, d, e + x, f + y]);
        };
        this.updateSVGParam = (field, value) => {
            const currentParams = this.getSvgParams();
            currentParams[field] = value;
            this.updateSVGParams(currentParams);
        };
        this.updateSVGParams = (newParams) => {
            var _b;
            __classPrivateFieldSet(this, _Shape_fill, newParams.fill, "f");
            __classPrivateFieldSet(this, _Shape_stroke, newParams.stroke, "f");
            __classPrivateFieldSet(this, _Shape_strokeWidth, newParams.strokeWidth, "f");
            __classPrivateFieldSet(this, _Shape_lineCap, newParams.lineCap, "f");
            __classPrivateFieldSet(this, _Shape_lineDash, newParams.lineDash, "f");
            __classPrivateFieldSet(this, _Shape_fontFamily, newParams.fontFamily, "f");
            __classPrivateFieldSet(this, _Shape_fontSize, newParams.fontSize, "f");
            if (isText(this)) {
                this.text = (_b = newParams.text) !== null && _b !== void 0 ? _b : this.text;
                const measures = measureText(this.text, this.getSvgParams());
                if (measures) {
                    this.boundaries = getTextBoundaries(this.getCenter(), measures === null || measures === void 0 ? void 0 : measures.width, measures === null || measures === void 0 ? void 0 : measures.height);
                }
            }
        };
        this.replaceID = (id) => {
            __classPrivateFieldSet(this, _Shape_id, id, "f");
            return this;
        };
        this.moveBoundaries = (difference) => {
            var _b;
            const [xDifference, yDifference] = difference;
            this.boundaries = (_b = this.boundaries) === null || _b === void 0 ? void 0 : _b.map(boundary => [boundary[0] + xDifference, boundary[1] + yDifference]);
        };
        this.getSvgParams = () => {
            return {
                fill: __classPrivateFieldGet(this, _Shape_fill, "f"),
                stroke: __classPrivateFieldGet(this, _Shape_stroke, "f"),
                strokeWidth: __classPrivateFieldGet(this, _Shape_strokeWidth, "f"),
                transformMatrix: this.transformMatrix,
                lineCap: __classPrivateFieldGet(this, _Shape_lineCap, "f"),
                lineDash: __classPrivateFieldGet(this, _Shape_lineDash, "f"),
                fontSize: __classPrivateFieldGet(this, _Shape_fontSize, "f"),
                fontFamily: __classPrivateFieldGet(this, _Shape_fontFamily, "f"),
                text: this.text,
            };
        };
        this.getId = () => {
            return __classPrivateFieldGet(this, _Shape_id, "f");
        };
        this.getCenter = () => {
            throw new Error('not implemented');
        };
        this.moveTo = (coodinates) => {
            throw new Error('not implemented');
        };
        this.toString = () => {
            throw new Error('not implemented');
        };
        this.getDeconstructedShapeData = () => {
            throw new Error('not implemented');
        };
        if (countShapecountUp) {
            __classPrivateFieldSet(_j = Shape, _a, (_k = __classPrivateFieldGet(_j, _a, "f", _Shape_counter), _k++, _k), "f", _Shape_counter);
        }
        __classPrivateFieldSet(this, _Shape_id, nanoid(), "f");
        __classPrivateFieldSet(this, _Shape_fill, (_b = svgParams.fill) !== null && _b !== void 0 ? _b : 'rgba(0,0,0,0)', "f");
        __classPrivateFieldSet(this, _Shape_stroke, (_c = svgParams.stroke) !== null && _c !== void 0 ? _c : 'rgba(0,0,0,1)', "f");
        __classPrivateFieldSet(this, _Shape_strokeWidth, (_d = svgParams.strokeWidth) !== null && _d !== void 0 ? _d : '1', "f");
        __classPrivateFieldSet(this, _Shape_lineDash, (_e = svgParams.lineDash) !== null && _e !== void 0 ? _e : [0], "f");
        __classPrivateFieldSet(this, _Shape_fontSize, (_f = svgParams.fontSize) !== null && _f !== void 0 ? _f : 18, "f");
        __classPrivateFieldSet(this, _Shape_fontFamily, (_g = svgParams.fontFamily) !== null && _g !== void 0 ? _g : 'Arial', "f");
        this.text = (_h = svgParams.text) !== null && _h !== void 0 ? _h : this.text;
        this.transformMatrix = svgParams.transformMatrix;
        this.boundaries = boundaries;
        this.isLocked = isLocked;
        this.index = __classPrivateFieldGet(Shape, _a, "f", _Shape_counter);
    }
}
_a = Shape, _Shape_fill = new WeakMap(), _Shape_id = new WeakMap(), _Shape_stroke = new WeakMap(), _Shape_strokeWidth = new WeakMap(), _Shape_lineCap = new WeakMap(), _Shape_lineDash = new WeakMap(), _Shape_fontSize = new WeakMap(), _Shape_fontFamily = new WeakMap();
_Shape_counter = { value: 0 };
//# sourceMappingURL=Shape.js.map