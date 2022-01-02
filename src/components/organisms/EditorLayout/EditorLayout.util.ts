import { Tools_List } from '../../../types/shapes';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): IToolboxButtonProps[] => [
  {
    toolName: 'Draw Tool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    id: '1',
    isSelected: false,
  },
  {
    toolName: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    icon: 'public/images/line.png',
    id: '2',
    isSelected: false,
  },
  {
    toolName: 'Rect Tool',
    icon: 'public/images/rectangle.png',
    onClick: () => selectToolFunction(Tools_List.RECT),
    id: '3',
    isSelected: false,
  },
  {
    toolName: 'Ellipse Tool',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    id: '4',
    isSelected: false,
  },
  {
    toolName: 'Text Tool',
    onClick: () => selectToolFunction(Tools_List.TEXT),
    id: '5',
    isSelected: false,
  },
  {
    toolName: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    id: '6',
    isSelected: false,
  },
  {
    toolName: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    id: '7',
    isSelected: false,
  },
  {
    toolName: 'Delete',
    onClick: () => selectToolFunction(Tools_List.DELETE),
    id: '8',
    isSelected: false,
  },
  {
    toolName: 'Unselect',
    onClick: () => selectToolFunction(null),
    id: '0',
    isSelected: false,
  },
];
