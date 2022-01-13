import { css } from 'lit';

// source (slightly changed)
// https://www.w3schools.com/howto/howto_css_menu_icon.asp

export const menuButtonStyles = css`
  :host {
      display: none;
    z-index: 100;
    position: absolute;
  }
  #button-container {
    display: inline-block;
    cursor: pointer;
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 39px;
    height: 5px;
    background-color: #666;
    border-radius: 10px;
    margin: 6px 0;
    transition: 0.4s;
  }

  .isActive .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  .isActive .bar2 {
    opacity: 0;
  }

  .isActive .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }

  @media only screen and (max-width: 960px) {
    :host {
        display: flex;
    }
`;
