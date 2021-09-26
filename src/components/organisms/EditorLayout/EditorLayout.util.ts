import { ToolGeneratorFunction } from './EditorLayout.types';

export const generateTools: ToolGeneratorFunction = handleToolSelection => [
  { title: 'Tool 0', onClick: handleToolSelection, id: '0' },
  { title: 'Tool 1', onClick: handleToolSelection, id: '1' },
  { title: 'Tool 2', onClick: handleToolSelection, id: '2' },
  { title: 'Tool 3', onClick: handleToolSelection, id: '3' },
  { title: 'Tool 4', onClick: handleToolSelection, id: '4' },
  { title: 'Tool 5', onClick: handleToolSelection, id: '5' },
  { title: 'Tool 6', onClick: handleToolSelection, id: '6' },
];
