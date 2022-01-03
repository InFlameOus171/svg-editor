import { EditorLayout } from '../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../types/shapes';
import { Coordinates, SVGParamsBase } from '../types/types';
import { textPlaceHolder } from './helper/constants';
import { getMinMaxValuesOfCoordinates } from './helper/coordinates';
import {
  appendAsSVGShapeGeneratorFunction,
  generateSVGURLFromShapes,
} from './helper/shapes';
import { isText, isTextTool } from './helper/typeguards';
import {
  hexToRGBA,
  setIsTextInputSectionVisible,
  updateStyleInputFields,
} from './helper/util';
import { Pen } from './Pen';
import { TextShape } from './Shapes/Text';
import { DrawTool } from './Tools/DrawTool';
import { EllipseTool } from './Tools/EllipseTool';
import { ImportTool } from './Tools/ImportTool';
import { LineTool } from './Tools/LineTool';
import { MoveTool } from './Tools/MoveTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';
import { TextTool } from './Tools/TextTool';
import { getTextFromSource } from './Tools/TextTool.util';
import { Tool } from './Tools/Tool';

export class Editor {
  #selectedTool: Tool<ShapeType> | null = null;
  #canvas: HTMLCanvasElement | null = null;
  #previewLayer: HTMLCanvasElement | null = null;
  #self: EditorLayout;
  #offset: Coordinates;
  #shapes: ShapeType[] = [];
  #currentParams: SVGParamsBase = {
    strokeWidth: '1',
    stroke: 'rgba(0,0,0,1)',
    fill: 'rgba(0,0,0,0)',
    lineCap: 'butt',
    lineDash: [0],
    text: textPlaceHolder,
  };
  #selectedShape?: ShapeType | null = null;
  #pen?: {
    draw: (shape: ShapeType, svgParams?: Partial<SVGParamsBase>) => void;
  };
  #previewPen?: {
    draw: (shape: ShapeType, svgParams?: Partial<SVGParamsBase>) => void;
  };
  constructor(
    canvas: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    offset: Coordinates,
    self: EditorLayout
  ) {
    this.#canvas = canvas;
    this.#previewLayer = previewLayer;
    this.#self = self;
    this.#offset = offset;
    this.#currentParams = {
      strokeWidth: '1',
      stroke: 'rgba(0,0,0,1)',
      fill: 'rgba(0,0,0,0)',
    };
    updateStyleInputFields(this.#self, this.#currentParams);
    const context = canvas.getContext('2d');
    if (context) {
      this.#pen = Pen.generatePen(context);
    }
    const previewContext = previewLayer.getContext('2d');
    if (previewContext) {
      this.#previewPen = Pen.generatePen(previewContext);
    }
  }

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
    const mainContext = this.#canvas?.getContext('2d');
    if (mainContext && this.#canvas) {
      Pen.clearCanvas(this.#canvas, mainContext);
      this.#shapes.forEach(shape => {
        if (isText(shape)) {
          console.log(shape.toSVGTextParams());
        }
        Pen.draw(shape, undefined, mainContext);
      });
    }
  };

  onUpdateStyleInputFields = () => {
    updateStyleInputFields(this.#self, this.#currentParams);
  };

  onSave = () => {
    this.onUnselectTool();
    this.#openDownloadDialog(generateSVGURLFromShapes(this.#shapes));
  };

  #appendToShapes = (shape: ShapeType | null) => {
    if (shape === null) {
      this.onUnselectTool();
      return;
    }
    const index = this.#shapes.findIndex(
      innerShape => innerShape.getId() === shape.getId()
    );
    if (index >= 0) {
      this.#shapes[index] = shape;
    } else {
      this.#shapes.push(shape);
    }
    console.log(shape.getSvgParams());
    this.#currentParams = shape.getSvgParams();
    this.onUpdateStyleInputFields();
    this.redrawShapes();
  };

  #onMove = (shape: ShapeType | null) => {
    if (shape === null) {
      this.onUnselectTool();
      return;
    }
    const index = this.#shapes.findIndex(
      innerShape => innerShape.getId() === shape.getId()
    );
    if (index >= 0) {
      this.#shapes[index] = shape;
    } else {
      this.#shapes.push(shape);
    }
    this.redrawShapes();
  };

  importSVG = (data: Document) => {
    if (this.#canvas) {
      const importTool = new ImportTool(
        this.#canvas,
        this.#self,
        this.#appendToShapes,
        this.#offset
      );
      importTool.drawSvg(data);
      this.#shapes.push(...importTool.destroy());
    }
  };

  #onHandleSelectShape = (selectedShape: ShapeType | null) => {
    this.#selectedShape = selectedShape;
    if (this.#selectedShape) {
      this.#currentParams = this.#selectedShape.getSvgParams();
      this.onUpdateStyleInputFields();
      this.applyStyles();

      if (isText(this.#selectedShape)) {
        setIsTextInputSectionVisible(this.#self, true);
      }
    }
  };

  onDeleteSelectedShape = () => {
    if (this.#selectedShape) {
      const index = this.#shapes.findIndex(
        shape => shape.getId() === this.#selectedShape?.getId()
      );
      this.#shapes.splice(index, 1);
      this.#selectedShape = null;
    }
  };

  onSelectTool = (tool: Tools_List) => {
    if (this.#selectedTool) this.#selectedTool?.destroy();
    if (this.#canvas && this.#previewLayer) {
      this.onUpdateStyleInputFields();
      switch (tool) {
        case Tools_List.DRAW: {
          this.#self.selectedElement = null;
          this.#selectedTool = new DrawTool(
            this.#canvas,
            this.#self,
            this.#appendToShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.LINE: {
          this.#self.selectedElement = null;
          this.#selectedTool = new LineTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#appendToShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.RECT: {
          this.#self.selectedElement = null;
          this.#selectedTool = new RectangleTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#appendToShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.ELLIPSE: {
          this.#self.selectedElement = null;
          this.#selectedTool = new EllipseTool(
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#appendToShapes,
            this.#currentParams,
            this.#offset
          );
          break;
        }
        case Tools_List.SELECT: {
          this.#selectedTool = new SelectTool(
            this.#canvas,
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
            this.#canvas,
            this.#previewLayer,
            this.#self,
            this.#appendToShapes,
            this.#currentParams
          );
          break;
        }
        case Tools_List.MOVE: {
          if (this.#selectedShape) {
            this.#selectedTool = new MoveTool(
              this.#canvas,
              this.#previewLayer,
              this.#self,
              this.#onMove,
              this.#offset,
              this.#selectedShape
            );
          } else {
            this.#selectedTool = new SelectTool(
              this.#canvas,
              this.#previewLayer,
              this.#self,
              (selectedShape: ShapeType | null) => {
                this.#selectedShape = selectedShape;
              },
              this.#shapes,
              this.#offset
            );
          }
          break;
        }
        case Tools_List.DELETE: {
          this.onDeleteSelectedShape();
          this.onUnselectTool();
          this.#selectedTool = null;
          break;
        }
      }
      this.applyStyles();
      this.#self.shadowRoot?.getElementById('');
      this.#selectedTool?.executeAction();
    }
  };

  setShapeParams = (
    strokeWidth?: string,
    stroke: string = '#000000',
    fill: string = '#000000',
    fillOpacity?: string,
    strokeOpacity?: string,
    lineCap: CanvasLineCap = 'butt',
    lineDash: number[] = [],
    fontFamily: string = 'Arial',
    fontSize: number = 12,
    text?: string
    // @TODO: Optional -> To be implemented
    // rotation?: string,
    // scaling?: [string, string]
  ) => {
    // @TODO: Optional -> To be implemented
    // const parsedScaling = scaling
    //   ? {
    //       x: parseFloat(scaling[0]),
    //       y: parseFloat(scaling[1]),
    //     }
    //   : undefined;
    // const parsedRotation = rotation ? parseFloat(rotation) : undefined;
    const normalizedFill = hexToRGBA(fill, fillOpacity);
    const normalizedStroke = hexToRGBA(stroke, strokeOpacity);
    this.#currentParams = {
      fill: normalizedFill,
      stroke: normalizedStroke,
      strokeWidth,
      lineCap,
      lineDash,
      fontFamily,
      fontSize,
      text,
      // rotation: parsedRotation,
      // scaling: parsedScaling,
    };
    this.#selectedTool?.setSVGParams(this.#currentParams);
  };

  applyStyles = () => {
    if (this.#selectedShape && this.#canvas) {
      this.#selectedShape?.updateSVGParams(this.#currentParams);
      const changedShapeIndex = this.#shapes.findIndex(
        shape => shape.getId() === this.#selectedShape?.getId()
      );
      this.#shapes[changedShapeIndex] = this.#selectedShape;
      Pen.clearCanvas(this.#canvas);
      this.#shapes.forEach(shape => {
        this.#pen?.draw(shape);
        // this.#previewPen?.draw(shape, {
        //   stroke: 'red',
        //   strokeWidth: '2',
        //   fill: 'rgba(0,0,0,0)',
        // });
      });
    }
  };

  onUnselectTool = () => {
    this.#self.selectedElement = null;
    this.#selectedTool?.destroy();
    this.resetPreview();
    this.redrawShapes();
  };
}
