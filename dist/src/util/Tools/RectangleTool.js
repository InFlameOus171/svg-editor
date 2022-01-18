import { Tools_List } from '../helper/constants';
import { getCanvasRectangleValuesFromPoints } from '../helper/coordinates';
import { Pen } from '../Pen';
import { Rectangle } from '../Shapes/Rectangle';
import { getFormattedRectangleValuesFromPoints } from './RectangleTool.util';
import { Tool } from './Tool';
export class RectangleTool extends Tool {
    constructor(drawLayer, previewLayer, self, onCreate, styles, offset) {
        super(drawLayer, self, onCreate, offset, previewLayer, styles);
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousemove', this.onMove);
            this.drawLayer.addEventListener('mousedown', this.onDown);
            this.drawLayer.addEventListener('mouseup', this.onUp);
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousemove', this.onMove);
            this.drawLayer.removeEventListener('mousedown', this.onDown);
            this.drawLayer.removeEventListener('mouseup', this.onUp);
        };
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
        this.resetPreview();
        const renderingContext = this.drawLayer.getContext('2d');
        if (renderingContext) {
            this.drawContext = renderingContext;
        }
        this.toolName = Tools_List.RECT;
    }
}
//# sourceMappingURL=RectangleTool.js.map