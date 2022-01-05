import { SVGEditor } from '.';
import { SVGParamFieldID, Tools_List } from '../../../util/helper/constants';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): IToolboxButtonProps[] => [
  {
    toolName: 'Draw Tool',
    class: 'draw-ool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    icon: 'public/images/draw.svg',
    id: Tools_List.DRAW,
  },
  {
    toolName: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    icon: 'public/images/line.svg',
    id: Tools_List.LINE,
  },
  {
    toolName: 'Rect Tool',
    icon: 'public/images/rectangle.svg',
    onClick: () => selectToolFunction(Tools_List.RECT),
    id: Tools_List.RECT,
  },
  {
    toolName: 'Ellipse Tool - Hold CTRL for circle mode',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    icon: 'public/images/ellipse.svg',
    id: Tools_List.ELLIPSE,
  },
  {
    toolName: 'Text Tool',
    onClick: () => selectToolFunction(Tools_List.TEXT),
    icon: 'public/images/text.svg',
    id: Tools_List.TEXT,
  },
  {
    toolName: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    icon: 'public/images/select.svg',
    id: Tools_List.SELECT,
  },
  {
    toolName: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    icon: 'public/images/move.svg',
    id: Tools_List.MOVE,
    disabled: true,
  },
  {
    toolName: 'Delete',
    onClick: () => selectToolFunction(Tools_List.DELETE),
    icon: 'public/images/delete.svg',
    id: Tools_List.DELETE,
  },
  {
    toolName: 'Unselect',
    onClick: () => selectToolFunction(null),
    icon: 'public/images/unselect.svg',
    id: Tools_List.UNSELECT,
  },
];
