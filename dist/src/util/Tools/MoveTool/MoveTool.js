var _MoveTool_dCenter, _MoveTool_onDown, _MoveTool_onMove, _MoveTool_onUp, _MoveTool_onOut;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { highlightStyle, Tools_List } from '../../helper/constants';
import { isPointInsideAnotherShape, rectangleParamsFromBoundaries, } from '../../helper/coordinates';
import { isText } from '../../helper/typeguards';
import { Pen } from '../../Pen';
import { setTextParamsSourceVisibility } from '../TextTool/TextTool.util';
import { Tool } from '../Tool';
export class MoveTool extends Tool {
    constructor(drawLayer, previewLayer, self, onMove, offset, selectedShape, footerFields) {
        super(drawLayer, self, onMove, offset, previewLayer, undefined, undefined, footerFields);
        _MoveTool_dCenter.set(this, void 0);
        _MoveTool_onDown.set(this, (event) => {
            var _a, _b;
            if (event.button !== 0)
                return;
            this.previousCoordinates = this.currentCoordinates;
            this.currentCoordinates = this.getCoords(event);
            const currentShapeCenter = (_b = (_a = this.currentShape) === null || _a === void 0 ? void 0 : _a.getCenter()) !== null && _b !== void 0 ? _b : [0, 0];
            __classPrivateFieldSet(this, _MoveTool_dCenter, [
                this.currentCoordinates[0] - currentShapeCenter[0],
                this.currentCoordinates[1] - currentShapeCenter[1],
            ], "f");
            if (!this.currentShape ||
                !isPointInsideAnotherShape(this.currentCoordinates)(this.currentShape)) {
                this.isDrawing = false;
                return;
            }
            this.isDrawing = true;
        });
        this.updatePreview = () => {
            if (this.currentShape && this.previewContext) {
                this.resetPreview();
                const { startingCorner, width, height } = rectangleParamsFromBoundaries(this.currentShape.boundaries);
                if (isText(this.currentShape)) {
                    setTextParamsSourceVisibility(this.footerFields, true);
                    Pen.draw(this.currentShape, Object.assign(Object.assign(Object.assign({}, this.currentShape.getSvgParams()), highlightStyle), { lineDash: [0] }), this.previewContext);
                }
                else {
                    Pen.draw(this.currentShape, highlightStyle, this.previewContext);
                }
            }
            else {
                this.resetPreview();
            }
        };
        _MoveTool_onMove.set(this, (event) => {
            var _a, _b, _c, _d, _e;
            if (!this.isDrawing)
                return;
            this.previousCoordinates = this.currentCoordinates;
            this.currentCoordinates = this.getCoords(event);
            (_a = this.currentShape) === null || _a === void 0 ? void 0 : _a.moveTo([
                this.currentCoordinates[0] - ((_c = (_b = __classPrivateFieldGet(this, _MoveTool_dCenter, "f")) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : 0),
                this.currentCoordinates[1] - ((_e = (_d = __classPrivateFieldGet(this, _MoveTool_dCenter, "f")) === null || _d === void 0 ? void 0 : _d[1]) !== null && _e !== void 0 ? _e : 0),
            ]);
            this.updatePreview();
        });
        _MoveTool_onUp.set(this, () => {
            this.isDrawing = false;
            if (this.currentShape) {
                this.onUpdateEditor(this.currentShape);
                this.updatePreview();
            }
        });
        this.changeStyle = (config) => {
            if (this.currentShape) {
                this.currentShape.updateSVGParams(config);
                this.resetPreview();
                this.updatePreview();
            }
        };
        _MoveTool_onOut.set(this, () => {
            this.isDrawing = false;
        });
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousedown', __classPrivateFieldGet(this, _MoveTool_onDown, "f"));
            this.drawLayer.addEventListener('mousemove', __classPrivateFieldGet(this, _MoveTool_onMove, "f"));
            this.drawLayer.addEventListener('mouseout', __classPrivateFieldGet(this, _MoveTool_onOut, "f"));
            this.drawLayer.addEventListener('mouseup', __classPrivateFieldGet(this, _MoveTool_onUp, "f"));
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousedown', __classPrivateFieldGet(this, _MoveTool_onDown, "f"));
            this.drawLayer.removeEventListener('mousemove', __classPrivateFieldGet(this, _MoveTool_onMove, "f"));
            this.drawLayer.removeEventListener('mouseout', __classPrivateFieldGet(this, _MoveTool_onOut, "f"));
            this.drawLayer.removeEventListener('mouseup', __classPrivateFieldGet(this, _MoveTool_onUp, "f"));
        };
        const renderingContext = this.drawLayer.getContext('2d');
        if (renderingContext) {
            this.drawContext = renderingContext;
        }
        this.currentShape = selectedShape;
        this.updatePreview();
        this.toolName = Tools_List.MOVE;
    }
}
_MoveTool_dCenter = new WeakMap(), _MoveTool_onDown = new WeakMap(), _MoveTool_onMove = new WeakMap(), _MoveTool_onUp = new WeakMap(), _MoveTool_onOut = new WeakMap();
//# sourceMappingURL=MoveTool.js.map