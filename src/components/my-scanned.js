/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getCard } from '../actions/cardviewer.js';
import { addCard } from '../actions/collection.js';

// We are lazy loading its reducer.
import cardviewer from '../reducers/cardviewer.js';
import collection from '../reducers/collection.js';
store.addReducers({
  cardviewer,
  collection
});

// These are the elements needed by this element.

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class Scanned extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _card_name: { type: String },
      _card: { type: Object }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  updated() {
    if (!this._card.name && this._card_name) {
      store.dispatch(getCard(this._card_name));
    }
  }

  render() {
    return html`
      <section>
        <h2>${this._card.name || "Card not found"}</h2>
        <a target="_blank" rel="noopener noreferrer" href="https://www.cardmarket.com/en/YuGiOh/Products/Search?searchString=${this._card.name}">Card Market</a>
        <a target="_blank" rel="noopener noreferrer" href="https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=1&sess=1&keyword=${this._card.name.replace(/\s/g, '+')}&stype=1&ctype=&starfr=&starto=&pscalefr=&pscaleto=&linkmarkerfr=&linkmarkerto=&link_m=2&atkfr=&atkto=&deffr=&defto=&othercon=2">Card Search</a>
        <img src="${this._card.card_images[0].image_url}" alt="${this._card.name}">
        <br>
        <p>${JSON.stringify(this._card)}</p>
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._card_name = state.app.name;
    this._card = state.cardviewer.card;
  }
}

window.customElements.define('my-scanned', Scanned);
