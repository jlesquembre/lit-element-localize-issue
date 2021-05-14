/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {msg, configureLocalization} from '@lit/localize';

export const {setLocale} = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: (locale) => import(`/locales/${locale}.js`),
});
setLocale('en');

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  @property() name = 'John';
  @property() surname = 'Doe';
  @property() lang = 'en';

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('lit-localize-status', (event) => {
      if (event.detail.status === 'ready') {
        console.log(`Loaded new locale: ${event.detail.readyLocale}`);
        this.requestUpdate();
      }
    });
  }

  render() {
    return msg(html`
      <h1>Hello, ${this.name} ${this.surname}!</h1>
      <div>Current language: ${this.lang}</div>
      <button @click=${this._toogleLang} part="button">Toogle language</button>
      <slot></slot>
    `);
  }

  private _toogleLang() {
    if (this.lang === 'en') this.lang = 'es';
    else this.lang = 'en';
    setLocale(this.lang);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
