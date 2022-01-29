import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Rectangle } from '../../shapes/Rectangle/Rectangle';
import { Tool } from '../Tool';
export declare class RectangleTool extends Tool<Rectangle> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: EditorTemplate, onCreate: (shape: ShapeType | ShapeType[] | null) => void, styles: SVGParamsBase, offset: Coordinates);
    onDown: (event: MouseEvent) => void;
    onUp: () => void;
    createRectangle: () => void;
    createRectanglePreview: () => void;
    onMove: (event: MouseEvent) => void;
    executeAction: () => void;
    destroy: () => void;
}
