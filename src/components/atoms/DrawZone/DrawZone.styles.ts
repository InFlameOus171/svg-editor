import { css } from 'lit';

export const drawZoneStyles = css`
  :host {
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    flex: 1 1 auto;
    /* max-height: 80vh; */
    /* width: 100%; */
    overflow: auto;
    display: flex;
    position: relative;
  }

  #draw-layer {
    top: 0;
    left: 0;
    position: absolute;
  }

  #preview-layer {
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }
`;
