import { css } from 'lit';

export const toolBoxStyles = css`
  :host {
    display: flex;
    justify-content: center;
  }
  :host > #column-wrapper {
    padding: 30px;
    background-color: rgba(255, 255, 255, 0.8);
    transition: width 1s, height 1s;
    display: flex;
    justify-content: center;
    gap: 5px;
  }
  :host > #column-wrapper .col-0,
  :host > #column-wrapper .col-1 {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;
