import { css } from 'lit';

export const layoutStyle = css`
  :host {
    height: 100%;
    transition: all 1s;
    display: flex;
    flex-direction: column;
    background-color: #2196f3;
  }

  #footer {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
export const layoutHeaderStyle = css`
  #header {
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
  }
`;

export const layoutContentStyle = css`
  #content {
    display: flex;
    flex-wrap: nowrap;
  }

  #draw-container {
    margin: 0;
    padding: 0;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 1);
    display: flex;
  }

  #drawzone {
    top: 0;
    left: 0;
    position: absolute;
  }

  #connection-info {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
