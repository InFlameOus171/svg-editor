import { css } from 'lit';

export const roomInformationStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  :host > #disconnect-button-container {
    padding-top: 10px;
    align-self: flex-start;
  }
`;
