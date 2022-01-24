import templateHtml from './Header.html';

import partnerLogo from '../../../public/partner_logos/partner.svg';

const templateElement = document.createElement('template');

customElements.define('x-header', class extends HTMLElement {
  constructor() {
    super();

    this.tplVars = {
      partnerLogo
    };

    this.attachShadow({mode: 'open'});
    templateElement.innerHTML = templateHtml.interpolate(this.tplVars).replaceAll('-=', '=');

    this.render();
  }

  render() {
    this.shadowRoot.replaceChildren(templateElement.content.cloneNode(true));
  }
}, { extends: 'header' });
