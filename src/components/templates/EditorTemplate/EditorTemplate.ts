import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import {
  ConnectionStatus,
  RoomConnectionData,
} from '../../../types/network.types';
import { Coordinates } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { Tools_List } from '../../../util/helper/constants.js';
import { Connection } from '../../../util/network';
import '../../atoms/DrawZone';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import type { ToolboxButtonPropsType } from '../../atoms/ToolboxButton/ToolboxButton.types';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import {
  layoutContentStyle,
  layoutHeaderStyle,
  layoutStyle,
} from './EditorTemplate.styles';
import { EditorTemplateProps } from './EditorTemplate.types';
import { getToolboxButtonsProps } from './EditorTemplate.util';

@customElement('editor-template')
export class EditorTemplate extends LitElement {
  @property({ type: Object })
  onSelectTool?: (tool: Tools_List | null) => void;
  @property({ type: Object })
  onJoinRoom?: (tool: RoomConnectionData) => void;
  @property({ type: Object })
  onLeaveRoom?: () => void;
  @property({ type: Object })
  onMousePositionChange?: (position?: Coordinates) => void;
  @property({ type: Number })
  width: number = 0;
  @property({ type: Number })
  height: number = 0;
  @property({ type: Object })
  editor: Editor | null = null;
  @property({ type: Array })
  position?: Coordinates;
  @property({ type: Object })
  connection?: Connection;
  @property({ type: Array })
  chatLog: Array<{ userName: string; message: string }> = [];
  @property({ type: String })
  connectionStatus: ConnectionStatus =
    this.connection?.getStatus() ?? 'disconnected';

  static styles = [layoutStyle, layoutHeaderStyle, layoutContentStyle];

  constructor(props: EditorTemplateProps | undefined) {
    super();
    if (props) {
      this.onSelectTool = props.onSelectTool;
      this.onMousePositionChange = props.onMousePositionChange;
      this.onLeaveRoom = props.onLeaveRoom;
      this.onJoinRoom = props.onJoinRoom;
      this.width = props.width;
      this.height = props.height;
      this.editor = props.editor;
      this.position = props.position;
      this.connection = props.connection;
      this.chatLog = props.chatLog;
    }
  }

  render() {
    const tools: ToolboxButtonPropsType[] = getToolboxButtonsProps(
      (tools: Tools_List | null) => {
        this.onSelectTool?.(tools);
      }
    );

    return html`
      <div id="content">
        <draw-zone
          id="draw-zone"
          .height=${this.height}
          .width=${this.width}
          .onPositionChange=${this.onMousePositionChange}
        ></draw-zone>
        <div id="right-main-section">
          <tool-box id="tool-box" .tools=${tools}></tool-box>
          <connection-section
            .status=${this.connectionStatus}
            .onJoinRoom=${this.onJoinRoom}
            .onLeaveRoom=${this.onLeaveRoom}
            .onSendMessage=${this.connection?.sendChatMessage}
            .userName=${this.connection?.getUserName() ?? 'user_' + nanoid(6)}
            .roomId=${this.connection?.getRoom() ?? ''}
            .chatLog=${this.chatLog}
          ></connection-section>
        </div>
      </div>
      <dialog-section
        .onSave=${this.editor?.onSave}
        .onSelectSvgFile=${this.editor?.onImportSVG}
      ></dialog-section>
      <div id="footer">
        <footer-fields
          .onSVGParamChange=${this.editor?.setShapeParam}
        ></footer-fields>
        <position-information .position=${this.position}></position-information>
      </div>
    `;
  }
}
