import { html } from 'lit';
import { ToolboxButton } from '../../atoms/ToolboxButton/index.js';
import { ToolGeneratorFunction } from './EditorLayout.types';

export const generateTools: ToolGeneratorFunction = handleToolSelection => [
  { title: 'Line 0', onClick: handleToolSelection, id: '0' },
  { title: 'Line 1', onClick: handleToolSelection, id: '1' },
  { title: 'Line 2', onClick: handleToolSelection, id: '2' },
  { title: 'Line 3', onClick: handleToolSelection, id: '3' },
  { title: 'Line 4', onClick: handleToolSelection, id: '4' },
  { title: 'Line 5', onClick: handleToolSelection, id: '5' },
  { title: 'Line 6', onClick: handleToolSelection, id: '6' },
];

export const getButtonColumn = (
  tools: Array<any>,
  interval: [number, number]
) =>
  tools.slice(interval[0], interval[1]).map((tool, index) => {
    const toolboxButton = new ToolboxButton(tool);
    return html`<span class="colum-${index % 2}">${toolboxButton}</span>`;
  });
