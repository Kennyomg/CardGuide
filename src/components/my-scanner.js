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

import slugify from 'slugify';

import { TesseractWorker, utils } from 'tesseract.js';
//import { TesseractWorker, utils } from 'tesseract.js';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

import * as mobilenet from '@tensorflow-models/mobilenet';

//const { loadLang } = utils;

class Scanner extends PageViewElement {

  static get styles() {
    return [
      SharedStyles,
      css`
        .scanner-booth {
          padding: 0px;
          background-color: transparent;
        }

        #videoElement {
          display: block;
          margin: 0 auto;
        	height: 80vh;
        	background: none;
          pointer-events:none;
          max-width: 100vw;
        }

        .capture-button {
          margin-top: 15px;
          cursor: pointer;
        }
      `
    ];
  }

  firstUpdated() {
    let video = this.shadowRoot.getElementById("videoElement"),
        capture = this.shadowRoot.getElementById("capture");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          console.log("Webcam started");



          capture.addEventListener('click', async () => {
            // Load the model.
            const model = await mobilenet.load();

            // Classify the image.
            const predictions =  await model.classify(video);

            console.log('Predictions: ');
            console.log(predictions);

          });

        })
        .catch((error) => {
          console.log("Something went wrong!");
        });
    }
  }

  render() {
    return html`
    <section class="scanner-booth">
      <input id="search-card" placeholder="Search card" @keyup=${(e) => this.searchEnter(e)}></input>
      <button @click=${this.searchButton}>Search</button>
      <h1 id="card-title"></h1>
      <video id="videoElement"></video>
      <div id="capture" class="circle capture-button"></div>
    </section>
    `;
  }

  searchEnter(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode == 13) {
      this.search(e.target.value);
    }
  }

  searchButton() {
    const name = this.shadowRoot.getElementById("search-card").value;
    if (name) {
      this.search(name);
    }
  }

  search(name) {
    const slug = slugify(name, { lower: true });
    location.href = `/scanned/${slug}`;
  }
}

window.customElements.define('my-scanner', Scanner);
