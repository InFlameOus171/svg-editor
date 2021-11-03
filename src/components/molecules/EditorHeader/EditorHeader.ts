import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorHeaderStyles } from './EditorHeader.styles';

@customElement('editor-header')
export class EditorHeader extends LitElement {
  static styles = [editorHeaderStyles];

  @property()
  onSelectSvgFile?: (data: string) => void;

  private handleSelectFile = (event: Event) => {
    const fileInputElement = event.target as HTMLInputElement;
    const file = fileInputElement?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener('load', () => {
      // TODO - Validate file
      if ('isValid') this.onSelectSvgFile?.(reader.result as string);
    });
  };

  render() {
    return html`
      <label id="open-svg-button">
        Open
        <input
          id="open-file"
          type="file"
          hidden
          .onchange=${this.handleSelectFile}
          accept="image/svg+xml"
        />
      </label>
    `;
  }
}
