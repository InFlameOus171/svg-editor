import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { textPlaceHolder, Tools_List } from '../../helper/constants';
import { measureText } from '../../helper/shapes';
import { TextShape } from '../../shapes/Text/Text';
import { setTextParamsSourceVisibility } from './TextTool.util';
import { Tool } from '../Tool';
import { FooterFields } from '../../../components/molecules/FooterFields';

export class TextTool extends Tool<TextShape> {
  constructor(
    drawLayer: HTMLCanvasElement,
    previewLayer: HTMLCanvasElement,
    self: EditorTemplate,
    onCreate: (shape: ShapeType | ShapeType[] | null) => void,
    currentStyles: SVGParamsBase,
    offset?: Coordinates,
    footerFields?: FooterFields
  ) {
    super(
      drawLayer,
      self,
      onCreate,
      offset,
      previewLayer,
      currentStyles,
      undefined,
      footerFields
    );
    setTextParamsSourceVisibility(footerFields, true);
    if (!this.drawPenConfig.text) {
      this.drawPenConfig.text = textPlaceHolder;
    }
    this.toolName = Tools_List.TEXT;
  }

  #onClick = (event: MouseEvent) => {
    if (event.button !== 0) return;
    const position = this.getCoords(event);
    if (this.previewContext && this.drawPenConfig?.text) {
      const size = measureText(
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
    setTextParamsSourceVisibility(this.footerFields, false);
    this.drawLayer.removeEventListener('click', this.#onClick);
  };
}
