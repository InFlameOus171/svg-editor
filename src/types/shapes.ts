import { Ellipse } from '../util/Shapes/Ellipse';
import { Freehand } from '../util/Shapes/Freehand';
import { Line } from '../util/Shapes/Line';
import { Path } from '../util/Shapes/Path';
import { Rectangle } from '../util/Shapes/Rectangle';

export type Shapes = 'Ellipse' | 'Rectangle' | 'Line' | 'Freehand' | 'Path';
export type ShapeType = Ellipse | Rectangle | Line | Freehand | Path;

export enum Tools_List {
  DRAW,
  LINE,
  RECT,
  ELLIPSE,
  SELECT,
  MOVE,
  DELETE,
}
