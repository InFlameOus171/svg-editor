import type { ShapeType } from '../types/shapes.types';
import type { SVGParamsBase } from '../types/types';
import { Ellipse } from './shapes/Ellipse/Ellipse';
import { Freehand } from './shapes/Freehand/Freehand';
import { Line } from './shapes/Line/Line';
import { Path } from './shapes/Path/Path';
import { Rectangle } from './shapes/Rectangle/Rectangle';
import { TextShape } from './shapes/Text/Text';
declare const Pen: {
    generatePen: (context?: CanvasRenderingContext2D | null | undefined) => {
        draw: (shape: ShapeType, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    };
    draw: (shape: ShapeType, svgParams?: Partial<SVGParamsBase> | undefined, context?: CanvasRenderingContext2D | null | undefined) => void;
    setStyles: (pathConstructor: Path2D, context: CanvasRenderingContext2D, svgParams: Partial<SVGParamsBase>) => void;
    applyStyles: (pathConstructor: Path2D, styles: SVGParamsBase, context: CanvasRenderingContext2D) => Path2D;
    drawPath: (path: Path, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    drawText: (textShape: TextShape, context?: CanvasRenderingContext2D | null | undefined, svgParams?: SVGParamsBase | undefined) => void;
    drawFreehand: (freehand: Freehand, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    drawLine: (line: Line, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    drawRectangle: (rectangle: Rectangle, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    drawEllipse: (ellipse: Ellipse, context?: CanvasRenderingContext2D | null | undefined, svgParams?: Partial<SVGParamsBase> | undefined) => void;
    clearCanvas: (canvas: HTMLCanvasElement, canvasContext?: CanvasRenderingContext2D | null | undefined) => void;
};
export { Pen };
