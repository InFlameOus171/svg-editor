import { IToolboxButtonProps } from '../../atoms/ToolboxButton/ToolboxButton.types';

export type ToolGeneratorFunction = (
  handleSelectTool: (id: string) => void
) => Array<IToolboxButtonProps>;
