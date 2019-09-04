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

// We are lazy loading its reducer.
import optionsReducer from '../reducers/options.js';
store.addReducers({
  optionsReducer
});

// These are the elements needed by this element.

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';
import { ButtonSharedStyles } from './button-shared-styles.js';

class Options extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
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

  render() {
    return html`
      <section>
        <h2>Options</h2>
      </section>
    `;
  }

  _checkoutButtonClicked() {
    store.dispatch(checkout());
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
  }
}

window.customElements.define('my-options', Options);
