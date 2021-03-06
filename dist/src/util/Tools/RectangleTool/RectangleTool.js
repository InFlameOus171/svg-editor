var _RectangleTool_onOut;
import { __classPrivateFieldGet } from "tslib";
import { Tools_List } from '../../helper/constants';
import { getCanvasRectangleValuesFromPoints } from '../../helper/coordinates';
import { Pen } from '../../Pen';
import { Rectangle } from '../../shapes/Rectangle/Rectangle';
import { Tool } from '../Tool';
import { getFormattedRectangleValuesFromPoints } from './RectangleTool.util';
export class RectangleTool extends Tool {
    constructor(drawLayer, previewLayer, self, onCreate, styles, offset) {
        super(drawLayer, self, onCreate, offset, previewLayer, styles);
        this.onDown = (event) => {
            if (event.button !== 0)
                return;
            this.highlightPreview();
            this.currentCoordinates = this.getCoords(event);
            this.previousCoordinates = this.currentCoordinates;
            this.isDrawing = true;
        };
        this.onUp = () => {
            this.resetPreview();
            this.resetView();
            this.isDrawing = false;
            if (this.currentShape) {
                this.createRectangle();
                this.onUpdateEditor(this.currentShape);
            }
            this.resetCoordinates();
        };
        // TODO - Doppelte funktionen zusammenführen/kürzen
        this.createRectangle = () => {
            const { startingCorner, width, height } = getFormattedRectangleValuesFromPoints(this.previousCoordinates, this.currentCoordinates);
            this.currentShape = new Rectangle(startingCorner, width, height, this.drawPenConfig);
        };
        this.createRectanglePreview = () => {
            const { startingCorner, width, height } = getCanvasRectangleValuesFromPoints(this.previousCoordinates, this.currentCoordinates);
            this.currentShape = new Rectangle(startingCorner, width, height, this.previewPenConfig, false);
        };
        this.onMove = (event) => {
            if (this.isDrawing) {
                this.currentCoordinates = this.getCoords(event);
                this.createRectanglePreview();
                if (this.currentShape) {
                    this.resetPreview();
                    Pen.drawRectangle(this.currentShape, this.previewContext, this.previewPenConfig);
                }
            }
        };
        _RectangleTool_onOut.set(this, () => {
            this.isDrawing = false;
        });
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousemove', this.onMove);
            this.drawLayer.addEventListener('mousedown', this.onDown);
            this.drawLayer.addEventListener('mouseout', __classPrivateFieldGet(this, _RectangleTool_onOut, "f"));
            this.drawLayer.addEventListener('mouseup', this.onUp);
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousemove', this.onMove);
            this.drawLayer.removeEventListener('mousedown', this.onDown);
            this.drawLayer.removeEventListener('mouseout', __classPrivateFieldGet(this, _RectangleTool_onOut, "f"));
            this.drawLayer.removeEventListener('mouseup', this.onUp);
        };
        this.resetPreview();
        const renderingContext = this.drawLayer.getContext('2d');
        if (renderingContext) {
            this.drawContext = renderingContext;
        }
        this.toolName = Tools_List.RECT;
    }
}
_RectangleTool_onOut = new WeakMap();
//# sourceMappingURL=RectangleTool.js.map