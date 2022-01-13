import { css } from 'lit';

export const toolBoxStyles = css`
  :host {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
  }
  :host > #column-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 20px;
    justify-content: center;
    transition: width 1s, height 1s;
  }
  span[class^='row-'] {
    display: flex;
    justify-content: center;
    width: 30%;
  }
  span[class^='row-'] > toolbox-button {
    display: flex;
    aspect-ratio: 1;
    max-height: 50px;
    justify-content: center;
    align-items: center;
  }
`;
