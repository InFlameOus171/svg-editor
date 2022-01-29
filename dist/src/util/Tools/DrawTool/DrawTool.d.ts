import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/typeGuards.types';
import type { Coordinates, SVGParamsBase } from '../../../types/types';
import { Freehand } from '../../shapes/Freehand/Freehand';
import { Line } from '../../shapes/Line/Line';
import { Tool } from '../Tool';
export declare class DrawTool extends Tool<Freehand, Line> {
    #private;
    timesPerSecond: number;
    currentShapeComponents: Coordinates[];
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: EditorTemplate, onCreate: (shape: ShapeType | ShapeType[] | null) => void, currentStyles: SVGParamsBase, offset: Coordinates);
    executeAction: () => void;
    destroy: () => void;
}
