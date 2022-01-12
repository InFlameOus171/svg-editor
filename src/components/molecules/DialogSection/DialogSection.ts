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

  #readerEventHandler = (readerEvent: ProgressEvent<FileReader>) => {
    try {
      const content = readerEvent.target?.result;
      if (typeof content === 'string') {
        const parser = new DOMParser();
        this.onSelectSvgFile?.(
          parser.parseFromString(content, 'image/svg+xml')
        );
      }
    } catch (error) {
      alert('SVG Element count not be imported');
    }
  };

  handleSelectFile = (event: Event) => {
    const files = (event.target as any).files as FileList | undefined;
    const file = files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', this.#readerEventHandler);
    (event.target as any).value = '';
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
          @input=${this.handleSelectFile}
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
