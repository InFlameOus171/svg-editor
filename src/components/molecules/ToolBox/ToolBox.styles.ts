import { css } from 'lit';

export const toolBoxStyles = css`
  :host {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    flex: 2 1 30%;
  }
  :host > #column-wrapper {
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    padding: 10px;
    transition: width 1s, height 1s;
    width: 120px;
  }
  span[class^='row-'] {
    width: 45%;
  }
  span[class^='row-'] > toolbox-button {
    display: flex;
    aspect-ratio: 1;
    max-height: 50px;
    justify-content: center;
    align-items: center;
  }
`;
