import { css } from 'lit';

export const toolBoxButtonStyles = css`
  :host {
    display: flex;
  }

  button {
    aspect-ratio: 1;
    border-radius: 0;
    border: 1px solid black;
    padding: 5px;
    display: flex;
    flex-shrink: 2;
    justify-content: center;
    align-items: center;
  }

  button > img {
    aspect-ratio: 1;
    max-height: 35px;
  }

  button[isActive='false'] {
    border: 1px solid grey;
    background-color: white;
  }

  button[isActive='true'],
  button:hover {
    border: 1px solid blue;
    background-color: cyan;
  }

  button[disabled] {
    border: 1px solid grey;
    background-color: grey;
  }

  .tooltip {
    text-decoration: none;
    position: relative;
  }
  .tooltip span {
    color: #fff;
    position: fixed;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .tooltip:hover span {
    border-radius: 5px;
    padding: 10px;
    background-color: #555;
    visibility: visible;
    overflow: hidden;
    opacity: 1;
    z-index: 100;
  }
`;

export const selectedButtonStyle = css``;
