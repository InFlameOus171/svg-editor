import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { ShapeType } from '../../types/shapes.types';
import { Coordinates, SVGParamsBase } from '../../types/types';
import { Ellipse } from '../Shapes/Ellipse';
import { Tool } from './Tool';
export declare class EllipseTool extends Tool<Ellipse> {
    #private;
    isCircle: boolean;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onCreate: (shape: ShapeType | ShapeType[] | null) => void, drawPenConfig: SVGParamsBase, offset: Coordinates);
    executeAction: () => void;
    destroy: () => void;
}