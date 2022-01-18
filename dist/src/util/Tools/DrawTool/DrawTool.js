var _DrawTool_handleTimeOut, _DrawTool_draw, _DrawTool_onDown, _DrawTool_onUp, _DrawTool_onOut, _DrawTool_onMove;
import { __classPrivateFieldGet } from "tslib";
import { Tools_List } from '../../helper/constants';
import { Pen } from '../../Pen';
import { Freehand } from '../../shapes/Freehand/Freehand';
import { Line } from '../../shapes/Line/Line';
import { Tool } from '../Tool';
export class DrawTool extends Tool {
    constructor(drawLayer, previewLayer, self, onCreate, currentStyles, offset) {
        super(drawLayer, self, onCreate, offset, previewLayer, currentStyles);
        this.timesPerSecond = 120;
        this.currentShapeComponents = [];
        _DrawTool_handleTimeOut.set(this, () => {
            this.shallWait = true;
            setTimeout(() => {
                this.shallWait = false;
            }, 1000 / this.timesPerSecond);
        });
        _DrawTool_draw.set(this, () => {
            this.currentShape && Pen.drawLine(this.currentShape, this.previewContext);
        });
        _DrawTool_onDown.set(this, (event) => {
            if (event.button !== 0)
                return;
            this.isDrawing = true;
            this.currentShapeComponents = [];
            this.previousCoordinates = this.currentCoordinates;
            this.currentCoordinates = this.getCoords(event);
        });
        _DrawTool_onUp.set(this, () => {
            if (this.currentShapeComponents.length > 2) {
                const completeShape = new Freehand(this.currentShapeComponents, this.drawPenConfig);
                this.onUpdateEditor(completeShape);
            }
            this.currentShapeComponents = [];
            this.isDrawing = false;
        });
        _DrawTool_onOut.set(this, () => {
            this.isDrawing = false;
        });
        _DrawTool_onMove.set(this, (event) => {
            if (!this.isDrawing || this.shallWait) {
                return;
            }
            this.previousCoordinates = this.currentCoordinates;
            this.currentCoordinates = this.getCoords(event);
            this.currentShape = new Line(this.previousCoordinates, this.currentCoordinates, this.drawPenConfig, false);
            Pen.drawLine(this.currentShape, this.previewContext);
            this.currentShapeComponents.push(this.currentCoordinates);
            __classPrivateFieldGet(this, _DrawTool_draw, "f").call(this);
            __classPrivateFieldGet(this, _DrawTool_handleTimeOut, "f").call(this);
        });
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousemove', __classPrivateFieldGet(this, _DrawTool_onMove, "f"));
            this.drawLayer.addEventListener('mousedown', __classPrivateFieldGet(this, _DrawTool_onDown, "f"));
            this.drawLayer.addEventListener('mouseup', __classPrivateFieldGet(this, _DrawTool_onUp, "f"));
            this.drawLayer.addEventListener('mouseout', __classPrivateFieldGet(this, _DrawTool_onOut, "f"));
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousemove', __classPrivateFieldGet(this, _DrawTool_onMove, "f"));
            this.drawLayer.removeEventListener('mousedown', __classPrivateFieldGet(this, _DrawTool_onDown, "f"));
            this.drawLayer.removeEventListener('mouseup', __classPrivateFieldGet(this, _DrawTool_onUp, "f"));
            this.drawLayer.removeEventListener('mouseout', __classPrivateFieldGet(this, _DrawTool_onOut, "f"));
        };
        this.resetPreview();
        this.toolName = Tools_List.DRAW;
    }
}
_DrawTool_handleTimeOut = new WeakMap(), _DrawTool_draw = new WeakMap(), _DrawTool_onDown = new WeakMap(), _DrawTool_onUp = new WeakMap(), _DrawTool_onOut = new WeakMap(), _DrawTool_onMove = new WeakMap();
//# sourceMappingURL=DrawTool.js.map