import { EditorLayout } from '../../components/organisms/EditorLayout';
import { Tool } from '../Tool';

export class ResizeTool extends Tool {
  constructor(target: Node, self: EditorLayout) {
    super(target, self);
  }
  selectedSVG: any;
  executeAction = (e: MouseEvent) => {
    if (e.buttons !== 1) return;
    if (!this.selectedSVG) {
      this.selectedSVG = e.target;
    }
    const rectPosition = this.selectedSVG?.getBoundingClientRect();

    const xPos = e.clientX - rectPosition.x;
    const yPos = e.clientY - rectPosition.y;

    const rectWidth = this.selectedSVG?.getAttribute('width');
    const rectHeight = this.selectedSVG?.getAttribute('height');
    if (rectHeight && rectWidth) {
      this.self.mouseX = xPos;
      this.self.mouseY = yPos;
      let width = parseFloat(rectWidth);
      let height = parseFloat(rectHeight);

      width = this.self.mouseX + 2;
      height = this.self.mouseY + 2;

      this.selectedSVG.setAttribute('width', width.toString());
      this.selectedSVG.setAttribute('height', height.toString());

      this.self.mouseX = xPos;
      this.self.mouseY = yPos;

      // this.updateResizeIcon(dx, dy, rect);
    }
  };
}
