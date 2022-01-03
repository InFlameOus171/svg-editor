import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { SVGParamsBase, Coordinates } from '../../types/types';
import { textPlaceHolder } from '../helper/constants';
import { setIsTextInputSectionVisible } from '../helper/util';
import { TextShape } from '../Shapes/Text';
import {
  getTextFromSource,
  setTextParamsSourceVisibility,
} from './TextTool.util';
import { Tool } from './Tool';

export class TextTool extends Tool<TextShape> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onCreate: (shape: ShapeType | null) => void,
    currentStyles: SVGParamsBase,
    offset?: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer, currentStyles);
    setTextParamsSourceVisibility(self, true);
  }

  #onClick = (event: MouseEvent) => {
    const position = this.getCoords(event);
    let size;
    if (this.previewContext && this.drawPenConfig?.text) {
      this.previewContext.fillStyle = 'black';
      this.previewContext.strokeStyle = 'black';
      this.previewContext.font = `${this.drawPenConfig.fontSize}px ${this.drawPenConfig.fontFamily}`;
      this.previewContext.fillText(this.drawPenConfig.text, ...position);
      size = this.previewContext.measureText(this.drawPenConfig.text);
      this.resetPreview();
      console.debug(this.drawPenConfig);
      if (this.drawContext) {
        const width = size.width;
        const height = size.fontBoundingBoxAscent + size.fontBoundingBoxDescent;
        const shape = new TextShape(width, height, position, {
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
    setIsTextInputSectionVisible(this.self, false);
    this.drawLayer.removeEventListener('click', this.#onClick);
  };
}
