import { LitElement } from 'lit';
import type { SVGParamsBase } from '../../../types/types';
import { Editor } from '../../../util/Editor';
import { SVGParamFieldID, Tools_List } from '../../../util/helper/constants.js';
import '../../atoms/ToolboxButton';
import '../../molecules/DialogSection';
import '../../molecules/ToolBox';
import { Connection } from '../../../util/network';
import '../../atoms/MenuButton';
export declare class SVGEditor extends LitElement {
    width: number;
    height: number;
    editor: Editor | null;
    connection?: Connection;
    availableFonts?: Set<string>;
    static styles: import("lit").CSSResult[];
    constructor();
    firstUpdated(): Promise<void>;
    handleSelectTool: (tool: Tools_List | null) => void;
    handleJoinRoom: () => void;
    handleSVGParamChange: (field: keyof SVGParamsBase, targetId: SVGParamFieldID) => void;
    hideConnectForm: () => void;
    hideRoomInformation: () => void;
    handleLeaveRoom: () => void;
    handleSendMessage: () => void;
    updateResize: () => void;
    render(): import("lit-html").TemplateResult<1>;
}
