import { SVGEditor } from '../../../components/organisms/SVGEditor';
import type { ShapeType } from '../../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { highlightStyle, Tools_List } from '../../helper/constants';
import {
  isPointInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../../helper/coordinates';
import { isText } from '../../helper/typeguards';
import { Pen } from '../../Pen';
import { Rectangle } from '../../shapes/Rectangle/Rectangle';
import { setTextParamsSourceVisibility } from '../TextTool/TextTool.util';
import { Tool } from '../Tool';

export class MoveTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: SVGEditor,
    onMove: (shape: ShapeType | ShapeType[] | null) => void,
    offset: Coordinates,
    selectedShape: ShapeType
  ) {
    super(drawLayer, self, onMove, offset, previewLayer);
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.currentShape = selectedShape;
    this.#drawOnPreview = Pen.generatePen(this.previewContext).draw;
    this.updatePreview();
    this.toolName = Tools_List.MOVE;
  }
  #dCenter?: Coordinates;
  #drawOnPreview: (shape: ShapeType, svgParams?: SVGParamsBase) => void;

  #onDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);
    const currentShapeCenter = this.currentShape?.getCenter() ?? [0, 0];
    this.#dCenter = [
      this.currentCoordinates[0] - currentShapeCenter[0],
      this.currentCoordinates[1] - currentShapeCenter[1],
    ];
    if (
      !this.currentShape ||
      !isPointInsideAnotherShape(this.currentCoordinates)(this.currentShape)
    ) {
      this.isDrawing = false;
      return;
    }
    this.isDrawing = true;
  };

  updatePreview = () => {
    if (this.currentShape) {
      this.resetPreview();
      const { startingCorner, width, height } = rectangleParamsFromBoundaries(
        this.currentShape.boundaries
      );

      if (isText(this.currentShape)) {
        setTextParamsSourceVisibility(this.self, true);
        this.#drawOnPreview(this.currentShape, {
          ...this.currentShape.getSvgParams(),
          ...highlightStyle,
          lineDash: [0],
        });
      } else {
        this.#drawOnPreview(this.currentShape, highlightStyle);
        this.#drawOnPreview(
          new Rectangle(startingCorner, width, height, highlightStyle)
        );
      }
    } else {
      this.resetPreview();
    }
  };
  #onMove = (event: MouseEvent) => {
    if (!this.isDrawing) return;
    this.previousCoordinates = this.currentCoordinates;
    this.currentCoordinates = this.getCoords(event);

    this.currentShape?.moveTo([
      this.currentCoordinates[0] - (this.#dCenter?.[0] ?? 0),
      this.currentCoordinates[1] - (this.#dCenter?.[1] ?? 0),
    ]);
    this.updatePreview();
  };

  #onUp = () => {
    this.isDrawing = false;
    if (this.currentShape) {
      this.onUpdateEditor(this.currentShape);
      this.updatePreview();
    }
  };

  changeStyle = (config: SVGParamsBase) => {
    if (this.currentShape) {
      this.currentShape.updateSVGParams(config);
      this.resetPreview();
      this.updatePreview();
    }
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
  };
}
