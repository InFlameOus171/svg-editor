import { LitElement } from 'lit';
import { ConnectionStatus } from '../../types/network.types';
import { Coordinates } from '../../types/types';
import { Editor } from '../../util/Editor';
import { Connection } from '../../util/network';
import '../templates/EditorTemplate';
export declare class SVGEditor extends LitElement {
    #private;
    isLoading: boolean;
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
    constructor();
    firstUpdated(): void;
    updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    render(): import("lit-html").TemplateResult<1>;
}
