import { html } from 'lit';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export const getButtonColumn = (
  interval: [number, number],
  tools?: Array<any>
) =>
  tools?.slice(interval[0], interval[1]).map(
    (tool, index) =>
      html`
        <span class="row-${index}">
          <toolbox-button
            .onClick=${tool.onClick}
            .buttonId=${tool.id}
            .title=${tool.title}
            .isSelected=${tool.isSelected}
          >
          </toolbox-button>
        </span>
      `
  );
