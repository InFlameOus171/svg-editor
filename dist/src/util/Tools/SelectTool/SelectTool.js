var _SelectTool_onClick, _SelectTool_onDown, _SelectTool_onZoneSelection, _SelectTool_onUp, _SelectTool_onMove;
import { __classPrivateFieldGet } from "tslib";
import { highlightStyle, Tools_List } from '../../helper/constants';
import { getCanvasRectangleValuesFromPoints, isPointInsideAnotherShape, isShapeInsideAnotherShape, rectangleParamsFromBoundaries, } from '../../helper/coordinates';
import { isText, typeOfShape } from '../../helper/typeguards';
import { Pen } from '../../Pen';
import { Rectangle } from '../../shapes/Rectangle/Rectangle';
import { setTextParamsSourceVisibility } from '../TextTool/TextTool.util';
import { Tool } from '../Tool';
export class SelectTool extends Tool {
    constructor(drawLayer, previewLayer, self, onSelect, shapes, offset, footerFields) {
        super(drawLayer, self, onSelect, offset, previewLayer, undefined, undefined, footerFields);
        this.updateAllShapes = (shapes = []) => {
            this.allShapes = shapes;
        };
        _SelectTool_onClick.set(this, (event) => {
            this.currentCoordinates = this.getCoords(event);
            const pointPositionCompareFunction = isPointInsideAnotherShape(this.currentCoordinates);
            const selectableShapes = this.allShapes.filter(shape => {
                return pointPositionCompareFunction(shape) && !shape.isLocked;
            });
            if (!selectableShapes.length) {
                this.currentShape = undefined;
                this.updatePreview();
                return;
            }
            const selectedShape = selectableShapes === null || selectableShapes === void 0 ? void 0 : selectableShapes.reduce((acc, shape) => shape.index > (acc === null || acc === void 0 ? void 0 : acc.index) ? acc : shape);
            this.currentShape = selectedShape;
            this.updatePreview();
        });
        _SelectTool_onDown.set(this, (event) => {
            if (event.button !== 0)
                return;
            this.unHighlightpreview();
            this.currentShape = undefined;
            this.currentCoordinates = this.getCoords(event);
            this.previousCoordinates = this.currentCoordinates;
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
                    Pen.draw(new Rectangle(startingCorner, width, height, highlightStyle, false), undefined, this.previewContext);
                }
            }
            else {
                this.resetPreview();
            }
        };
        _SelectTool_onZoneSelection.set(this, (selectedZone) => {
            const compareFunction = isShapeInsideAnotherShape(selectedZone);
            const selectableShapes = this.allShapes.filter(shape => {
                return !shape.isLocked;
            });
            const shapesInsideSelectedZone = selectableShapes.filter(compareFunction);
            const highestIndex = Math.max(...shapesInsideSelectedZone.map(shape => shape.index));
            const highestShape = shapesInsideSelectedZone.find(shape => shape.index === highestIndex);
            const shapeType = highestShape && typeOfShape(highestShape);
            if (shapeType && this.previewContext) {
                this.currentShape = highestShape;
                this.updatePreview();
            }
            else {
                this.currentShape = undefined;
            }
        });
        _SelectTool_onUp.set(this, (event) => {
            var _a;
            this.resetPreview();
            this.isDrawing = false;
            if (this.currentShape) {
                __classPrivateFieldGet(this, _SelectTool_onZoneSelection, "f").call(this, this.currentShape);
            }
            else {
                __classPrivateFieldGet(this, _SelectTool_onClick, "f").call(this, event);
            }
            this.onUpdateEditor((_a = this.currentShape) !== null && _a !== void 0 ? _a : null);
        });
        _SelectTool_onMove.set(this, (event) => {
            if (this.isDrawing && this.previewLayer) {
                this.currentCoordinates = this.getCoords(event);
                const { startingCorner, width, height } = getCanvasRectangleValuesFromPoints(this.previousCoordinates, this.currentCoordinates);
                this.currentShape = new Rectangle(startingCorner, width, height, highlightStyle, false);
                if (this.currentShape) {
                    this.resetPreview();
                    Pen.drawRectangle(this.currentShape, this.previewContext);
                }
            }
        });
        this.changeStyle = (config) => {
            if (this.currentShape) {
                this.currentShape.updateSVGParams(config);
                this.resetPreview();
                this.updatePreview();
            }
        };
        this.executeAction = () => {
            this.drawLayer.addEventListener('mousemove', __classPrivateFieldGet(this, _SelectTool_onMove, "f"));
            this.drawLayer.addEventListener('mousedown', __classPrivateFieldGet(this, _SelectTool_onDown, "f"));
            this.drawLayer.addEventListener('mouseup', __classPrivateFieldGet(this, _SelectTool_onUp, "f"));
        };
        this.destroy = () => {
            this.drawLayer.removeEventListener('mousemove', __classPrivateFieldGet(this, _SelectTool_onMove, "f"));
            this.drawLayer.removeEventListener('mousedown', __classPrivateFieldGet(this, _SelectTool_onDown, "f"));
            this.drawLayer.removeEventListener('mouseup', __classPrivateFieldGet(this, _SelectTool_onUp, "f"));
        };
        this.allShapes = shapes;
        this.previewContext && this.previewContext.setLineDash([10, 10]);
        this.toolName = Tools_List.SELECT;
    }
}
_SelectTool_onClick = new WeakMap(), _SelectTool_onDown = new WeakMap(), _SelectTool_onZoneSelection = new WeakMap(), _SelectTool_onUp = new WeakMap(), _SelectTool_onMove = new WeakMap();
//# sourceMappingURL=SelectTool.js.map