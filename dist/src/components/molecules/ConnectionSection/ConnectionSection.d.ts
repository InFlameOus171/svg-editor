import { LitElement } from 'lit';
import '../../atoms/Chat';
import '../../atoms/RoomInformation';
import '../../atoms/ConnectForm';
import { ConnectionStatus } from '../../../types/network.types';
export declare class ConnectionSection extends LitElement {
    static styles: import("lit").CSSResult[];
    userName?: string;
    roomId: string;
    status?: ConnectionStatus;
    chatLog: Array<{
        userName: string;
        message: string;
    }>;
    onJoinRoom?: (data: {
        userName?: string;
        roomId?: string;
    }) => void;
    onLeaveRoom?: () => void;
    onSendMessage?: (message?: string) => void;
    protected updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
