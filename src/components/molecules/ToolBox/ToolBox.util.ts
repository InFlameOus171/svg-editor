import { html } from 'lit';
import { Tools_List } from '../../../util/helper/constants';
import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import { SVGEditor } from '../../organisms/SVGEditor';

export const getButtonColumn = (tools?: Array<IToolboxButtonProps>) => {
  let counter = 0;
  return tools?.map((tool, index) => {
    index % 3 == 0 && ++counter;
    return html`
      <span class="row-${counter}">
        <toolbox-button
          id=${'tool-box-button-' + tool.id}
          .onClick=${tool.onClick}
          .buttonId=${tool.id}
          .toolName=${tool.toolName}
          .icon=${tool.icon}
          .disabled=${tool.disabled}
        >
        </toolbox-button>
      </span>
    `;
  });
};

export const getToolButton = (editor: SVGEditor, tool: Tools_List) => {
  const toolBox = editor.shadowRoot?.getElementById('tool-box');
  const toolBoxButton = toolBox?.shadowRoot?.getElementById(
    'tool-box-button-' + tool
  );
  return toolBoxButton?.shadowRoot?.getElementById(tool);
};

export const setIsButtonActive = (
  editor: SVGEditor,
  tool: Tools_List,
  isActive: boolean = true
) => {
  const toolButton = getToolButton(editor, tool);
  toolButton?.setAttribute('isactive', `${isActive}`);
};

export const setIsButtonDisabled = (
  editor: SVGEditor,
  tool: Tools_List,
  isDisabled: boolean = true
) => {
  const toolButton = getToolButton(editor, tool);
  if (isDisabled) {
    toolButton?.setAttribute('disabled', '');
  } else {
    toolButton?.removeAttribute('disabled');
  }
};
