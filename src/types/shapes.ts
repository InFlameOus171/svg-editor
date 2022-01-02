import { Ellipse } from '../util/Shapes/Ellipse';
import { Freehand } from '../util/Shapes/Freehand';
import { Line } from '../util/Shapes/Line';
import { Path } from '../util/Shapes/Path';
import { Rectangle } from '../util/Shapes/Rectangle';
import { TextShape } from '../util/Shapes/Text';
import { DrawTool } from '../util/Tools/DrawTool';
import { EllipseTool } from '../util/Tools/EllipseTool';
import { LineTool } from '../util/Tools/LineTool';
import { MoveTool } from '../util/Tools/MoveTool';
import { RectangleTool } from '../util/Tools/RectangleTool';
import { SelectTool } from '../util/Tools/SelectTool';
import { TextTool } from '../util/Tools/TextTool';

export type Shapes =
  | 'Ellipse'
  | 'Rectangle'
  | 'Line'
  | 'Freehand'
  | 'Path'
  | 'TextShape';
export type ShapeType =
  | Ellipse
  | Rectangle
  | Line
  | Freehand
  | Path
  | TextShape;

export type ToolType =
  | RectangleTool
  | LineTool
  | DrawTool
  | EllipseTool
  | SelectTool
  | MoveTool
  | TextTool;

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  ELLIPSE,
  SELECT,
  TEXT,
  MOVE,
  DELETE,
}
