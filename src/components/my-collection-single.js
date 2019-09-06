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
import { getCollection } from '../actions/collection.js';

// We are lazy loading its reducer.
import collection from '../reducers/collection.js';
store.addReducers({
  collection
});

// These are the elements needed by this element.

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

class CollectionSingle extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      _collection_name: { type: String },
      _collection: { type: Object }
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
    this._collection_name = "";
    this._collection = { name: null };
  }

  updated() {
    if (!this._collection || this._collection.name !== this._collection_name) {
      store.dispatch(getCollection(this._collection_name));
    }
  }

  render() {
    return html`
      <section>
        <h2>${this._collection ? this._collection.name : "Box not found"}</h2>
      </section>
    `;
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._collection_name = state.app.name;
    this._collection = state.collection.collection;
  }
}

window.customElements.define('my-collection-single', CollectionSingle);
