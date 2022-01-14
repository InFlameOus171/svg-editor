import { css } from 'lit';
export const connectFormStyles = css `
  :host label {
    display: flex;
  }

  :host label > #connect-form-label {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }

  :host > :first-child {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  :host > :first-child label {
    flex: auto;
    flex-direction: column;
    display: flex;
  }

  :host #connect-button-container {
    display: flex;
    padding-top: 20px;
    justify-content: center;
  }
`;
//# sourceMappingURL=ConnectForm.styles.js.map