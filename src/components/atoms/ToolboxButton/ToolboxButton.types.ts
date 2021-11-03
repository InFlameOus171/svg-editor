export interface IToolboxButtonProps {
  onClick: (id: string) => void;
  title: string;
  id: string;
  isSelected?: boolean;
}
