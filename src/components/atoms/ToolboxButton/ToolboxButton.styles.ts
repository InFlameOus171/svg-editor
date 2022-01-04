import { css } from 'lit';

export const toolBoxButtonStyles = css`
  :host {
    display: block;
  }

  button {
    aspect-ratio: 1;
    border-radius: 0;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button > img {
    max-height: 75px;
    transform: scale(0.8);
  }

  button:not(.isSelected) {
    border: 1px solid grey;
    background-color: white;
  }

  button.isSelected {
    border: 1px solid blue;
    background-color: cyan;
  }

  /*
    https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_tooltip
  */
  .tooltip {
    position: relative;
    display: inline-block;
  }

  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltip .tooltiptext::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`;

export const selectedButtonStyle = css``;
