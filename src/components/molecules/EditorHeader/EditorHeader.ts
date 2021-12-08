import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { editorHeaderStyles } from './EditorHeader.styles';

@customElement('editor-header')
export class EditorHeader extends LitElement {
  static styles = [editorHeaderStyles];

  @property()
  onSelectSvgFile?: (data: Document) => void;

  @property()
  onSave?: (event: MouseEvent) => void;

  #handleSelectFile = (event: Event) => {
    const fileInputElement = event.target as HTMLInputElement;
    const file = fileInputElement?.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', readerEvent => {
      // TODO - Validate file
      const content = readerEvent.target?.result;
      if (typeof content === 'string')
        this.onSelectSvgFile?.(
          new DOMParser().parseFromString(content, 'image/svg+xml')
        );
    });
    reader.readAsText(file);
  };

  render() {
    return html`
      <label id="open-svg-button">
        Open
        <input
          id="open-file"
          type="file"
          hidden
          .onchange=${this.#handleSelectFile}
          accept="image/svg+xml"
        />
      </label>
      <button id="save" @click=${this.onSave}>Save</button>
    `;
  }
}
