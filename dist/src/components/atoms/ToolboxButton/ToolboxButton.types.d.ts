import { Tools_List } from '../../../util/helper/constants';
export declare type ToolboxButtonPropsType = {
    onClick: (buttonId: Tools_List) => void;
    buttonId: Tools_List;
    icon?: [string, string];
    toolName?: string;
    class?: string;
    disabled?: boolean;
};
export declare type ToolboxButtonClickFunction = (buttonId: Tools_List) => void;
