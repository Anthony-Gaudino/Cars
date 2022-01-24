import templateHtml from './CarCard.html';
import carSelection from '../CarSelection/CarSelection.js';

import hertzLogo from '../../../public/vendors/hertz.svg';
import avisLogo  from '../../../public/vendors/avis.svg';
import alamoLogo from '../../../public/vendors/alamo.svg';

const templateElement = document.createElement('template');

customElements.define('x-car-card', class extends HTMLDivElement {
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

    this.shadowRoot.querySelector('.select-button').addEventListener('click', e => {
      document.getElementById('carListContainer').hidden = true;

      const cs = document.createElement('div', { is : 'x-car-selection' });
      cs.props = this._props;
      cs.id = 'carSelection';

      document.body.appendChild(cs);
    });
  }
}, { extends: 'div' });
