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
  :host > .vertical-indicator {
    height: 100%;
    min-width: 10px;
    background-color: red;
    opacity: 100%;
    transition: opacity 1s ease-in-out;
  }
  :host(:hover) .vertical-indicator {
    height: 0;
    max-width: 0;
    background-color: red;
    opacity: 0;
    position: fixed;
  }
  @media all and (max-width: 1023px) {
    :host {
      transition: min-width 1s ease-in-out, width 1s ease-in-out;
    }
    :host {
      width: 10px;
      overflow-x: hidden;
      min-width: 10px;
    }
    :host .col-0,
    :host .col-1 {
      transition: opacity 1s ease-in-out;
      opacity: 0%;
    }
    :host(:hover) {
      min-width: 105px;
    }
    :host(:hover) > .col-0,
    :host(:hover) > .col-1 {
      opacity: 100%;
    }
  }
`;
