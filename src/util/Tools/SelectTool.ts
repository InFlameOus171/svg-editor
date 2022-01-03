import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shapes, ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { highlightStyle } from '../helper/constants';
import {
  getCanvasRectangleValuesFromPoints,
  isPointInsideAnotherShape,
  isShapeInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../helper/coordinates';
import { isText, typeOfShape } from '../helper/typeguards';
import { setIsTextInputSectionVisible } from '../helper/util';
import { Pen } from '../Pen';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';

export class SelectTool extends Tool<ShapeType> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onSelect: (shape: ShapeType | null) => void,
    shapes: ShapeType[],
    offset?: Coordinates
  ) {
    super(drawLayer, self, onSelect, offset, previewLayer);

    this.toolName = Tools_List.SELECT;
    this.allShapes = shapes;
    this.previewContext && this.previewContext.setLineDash([10, 10]);
    this.#drawOnPreview = Pen.generatePen(this.previewContext).draw;
  }
  #drawOnPreview: (shape: ShapeType, svgParams?: SVGParamsBase) => void;

  #onClick = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    const pointPositionCompareFunction = isPointInsideAnotherShape(
      this.currentCoordinates
    );
    const selectableShapes: ShapeType[] = this.allShapes.filter(
      pointPositionCompareFunction
    );

    if (!selectableShapes.length) {
      this.currentShape = undefined;
      this.#updatePreview();
      return;
    }

    const selectedShape = selectableShapes?.reduce((acc, shape) =>
      shape.index > acc?.index ? acc : shape
    );
    this.currentShape = selectedShape;
    this.#updatePreview();
  };

  #onDown = (event: MouseEvent) => {
    this.unHighlightpreview();
    this.currentShape = undefined;
    this.currentCoordinates = this.getCoords(event);
    this.previousCoordinates = this.currentCoordinates;
    this.isDrawing = true;
  };

  #updatePreview = () => {
    if (this.currentShape) {
      console.debug('CURRENT SHAPE', this.currentShape);
      this.resetPreview();
      const { startingCorner, width, height } = rectangleParamsFromBoundaries(
        this.currentShape.boundaries
      );
      // this.#drawOnPreview(this.currentShape);
      // this.#drawOnPreview(
      //   new Rectangle(startingCorner, width, height, highlightStyle)
      // );
      if (isText(this.currentShape)) {
        setIsTextInputSectionVisible(this.self, true);
        console.debug('IS TEXT', {
          ...this.currentShape.getSvgParams(),
          ...highlightStyle,
          lineDash: [0],
        });
        this.#drawOnPreview(this.currentShape, {
          ...this.currentShape.getSvgParams(),
          ...highlightStyle,
          lineDash: [0],
        });
      } else {
        console.debug('IS NOT TEXT');

        this.#drawOnPreview(this.currentShape, highlightStyle);
      }
    } else {
      this.resetPreview();
    }
  };

  #onZoneSelection = (selectedZone?: Rectangle) => {
    const compareFunction = isShapeInsideAnotherShape(selectedZone);
    console.log(this.allShapes);
    const shapesInsideSelectedZone = this.allShapes.filter(compareFunction);
    const highestIndex = Math.max(
      ...shapesInsideSelectedZone.map(shape => shape.index)
    );
    const highestShape = shapesInsideSelectedZone.find(
      shape => shape.index === highestIndex
    );
    console.log(highestShape);
    const shapeType = highestShape && typeOfShape(highestShape);
    if (shapeType && this.previewContext) {
      this.currentShape = highestShape;
      this.#updatePreview();
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
    this.currentShape = undefined;
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
      Pen.draw(this.currentShape, undefined, this.previewContext);
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
