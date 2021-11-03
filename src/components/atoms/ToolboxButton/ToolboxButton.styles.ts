import { css } from 'lit';

export const toolBoxButtonStyles = css`
  :host {
    min-width: 47.6px;
    display: block;
  }

  button {
    aspect-ratio: 1;
    border-radius: 0;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:not(.isSelected) {
    border: 1px solid grey;
    background-color: white;
  }

  button.isSelected {
    border: 1px solid blue;
    background-color: cyan;
  }
`;

export const selectedButtonStyle = css``;
