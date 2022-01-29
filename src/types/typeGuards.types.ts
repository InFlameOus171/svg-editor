import type { Ellipse } from '../util/shapes/Ellipse/Ellipse';
import type { Freehand } from '../util/shapes/Freehand/Freehand';
import type { Line } from '../util/shapes/Line/Line';
import type { Path } from '../util/shapes/Path/Path';
import type { Rectangle } from '../util/shapes/Rectangle/Rectangle';
import type { Shape } from '../util/shapes/Shape';
import type { TextShape } from '../util/shapes/Text/Text';
import type { DrawTool } from '../util/tools/DrawTool/DrawTool';
import type { EllipseTool } from '../util/tools/EllipseTool/EllipseTool';
import type { LineTool } from '../util/tools/LineTool/LineTool';
import type { MoveTool } from '../util/tools/MoveTool/MoveTool';
import type { RectangleTool } from '../util/tools/RectangleTool/RectangleTool';
import type { SelectTool } from '../util/tools/SelectTool/SelectTool';
import type { TextTool } from '../util/tools/TextTool/TextTool';
import { Tool } from '../util/tools/Tool';

export type Shapes =
  | 'Ellipse'
  | 'Rectangle'
  | 'Line'
  | 'Freehand'
  | 'Path'
  | 'TextShape';

export type ShapeType =
  | Shape
  | Ellipse
  | Rectangle
  | Line
  | Freehand
  | Path
  | TextShape;

export type ToolType =
  | Tool<any, any>
  | RectangleTool
  | LineTool
  | DrawTool
  | EllipseTool
  | SelectTool
  | MoveTool
  | TextTool;
