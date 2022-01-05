import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dialogSectionStyles } from './DialogSection.styles';

@customElement('dialog-section')
export class DialogSection extends LitElement {
  static styles = [dialogSectionStyles];

  @property()
  onSelectSvgFile?: (data: Document) => void;

  @property()
  onSave?: (event: MouseEvent) => void;

  handleSelectFile = (event: Event) => {
    const fileInputElement = event.target as HTMLInputElement;
    const file = fileInputElement?.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', readerEvent => {
      // TODO - Validate file
      const content = readerEvent.target?.result;
      if (typeof content === 'string') {
        this.onSelectSvgFile?.(
          new DOMParser().parseFromString(content, 'image/svg+xml')
        );
      }
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
          @change=${this.handleSelectFile}
          accept="image/svg+xml"
        />
      </label>
      <label id="on-save-button">
        Save
        <input type="button" id="save" @click=${this.onSave}></div>
      </label>
    `;
  }
}
