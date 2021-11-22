import { Ellipsis } from '../util/Shapes/Ellipsis';
import { FreehandedShape } from '../util/Shapes/FreehandedShape';
import { Line } from '../util/Shapes/Line';
import { Rectangle } from '../util/Shapes/Rectangle';

export type Shape = Ellipsis | Rectangle | FreehandedShape | Line;
