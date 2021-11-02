import { css } from 'lit';

export const drawZoneStyles = [
  css`
    :host {
      aspect-ratio: 1;
      display: flex;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }

    :host #drawzone {
      transition: width 0.1s, height 0.1s;
      display: flex;
      flex-direction: column;
      width: 100%;
      margin: 0;
    }
  `,
];
