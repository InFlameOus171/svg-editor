import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { ShapeType } from '../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../types/types';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';
export declare class LineTool extends Tool<Line> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onCreate: (shape: ShapeType | ShapeType[] | null) => void, drawPenConfig?: SVGParamsBase, offset?: Coordinates);
    executeAction: () => void;
    destroy: () => void;
}
