import { FooterFields } from '../../../components/molecules/FooterFields';
import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
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
    self: EditorTemplate,
    onMove: (shape: ShapeType | ShapeType[] | null) => void,
    offset: Coordinates,
    selectedShape: ShapeType,
    footerFields: FooterFields
  ) {
    super(
      drawLayer,
      self,
      onMove,
      offset,
      previewLayer,
      undefined,
      undefined,
      footerFields
    );
    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
    this.currentShape = selectedShape;
    this.updatePreview();
    this.toolName = Tools_List.MOVE;
  }
  #dCenter?: Coordinates;

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
    if (this.currentShape && this.previewContext) {
      this.resetPreview();
      const { startingCorner, width, height } = rectangleParamsFromBoundaries(
        this.currentShape.boundaries
      );

      if (isText(this.currentShape)) {
        setTextParamsSourceVisibility(this.footerFields, true);
        Pen.draw(
          this.currentShape,
          {
            ...this.currentShape.getSvgParams(),
            ...highlightStyle,
            lineDash: [0],
          },
          this.previewContext
        );
      } else {
        Pen.draw(this.currentShape, highlightStyle, this.previewContext);
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
  #onOut = () => {
    this.isDrawing = false;
  };

  executeAction = () => {
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mouseout', this.#onOut);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mouseout', this.#onOut);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
  };
}
