import { Tools_List } from '../../../util/helper/constants';
import { ToolboxButtonPropsType } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): ToolboxButtonPropsType[] => [
  {
    toolName: 'Draw Tool',
    class: 'draw-ool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    icon: 'drawTool',
    buttonId: Tools_List.DRAW,
  },
  {
    toolName: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    icon: 'lineTool',
    buttonId: Tools_List.LINE,
  },
  {
    toolName: 'Rect Tool',
    icon: 'rectangleTool',
    onClick: () => selectToolFunction(Tools_List.RECT),
    buttonId: Tools_List.RECT,
  },
  {
    toolName: 'Ellipse Tool - Hold CTRL for circle mode',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    icon: 'ellipseTool',
    buttonId: Tools_List.ELLIPSE,
  },
  {
    toolName: 'Text Tool',
    onClick: () => selectToolFunction(Tools_List.TEXT),
    icon: 'textTool',
    buttonId: Tools_List.TEXT,
  },
  {
    toolName: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    icon: 'selectTool',
    buttonId: Tools_List.SELECT,
  },
  {
    toolName: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    icon: 'moveTool',
    buttonId: Tools_List.MOVE,
    disabled: true,
  },
  {
    toolName: 'Delete',
    onClick: () => selectToolFunction(Tools_List.DELETE),
    icon: 'deleteTool',
    buttonId: Tools_List.DELETE,
  },
  {
    toolName: 'Unselect',
    onClick: () => selectToolFunction(null),
    icon: 'unselectTool',
    buttonId: Tools_List.UNSELECT,
  },
];
