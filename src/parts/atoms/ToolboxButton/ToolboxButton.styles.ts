import { css } from 'lit';

export const ToolboxStyle = css`
  :host {
    display: block;
  }
  button {
    border-radius: 0;
    border: 1px solid grey;
    aspect-ratio: 1;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
