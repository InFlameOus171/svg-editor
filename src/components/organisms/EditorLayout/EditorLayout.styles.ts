import { css } from 'lit';

export const layoutStyle = css`
  :host {
    transition: all 1s;
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
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
    gap: 5px;
  }

  #connection-info {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
