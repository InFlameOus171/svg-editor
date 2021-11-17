/**
 * @author mrdoob / http://mrdoob.com
 */

import { EditorLayout } from '../components/organisms/EditorLayout';
import { Tool } from './Tool';
import { ResizeTool } from './Tools/ResizeTool';

export enum Tools_List {
  RESIZE,
}

export class Editor {
  private svg?: SVGRectElement;
  private selectedTool: Tool | null = null;
  constructor(svg?: SVGRectElement | null) {
    if (svg) {
      this.svg = svg;
    }
  }

  selectTool = (self: EditorLayout, tool: Tools_List) => {
    console.log(self, tool);
    if (this.svg) {
      switch (tool) {
        case Tools_List.RESIZE: {
          this.selectedTool = new ResizeTool(this.svg, self);
          break;
        }
      }
    }
  };

  deselectTool = () => {
    this.selectedTool = null;
  };

  useSelectedTool = (event: Event) => this.selectedTool?.executeAction?.(event);

  addElement(element: SVGRectElement) {
    this.svg?.appendChild(element);
    this.svg?.appendChild(document.createTextNode('\n'));
  }

  setSVG(svg: Document) {
    if (this.svg) this.svg.innerHTML = svg.documentElement.innerHTML;
  }

  clear() {
    if (this.svg) this.svg.textContent = '';
  }

  toString() {
    return [
      '<?xml version="1.0" encoding="UTF-8"?>\n',
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">\n',
      this.svg?.innerHTML,
      '</svg>',
    ].join('');
  }
}
