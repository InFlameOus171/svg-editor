import { Tools_List } from '../../../util/helper/constants';

export interface IToolboxButtonProps {
  onClick?: (id: Tools_List) => void;
  toolName: string;
  icon?: string;
  id: Tools_List;
  isSelected?: boolean;
  class?: string;
}
