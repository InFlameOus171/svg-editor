import { SVGEditor } from '../../../components/organisms/SVGEditor';
import type { ShapeType } from '../../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { TextShape } from '../../shapes/Text/Text';
import { Tool } from '../Tool';
export declare class TextTool extends Tool<TextShape> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onCreate: (shape: ShapeType | ShapeType[] | null) => void, currentStyles: SVGParamsBase, offset?: Coordinates);
    updateText: (text: string) => void;
    executeAction: () => void;
    destroy: () => void;
}
