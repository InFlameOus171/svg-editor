import { SvgEditor } from './parts/templates/SvgEditor.js';
import { EditorLayout } from './parts/organisms/EditorLayout/EditorLayout.js';
import { ToolboxButton } from './parts/atoms/ToolboxButton/ToolboxButton.js';

window.customElements.define('svg-editor', SvgEditor);
window.customElements.define('editor-layout', EditorLayout);
window.customElements.define('toolbox-button', ToolboxButton);
