export interface IToolboxButtonProps {
  onClick?: (id: string) => void;
  toolName: string;
  icon?: string;
  id: string;
  isSelected?: boolean;
}
