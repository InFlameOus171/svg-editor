import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { ShapeType } from '../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../types/types';
import { Tool } from './Tool';
export declare class MoveTool extends Tool<ShapeType> {
    #private;
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onMove: (shape: ShapeType | ShapeType[] | null) => void, offset: Coordinates, selectedShape: ShapeType);
    updatePreview: () => void;
    changeStyle: (config: SVGParamsBase) => void;
    executeAction: () => void;
    destroy: () => void;
}
