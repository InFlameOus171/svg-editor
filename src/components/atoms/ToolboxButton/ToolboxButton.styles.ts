import { css } from 'lit';

export const toolBoxButtonStyles = css`
  :host {
    display: block;
  }

  button {
    aspect-ratio: 1;
    border-radius: 0;
    border: 1px solid black;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button > img {
    max-height: 75px;
    transform: scale(0.8);
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
