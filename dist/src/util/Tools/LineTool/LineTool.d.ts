import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Line } from '../../shapes/Line/Line';
import { Tool } from '../Tool';
export declare class LineTool extends Tool<Line> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: EditorTemplate, onCreate: (shape: ShapeType | ShapeType[] | null) => void, drawPenConfig?: SVGParamsBase, offset?: Coordinates);
    executeAction: () => void;
    destroy: () => void;
}
