import { css } from 'lit';
export const toolBoxButtonStyles = css `
  :host {
    display: flex;
  }

  button {
    aspect-ratio: 1;
    z-index: 1015;
    height: 100%;
    width: 100%;
    border-radius: 0;
    border: 1px solid black;
    background-color: white;
    padding: 5px;
    display: flex;
    flex-shrink: 2;
    justify-content: center;
    align-items: center;
  }

  button[isActive='false'] {
    border: 1px solid grey;
  }

  button[isActive='true'],
  .tooltip:hover button:not([disabled]) {
    border: 1px solid blue;
    background-color: cyan;
  }

  button[disabled] {
    border: 1px solid grey;
    background-color: grey;
  }

  .icon {
    position: absolute;
  }

  .tooltip {
    height: 35px;
    width: 35px;
    text-decoration: none;
    position: relative;
  }
  .tooltip span {
    color: #fff;
    position: fixed;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip:hover span {
    border-radius: 5px;
    padding: 10px;
    background-color: #555;
    visibility: visible;
    overflow: hidden;
    opacity: 1;
    z-index: 100;
  }
`;
export const selectedButtonStyle = css ``;
export const drawIconStyle = css `
  .drawTool.icon {
    z-index: 2;
    color: #000;
    margin-left: 13px;
    margin-top: 13px;
    width: 14px;
    height: 2px;
    border-radius: 1px;
    border: solid 1px currentColor;
    -webkit-transform: rotate(-45deg) scale(2);
    transform: rotate(-45deg) scale(2);
  }

  .drawTool.icon:before {
    content: '';
    position: absolute;
    left: -12px;
    top: -1px;
    width: 0px;
    height: 0px;
    border-left: solid 5px transparent;
    border-right: solid 5px currentColor;
    border-top: solid 2px transparent;
    border-bottom: solid 2px transparent;
  }
`;
export const lineIconStyle = css `
  .lineTool.icon {
    width: 30px;
    height: 0px;
    margin-top: 17px;
    margin-left: 3px;
    border: solid black;
    border-width: 1px;
    background-color: black;
    transform: rotate(-45deg) scale(1.2);
  }
`;
export const rectangleIconStyle = css `
  .rectangleTool.icon {
    margin-left: 3px;
    margin-top: 5px;
    width: 25px;
    min-height: 21px;
    max-height: 21px;
    border: 2px solid black;
  }
`;
export const ellipseIconStyle = css `
  .ellipseTool.icon {
    margin-left: 3px;
    margin-top: 5px;
    width: 25px;
    min-height: 21px;
    max-height: 21px;
    border: 2px solid black;
    border-radius: 50%;
  }
`;
export const textIconStyle = css `
  .textTool.icon {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .textTool.icon::before {
    content: 'Text';
  }
`;
export const selectIconStyle = css `
  .selectTool.icon {
    margin-left: 3px;
    margin-top: 5px;
    width: 25px;
    min-height: 21px;
    max-height: 21px;
    border: 2px dashed black;
  }
`;
export const moveIconStyle = css `
  .moveTool.icon {
    display: flex;
    position: relative;
    justify-content: center;
  }
  .moveTool.icon::after {
    margin-top: 8px;
    display: inline-block;
    position: absolute;
    content: '⇠⇢';
  }
  .moveTool.icon::before {
    margin-top: 8px;
    display: inline-block;
    position: absolute;
    transform: rotate(90deg);
    content: '⇠⇢';
  }
`;
export const deleteIconStyle = css `
  .deleteTool.icon {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .deleteTool.icon::before {
    content: '+';
    margin-top: 9px;
    display: inline-block;
    position: absolute;
    transform: rotate(45deg) scale(4);
  }
`;
export const unselectIconStyle = css `
  .unselectTool.icon {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .unselectTool.icon::before {
    position: absolute;
    margin-top: 5px;
    transform: scale(2);
    content: '⮏';
  }
`;
export const iconStyles = [
    drawIconStyle,
    lineIconStyle,
    rectangleIconStyle,
    ellipseIconStyle,
    textIconStyle,
    selectIconStyle,
    moveIconStyle,
    deleteIconStyle,
    unselectIconStyle,
];
//# sourceMappingURL=ToolboxButton.styles.js.map