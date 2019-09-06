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

// We are lazy loading its reducer.
import cardviewer from '../reducers/cardviewer.js';
store.addReducers({
  cardviewer
});

// These are the elements needed by this element.

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class Scanned extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _card: { type: Object }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  updated() {
    if (!this._card.name) {
      store.dispatch(getCard("Pot of Greed"));
    }
  }

  render() {
    return html`
      <section>
        <h2>${this._card.name || "Card not found"}</h2>
        <img src="${this._card.card_images[0].image_url}" alt="${this._card.name}">
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._card = state.cardviewer.card;
  }
}

window.customElements.define('my-scanned', Scanned);
