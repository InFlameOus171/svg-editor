import { Tools_List } from '../../../util/helper/constants';
export interface IToolboxButtonProps {
    onClick?: (id: Tools_List) => void;
    toolName: string;
    icon?: [string, string];
    id: Tools_List;
    class?: string;
    disabled?: boolean;
}
