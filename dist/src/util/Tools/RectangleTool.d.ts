import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { ShapeType } from '../../types/shapes.types';
import type { Coordinates, SVGParamsBase } from '../../types/types';
import { Rectangle } from '../Shapes/Rectangle';
import { Tool } from './Tool';
export declare class RectangleTool extends Tool<Rectangle> {
    constructor(drawLayer: HTMLCanvasElement, previewLayer: HTMLCanvasElement, self: SVGEditor, onCreate: (shape: ShapeType | ShapeType[] | null) => void, styles: SVGParamsBase, offset: Coordinates);
    executeAction: () => void;
    destroy: () => void;
    onDown: (event: MouseEvent) => void;
    onUp: () => void;
    createRectangle: () => void;
    createRectanglePreview: () => void;
    onMove: (event: MouseEvent) => void;
}
