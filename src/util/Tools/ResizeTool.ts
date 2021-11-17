import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Tool } from '../Tool';

export class ResizeTool extends Tool {
  constructor(target: Node, self: EditorLayout) {
    super(target, self);
  }

  executeAction = (e: MouseEvent) => {
    if (e.buttons !== 1) return;

    const rect = e.target as HTMLElement;
    const rectPosition = rect?.getBoundingClientRect();

    const xPos = e.clientX - rectPosition.x;
    const yPos = e.clientY - rectPosition.y;

    const rectWidth = rect?.getAttribute('width');
    const rectHeight = rect?.getAttribute('height');
    if (rectHeight && rectWidth) {
      this.self.mouseX = xPos;
      this.self.mouseY = yPos;
      let width = parseFloat(rectWidth);
      let height = parseFloat(rectHeight);

      width = this.self.mouseX + 2;
      height = this.self.mouseY + 2;

      console.log(rectPosition);

      console.log(this.self.mouseX, this.self.mouseY);
      rect.setAttribute('width', width.toString());
      rect.setAttribute('height', height.toString());

      this.self.mouseX = xPos;
      this.self.mouseY = yPos;

      // this.updateResizeIcon(dx, dy, rect);
    }
  };
}
