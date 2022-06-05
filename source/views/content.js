// import './content.css';
// import 'webext-base-css';
// import "browser-polyfill.js";
import {
  handleCacheCurrent,
  handleCacheRemote,
} from '../lib/cache';
// import * as data from './storage/options-storage.js';

// Scema
// const model = {};

// Object.defineProperties(model, {
//   date: {
//     set: value => {
//       dateSpan.textContent = value;
//     },
//   },
//   span: {
//     set: value => {
//       spanElement.textContent = value;
//     },
//   },
//   urlHref: {
//     set: value => {
//       urlLink.href = value;
//       urlLink.title = value;
//     },
//   },
//   urlText: {
//     set: value => {
//       urlLink.textContent = value;
//     },
//   },
// });

// Selectors

const dateSpan = document.querySelector('#date');
const spanElement = document.querySelector('#span');
const urlLink = document.querySelector('#url');
const asPdf = document.querySelector('#as-pdf');
const cacheCurrentButton = document.querySelector('#cache-current-button');
const urlinput = document.querySelector('#remote-url-input');
const asPdfRemote = document.querySelector('#as-pdf-remote');
const cacheRemoteButton = document.querySelector('#cache-remote-button');

// Initializer
const init = async () => {
	const options = await getOptions();

	asPdf.value = options.asPdfDefault;
	asPdfRemote.value = options.asPdfDefault;

	cacheCurrentButton.addEventListener('click', handleCacheCurrent(tab));
	cacheRemoteButton.addEventListener('click', handleCacheRemote(urlinput.value));
};

init();
