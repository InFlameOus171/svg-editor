import { FooterFields } from '../../../components/molecules/FooterFields';
import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { highlightStyle, Tools_List } from '../../helper/constants';
import {
  getCanvasRectangleValuesFromPoints,
  isPointInsideAnotherShape,
  isShapeInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../../helper/coordinates';
import { isText, typeOfShape } from '../../helper/typeguards';
import { Pen } from '../../Pen';
import { Rectangle } from '../../shapes/Rectangle/Rectangle';
import { setTextParamsSourceVisibility } from '../TextTool/TextTool.util';
import { Tool } from '../Tool';

export class SelectTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorTemplate,
    onSelect: (shape: ShapeType | ShapeType[] | null) => void,
    shapes: ShapeType[],
    offset?: Coordinates,
    footerFields?: FooterFields
  ) {
    super(
      drawLayer,
      self,
      onSelect,
      offset,
      previewLayer,
      undefined,
      undefined,
      footerFields
    );
    this.allShapes = shapes;
    this.previewContext && this.previewContext.setLineDash([10, 10]);
    this.toolName = Tools_List.SELECT;
  }

  updateAllShapes = (shapes: ShapeType[] = []) => {
    this.allShapes = shapes;
  };

  #onClick = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    const pointPositionCompareFunction = isPointInsideAnotherShape(
      this.currentCoordinates
    );
    const selectableShapes: ShapeType[] = this.allShapes.filter(shape => {
      return pointPositionCompareFunction(shape) && !shape.isLocked;
    });
    if (!selectableShapes.length) {
      this.currentShape = undefined;
      this.updatePreview();
      return;
    }

    const selectedShape = selectableShapes?.reduce((acc, shape) =>
      shape.index > acc?.index ? acc : shape
    );
    this.currentShape = selectedShape;
    this.updatePreview();
  };

  #onDown = (event: MouseEvent) => {
    if (event.button !== 0) return;
    this.unHighlightpreview();
    this.currentShape = undefined;
    this.currentCoordinates = this.getCoords(event);
    this.previousCoordinates = this.currentCoordinates;
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
        Pen.draw(
          new Rectangle(startingCorner, width, height, highlightStyle, false),
          undefined,
          this.previewContext
        );
      }
    } else {
      this.resetPreview();
    }
  };
  #onZoneSelection = (selectedZone?: Rectangle) => {
    const compareFunction = isShapeInsideAnotherShape(selectedZone);
    const selectableShapes: ShapeType[] = this.allShapes.filter(shape => {
      return !shape.isLocked;
    });
    const shapesInsideSelectedZone = selectableShapes.filter(compareFunction);
    const highestIndex = Math.max(
      ...shapesInsideSelectedZone.map(shape => shape.index)
    );
    const highestShape = shapesInsideSelectedZone.find(
      shape => shape.index === highestIndex
    );
    const shapeType = highestShape && typeOfShape(highestShape);
    if (shapeType && this.previewContext) {
      this.currentShape = highestShape;
      this.updatePreview();
    } else {
      this.currentShape = undefined;
    }
  };

  #onUp = (event: MouseEvent) => {
    this.resetPreview();
    this.isDrawing = false;
    if (this.currentShape) {
      this.#onZoneSelection(this.currentShape as Rectangle);
    } else {
      this.#onClick(event);
    }
    this.onUpdateEditor(this.currentShape ?? null);
  };

  #onMove = (event: MouseEvent) => {
    if (this.isDrawing && this.previewLayer) {
      this.currentCoordinates = this.getCoords(event);
      const { startingCorner, width, height } =
        getCanvasRectangleValuesFromPoints(
          this.previousCoordinates,
          this.currentCoordinates
        );
      this.currentShape = new Rectangle(
        startingCorner,
        width,
        height,
        highlightStyle,
        false
      );
      if (this.currentShape) {
        this.resetPreview();
        Pen.drawRectangle(this.currentShape as Rectangle, this.previewContext);
      }
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
    this.drawLayer.addEventListener('mousemove', this.#onMove);
    this.drawLayer.addEventListener('mousedown', this.#onDown);
    this.drawLayer.addEventListener('mouseup', this.#onUp);
  };

  destroy = () => {
    this.drawLayer.removeEventListener('mousemove', this.#onMove);
    this.drawLayer.removeEventListener('mousedown', this.#onDown);
    this.drawLayer.removeEventListener('mouseup', this.#onUp);
  };
}
