import { html } from 'lit';

export const getButtonColumn = (
  interval: [number, number],
  tools?: Array<any>
) =>
  tools
    ?.slice(interval[0], interval[1])
    .map(
      (tool, index) =>
        html`
          <span class="row-${index}"
            ><toolbox-button .props=${tool}></toolbox-button
          ></span>
        `
    );
