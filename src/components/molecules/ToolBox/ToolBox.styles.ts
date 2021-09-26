import { css } from 'lit';

export const toolBoxStyles = css`
  :host {
    min-width: 105px;
    transition: width 1s, height 1s;
    background-color: rgba(255, 255, 255, 0.8);
    width: fit-content;
    display: flex;
    gap: 5px;
    padding: 5px;
  }
  :host > .col-0,
  :host > .col-1 {
    flex: 0.5 1 5%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
