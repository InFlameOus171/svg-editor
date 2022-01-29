import { LitElement } from 'lit';
import '../../atoms/Chat';
import '../../atoms/RoomInformation';
import '../../atoms/ConnectForm';
import { ConnectionStatus, RoomConnectionData } from '../../../types/network.types';
export declare class ConnectionSection extends LitElement {
    static styles: import("lit").CSSResult[];
    userName?: string;
    roomId: string;
    status?: ConnectionStatus;
    chatLog: Array<{
        userName: string;
        message: string;
    }>;
    onJoinRoom?: (data: RoomConnectionData) => void;
    onLeaveRoom?: () => void;
    onSendMessage?: (message?: string) => void;
    render(): import("lit-html").TemplateResult<1>;
}
