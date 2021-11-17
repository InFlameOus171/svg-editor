import { EditorLayout } from '../components/organisms/EditorLayout';

export abstract class Tool {
  target: Node;
  self: EditorLayout;

  constructor(target: Node, self: EditorLayout) {
    this.target = target;
    this.self = self;
  }

  executeAction?: Function;
}
