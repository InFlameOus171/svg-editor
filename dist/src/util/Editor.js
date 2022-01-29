var _Editor_selectedTool, _Editor_drawLayer, _Editor_previewLayer, _Editor_connection, _Editor_self, _Editor_footerFieldsRef, _Editor_offset, _Editor_shapes, _Editor_currentParams, _Editor_isShapeOnlyBeingSelected, _Editor_setAreFieldsEnabled, _Editor_selectedShape, _Editor_drawContext, _Editor_previewContext, _Editor_createShape, _Editor_handleUpdateShapes, _Editor_onHandleSelectShape, _Editor_onMoveShape, _Editor_openDownloadDialog, _Editor_deleteShapeById;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { updateStyleInputFields } from '../components/molecules/FooterFields/FooterFields.util';
import { setIsButtonDisabled, setIsButtonActive, } from '../components/molecules/ToolBox/ToolBox.util';
import { highlightStyle, SVGParamFieldID, textPlaceHolder, Tools_List, } from './helper/constants';
import { generateSVGURLFromShapes, importSVG } from './helper/svgUtil';
import { isMoveTool, isShapeType, isText, typeOfShape, } from './helper/typeguards';
import { Pen } from './Pen';
import { Ellipse } from './shapes/Ellipse/Ellipse';
import { Freehand } from './shapes/Freehand/Freehand';
import { Line } from './shapes/Line/Line';
import { Rectangle } from './shapes/Rectangle/Rectangle';
import { TextShape } from './shapes/Text/Text';
import { DrawTool } from './tools/DrawTool/DrawTool';
import { EllipseTool } from './tools/EllipseTool/EllipseTool';
import { LineTool } from './tools/LineTool/LineTool';
import { MoveTool } from './tools/MoveTool/MoveTool';
import { RectangleTool } from './tools/RectangleTool/RectangleTool';
import { SelectTool } from './tools/SelectTool/SelectTool';
import { TextTool } from './tools/TextTool/TextTool';
import { paramFieldStateHandler, setTextParamsSourceVisibility, } from './tools/TextTool/TextTool.util';
export class Editor {
    constructor(drawLayer, previewLayer, offset, self, footerFieldsRef) {
        var _a, _b;
        _Editor_selectedTool.set(this, null);
        _Editor_drawLayer.set(this, null);
        _Editor_previewLayer.set(this, null);
        _Editor_connection.set(this, void 0);
        _Editor_self.set(this, void 0);
        _Editor_footerFieldsRef.set(this, void 0);
        _Editor_offset.set(this, void 0);
        _Editor_shapes.set(this, []);
        _Editor_currentParams.set(this, {
            strokeWidth: '1',
            stroke: 'rgba(0,0,0,1)',
            fill: 'rgba(0,0,0,0)',
            lineDash: [0],
            text: textPlaceHolder,
        });
        _Editor_isShapeOnlyBeingSelected.set(this, false);
        _Editor_setAreFieldsEnabled.set(this, void 0);
        _Editor_selectedShape.set(this, null);
        _Editor_drawContext.set(this, void 0);
        _Editor_previewContext.set(this, void 0);
        this.getSVGParams = () => (Object.assign({}, __classPrivateFieldGet(this, _Editor_currentParams, "f")));
        _Editor_createShape.set(this, (shapeRecord) => {
            switch (shapeRecord.type) {
                case 'Ellipse': {
                    const { id, center, radiusX, radiusY, isLocked, svgParams } = shapeRecord;
                    return new Ellipse(center, radiusX, radiusY, svgParams, true, isLocked).replaceID(id);
                }
                case 'Rectangle':
                    const { width, height, id, startingCorner, isLocked, svgParams } = shapeRecord;
                    return new Rectangle(startingCorner, width, height, svgParams, true, isLocked).replaceID(id);
                case 'TextShape': {
                    const { id, width, height, position, svgParams, isLocked } = shapeRecord;
                    return new TextShape(width, height, position, svgParams, true, isLocked).replaceID(id);
                }
                case 'Freehand': {
                    const { id, isLocked, svgParams, points } = shapeRecord;
                    return new Freehand(points, svgParams, true, isLocked).replaceID(id);
                }
                case 'Line': {
                    const { id, isLocked, startPoint, endPoint, svgParams } = shapeRecord;
                    return new Line(startPoint, endPoint, svgParams, true, isLocked).replaceID(id);
                }
                case 'Path':
                    break;
            }
        });
        this.updateShapes = (shapes) => {
            var _a;
            console.log(shapes);
            if (!shapes.length) {
                __classPrivateFieldSet(this, _Editor_shapes, [], "f");
                __classPrivateFieldSet(this, _Editor_selectedShape, null, "f");
            }
            else {
                if (!isShapeType(shapes[0])) {
                    const newShapes = shapes
                        .map(__classPrivateFieldGet(this, _Editor_createShape, "f"))
                        .filter(shape => !!shape);
                    __classPrivateFieldSet(this, _Editor_shapes, newShapes, "f");
                    console.log(__classPrivateFieldGet(this, _Editor_shapes, "f"));
                }
                else {
                    shapes.forEach(shape => {
                        const index = __classPrivateFieldGet(this, _Editor_shapes, "f").findIndex(innerShape => innerShape.getId() === (shape === null || shape === void 0 ? void 0 : shape.getId()));
                        if (index >= 0) {
                            __classPrivateFieldGet(this, _Editor_shapes, "f")[index] = shape;
                        }
                        else {
                            __classPrivateFieldGet(this, _Editor_shapes, "f").push(shape);
                        }
                        __classPrivateFieldSet(this, _Editor_currentParams, shape.getSvgParams(), "f");
                    });
                    if (((_a = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _a === void 0 ? void 0 : _a.toolName) === Tools_List.SELECT) {
                        __classPrivateFieldGet(this, _Editor_selectedTool, "f").updateAllShapes(__classPrivateFieldGet(this, _Editor_shapes, "f"));
                    }
                }
            }
            this.redrawShapes();
        };
        this.resetEditor = () => {
            if (__classPrivateFieldGet(this, _Editor_drawLayer, "f")) {
                Pen.clearCanvas(__classPrivateFieldGet(this, _Editor_drawLayer, "f"));
            }
            if (__classPrivateFieldGet(this, _Editor_previewLayer, "f")) {
                Pen.clearCanvas(__classPrivateFieldGet(this, _Editor_previewLayer, "f"));
            }
        };
        _Editor_handleUpdateShapes.set(this, (toBeAppended) => {
            var _a;
            if (toBeAppended === undefined) {
                return;
            }
            if (toBeAppended === null) {
                this.onUnselectTool();
                return;
            }
            const shapes = Array.isArray(toBeAppended) ? toBeAppended : [toBeAppended];
            this.updateShapes(shapes);
            (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.updateShapes(toBeAppended);
        });
        _Editor_onHandleSelectShape.set(this, (selectedShape) => {
            var _a, _b, _c, _d;
            setIsButtonDisabled(__classPrivateFieldGet(this, _Editor_self, "f"), Tools_List.MOVE, !selectedShape);
            __classPrivateFieldSet(this, _Editor_isShapeOnlyBeingSelected, true, "f");
            if (!selectedShape && __classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.unlockShapes(__classPrivateFieldGet(this, _Editor_selectedShape, "f"));
                const currentlyLockedShape = __classPrivateFieldGet(this, _Editor_selectedShape, "f");
                if ((_b = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _b === void 0 ? void 0 : _b.ws) {
                    __classPrivateFieldGet(this, _Editor_connection, "f").ws.onclose = () => { var _a; return (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.unlockShapes(currentlyLockedShape); };
                }
                __classPrivateFieldSet(this, _Editor_selectedShape, null, "f");
            }
            else {
                const shape = Array.isArray(selectedShape)
                    ? selectedShape[0]
                    : selectedShape;
                shape && ((_c = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _c === void 0 ? void 0 : _c.lockShapes(shape));
                __classPrivateFieldSet(this, _Editor_selectedShape, shape, "f");
                if (__classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                    __classPrivateFieldSet(this, _Editor_currentParams, __classPrivateFieldGet(this, _Editor_selectedShape, "f").getSvgParams(), "f");
                    this.onUpdateStyleInputFields();
                    if (isText(__classPrivateFieldGet(this, _Editor_selectedShape, "f"))) {
                        setTextParamsSourceVisibility(__classPrivateFieldGet(this, _Editor_footerFieldsRef, "f"), true);
                    }
                }
                __classPrivateFieldSet(this, _Editor_isShapeOnlyBeingSelected, false, "f");
            }
            if (!!selectedShape) {
                setIsButtonActive(__classPrivateFieldGet(this, _Editor_self, "f"), Tools_List.SELECT, false);
                (_d = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _d === void 0 ? void 0 : _d.destroy();
                __classPrivateFieldSet(this, _Editor_selectedTool, null, "f");
            }
        });
        _Editor_onMoveShape.set(this, (movedShape) => {
            var _a;
            if (movedShape === null) {
                this.onUnselectTool();
                return;
            }
            const shape = Array.isArray(movedShape) ? movedShape[0] : movedShape;
            const index = __classPrivateFieldGet(this, _Editor_shapes, "f").findIndex(innerShape => innerShape.getId() === shape.getId());
            if (index >= 0) {
                __classPrivateFieldGet(this, _Editor_shapes, "f")[index] = shape;
            }
            else {
                __classPrivateFieldGet(this, _Editor_shapes, "f").push(shape);
            }
            this.redrawShapes();
            (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.updateShapes(movedShape);
        });
        _Editor_openDownloadDialog.set(this, (url) => {
            const downloadLink = document.createElement('a');
            downloadLink.download = 'svg-element.svg';
            downloadLink.href = url;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
        this.resetPreview = () => {
            var _a;
            const renderingContext = (_a = __classPrivateFieldGet(this, _Editor_previewLayer, "f")) === null || _a === void 0 ? void 0 : _a.getContext('2d');
            if (__classPrivateFieldGet(this, _Editor_previewLayer, "f") && renderingContext) {
                Pen.clearCanvas(__classPrivateFieldGet(this, _Editor_previewLayer, "f"), renderingContext);
            }
        };
        this.redrawShapes = () => {
            if (__classPrivateFieldGet(this, _Editor_drawContext, "f") &&
                __classPrivateFieldGet(this, _Editor_drawLayer, "f") &&
                __classPrivateFieldGet(this, _Editor_previewLayer, "f") &&
                __classPrivateFieldGet(this, _Editor_previewContext, "f")) {
                Pen.clearCanvas(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_drawContext, "f"));
                Pen.clearCanvas(__classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_previewContext, "f"));
                if (__classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                    if (typeOfShape(__classPrivateFieldGet(this, _Editor_selectedShape, "f")) === 'TextShape') {
                        Pen.draw(__classPrivateFieldGet(this, _Editor_selectedShape, "f"), Object.assign(Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Editor_selectedShape, "f").getSvgParams()), __classPrivateFieldGet(this, _Editor_currentParams, "f")), highlightStyle), { lineDash: [0] }), __classPrivateFieldGet(this, _Editor_previewContext, "f"));
                    }
                    else {
                        Pen.draw(__classPrivateFieldGet(this, _Editor_selectedShape, "f"), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Editor_selectedShape, "f").getSvgParams()), __classPrivateFieldGet(this, _Editor_currentParams, "f")), highlightStyle), __classPrivateFieldGet(this, _Editor_previewContext, "f"));
                    }
                }
                __classPrivateFieldGet(this, _Editor_drawContext, "f") &&
                    __classPrivateFieldGet(this, _Editor_shapes, "f").forEach(shape => {
                        // Impossible to be null here when in line 281 drawContext is checked
                        Pen.draw(shape, undefined, __classPrivateFieldGet(this, _Editor_drawContext, "f"));
                    });
            }
        };
        this.onUpdateStyleInputFields = () => {
            var _a, _b;
            updateStyleInputFields(__classPrivateFieldGet(this, _Editor_footerFieldsRef, "f"), (_b = (_a = __classPrivateFieldGet(this, _Editor_selectedShape, "f")) === null || _a === void 0 ? void 0 : _a.getSvgParams()) !== null && _b !== void 0 ? _b : __classPrivateFieldGet(this, _Editor_currentParams, "f"));
        };
        this.onSave = () => {
            this.onUnselectTool();
            __classPrivateFieldGet(this, _Editor_openDownloadDialog, "f").call(this, generateSVGURLFromShapes(__classPrivateFieldGet(this, _Editor_shapes, "f")));
        };
        this.onImportSVG = (data) => {
            __classPrivateFieldGet(this, _Editor_handleUpdateShapes, "f").call(this, importSVG(data));
        };
        this.getAllShapes = () => __classPrivateFieldGet(this, _Editor_shapes, "f");
        _Editor_deleteShapeById.set(this, (shapeId) => {
            var _a;
            const index = __classPrivateFieldGet(this, _Editor_shapes, "f").findIndex(shape => shape.getId() === shapeId);
            __classPrivateFieldGet(this, _Editor_shapes, "f").splice(index, 1);
            (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.deleteShapes([shapeId]);
        });
        this.deleteFromShapes = (shapeIdData) => {
            if (Array.isArray(shapeIdData)) {
                shapeIdData.forEach(__classPrivateFieldGet(this, _Editor_deleteShapeById, "f"));
            }
            else {
                __classPrivateFieldGet(this, _Editor_deleteShapeById, "f").call(this, shapeIdData);
            }
        };
        this.onDeleteSelectedShape = () => {
            if (__classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                this.deleteFromShapes(__classPrivateFieldGet(this, _Editor_selectedShape, "f").getId());
                __classPrivateFieldSet(this, _Editor_selectedShape, null, "f");
            }
        };
        this.onSelectTool = (tool) => {
            var _a, _b, _c, _d, _e, _f;
            if ((_a = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _a === void 0 ? void 0 : _a.toolName) {
                setIsButtonActive(__classPrivateFieldGet(this, _Editor_self, "f"), (_b = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _b === void 0 ? void 0 : _b.toolName, false);
            }
            if (tool) {
                if (__classPrivateFieldGet(this, _Editor_selectedShape, "f") && tool !== Tools_List.SELECT) {
                    (_c = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _c === void 0 ? void 0 : _c.destroy();
                    this.onUpdateStyleInputFields();
                }
                else {
                    this.onUnselectTool();
                }
            }
            if (__classPrivateFieldGet(this, _Editor_drawLayer, "f") && __classPrivateFieldGet(this, _Editor_previewLayer, "f")) {
                __classPrivateFieldGet(this, _Editor_setAreFieldsEnabled, "f").call(this, Object.values(SVGParamFieldID), true);
                switch (tool) {
                    case Tools_List.DRAW: {
                        const fieldsToDisable = [
                            SVGParamFieldID.FILL_COLOR,
                            SVGParamFieldID.FILL_OPACITY,
                        ];
                        __classPrivateFieldGet(this, _Editor_setAreFieldsEnabled, "f").call(this, fieldsToDisable, false);
                        __classPrivateFieldSet(this, _Editor_selectedTool, new DrawTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_handleUpdateShapes, "f"), __classPrivateFieldGet(this, _Editor_currentParams, "f"), __classPrivateFieldGet(this, _Editor_offset, "f")), "f");
                        break;
                    }
                    case Tools_List.LINE: {
                        const fieldsToDisable = [
                            SVGParamFieldID.FILL_COLOR,
                            SVGParamFieldID.FILL_OPACITY,
                        ];
                        __classPrivateFieldGet(this, _Editor_setAreFieldsEnabled, "f").call(this, fieldsToDisable, false);
                        __classPrivateFieldSet(this, _Editor_selectedTool, new LineTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_handleUpdateShapes, "f"), __classPrivateFieldGet(this, _Editor_currentParams, "f"), __classPrivateFieldGet(this, _Editor_offset, "f")), "f");
                        break;
                    }
                    case Tools_List.RECT: {
                        __classPrivateFieldSet(this, _Editor_selectedTool, new RectangleTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_handleUpdateShapes, "f"), __classPrivateFieldGet(this, _Editor_currentParams, "f"), __classPrivateFieldGet(this, _Editor_offset, "f")), "f");
                        break;
                    }
                    case Tools_List.ELLIPSE: {
                        __classPrivateFieldSet(this, _Editor_selectedTool, new EllipseTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_handleUpdateShapes, "f"), __classPrivateFieldGet(this, _Editor_currentParams, "f"), __classPrivateFieldGet(this, _Editor_offset, "f")), "f");
                        break;
                    }
                    case Tools_List.SELECT: {
                        __classPrivateFieldSet(this, _Editor_selectedTool, new SelectTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_onHandleSelectShape, "f"), __classPrivateFieldGet(this, _Editor_shapes, "f"), __classPrivateFieldGet(this, _Editor_offset, "f"), __classPrivateFieldGet(this, _Editor_footerFieldsRef, "f")), "f");
                        break;
                    }
                    case Tools_List.TEXT: {
                        __classPrivateFieldSet(this, _Editor_selectedTool, new TextTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_handleUpdateShapes, "f"), __classPrivateFieldGet(this, _Editor_currentParams, "f"), __classPrivateFieldGet(this, _Editor_offset, "f"), __classPrivateFieldGet(this, _Editor_footerFieldsRef, "f")), "f");
                        break;
                    }
                    case Tools_List.MOVE: {
                        if (__classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                            __classPrivateFieldSet(this, _Editor_selectedTool, new MoveTool(__classPrivateFieldGet(this, _Editor_drawLayer, "f"), __classPrivateFieldGet(this, _Editor_previewLayer, "f"), __classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_onMoveShape, "f"), __classPrivateFieldGet(this, _Editor_offset, "f"), __classPrivateFieldGet(this, _Editor_selectedShape, "f"), __classPrivateFieldGet(this, _Editor_footerFieldsRef, "f")), "f");
                        }
                        else {
                            return;
                        }
                        break;
                    }
                    case Tools_List.DELETE: {
                        this.onDeleteSelectedShape();
                        this.onUnselectTool();
                        __classPrivateFieldSet(this, _Editor_selectedTool, null, "f");
                        break;
                    }
                    case null: {
                        if ((_d = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _d === void 0 ? void 0 : _d.toolName) {
                            setIsButtonActive(__classPrivateFieldGet(this, _Editor_self, "f"), __classPrivateFieldGet(this, _Editor_selectedTool, "f").toolName, false);
                        }
                        this.onUnselectTool();
                        __classPrivateFieldSet(this, _Editor_selectedTool, null, "f");
                    }
                }
                if (tool && tool !== Tools_List.DELETE) {
                    setIsButtonActive(__classPrivateFieldGet(this, _Editor_self, "f"), tool, true);
                }
                if (!isMoveTool(__classPrivateFieldGet(this, _Editor_selectedTool, "f"))) {
                    __classPrivateFieldSet(this, _Editor_selectedShape, null, "f");
                    this.applyStyles();
                }
                (_e = __classPrivateFieldGet(this, _Editor_self, "f").shadowRoot) === null || _e === void 0 ? void 0 : _e.getElementById('');
                (_f = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _f === void 0 ? void 0 : _f.executeAction();
            }
        };
        this.applyStyles = () => {
            var _a;
            if (__classPrivateFieldGet(this, _Editor_selectedShape, "f") && __classPrivateFieldGet(this, _Editor_drawLayer, "f")) {
                this.redrawShapes();
                (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.updateShapes(__classPrivateFieldGet(this, _Editor_shapes, "f"));
            }
        };
        this.setShapeParam = (field, value) => {
            var _a;
            __classPrivateFieldGet(this, _Editor_currentParams, "f")[field] = value;
            (_a = __classPrivateFieldGet(this, _Editor_selectedShape, "f")) === null || _a === void 0 ? void 0 : _a.updateSVGParam(field, value);
            const changedIndex = __classPrivateFieldGet(this, _Editor_shapes, "f").findIndex(shape => { var _a; return ((_a = __classPrivateFieldGet(this, _Editor_selectedShape, "f")) === null || _a === void 0 ? void 0 : _a.getId()) === shape.getId(); });
            if (changedIndex !== undefined && __classPrivateFieldGet(this, _Editor_shapes, "f") && __classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                __classPrivateFieldGet(this, _Editor_shapes, "f")[changedIndex] = __classPrivateFieldGet(this, _Editor_selectedShape, "f");
            }
            this.applyStyles();
        };
        this.setShapeParams = (fieldsUpdated = false, strokeWidth, stroke = 'rgba(0,0,0,1)', fill = 'rgba(0,0,0,0)', lineCap = 'butt', lineDash = [], fontFamily = 'Arial', fontSize = 12, text) => {
            var _a;
            if (fieldsUpdated && __classPrivateFieldGet(this, _Editor_isShapeOnlyBeingSelected, "f")) {
                return;
            }
            __classPrivateFieldSet(this, _Editor_currentParams, {
                fill,
                stroke,
                strokeWidth,
                lineCap,
                lineDash,
                fontFamily,
                fontSize,
                text,
            }, "f");
            (_a = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _a === void 0 ? void 0 : _a.setSVGParams(__classPrivateFieldGet(this, _Editor_currentParams, "f"));
        };
        this.setConnection = (newConnection) => {
            __classPrivateFieldSet(this, _Editor_connection, newConnection, "f");
        };
        this.onUnselectTool = () => {
            var _a, _b;
            if (__classPrivateFieldGet(this, _Editor_selectedShape, "f")) {
                (_a = __classPrivateFieldGet(this, _Editor_connection, "f")) === null || _a === void 0 ? void 0 : _a.unlockShapes(__classPrivateFieldGet(this, _Editor_selectedShape, "f"));
            }
            setIsButtonDisabled(__classPrivateFieldGet(this, _Editor_self, "f"), Tools_List.MOVE, true);
            __classPrivateFieldSet(this, _Editor_selectedShape, null, "f");
            (_b = __classPrivateFieldGet(this, _Editor_selectedTool, "f")) === null || _b === void 0 ? void 0 : _b.destroy();
            __classPrivateFieldGet(this, _Editor_setAreFieldsEnabled, "f").call(this, Object.values(SVGParamFieldID), false);
            setTextParamsSourceVisibility(__classPrivateFieldGet(this, _Editor_footerFieldsRef, "f"), false);
            this.resetPreview();
            this.redrawShapes();
        };
        __classPrivateFieldSet(this, _Editor_drawLayer, drawLayer, "f");
        __classPrivateFieldSet(this, _Editor_previewLayer, previewLayer, "f");
        __classPrivateFieldSet(this, _Editor_self, self, "f");
        __classPrivateFieldSet(this, _Editor_offset, offset, "f");
        __classPrivateFieldSet(this, _Editor_footerFieldsRef, footerFieldsRef, "f");
        __classPrivateFieldSet(this, _Editor_currentParams, {
            text: textPlaceHolder,
            strokeWidth: '1',
            stroke: 'rgba(0,0,0,1)',
            fill: 'rgba(0,0,0,0)',
        }, "f");
        __classPrivateFieldSet(this, _Editor_drawContext, (_a = __classPrivateFieldGet(this, _Editor_drawLayer, "f")) === null || _a === void 0 ? void 0 : _a.getContext('2d'), "f");
        __classPrivateFieldSet(this, _Editor_previewContext, (_b = __classPrivateFieldGet(this, _Editor_previewLayer, "f")) === null || _b === void 0 ? void 0 : _b.getContext('2d'), "f");
        __classPrivateFieldSet(this, _Editor_setAreFieldsEnabled, paramFieldStateHandler(__classPrivateFieldGet(this, _Editor_footerFieldsRef, "f")).setAreFieldsEnabled, "f");
        __classPrivateFieldGet(this, _Editor_setAreFieldsEnabled, "f").call(this, Object.values(SVGParamFieldID), false);
        updateStyleInputFields(__classPrivateFieldGet(this, _Editor_footerFieldsRef, "f"), __classPrivateFieldGet(this, _Editor_currentParams, "f"));
        window.addEventListener('resize', () => {
            setTimeout(() => this.redrawShapes(), 50);
        });
    }
}
_Editor_selectedTool = new WeakMap(), _Editor_drawLayer = new WeakMap(), _Editor_previewLayer = new WeakMap(), _Editor_connection = new WeakMap(), _Editor_self = new WeakMap(), _Editor_footerFieldsRef = new WeakMap(), _Editor_offset = new WeakMap(), _Editor_shapes = new WeakMap(), _Editor_currentParams = new WeakMap(), _Editor_isShapeOnlyBeingSelected = new WeakMap(), _Editor_setAreFieldsEnabled = new WeakMap(), _Editor_selectedShape = new WeakMap(), _Editor_drawContext = new WeakMap(), _Editor_previewContext = new WeakMap(), _Editor_createShape = new WeakMap(), _Editor_handleUpdateShapes = new WeakMap(), _Editor_onHandleSelectShape = new WeakMap(), _Editor_onMoveShape = new WeakMap(), _Editor_openDownloadDialog = new WeakMap(), _Editor_deleteShapeById = new WeakMap();
//# sourceMappingURL=Editor.js.map