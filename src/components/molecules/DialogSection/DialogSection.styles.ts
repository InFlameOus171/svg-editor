import { css } from 'lit';

export const dialogSectionStyles = css`
  :host {
    display: flex;
    gap: 5px;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.8);
  }
  #open-svg-button,
  #on-save-button {
    border: 1px solid grey;
    background-color: white;
    padding: 10px 15px;
  }
  #open-svg-button:hover,
  #on-save-button:hover {
    background-color: cyan;
  }
  #on-save-button > input {
    display: none;
  }
`;
