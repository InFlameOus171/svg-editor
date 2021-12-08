import { Tools_List } from '../../../types/shapes';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { ToolGeneratorFunction } from './EditorLayout.types';

export const generateTools: ToolGeneratorFunction = handleSelectTool => [
  { title: 'Tool 0', onClick: handleSelectTool, id: '0' },
  { title: 'Tool 1', onClick: handleSelectTool, id: '1' },
  { title: 'Tool 2', onClick: handleSelectTool, id: '2' },
  { title: 'Tool 3', onClick: handleSelectTool, id: '3' },
  { title: 'Tool 4', onClick: handleSelectTool, id: '4' },
  { title: 'Tool 5', onClick: handleSelectTool, id: '5' },
  { title: 'Tool 6', onClick: handleSelectTool, id: '6' },
];

export const getToolboxButtonsProps = (
  selectToolFunction: (tool: Tools_List | null) => void
): IToolboxButtonProps[] => [
  {
    title: 'Draw Tool',
    onClick: () => selectToolFunction(Tools_List.DRAW),
    id: '1',
    isSelected: false,
  },
  {
    title: 'Line Tool',
    onClick: () => selectToolFunction(Tools_List.LINE),
    id: '2',
    isSelected: false,
  },
  {
    title: 'Rect Tool',
    onClick: () => selectToolFunction(Tools_List.RECT),
    id: '3',
    isSelected: false,
  },
  {
    title: 'Ellipse Tool',
    onClick: () => selectToolFunction(Tools_List.ELLIPSE),
    id: '4',
    isSelected: false,
  },
  {
    title: 'Select Tool',
    onClick: () => selectToolFunction(Tools_List.SELECT),
    id: '5',
    isSelected: false,
  },
  {
    title: 'Move Tool',
    onClick: () => selectToolFunction(Tools_List.MOVE),
    id: '6',
    isSelected: false,
  },
  {
    title: 'Unselect',
    onClick: () => selectToolFunction(null),
    id: '0',
    isSelected: false,
  },
];
