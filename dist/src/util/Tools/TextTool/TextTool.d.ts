import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { TextShape } from '../../shapes/Text/Text';
import { Tool } from '../Tool';
import { FooterFields } from '../../../components/molecules/FooterFields';
export declare class TextTool extends Tool<TextShape> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: EditorTemplate, onCreate: (shape: ShapeType | ShapeType[] | null) => void, currentStyles: SVGParamsBase, offset?: Coordinates, footerFields?: FooterFields);
    updateText: (text: string) => void;
    executeAction: () => void;
    destroy: () => void;
}
