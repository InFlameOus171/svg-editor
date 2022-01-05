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
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.8);
  }

  #footer #footer-fields {
    border: none;
    display: flex;
    flex-direction: column;
  }

  #footer-fields > #footer-input {
    width: 100%;
    justify-content: space-between;
    display: flex;
  }

  #footer #footer-input #left-input-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  #footer #footer-input #right-input-section {
    visibility: hidden;
    border: none;
    padding: 0 20px 20px;
    background-color: inherit;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  #footer #footer-input-fields {
    display: flex;
    flex-direction: column;
  }

  #footer #footer-submit-button {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  #stroke-opacity-input {
    max-width: '20px';
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
    height: 760px;
    width: 1000px;
    overflow: auto;
    display: flex;
    position: relative;
  }

  #drawzone {
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

  #connection-info {
    background-color: rgba(255, 255, 255, 0.8);
  }

  #position-container {
    border-top: 1px solid rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px 0 0;
  }
`;
