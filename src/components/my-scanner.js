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
          console.log("Webcam started")



          capture.addEventListener('click', () => {
            let canvas = document.createElement('canvas');
            canvas.width = video.width;
            canvas.height = video.height;
            canvas.getContext('2d').drawImage(video, 0, 0)
            //video.pause();

            const worker = new TesseractWorker();

            utils.loadLang({ langs: 'eng', langPath: worker.options.langPath }).then(() => {
              worker.recognize(canvas.toDataURL("img/jpg"))
                    .progress(message => console.log(message))
                    .catch(err => console.error(err))
                    .then(result => {
                      worker.terminate();
                      console.log(result.text)
                      this.shadowRoot.getElementById("card-title").innerHTML = result.text;
                    })
                    .finally(resultOrError => console.log(resultOrError));
            });
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
    const slug = slugify(name);
    location.href = `/scanned/${slug}`;
  }
}

window.customElements.define('my-scanner', Scanner);
