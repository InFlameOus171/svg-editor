import { SVGEditor } from '../../components/organisms/SVGEditor';
import type { ShapeType } from '../../types/shapes.types';
import type { Coordinates } from '../../types/types';
import { Tool } from './Tool';
export declare class ImportTool extends Tool<ShapeType> {
    constructor(drawLayer: HTMLCanvasElement, self: SVGEditor, onImport: (shape: ShapeType | ShapeType[] | null) => void, offset: Coordinates);
    drawSvg: (svg: Document) => void;
    destroy: () => ShapeType[];
}
