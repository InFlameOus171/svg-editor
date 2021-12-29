import { EditorLayout } from '../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../types/shapes';
import { Coordinates, PenConfiguration, SVGParamsBase } from '../types/types';
import { appendAsSVGShapeGeneratorFunction } from './helper/shapes';
import { isPath, typeOfShape } from './helper/typeguards';
import { hexToRGBA, normalizeColorCode } from './helper/util';
import { Pen } from './Pen';
import { Freehand } from './Shapes/Freehand';
import { Path } from './Shapes/Path';
import { DrawTool } from './Tools/DrawTool';
import { EllipseTool } from './Tools/EllipseTool';
import { ImportTool } from './Tools/ImportTool';
import { LineTool } from './Tools/LineTool';
import { MoveTool } from './Tools/MoveTool';
import { RectangleTool } from './Tools/RectangleTool';
import { SelectTool } from './Tools/SelectTool';
import { Tool } from './Tools/Tool';

export class Editor {
  #selectedTool: Tool<ShapeType> | null = null;
  #canvas: HTMLCanvasElement | null = null;
  #previewLayer: HTMLCanvasElement | null = null;
  #self: EditorLayout;
  #offset: Coordinates;
  #shapes: ShapeType[] = [];
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

  #unselectTool = () => {
    if (!this.#selectedTool) {
      return;
    }

    switch (this.#selectedTool.toolName) {
      case Tools_List.SELECT: {
        const result = this.#selectedTool?.destroy();
        if (!Array.isArray(result)) {
          this.#selectedShape = result;
        }
        break;
      }
      case Tools_List.MOVE: {
        const result = this.#selectedTool?.destroy();
        if (Array.isArray(result)) {
          this.#shapes = result;
        }
        this.#selectedShape = null;
        break;
      }
      default: {
        const result = this.#selectedTool?.destroy();
        if (Array.isArray(result)) {
          this.#shapes.push(...result);
          this.#selectedShape = null;
        }
        break;
      }
    }
    this.#selectedTool = null;
  };

  onSave = () => {
    this.onUnselectTool();
    const xmlSerializer = new XMLSerializer();
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    // const g = document.createElementNS(svgNS, 'g');

    svg.setAttribute('height', this.#canvas?.height.toString() ?? '500');
    svg.setAttribute('width', this.#canvas?.width.toString() ?? '500');
    // svg.appendChild(g);

    const appendAsSVGShape = appendAsSVGShapeGeneratorFunction(svg, svgNS);
    this.#shapes.forEach(appendAsSVGShape);

    let source = xmlSerializer.serializeToString(svg);
    //add name spaces.
    //https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    this.#openDownloadDialog(url);
  };

  importSVG = (data: Document) => {
    if (this.#canvas) {
      const importTool = new ImportTool(this.#canvas, this.#self, this.#offset);
      importTool.drawSvg(data);
      this.#shapes.push(...importTool.destroy());
    }
  };

  #onHandleSelectShape = (selectedShape: ShapeType | null) => {
    this.#selectedShape = selectedShape;
  };

  onSelectTool = (tool: Tools_List) => {
    if (this.#selectedTool) this.#unselectTool();
    if (this.#canvas && this.#previewLayer) {
      switch (tool) {
        case Tools_List.DRAW: {
          this.#self.selectedElement = null;
          this.#selectedTool = new DrawTool(
            this.#canvas,
            this.#self,
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
        case Tools_List.MOVE: {
          if (this.#selectedShape) {
            this.#selectedTool = new MoveTool(
              this.#canvas,
              this.#previewLayer,
              this.#self,
              this.#offset,
              this.#shapes,
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
        case Tools_List.TEST: {
          const path = new Path2D(
            'm366,86c-6,-3 -18.97324,-5.49968 -33,-6c-9.99365,-0.35646 -15.67285,1.28027 -20,6c-7.30972,7.97295 -11.16595,21.98733 -12,34c-1.24869,17.98447 -1.43643,38.27258 4,63c7.13782,32.46616 16.43185,58.74576 20,83c3.36023,22.84094 3.88696,40.26443 1,54c-3.05777,14.54819 -8.57492,28.164 -13,39c-4.56812,11.18625 -8.59692,16.99982 -15,19c-13.49887,4.21674 -32.33762,3.58691 -50,-1c-14.38876,-3.73676 -24,-9 -27,-9l-1,-1'
          );
          const ctx = this.#canvas.getContext('2d');
          ctx?.stroke(path);
          break;
        }
      }
      this.#selectedTool?.executeAction();
    }
  };

  applyStyles = (
    strokeWidth?: string,
    stroke: string = '#000000',
    fill: string = '#000000',
    fillOpacity?: string,
    strokeOpacity?: string,
    lineCap: CanvasLineCap = 'butt',
    rotation?: string,
    scaling?: [string, string]
  ) => {
    if (this.#selectedShape && this.#canvas) {
      console.log(scaling);
      const parsedScaling = scaling
        ? {
            x: parseFloat(scaling[0]),
            y: parseFloat(scaling[1]),
          }
        : undefined;
      const parsedRotation = rotation ? parseFloat(rotation) : undefined;
      const strokeWidthAsFloat = strokeWidth
        ? parseFloat(strokeWidth)
        : undefined;
      const normalizedFill = hexToRGBA(fill, fillOpacity);
      const normalizedStroke = hexToRGBA(stroke, strokeOpacity);
      this.#selectedShape?.applyStyles({
        fill: normalizedFill,
        stroke: normalizedStroke,
        strokeWidth: strokeWidthAsFloat,
        lineCap,
        rotation: parsedRotation,
        scaling: parsedScaling,
      });

      const changedShapeIndex = this.#shapes.findIndex(
        shape => shape.getId() === this.#selectedShape?.getId()
      );
      this.#shapes[changedShapeIndex] = this.#selectedShape;
      Pen.clearCanvas(this.#canvas);
      this.#shapes.forEach(shape => {
        this.#pen?.draw(shape);
        this.#previewPen?.draw(shape, {
          stroke: 'red',
          strokeWidth: '2',
          fill: 'rgba(0,0,0,0)',
        });
      });
    }
  };

  onUnselectTool = () => {
    const renderingContext = this.#previewLayer?.getContext('2d');
    this.#shapes.forEach(shape => {});
    this.#self.selectedElement = null;
    if (this.#previewLayer && renderingContext) {
      Pen.clearCanvas(this.#previewLayer, renderingContext);
    }

    this.#unselectTool();
  };
}
