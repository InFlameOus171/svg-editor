import { css } from 'lit';

export const layoutStyle = css`
  :host {
    transition: all 1s;
  }

  :host {
    margin: auto;
    padding: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #2196f3;
  }

  #footer {
    background-color: rgba(255, 255, 255, 0.8);
    flex: 100%;
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
    gap: 30px;
  }

  #drawzone {
    height: 40vh;
    max-width: 1920px;
    width: 100%;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.8);
    margin: auto;
  }

  #connection-info {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export const responsiveStyles = css`
  @media all and (max-width: 1023px) {
    #content {
      gap: 5px;
    }
  }

  @media all and (min-width: 1024px) {
    :host #content #drawzone {
      height: 55vh;
    }
  }

  @media all and (min-width: 1200px) {
    :host #content #drawzone {
      height: 70vh;
    }
  }

  @media all and (min-width: 1440px) {
    :host #content #drawzone {
      height: 85vh;
    }
  }
`;
