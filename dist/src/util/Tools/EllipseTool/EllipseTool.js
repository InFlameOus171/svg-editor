var _EllipseTool_draw, _EllipseTool_onKeyDown, _EllipseTool_onKeyUp, _EllipseTool_onDown, _EllipseTool_onUp, _EllipseTool_onMove, _EllipseTool_onOut;
import { __classPrivateFieldGet } from "tslib";
import { highlightStyle, Tools_List } from '../../helper/constants';
import { Pen } from '../../Pen';
import { generateCircle, generateEllipse } from './EllipseTool.util';
import { Tool } from '../Tool';
export class EllipseTool extends Tool {
    constructor(drawLayer, previewLayer, self, onCreate, drawPenConfig, offset) {
        super(drawLayer, self, onCreate, offset, previewLayer, drawPenConfig, highlightStyle);
        this.isCircle = false;
        _EllipseTool_draw.set(this, () => {
            this.currentShape &&
                Pen.drawEllipse(this.currentShape, this.drawContext, this.drawPenConfig);
            this.resetPreview();
        });
        _EllipseTool_onKeyDown.set(this, (event) => {
            if (event.ctrlKey) {
                this.isCircle = true;
            }
        });
        _EllipseTool_onKeyUp.set(this, () => {
            this.isCircle = false;
        });
        _EllipseTool_onDown.set(this, (event) => {
            if (event.button !== 0)
                return;
            this.isDrawing = true;
            this.previousCoordinates = this.getCoords(event);
        });
        _EllipseTool_onUp.set(this, (event) => {
            this.isDrawing = false;
            this.currentCoordinates = this.getCoords(event);
            if (this.isCircle) {
                this.currentShape = generateCircle(this.previousCoordinates, this.currentCoordinates, this.drawPenConfig);
            }
            else {
                this.currentShape = generateEllipse(this.previousCoordinates, this.currentCoordinates, this.drawPenConfig);
            }
            this.onUpdateEditor(this.currentShape);
            __classPrivateFieldGet(this, _EllipseTool_draw, "f").call(this);
        });
        _EllipseTool_onMove.set(this, (event) => {
            this.currentCoordinates = this.getCoords(event);
            this.resetPreview();
            if (this.isDrawing && this.previewLayer) {
                if (this.isCircle) {
                    const previewShape = generateCircle(this.previousCoordinates, this.currentCoordinates, this.previewPenConfig, false);
                    this.currentShape = previewShape;
                    Pen.drawEllipse(previewShape, this.previewContext);
                }
                else {
                    const previewShape = generateEllipse(this.previousCoordinates, this.currentCoordinates, this.previewPenConfig, false);
                    this.currentShape = previewShape;
                    Pen.drawEllipse(previewShape, this.previewContext);
                }
            }
        });
        _EllipseTool_onOut.set(this, () => {
            this.isDrawing = false;
        });
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousemove', __classPrivateFieldGet(this, _EllipseTool_onMove, "f"));
            this.drawLayer.addEventListener('mousedown', __classPrivateFieldGet(this, _EllipseTool_onDown, "f"));
            this.drawLayer.addEventListener('mouseup', __classPrivateFieldGet(this, _EllipseTool_onUp, "f"));
            this.drawLayer.addEventListener('mouseout', __classPrivateFieldGet(this, _EllipseTool_onOut, "f"));
            window.addEventListener('keydown', __classPrivateFieldGet(this, _EllipseTool_onKeyDown, "f"));
            window.addEventListener('keyup', __classPrivateFieldGet(this, _EllipseTool_onKeyUp, "f"));
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousemove', __classPrivateFieldGet(this, _EllipseTool_onMove, "f"));
            this.drawLayer.removeEventListener('mousedown', __classPrivateFieldGet(this, _EllipseTool_onDown, "f"));
            this.drawLayer.removeEventListener('mouseup', __classPrivateFieldGet(this, _EllipseTool_onUp, "f"));
            this.drawLayer.removeEventListener('mouseout', __classPrivateFieldGet(this, _EllipseTool_onOut, "f"));
            window.removeEventListener('keydown', __classPrivateFieldGet(this, _EllipseTool_onKeyDown, "f"));
            window.removeEventListener('keyup', __classPrivateFieldGet(this, _EllipseTool_onKeyUp, "f"));
        };
        this.resetPreview();
        const renderingContext = this.drawLayer.getContext('2d');
        if (renderingContext) {
            this.drawContext = renderingContext;
        }
        this.toolName = Tools_List.ELLIPSE;
    }
}
_EllipseTool_draw = new WeakMap(), _EllipseTool_onKeyDown = new WeakMap(), _EllipseTool_onKeyUp = new WeakMap(), _EllipseTool_onDown = new WeakMap(), _EllipseTool_onUp = new WeakMap(), _EllipseTool_onMove = new WeakMap(), _EllipseTool_onOut = new WeakMap();
//# sourceMappingURL=EllipseTool.js.map