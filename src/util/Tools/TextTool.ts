import { EditorLayout } from '../../components/organisms/EditorLayout';
import { ShapeType } from '../../types/shapes';
import { SVGParamsBase, Coordinates } from '../../types/types';
import { setIsTextInputSectionVisible } from '../helper/util';
import { TextShape } from '../Shapes/Text';
import { Tool } from './Tool';

export class TextTool extends Tool<TextShape> {
  #textSource?: HTMLElement | null;
  #text: string;
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorLayout,
    onCreate: (shape: ShapeType | null) => void,
    currentStyles: SVGParamsBase,
    offset?: Coordinates
  ) {
    super(drawLayer, self, onCreate, offset, previewLayer, currentStyles);
    this.#textSource = self.shadowRoot?.getElementById('right-input-section');
    this.#text = 'Input text...';
    if (this.#textSource) {
      this.#textSource.style.visibility = 'visible';
      this.#textSource.removeAttribute('disabled');
      this.#text =
        this.#textSource.querySelector('#text-input')?.getAttribute('value') ??
        this.#text;
      this.#textSource
        .querySelector('#text-input')
        ?.setAttribute('value', this.#text);
    }
  }

  #onClick = (event: MouseEvent) => {
    const position = this.getCoords(event);
    let size;
    if (this.previewContext) {
      this.previewContext.fillStyle = 'black';
      this.previewContext.font = '30px Arial';
      this.previewContext.fillText(this.#text, ...position);
      size = this.previewContext.measureText(this.#text);
      this.resetPreview();
      if (this.drawContext) {
        const width = size.width;
        const height = size.fontBoundingBoxAscent + size.fontBoundingBoxDescent;
        const shape = new TextShape(this.#text, width, height, position, {
          fontFamily: 'Arial',
          fontSize: 12,
          ...this.drawPenConfig,
        });
        this.onUpdateEditor(shape);
      }
    }
  };

  updateText = () => {
    this.#text =
      this.#textSource?.querySelector('#text-input')?.getAttribute('value') ??
      this.#text;
  };

  executeAction = () => {
    this.drawLayer.addEventListener('click', this.#onClick);
  };

  destroy = () => {
    setIsTextInputSectionVisible(this.self, false);
    this.drawLayer.removeEventListener('click', this.#onClick);
  };
}
