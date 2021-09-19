import { css } from 'lit';

export const layoutStyle = css`
  #layout {
    min-width: 400px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    background-color: #2196f3;
  }
  #layout > div {
    background-color: rgba(255, 255, 255, 0.8);
  }
  #header {
    grid-area: header;
    width: 100%;
  }
  #layout > #toolbox {
    background-color: rgba(255, 255, 255, 0.8);
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }
  #toolbox {
    padding: 5px;
  }
  #toolbox > .col-0,
  #toolbox > .col-1 {
    flex: 0.5 1 5%;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  #drawzone {
    flex: 2 1 45%;
    grid-area: drawzone;
  }
  #connection-info {
    flex: 0.5 1 5%;
  }
  #footer {
    flex: 100%;
  }
`;
