import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ConnectionStatus } from '../../types/network.types';
import { Coordinates } from '../../types/types';
import { Editor } from '../../util/Editor';
import { Tools_List } from '../../util/helper/constants';
import { Connection } from '../../util/network';
import { DrawZone } from '../atoms/DrawZone';
import { FooterFields } from '../molecules/FooterFields';
import {
  layoutStyle,
  layoutHeaderStyle,
  layoutContentStyle,
} from '../templates/EditorTemplate/EditorTemplate.styles';
import '../templates/EditorTemplate';
import { EditorTemplate } from '../templates/EditorTemplate';

@customElement('svg-editor')
export class SVGEditor extends LitElement {
  @state()
  isLoading: boolean;
  @state()
  width: number = 0;
  @state()
  height: number = 0;
  @state()
  editor: Editor | null = null;
  @state()
  position?: Coordinates;
  @state()
  connection?: Connection;
  @state()
  chatLog: Array<{ userName: string; message: string }> = [];
  @state()
  connectionStatus: ConnectionStatus =
    this.connection?.getStatus() ?? 'disconnected';
  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  constructor() {
    super();
    this.isLoading = true;
  }

  firstUpdated() {
    this.#updateResize();
  }

  #updateChatLog = (chatLog: Array<{ userName: string; message: string }>) => {
    this.chatLog = [...chatLog];
  };

  #updateConnection = (status: ConnectionStatus) => {
    this.connectionStatus = status;
  };

  updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    const svgEditor = this.shadowRoot?.getElementById(
      'editor'
    ) as EditorTemplate;
    if (!this.editor && this.editor !== _changedProperties.get('editor')) {
      const drawZone = svgEditor.shadowRoot?.getElementById('draw-zone') as
        | DrawZone
        | undefined;
      const drawLayer = drawZone?.shadowRoot?.getElementById(
        'draw-layer'
      ) as HTMLCanvasElement;
      const previewLayer = drawZone?.shadowRoot?.getElementById(
        'preview-layer'
      ) as HTMLCanvasElement | undefined;
      if (drawLayer && previewLayer) {
        new ResizeObserver(this.#updateResize).observe(drawLayer);
        const footerFields = svgEditor.shadowRoot?.querySelector(
          'footer-fields'
        ) as FooterFields;
        this.editor = new Editor(
          drawLayer,
          previewLayer,
          [previewLayer.offsetLeft, previewLayer.offsetTop],
          svgEditor,
          footerFields
        );

        this.connection = new Connection(
          this.editor.deleteFromShapes,
          this.editor.updateShapes,
          this.editor.getAllShapes,
          this.editor.resetEditor,
          this.#updateConnection,
          this.#updateChatLog,
          this.editor.setConnection
        );
      }
    }
    if (this.editor && this.connection) {
      this.isLoading = false;
    }
  }

  #handleSelectTool = (tool: Tools_List | null) => {
    this.editor?.onSelectTool(tool);
  };

  #handleJoinRoom = (data: { userName?: string; roomId?: string }) => {
    const { userName, roomId } = data;
    if (this.editor && roomId && this.connection) {
      this.connection.connect(roomId, userName);
      document.title = document.title + ' | Room:' + roomId;
    }
  };

  #handleLeaveRoom = () => {
    this.connection?.disconnect();
    document.title = 'SVG Editor';
  };

  #updateResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  #handlePositionChange = (position?: Coordinates) =>
    (this.position = position);

  render() {
    return html`<editor-template
      id="editor"
      .width=${this.width}
      .height=${this.height}
      .chatLog=${this.chatLog}
      .connection=${this.connection}
      .editor=${this.editor}
      .connectionStatus=${this.connectionStatus}
      .position=${this.position}
      .onJoinRoom=${this.#handleJoinRoom}
      .onLeaveRoom=${this.#handleLeaveRoom}
      .onMousePositionChange=${this.#handlePositionChange}
      .onSelectTool=${this.#handleSelectTool}
    ></editor-template>`;
  }
}
