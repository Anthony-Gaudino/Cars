import templateHtml from './CarSelection.html';

import hertzLogo from '../../../public/vendors/hertz.svg';
import avisLogo  from '../../../public/vendors/avis.svg';
import alamoLogo from '../../../public/vendors/alamo.svg';

const templateElement = document.createElement('template');

customElements.define('x-car-selection', class extends HTMLDivElement {
  constructor(props) {
    super();

    this._props;

    this.attachShadow({mode: 'open'});
  }

  set props(p) {
    this._props = p;
    this._props.vendorLogos = {
      hertz : hertzLogo,
      avis  : avisLogo,
      alamo : alamoLogo
    };

    templateElement.innerHTML = templateHtml.interpolate(this._props).replaceAll('-=', '=');

    this.render();
  }

  render() {
    this.shadowRoot.replaceChildren(templateElement.content.cloneNode(true));

    this.shadowRoot.querySelector('.back-button').addEventListener('click', e => {
      document.getElementById('carListContainer').hidden = false;
      document.getElementById('carSelection').remove();
    });
  }
}, { extends: 'div' });
