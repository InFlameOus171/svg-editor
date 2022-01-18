var _LineTool_draw, _LineTool_onDown, _LineTool_onUp, _LineTool_onMove;
import { __classPrivateFieldGet } from "tslib";
import { Tools_List } from '../../helper/constants';
import { Pen } from '../../Pen';
import { Line } from '../../shapes/Line/Line';
import { Tool } from '../Tool';
export class LineTool extends Tool {
    constructor(drawLayer, previewLayer, self, onCreate, drawPenConfig, offset) {
        super(drawLayer, self, onCreate, offset, previewLayer, drawPenConfig);
        _LineTool_draw.set(this, () => {
            this.currentShape && Pen.drawLine(this.currentShape, this.drawContext);
        });
        _LineTool_onDown.set(this, (event) => {
            if (event.button !== 0)
                return;
            this.isDrawing = true;
            this.highlightPreview();
            this.previousCoordinates = this.getCoords(event);
        });
        _LineTool_onUp.set(this, (event) => {
            this.isDrawing = false;
            this.currentCoordinates = this.getCoords(event);
            this.currentShape = new Line([this.previousCoordinates[0], this.previousCoordinates[1]], [this.currentCoordinates[0], this.currentCoordinates[1]], this.drawPenConfig);
            this.resetPreview();
            this.unHighlightpreview();
            __classPrivateFieldGet(this, _LineTool_draw, "f").call(this);
            this.onUpdateEditor(this.currentShape);
        });
        _LineTool_onMove.set(this, (event) => {
            if (this.isDrawing && this.previewLayer) {
                this.resetPreview();
                this.currentCoordinates = this.getCoords(event);
                this.currentShape = new Line(this.previousCoordinates, this.currentCoordinates, this.previewPenConfig, false);
                Pen.drawLine(this.currentShape, this.previewContext);
            }
        });
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousemove', __classPrivateFieldGet(this, _LineTool_onMove, "f"));
            this.drawLayer.addEventListener('mousedown', __classPrivateFieldGet(this, _LineTool_onDown, "f"));
            this.drawLayer.addEventListener('mouseup', __classPrivateFieldGet(this, _LineTool_onUp, "f"));
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousemove', __classPrivateFieldGet(this, _LineTool_onMove, "f"));
            this.drawLayer.removeEventListener('mousedown', __classPrivateFieldGet(this, _LineTool_onDown, "f"));
            this.drawLayer.removeEventListener('mouseup', __classPrivateFieldGet(this, _LineTool_onUp, "f"));
        };
        this.resetPreview();
        const renderingContext = this.drawLayer.getContext('2d');
        if (renderingContext) {
            this.drawContext = renderingContext;
        }
        this.toolName = Tools_List.LINE;
    }
}
_LineTool_draw = new WeakMap(), _LineTool_onDown = new WeakMap(), _LineTool_onUp = new WeakMap(), _LineTool_onMove = new WeakMap();
//# sourceMappingURL=LineTool.js.map