import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import type { ShapeType } from '../../../types/shapes.types';
import type { Coordinates } from '../../../types/types';
import { Tool } from '../Tool';
export declare class ImportTool extends Tool<ShapeType> {
    constructor(drawLayer: HTMLCanvasElement, self: EditorTemplate, onImport: (shape: ShapeType | ShapeType[] | null) => void, offset: Coordinates);
    drawSvg: (svg: Document) => void;
    destroy: () => ShapeType[];
}
