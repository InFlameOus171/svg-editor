import { EditorLayout } from '../components/organisms/EditorLayout';
import { ShapeType, Tools_List } from '../types/shapes';
import { Coordinates } from '../types/types';
import { appendAsSVGShapeGeneratorFunction } from './helper/shapes';
import { Pen } from './Pen';
import { Freehand } from './Shapes/Freehand';
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
  #pen: any;
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
    // brauch ich das überhaupt ?
    // if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
    //   source = source.replace(
    //     /^<svg/,
    //     '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
    //   );
    // }
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    this.#openDownloadDialog(url);
  };

  importSVG = (data: Document) => {
    console.log('called', data);
    if (this.#canvas) {
      const importTool = new ImportTool(this.#canvas, this.#self, this.#offset);
      console.log(data);
      importTool.drawSvg(data);
      this.#shapes.push(...importTool.destroy());
    }
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
            this.#offset,
            this.#shapes
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
              this.#offset,
              this.#shapes
            );
          }
          break;
        }
        case Tools_List.TEST: {
          const polylinePoints =
            '327,87 260,136 208,207 224,255 292,288 354,303 358,305 352,327 348,334 310,340 248,351 234,352'
              .split(' ')
              .map((coordinate): [number, number] => {
                const [x, y] = coordinate.split(',');
                return [parseFloat(x), parseFloat(y)];
              });
          const newShape = new Freehand(polylinePoints);
          this.#pen.draw(newShape);
          break;
        }
      }
      this.#selectedTool?.executeAction();
    }
  };

  onUnselectTool = () => {
    const renderingContext = this.#previewLayer?.getContext('2d');
    console.log(this.#shapes);
    this.#self.selectedElement = null;
    if (this.#previewLayer && renderingContext) {
      Pen.clearCanvas(this.#previewLayer, renderingContext);
    }

    this.#unselectTool();
  };
}
