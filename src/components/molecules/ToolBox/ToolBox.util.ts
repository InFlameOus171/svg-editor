import { Tools_List } from '../../../util/helper/constants';
import { EditorTemplate } from '../../templates/EditorTemplate';

export const getToolButton = (editor: EditorTemplate, tool: Tools_List) => {
  const toolBox = editor.shadowRoot?.getElementById('tool-box');
  const toolBoxButton = toolBox?.shadowRoot?.getElementById(
    'tool-box-button-' + tool
  );
  return toolBoxButton?.shadowRoot?.getElementById(tool);
};

export const setIsButtonActive = (
  editor: EditorTemplate,
  tool: Tools_List,
  isActive: boolean = true
) => {
  const toolButton = getToolButton(editor, tool);
  toolButton?.setAttribute('isactive', `${isActive}`);
};

export const setIsButtonDisabled = (
  editor: EditorTemplate,
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
