/**
 * @author mrdoob / http://mrdoob.com
 */

export class Editor {
  svg?: SVGRectElement;

  constructor(svg?: SVGRectElement | null) {
    if (svg) {
      this.svg = svg;
    }
  }

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
