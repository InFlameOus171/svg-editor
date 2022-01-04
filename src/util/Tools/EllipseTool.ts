import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { highlightStyle, Tools_List } from '../helper/constants';
import { Pen } from '../Pen';
import { Ellipse } from '../Shapes/Ellipse';
import { generateCircle, generateEllipse } from './EllipseTool.util';
import { Tool } from './Tool';

export class EllipseTool extends Tool<Ellipse> {
  isCircle: boolean = false;

  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onCreate: (shape: ShapeType | ShapeType[] | null) => void,
    drawPenConfig: SVGParamsBase,
    offset: Coordinates
  ) {
    super(
      drawLayer,
      self,
      onCreate,
      offset,
      previewLayer,
      drawPenConfig,
      highlightStyle
    );
    this.resetPreview();
    this.toolName = Tools_List.ELLIPSE;
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
  }

  #draw = () => {
    this.currentShape &&
      Pen.drawEllipse(this.currentShape, this.drawContext, this.drawPenConfig);
    this.resetPreview();
  };

  #onKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      this.isCircle = true;
    }
  };

  #onKeyUp = () => {
    this.isCircle = false;
  };

  #onDown = (event: MouseEvent) => {
    this.previousCoordinates = this.getCoords(event);
    this.isDrawing = true;
  };

  #onUp = (event: MouseEvent) => {
    this.isDrawing = false;
    this.currentCoordinates = this.getCoords(event);
    if (this.isCircle) {
      this.currentShape = generateCircle(
        this.previousCoordinates,
        this.currentCoordinates,
        this.drawPenConfig
      );
    } else {
      this.currentShape = generateEllipse(
        this.previousCoordinates,
        this.currentCoordinates,
        this.drawPenConfig
      );
    }
    this.onUpdateEditor(this.currentShape);
    this.#draw();
  };

  #onMove = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    this.resetPreview();

    if (this.isDrawing && this.previewLayer) {
      if (this.isCircle) {
        const previewShape = generateCircle(
          this.previousCoordinates,
          this.currentCoordinates,
          this.previewPenConfig,
          false
        );
        this.currentShape = previewShape;
        Pen.drawEllipse(previewShape, this.previewContext);
      } else {
        const previewShape = generateEllipse(
          this.previousCoordinates,
          this.currentCoordinates,
          this.previewPenConfig,
          false
        );
        this.currentShape = previewShape;
        Pen.drawEllipse(previewShape, this.previewContext);
      }
    }
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
    window.addEventListener('keydown', this.#onKeyDown);
    window.addEventListener('keyup', this.#onKeyUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
    window.removeEventListener('keydown', this.#onKeyDown);
    window.removeEventListener('keyup', this.#onKeyUp);
  };
}
