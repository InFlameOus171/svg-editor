import { Tools_List } from '../../../util/helper/constants';
import { ToolboxButtonPropsType } from '../../atoms/ToolboxButton/ToolboxButton.types';

const pathToFiles = 'https://inflameous171.github.io/svgeditor/public/images/';

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): ToolboxButtonPropsType[] => [
  {
    toolName: 'Draw Tool',
    class: 'draw-ool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    icon: [pathToFiles, 'draw.svg'],
    buttonId: Tools_List.DRAW,
  },
  {
    toolName: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    icon: [pathToFiles, 'line.svg'],
    buttonId: Tools_List.LINE,
  },
  {
    toolName: 'Rect Tool',
    icon: [pathToFiles, 'rectangle.svg'],
    onClick: () => selectToolFunction(Tools_List.RECT),
    buttonId: Tools_List.RECT,
  },
  {
    toolName: 'Ellipse Tool - Hold CTRL for circle mode',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    icon: [pathToFiles, 'ellipse.svg'],
    buttonId: Tools_List.ELLIPSE,
  },
  {
    toolName: 'Text Tool',
    onClick: () => selectToolFunction(Tools_List.TEXT),
    icon: [pathToFiles, 'text.svg'],
    buttonId: Tools_List.TEXT,
  },
  {
    toolName: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    icon: [pathToFiles, 'select.svg'],
    buttonId: Tools_List.SELECT,
  },
  {
    toolName: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    icon: [pathToFiles, 'move.svg'],
    buttonId: Tools_List.MOVE,
    disabled: true,
  },
  {
    toolName: 'Delete',
    onClick: () => selectToolFunction(Tools_List.DELETE),
    icon: [pathToFiles, 'delete.svg'],
    buttonId: Tools_List.DELETE,
  },
  {
    toolName: 'Unselect',
    onClick: () => selectToolFunction(null),
    icon: [pathToFiles, 'unselect.svg'],
    buttonId: Tools_List.UNSELECT,
  },
];
