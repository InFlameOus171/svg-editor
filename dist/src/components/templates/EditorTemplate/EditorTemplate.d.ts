import { LitElement } from 'lit';
import { ConnectionStatus, RoomConnectionData } from '../../../types/network.types';
import { Coordinates } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { Tools_List } from '../../../util/helper/constants.js';
import { Connection } from '../../../util/network';
import '../../atoms/DrawZone';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import { EditorTemplateProps } from './EditorTemplate.types';
export declare class EditorTemplate extends LitElement {
    onSelectTool?: (tool: Tools_List | null) => void;
    onJoinRoom?: (tool: RoomConnectionData) => void;
    onLeaveRoom?: () => void;
    onMousePositionChange?: (position?: Coordinates) => void;
    width: number;
    height: number;
    editor: Editor | null;
    position?: Coordinates;
    connection?: Connection;
    chatLog: Array<{
        userName: string;
        message: string;
    }>;
    connectionStatus: ConnectionStatus;
    static styles: import("lit").CSSResult[];
    constructor(props: EditorTemplateProps | undefined);
    render(): import("lit-html").TemplateResult<1>;
}
