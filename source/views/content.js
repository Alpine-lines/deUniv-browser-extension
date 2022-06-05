import {
  handleCacheCurrent,
  handleCacheRemote,
} from '../lib/cache';
import { handleBrowseCache } from '../storage/deUnivCache';

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

const cachedDataContainer = document.querySelector('#cached-data-container');
const browseCachedDataButton = document.querySelectorAll('cached-data');
const asPdf = document.querySelector('#as-pdf');
const cacheCurrentButton = document.querySelector('#cache-current-button');
const urlInput = document.querySelector('#remote-url-input');
const asPdfRemote = document.querySelector('#as-pdf-remote');
const cacheRemoteButton = document.querySelector('#cache-remote-button');

// Initializer
const init = async () => {
	const options = await getOptions();

	asPdf.value = options.asPdfDefault;
	asPdfRemote.value = options.asPdfDefault;

	cacheCurrentButton.addEventListener('click', handleCacheCurrent(tab));
	cacheRemoteButton.addEventListener('click', handleCacheRemote(urlInput.value));
	browseCachedDataButton.addEventListener('click', handleBrowseCache(cachedDataContainer));
};

init();
