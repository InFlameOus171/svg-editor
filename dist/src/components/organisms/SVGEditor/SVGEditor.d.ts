import { LitElement } from 'lit';
import { ConnectionStatus } from '../../../types/network.types';
import { Editor } from '../../../util/Editor';
import { Tools_List } from '../../../util/helper/constants.js';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/DrawZone';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
import { Coordinates } from '../../../types/types';
export declare class SVGEditor extends LitElement {
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
    firstUpdated(): void;
    updateChatLog: (chatLog: Array<{
        userName: string;
        message: string;
    }>) => void;
    updateConnection: (status: ConnectionStatus) => void;
    updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    handleSelectTool: (tool: Tools_List | null) => void;
    handleJoinRoom: (data: {
        userName?: string;
        roomId?: string;
    }) => void;
    handleLeaveRoom: () => void;
    updateResize: () => void;
    handlePositionChange: (position?: Coordinates | undefined) => Coordinates | undefined;
    render(): import("lit-html").TemplateResult<1>;
}
