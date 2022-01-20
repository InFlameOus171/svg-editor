import { css } from 'lit';

export const footerFieldsStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.8);
  }

  :host #footer-input {
    border: none;
    flex: 2 1 auto;
    display: flex;
    width: 100%;
    gap: 20px;
    display: flex;
  }

  :host #footer-input #left-input-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  :host #footer-input #right-input-section {
    visibility: hidden;
    border: none;
    background-color: inherit;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  :host #footer-input-fields {
    display: flex;
    flex-direction: column;
  }

  :host #footer-submit-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;
