import templateHtml from './SubHeader.html';

const templateElement = document.createElement('template');

customElements.define('x-sub-header', class extends HTMLDivElement {
  constructor(props) {
    super();

    this.props;

    this.attachShadow({mode: 'open'});
  }

  set props(p) {
    this._props = p;

    templateElement.innerHTML = templateHtml.interpolate(this._props).replaceAll('-=', '=');

    this.render();
  }

  render() {
    this.shadowRoot.replaceChildren(templateElement.content.cloneNode(true));

    const carFilter = this.shadowRoot.getElementById('carFilter');

    carFilter.value = this._props.filter;
    carFilter.addEventListener('change', e => this._props.filterChangeHandler(e));
  }
}, { extends: 'div' });
