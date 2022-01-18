import { FooterFields } from '../components/molecules/FooterFields';
import { updateStyleInputFields } from '../components/molecules/FooterFields/FooterFields.util';
import {
  setIsButtonDisabled,
  setIsButtonActive,
} from '../components/molecules/ToolBox/ToolBox.util';
import { SVGEditor } from '../components/organisms/SVGEditor';
import type { ShapeType } from '../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../types/types';
import {
  highlightStyle,
  SVGParamFieldID,
  textPlaceHolder,
  Tools_List,
} from './helper/constants';
import { generateSVGURLFromShapes } from './helper/svgUtil';
import {
  isMoveTool,
  isShapeType,
  isText,
  typeOfShape,
} from './helper/typeguards';
import { Connection } from './network';
import { Pen } from './Pen';
import { Ellipse } from './shapes/Ellipse/Ellipse';
import { Freehand } from './shapes/Freehand/Freehand';
import { Line } from './shapes/Line/Line';
import { Rectangle } from './shapes/Rectangle/Rectangle';
import { TextShape } from './shapes/Text/Text';
import { DrawTool } from './tools/DrawTool/DrawTool';
import { EllipseTool } from './tools/EllipseTool/EllipseTool';
import { ImportTool } from './tools/ImportTool/ImportTool';
import { LineTool } from './tools/LineTool/LineTool';
import { MoveTool } from './tools/MoveTool/MoveTool';
import { RectangleTool } from './tools/RectangleTool/RectangleTool';
import { SelectTool } from './tools/SelectTool/SelectTool';
import { TextTool } from './tools/TextTool/TextTool';
import {
  paramFieldStateHandler,
  setTextParamsSourceVisibility,
} from './tools/TextTool/TextTool.util';
import { Tool } from './tools/Tool';

export class Editor {
  #selectedTool: Tool<ShapeType> | null = null;
  #drawLayer: HTMLCanvasElement | null = null;
  #previewLayer: HTMLCanvasElement | null = null;
  #connection?: Connection;
  #self: SVGEditor;
  #footerFieldsRef: FooterFields;
  #offset: Coordinates;
  #shapes: ShapeType[] = [];
  #currentParams: SVGParamsBase = {
    strokeWidth: '1',
    stroke: 'rgba(0,0,0,1)',
    fill: 'rgba(0,0,0,0)',
    lineDash: [0],
    text: textPlaceHolder,
  };
  #isShapeOnlyBeingSelected: boolean = false;
  #setAreFieldsEnabled: (
    fieldName: SVGParamFieldID[],
    isEnabled?: boolean
  ) => void;
  #selectedShape?: ShapeType | null = null;
  #drawContext: CanvasRenderingContext2D | null;
  #previewContext: CanvasRenderingContext2D | null;
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    offset: Coordinates,
    self: SVGEditor,
    footerFieldsRef: FooterFields
  ) {
    this.#drawLayer = drawLayer;
    this.#previewLayer = previewLayer;
    this.#self = self;
    this.#offset = offset;
    this.#footerFieldsRef = footerFieldsRef;
    this.#currentParams = {
      text: textPlaceHolder,
      strokeWidth: '1',
      stroke: 'rgba(0,0,0,1)',
      fill: 'rgba(0,0,0,0)',
    };
    this.#drawContext = this.#drawLayer?.getContext('2d');
    this.#previewContext = this.#previewLayer?.getContext('2d');
    this.#setAreFieldsEnabled = paramFieldStateHandler(
      this.#self
    ).setAreFieldsEnabled;
    this.#setAreFieldsEnabled(Object.values(SVGParamFieldID), false);
    updateStyleInputFields(this.#footerFieldsRef, this.#currentParams);

    window.addEventListener('resize', () => {
      setTimeout(() => this.redrawShapes(), 50);
    });
  }

  getSVGParams = () => ({
    ...this.#currentParams,
  });

  #createShape = (shapeRecord: Record<string, any>): ShapeType | undefined => {
    switch (shapeRecord.type) {
      case 'Ellipse': {
        const { id, center, radiusX, radiusY, isLocked, svgParams } =
          shapeRecord;
        return new Ellipse(
          center,
          radiusX,
          radiusY,
          svgParams,
          true,
          isLocked
        ).replaceID(id);
      }
      case 'Rectangle':
        const { width, height, id, startingCorner, isLocked, svgParams } =
          shapeRecord;
        return new Rectangle(
          startingCorner,
          width,
          height,
          svgParams,
          true,
          isLocked
        ).replaceID(id);
      case 'TextShape': {
        const { id, width, height, position, svgParams, isLocked } =
          shapeRecord;
        return new TextShape(
          width,
          height,
          position,
          svgParams,
          true,
          isLocked
        ).replaceID(id);
      }
      case 'Freehand': {
        const { id, isLocked, svgParams, points } = shapeRecord;
        return new Freehand(points, svgParams, true, isLocked).replaceID(id);
      }
      case 'Line': {
        const { id, isLocked, startPoint, endPoint, svgParams } = shapeRecord;
        return new Line(
          startPoint,
          endPoint,
          svgParams,
          true,
          isLocked
        ).replaceID(id);
      }
      case 'Path':
        break;
    }
  };

  updateShapes = (shapes: Array<Record<string, any>>) => {
    if (!shapes.length) {
      this.#shapes = [];
      this.#selectedShape = null;
    } else {
      shapes.forEach((shape: Record<string, any>) => {
        let shapeAsShapeType: ShapeType | undefined;
        if (isShapeType(shape)) {
          shapeAsShapeType = shape;
        } else {
          shapeAsShapeType = this.#createShape(shape);
        }
        if (!shapeAsShapeType) return;
        const index = this.#shapes.findIndex(
          innerShape => innerShape.getId() === shapeAsShapeType?.getId()
        );
        if (index >= 0) {
          this.#shapes[index] = shapeAsShapeType;
        } else {
          this.#shapes.push(shapeAsShapeType);
        }
        this.#currentParams = shapeAsShapeType.getSvgParams();
      });
      if (this.#selectedTool?.toolName === Tools_List.SELECT) {
        (this.#selectedTool as SelectTool).updateAllShapes(this.#shapes);
      }
    }
    this.redrawShapes();
  };

  resetEditor = () => {
    if (this.#drawLayer) {
      Pen.clearCanvas(this.#drawLayer);
    }
    if (this.#previewLayer) {
      Pen.clearCanvas(this.#previewLayer);
    }
  };

  #handleUpdateShapes = (toBeAppended?: ShapeType | ShapeType[] | null) => {
    if (toBeAppended === undefined) {
      return;
    }
    if (toBeAppended === null) {
      this.onUnselectTool();
      return;
    }
    const shapes = Array.isArray(toBeAppended) ? toBeAppended : [toBeAppended];
    this.updateShapes(shapes);
    this.#connection?.updateShapes(toBeAppended);
  };

  #onHandleSelectShape = (selectedShape: ShapeType | ShapeType[] | null) => {
    setIsButtonDisabled(this.#self, Tools_List.MOVE, !selectedShape);
    this.#isShapeOnlyBeingSelected = true;
    if (!selectedShape && this.#selectedShape) {
      this.#connection?.unlockShapes(this.#selectedShape);
      const currentlyLockedShape = this.#selectedShape;
      if (this.#connection?.ws) {
        this.#connection.ws.onclose = () =>
          this.#connection?.unlockShapes(currentlyLockedShape);
      }
      this.#selectedShape = null;
    } else {
      const shape = Array.isArray(selectedShape)
        ? selectedShape[0]
        : selectedShape;

      shape && this.#connection?.lockShapes(shape);
      this.#selectedShape = shape;
      if (this.#selectedShape) {
        this.#currentParams = this.#selectedShape.getSvgParams();
        this.onUpdateStyleInputFields();
        if (isText(this.#selectedShape)) {
          setTextParamsSourceVisibility(this.#self, true);
        }
      }
      this.#isShapeOnlyBeingSelected = false;
    }
    if (!!selectedShape) {
      setIsButtonActive(this.#self, Tools_List.SELECT, false);
      this.#selectedTool?.destroy();
      this.#selectedTool = null;
    }
  };

  #onMoveShape = (movedShape: ShapeType | ShapeType[] | null) => {
    if (movedShape === null) {
      this.onUnselectTool();
      return;
    }
    const shape = Array.isArray(movedShape) ? movedShape[0] : movedShape;
    const index = this.#shapes.findIndex(
      innerShape => innerShape.getId() === shape.getId()
    );
    if (index >= 0) {
      this.#shapes[index] = shape;
    } else {
      this.#shapes.push(shape);
    }
    this.redrawShapes();
    this.#connection?.updateShapes(movedShape);
  };

  #openDownloadDialog = (url: string) => {
    const downloadLink = document.createElement('a');
    downloadLink.download = 'svg-element.svg';
    downloadLink.href = url;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  resetPreview = () => {
    const renderingContext = this.#previewLayer?.getContext('2d');
    if (this.#previewLayer && renderingContext) {
      Pen.clearCanvas(this.#previewLayer, renderingContext);
    }
  };
  redrawShapes = () => {
    if (
      this.#drawContext &&
      this.#drawLayer &&
      this.#previewLayer &&
      this.#previewContext
    ) {
      Pen.clearCanvas(this.#drawLayer, this.#drawContext);
      Pen.clearCanvas(this.#previewLayer, this.#previewContext);

      if (this.#selectedShape) {
        if (typeOfShape(this.#selectedShape) === 'TextShape') {
          Pen.draw(
            this.#selectedShape,
            {
              ...this.#selectedShape.getSvgParams(),
              ...this.#currentParams,
              ...highlightStyle,
              lineDash: [0],
            },
            this.#previewContext
          );
        } else {
          Pen.draw(
            this.#selectedShape,
            {
              ...this.#selectedShape.getSvgParams(),
              ...this.#currentParams,
              ...highlightStyle,
            },
            this.#previewContext
          );
        }
      }
      this.#shapes.forEach(shape => {
        Pen.draw(shape, undefined, this.#drawContext);
      });
    }
  };

  onUpdateStyleInputFields = () => {
    updateStyleInputFields(
      this.#footerFieldsRef,
      this.#selectedShape?.getSvgParams() ?? this.#currentParams
    );
  };

  onSave = () => {
    this.onUnselectTool();
    this.#openDownloadDialog(generateSVGURLFromShapes(this.#shapes));
  };

  importSVG = (data: Document) => {
    if (this.#drawLayer) {
      const importTool = new ImportTool(
        this.#drawLayer,
        this.#self,
        this.#handleUpdateShapes,
        this.#offset
      );
      importTool.drawSvg(data);
      importTool.destroy();
    }
  };

  getAllShapes = () => this.#shapes;

  #deleteShapeById = (shapeId: string) => {
    const index = this.#shapes.findIndex(shape => shape.getId() === shapeId);
    this.#shapes.splice(index, 1);
    this.#connection?.deleteShapes([shapeId]);
  };

  deleteFromShapes = (shapeIdData: string | string[]) => {
    if (Array.isArray(shapeIdData)) {
      shapeIdData.forEach(this.#deleteShapeById);
    } else {
      this.#deleteShapeById(shapeIdData);
    }
  };

  onDeleteSelectedShape = () => {
    if (this.#selectedShape) {
      this.deleteFromShapes(this.#selectedShape.getId());
      this.#selectedShape = null;
    }
  };

  onSelectTool = (tool: Tools_List | null) => {
    if (this.#selectedTool?.toolName) {
      setIsButtonActive(this.#self, this.#selectedTool?.toolName, false);
    }
    if (tool) {
      if (this.#selectedShape && tool !== Tools_List.SELECT) {
        this.#selectedTool?.destroy();
        this.onUpdateStyleInputFields();
      } else {
        this.onUnselectTool();
      }
    }
    if (this.#drawLayer && this.#previewLayer) {
      this.#setAreFieldsEnabled(Object.values(SVGParamFieldID), true);
      switch (tool) {
        case Tools_List.DRAW: {
          const fieldsToDisable = [
            SVGParamFieldID.FILL_COLOR,
            SVGParamFieldID.FILL_OPACITY,
          ];
          this.#setAreFieldsEnabled(fieldsToDisable, false);
          this.#selectedTool = new DrawTool(
            this.#drawLayer,
            this.#previewLayer,
            this.#self,
            this.#handleUpdateShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.LINE: {
          const fieldsToDisable = [
            SVGParamFieldID.FILL_COLOR,
            SVGParamFieldID.FILL_OPACITY,
          ];
          this.#setAreFieldsEnabled(fieldsToDisable, false);
          this.#selectedTool = new LineTool(
            this.#drawLayer,
            this.#previewLayer,
            this.#self,
            this.#handleUpdateShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.RECT: {
          this.#selectedTool = new RectangleTool(
            this.#drawLayer,
            this.#previewLayer,
            this.#self,
            this.#handleUpdateShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.ELLIPSE: {
          this.#selectedTool = new EllipseTool(
            this.#drawLayer,
            this.#previewLayer,
            this.#self,
            this.#handleUpdateShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.SELECT: {
          this.#selectedTool = new SelectTool(
            this.#drawLayer,
            this.#previewLayer,
            this.#self,
            this.#onHandleSelectShape,
            this.#shapes,
            this.#offset
          );
          break;
        }
        case Tools_List.TEXT: {
          this.#selectedTool = new TextTool(
            this.#drawLayer,
            this.#previewLayer,
            this.#self,
            this.#handleUpdateShapes,
            this.#currentParams
          );
          break;
        }
        case Tools_List.MOVE: {
          if (this.#selectedShape) {
            this.#selectedTool = new MoveTool(
              this.#drawLayer,
              this.#previewLayer,
              this.#self,
              this.#onMoveShape,
              this.#offset,
              this.#selectedShape
            );
          } else {
            return;
          }
          break;
        }
        case Tools_List.DELETE: {
          this.onDeleteSelectedShape();
          this.onUnselectTool();
          this.#selectedTool = null;
          break;
        }
        case null: {
          if (this.#selectedTool?.toolName) {
            setIsButtonActive(this.#self, this.#selectedTool.toolName, false);
          }
          this.onUnselectTool();
          this.#selectedTool = null;
        }
      }
      if (tool) {
        setIsButtonActive(this.#self, tool, true);
      }
      if (!isMoveTool(this.#selectedTool)) {
        this.#selectedShape = null;
        this.applyStyles();
      }
      this.#self.shadowRoot?.getElementById('');
      this.#selectedTool?.executeAction();
    }
  };

  applyStyles = () => {
    if (this.#selectedShape && this.#drawLayer) {
      this.redrawShapes();
      this.#connection?.updateShapes(this.#shapes);
    }
  };

  setShapeParam = (field: keyof SVGParamsBase, value: any) => {
    this.#currentParams[field] = value;
    this.#selectedShape?.updateSVGParam(field, value);
    const changedIndex = this.#shapes.findIndex(
      shape => this.#selectedShape?.getId() === shape.getId()
    );
    if (changedIndex !== undefined && this.#shapes && this.#selectedShape) {
      this.#shapes[changedIndex] = this.#selectedShape;
    }
    this.applyStyles();
  };

  setShapeParams = (
    fieldsUpdated: boolean = false,
    strokeWidth?: string,
    stroke: string = 'rgba(0,0,0,1)',
    fill: string = 'rgba(0,0,0,0)',
    lineCap: CanvasLineCap = 'butt',
    lineDash: number[] = [],
    fontFamily: string = 'Arial',
    fontSize: number = 12,
    text?: string
  ) => {
    if (fieldsUpdated && this.#isShapeOnlyBeingSelected) {
      return;
    }
    this.#currentParams = {
      fill,
      stroke,
      strokeWidth,
      lineCap,
      lineDash,
      fontFamily,
      fontSize,
      text,
    };
    this.#selectedTool?.setSVGParams(this.#currentParams);
  };

  setConnection = (newConnection: Connection) => {
    this.#connection = newConnection;
  };

  onUnselectTool = () => {
    if (this.#selectedShape) {
      this.#connection?.unlockShapes(this.#selectedShape);
    }
    setIsButtonDisabled(this.#self, Tools_List.MOVE, true);
    this.#selectedShape = null;
    this.#selectedTool?.destroy();
    this.#setAreFieldsEnabled(Object.values(SVGParamFieldID), false);
    setTextParamsSourceVisibility(this.#self, false);
    this.resetPreview();
    this.redrawShapes();
  };
}
