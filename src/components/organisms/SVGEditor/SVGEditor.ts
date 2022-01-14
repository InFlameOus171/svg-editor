import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { ConnectionStatus } from '../../../types/network.types';
import type { SVGParamsBase } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { SVGParamFieldID, Tools_List } from '../../../util/helper/constants.js';
import { hexToRGBA } from '../../../util/helper/util';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import type { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/DrawZone';
import { DrawZone } from '../../molecules/DrawZone';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './SVGEditor.styles';
import { getToolboxButtonsProps } from './SVGEditor.util';

@customElement('svg-editor')
export class SVGEditor extends LitElement {
  @state()
  width: number = 0;
  @state()
  height: number = 0;
  @state()
  editor: Editor | null = null;
  @state()
  position?: [number, number];
  @state()
  connection?: Connection;
  @state()
  chatLog: Array<{ userName: string; message: string }> = [];
  @state()
  connectionStatus: ConnectionStatus =
    this.connection?.getStatus() ?? 'disconnected';

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  firstUpdated() {
    this.updateResize();
  }

  updateChatLog = (chatLog: Array<{ userName: string; message: string }>) => {
    this.chatLog = [...chatLog];
  };

  updateConnection = (status: ConnectionStatus) => {
    this.connectionStatus = status;
  };

  updated(_changedProperties: Map<string | number | symbol, unknown>): void {
    if (!this.editor && this.editor !== _changedProperties.get('editor')) {
      const drawZone = this.shadowRoot?.getElementById('draw-zone') as
        | DrawZone
        | undefined;
      const drawLayer = drawZone?.shadowRoot?.getElementById(
        'draw-layer'
      ) as HTMLCanvasElement;
      const previewLayer = drawZone?.shadowRoot?.getElementById(
        'preview-layer'
      ) as HTMLCanvasElement | undefined;
      if (drawLayer && previewLayer) {
        new ResizeObserver(this.updateResize).observe(drawLayer);
        this.editor = new Editor(
          drawLayer,
          previewLayer,
          [previewLayer.offsetLeft, previewLayer.offsetTop],
          this
        );

        this.connection = new Connection(
          this.editor.deleteFromShapes,
          this.editor.updateShapes,
          this.editor.getAllShapes,
          this.editor.resetEditor,
          this.updateConnection,
          this.updateChatLog
        );
      }
    }
  }

  handleSelectTool = (tool: Tools_List | null) => {
    this.editor?.onSelectTool(tool);
  };

  handleJoinRoom = (data: { userName?: string; roomId?: string }) => {
    const { userName, roomId } = data;
    if (this.editor && roomId && this.connection) {
      this.connection.connect(roomId, userName);
      this.editor.setConnection(this.connection);
      document.title = document.title + ' | Room:' + roomId;
    }
  };

  handleSVGParamChange = (
    field: keyof SVGParamsBase,
    targetId: SVGParamFieldID
  ) => {
    let value;
    const fillFields = [
      SVGParamFieldID.FILL_COLOR,
      SVGParamFieldID.FILL_OPACITY,
    ];
    const strokeFields = [
      SVGParamFieldID.STROKE_COLOR,
      SVGParamFieldID.STROKE_OPACITY,
    ];
    const dualFields = [...fillFields, ...strokeFields];

    if (dualFields.includes(targetId)) {
      let opacity, color;
      if (strokeFields.includes(targetId)) {
        opacity = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.STROKE_OPACITY
          ) as HTMLInputElement
        )?.value;
        color = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.STROKE_COLOR
          ) as HTMLInputElement
        )?.value;
        value = hexToRGBA(color ?? '#000000', opacity);
      } else {
        opacity = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.FILL_OPACITY
          ) as HTMLInputElement
        )?.value;
        color = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.FILL_COLOR
          ) as HTMLInputElement
        )?.value;
        value = hexToRGBA(color ?? '#000000', opacity);
      }
    } else {
      if (SVGParamFieldID.LINE_DASH === targetId) {
        value = (
          this.shadowRoot?.getElementById(
            SVGParamFieldID.LINE_DASH
          ) as HTMLInputElement
        )?.value
          .trim()
          .split(/[\s,]+/)
          .filter(splitValue => !!splitValue)
          .map(lineDashValue => parseInt(lineDashValue));
        if (value.some(innerValue => !isFinite(innerValue))) {
          value = [0];
        }
      } else {
        value = (this.shadowRoot?.getElementById(targetId) as HTMLInputElement)
          ?.value;
      }
    }
    this.editor?.setShapeParam(field, value);
  };

  handleLeaveRoom = () => {
    this.connection?.disconnect();
    document.title = 'SVG Editor';
  };

  updateResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };

  render() {
    const tools: IToolboxButtonProps[] = getToolboxButtonsProps(
      (tools: Tools_List | null) => {
        this.handleSelectTool(tools);
      }
    );
    return html`
      <div id="content">
        <draw-zone
          id="draw-zone"
          .height=${this.height}
          .width=${this.width}
          .onPositionChange=${(position?: [number, number]) =>
            (this.position = position)}
        ></draw-zone>
        <div id="right-main-section">
          <tool-box id="tool-box" .tools=${tools}></tool-box>
          <connection-section
            .status=${this.connectionStatus}
            .onJoinRoom=${this.handleJoinRoom}
            .onLeaveRoom=${this.handleLeaveRoom}
            .onSendMessage=${this.connection?.sendChatMessage}
            .userName=${this.connection?.getUserName() ?? 'user_' + nanoid(6)}
            .roomId=${this.connection?.getRoom() ?? ''}
            .chatLog=${this.chatLog}
          ></connection-section>
        </div>
      </div>
      <dialog-section
        .onSave=${this.editor?.onSave}
        .onSelectSvgFile=${this.editor?.importSVG}
      ></dialog-section>
      <div id="footer">
        <footer-fields
          .handleSVGParamChange=${this.handleSVGParamChange}
        ></footer-fields>
        <position-information .position=${this.position}></position-information>
      </div>
    `;
  }
}
