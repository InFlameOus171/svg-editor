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
