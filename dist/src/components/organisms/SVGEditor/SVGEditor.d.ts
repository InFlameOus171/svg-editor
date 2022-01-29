import { LitElement } from 'lit';
import { ConnectionStatus } from '../../../types/network.types';
import { Coordinates } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
import '../../atoms/PositionInformation';
import '../../atoms/ToolboxButton';
import '../../molecules/ConnectionSection';
import '../../molecules/DialogSection';
import '../../molecules/DrawZone';
import '../../molecules/FooterFields';
import '../../molecules/ToolBox';
export declare class SVGEditor extends LitElement {
    #private;
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
    updated(_changedProperties: Map<string | number | symbol, unknown>): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
