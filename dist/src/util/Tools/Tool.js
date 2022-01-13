var _Tool_draw;
import { highlightStyle, textPlaceHolder, } from '../helper/constants';
import { Pen } from '../Pen';
export class Tool {
    constructor(drawLayer, self, onUpdateEditor, offset = [0, 0], previewLayer, drawPenConfig = { text: textPlaceHolder }, previewPenConfig) {
        var _a, _b;
        this.allShapes = [];
        this.shallWait = false;
        this.isDrawing = false;
        this.previousCoordinates = [0, 0];
        this.currentCoordinates = [0, 0];
        this.setSVGParam = (field, value) => {
            this.drawPenConfig[field] = value;
        };
        this.setSVGParams = (drawPenConfig) => {
            this.drawPenConfig = drawPenConfig;
        };
        this.resetPreview = () => {
            if (this.previewLayer && this.previewContext) {
                Pen.clearCanvas(this.previewLayer, this.previewContext);
            }
        };
        this.resetView = () => {
            if (this.drawLayer && this.drawContext) {
                Pen.clearCanvas(this.drawLayer, this.drawContext);
            }
        };
        this.resetCoordinates = () => {
            this.previousCoordinates = [0, 0];
            this.currentCoordinates = [0, 0];
        };
        this.highlightPreview = () => {
            if (this.previewContext) {
                this.previewContext.strokeStyle = 'red';
                this.previewContext.setLineDash([10, 10]);
                this.previewContext.lineWidth = 3;
            }
        };
        this.unHighlightpreview = () => {
            if (this.previewContext) {
                this.previewContext.clearRect(0, 0, this.self.width, this.self.height);
            }
        };
        this.updateShapeData = (newCoordinates) => {
            throw new Error('not implemented');
        };
        this.getCoords = (e) => {
            return [e.offsetX - this.offset[0], e.offsetY - this.offset[1]];
        };
        _Tool_draw.set(this, () => {
            throw new Error('not implemented');
        });
        this.executeAction = () => {
            throw new Error('not implemented');
        };
        this.destroy = () => {
            throw new Error('not implemented');
        };
        this.drawLayer = drawLayer;
        this.onUpdateEditor = onUpdateEditor;
        this.self = self;
        this.offset = offset !== null && offset !== void 0 ? offset : [drawLayer.offsetLeft, drawLayer.offsetTop];
        this.previewLayer = previewLayer;
        this.previewPenConfig = previewPenConfig !== null && previewPenConfig !== void 0 ? previewPenConfig : highlightStyle;
        this.drawPenConfig = drawPenConfig;
        this.previewContext = (_b = (_a = this.previewLayer) === null || _a === void 0 ? void 0 : _a.getContext('2d')) !== null && _b !== void 0 ? _b : null;
        this.drawContext = this.drawLayer.getContext('2d');
    }
}
_Tool_draw = new WeakMap();
//# sourceMappingURL=Tool.js.map