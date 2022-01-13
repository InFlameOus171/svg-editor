import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { ShapeType } from '../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../types/types';
import { Freehand } from '../Shapes/Freehand';
import { Line } from '../Shapes/Line';
import { Tool } from './Tool';
export declare class DrawTool extends Tool<Freehand, Line> {
    #private;
    timesPerSecond: number;
    currentShapeComponents: Coordinates[];
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onCreate: (shape: ShapeType | ShapeType[] | null) => void, currentStyles: SVGParamsBase, offset: Coordinates);
    executeAction: () => void;
    destroy: () => void;
}
