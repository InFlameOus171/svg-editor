import { SVGEditor } from '../../components/organisms/SVGEditor';
import { ShapeType } from '../../types/shapes';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { Tools_List } from '../helper/constants';
import { Pen } from '../Pen';
import { TextShape } from '../Shapes/Text';
import { setTextParamsSourceVisibility } from './TextTool.util';
import { Tool } from './Tool';

export class TextTool extends Tool<TextShape> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: SVGEditor,
    onCreate: (shape: ShapeType | ShapeType[] | null) => void,
    currentStyles: SVGParamsBase,
    offset?: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer, currentStyles);
    setTextParamsSourceVisibility(self, true);
    this.toolName = Tools_List.TEXT;
  }

  #onClick = (event: MouseEvent) => {
    const position = this.getCoords(event);
    if (this.previewContext && this.drawPenConfig?.text) {
      const size = Pen.measureText(
        this.drawPenConfig.text,
        {
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(0,0,0,0)',
          fontSize: this.drawPenConfig.fontSize,
          fontFamily: this.drawPenConfig.fontFamily,
        },
        undefined,
        this.drawContext
      );
      this.resetPreview();
      if (size) {
        const shape = new TextShape(size.width, size.height, position, {
          fontFamily: this.drawPenConfig.fontFamily,
          fontSize: this.drawPenConfig.fontSize,
          text: this.drawPenConfig.text,
          ...this.drawPenConfig,
        });
        this.onUpdateEditor(shape);
      }
    }
  };

  updateText = (text: string) => {
    this.drawPenConfig.text = text;
  };

  executeAction = () => {
    this.drawLayer.addEventListener('click', this.#onClick);
  };

  destroy = () => {
    setTextParamsSourceVisibility(this.self, false);
    this.drawLayer.removeEventListener('click', this.#onClick);
  };
}
