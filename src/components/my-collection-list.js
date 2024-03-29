/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { getAllCollections, createCollection } from '../actions/collection.js';

// We are lazy loading its reducer.
import collection from '../reducers/collection.js';
store.addReducers({
  collection
});

// These are the elements needed by this element.
// import './shop-products.js';
// import './shop-cart.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';
import { addToCartIcon } from './my-icons.js';

class CollectionList extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
      _collection_list: { type: Array },
      _error: { type: String },
      _creation_input: { type: String },
    };
  }

  static get styles() {
    return [
      SharedStyles,
      ButtonSharedStyles,
      css`
        button {
          border: 2px solid var(--app-dark-text-color);
          border-radius: 3px;
          padding: 8px 16px;
        }

        button:hover {
          border-color: var(--app-primary-color);
          color: var(--app-primary-color);
        }

        .cart,
        .cart svg {
          fill: var(--app-primary-color);
          width: 64px;
          height: 64px;
        }

        .circle.small {
          margin-top: -72px;
          width: 28px;
          height: 28px;
          font-size: 16px;
          font-weight: bold;
          line-height: 30px;
        }
      `
    ];
  }

  constructor() {
    super();
    this._collection_list = [];
  }

  firstUpdated() {
    store.dispatch(getAllCollections());
  }

  render() {
    return html`
      <section>
        <h2>List of collections</h2>
        <input type="text" value="${this._creation_input}" placeholder="Collection name" on-change="${(e) => this._inputChanged(e) }" /><button on-click="${(e) => this._submitCollection() }">Create</button>
        <ul>
          ${this._collection_list.map(val => html`<li><a href="/collection/${val.name}">${val.name}</a></li>`)}
        </ul>
      </section>
    `;
  }

  _inputChanged(e) {
    console.log(e);
    this._creation_input = e.currentTarget.value;
  }

  _submitCollection() {
    console.log(this._creation_input);
    store.dispatch(createCollection(this._creation_input));
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._creation_input = state._creation_input;
    this._collection_list = state.collection.collections;
    this._error = state.collection.error;
  }
}

window.customElements.define('my-collection-list', CollectionList);
