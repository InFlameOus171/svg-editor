import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Shapes, ShapeType, Tools_List } from '../../types/shapes';
import { Coordinates, PenConfiguration } from '../../types/types';
import {
  getCanvasRectangleValuesFromPoints,
  isPointInsideAnotherShape,
  isShapeInsideAnotherShape,
  rectangleParamsFromBoundaries,
} from '../helper/coordinates';
import { typeOfShape } from '../helper/typeguards';
import { normalizeColorCode } from '../helper/util';
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

    const renderingContext = this.drawLayer.getContext('2d');
    if (renderingContext) {
      this.drawContext = renderingContext;
    }
  }

  #selectedShape?: ShapeType;

  #onClick = (event: MouseEvent) => {
    this.currentCoordinates = this.getCoords(event);
    const pointPositionCompareFunction = isPointInsideAnotherShape(
      this.currentCoordinates
    );
    const selectableShapes: ShapeType[] = this.allShapes.filter(
      pointPositionCompareFunction
    );

    if (!selectableShapes.length) {
      this.#onSelect(null);
      return;
    }

    const selectedShape = selectableShapes?.reduce((acc, shape) =>
      shape.index > acc?.index ? acc : shape
    );
    this.#onSelect(selectedShape);
  };

  #onDown = (event: MouseEvent) => {
    this.unHighlightpreview();
    this.currentShape = undefined;
    this.currentCoordinates = this.getCoords(event);
    this.previousCoordinates = this.currentCoordinates;
    this.isDrawing = true;
  };

  #updateInputFields = () => {
    if (this.#selectedShape) {
      const defaultColor = { colorCode: '#000000', opacity: '1' };
      const params = this.#selectedShape.getSvgParams();

      const strokeColor = params.stroke
        ? normalizeColorCode(params.stroke)
        : defaultColor;
      const fillColor = params.fill
        ? normalizeColorCode(params.fill)
        : defaultColor;

      const footerFields =
        this.self.shadowRoot?.getElementById('footer-fields');

      footerFields?.removeAttribute('disabled');

      footerFields
        ?.querySelector('#stroke-width-input')
        ?.setAttribute('value', params.strokeWidth ?? '0');
      footerFields
        ?.querySelector('#stroke-color-input')
        ?.setAttribute('value', strokeColor.colorCode);

      footerFields
        ?.querySelector('#fill-color-input')
        ?.setAttribute('value', fillColor.colorCode);
      footerFields
        ?.querySelector('#line-dash-input')
        ?.setAttribute('value', params.lineDash?.join(', ') ?? '0');

      const fillOpacityInput = footerFields?.querySelector(
        '#fill-opacity-input'
      );
      const strokeOpacityInput = footerFields?.querySelector(
        '#stroke-opacity-input'
      );

      strokeOpacityInput?.setAttribute('value', strokeColor.opacity);
      strokeOpacityInput?.dispatchEvent(new Event('change'));
      fillOpacityInput?.setAttribute('value', fillColor.opacity);
      fillOpacityInput?.dispatchEvent(new Event('change'));
    }
  };

  #onSelect = (selectedShape: ShapeType | null) => {
    if (selectedShape) {
      this.#selectedShape = selectedShape;
      this.#updateInputFields();
      this.onUpdateEditor(this.#selectedShape);
      if (this.previewContext) {
        this.highlightPreview();
        const shapeType = typeOfShape(selectedShape);
        const { startingCorner, width, height } = rectangleParamsFromBoundaries(
          selectedShape.boundaries
        );
        this.drawTools['Rectangle'](
          new Rectangle(startingCorner, width, height, {
            stroke: 'red',
            strokeWidth: '5',
          }),
          this.previewContext
        );
        this.drawTools[shapeType](selectedShape, this.previewContext);
      }
    } else {
      this.self.shadowRoot
        ?.getElementById('footer-fields')
        ?.setAttribute('disabled', '');
    }
  };

  drawTools: { [key in Shapes]: any } = {
    Rectangle: this.pen.drawRectangle,
    Ellipse: this.pen.drawEllipse,
    Line: this.pen.drawLine,
    Freehand: this.pen.drawFreehand,
    Path: this.pen.drawPath,
  };

  #onZoneSelection = (selectedZone?: Rectangle) => {
    const compareFunction = isShapeInsideAnotherShape(selectedZone);
    const shapesInsideSelectedZone = this.allShapes.filter(compareFunction);
    const highestIndex = Math.max(
      ...shapesInsideSelectedZone.map(shape => shape.index)
    );
    const highestShape = shapesInsideSelectedZone.find(
      shape => shape.index === highestIndex
    );
    const shapeType = highestShape && typeOfShape(highestShape);
    if (shapeType && this.previewContext) {
      this.#onSelect(highestShape);
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
        undefined,
        false
      );
      if (this.currentShape) {
        this.resetPreview();
        this.pen.drawRectangle(this.currentShape, this.previewContext);
      }
    }
  };

  changeStyle = (config: PenConfiguration) => {
    if (this.#selectedShape) {
      this.#selectedShape.applyStyles(config);
      this.resetPreview();
      this.pen.draw(this.#selectedShape, undefined, this.previewContext);
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
    return this.#selectedShape;
  };
}
