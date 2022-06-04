// eslint-disable-next-line import/no-unassigned-import
import './content.css';
import 'webext-base-css';
import cacheTarget from './lib/cache';
import optionsStorage from './options-storage.js';

/* Scema */
const model = {};

Object.defineProperties(model, {
  date: {
    set: (value) => {
      dateSpan.textContent = value;
    },
  },
  span: {
    set: (value) => {
      spanElement.textContent = value;
    },
  },
  urlHref: {
    set: (value) => {
      urlLink.href = value;
      urlLink.title = value;
    },
  },
  urlText: {
    set: (value) => {
      urlLink.textContent = value;
    },
  },
});

/* SELECTORS */
  
const dateSpan = document.getElementById('date');
const spanElement = document.getElementById('span');
const urlLink = document.getElementById('url');

const asPdf = document.getElementById('as-pdf');
const currentPageButton = document.getElementById('cache-current-button');

const urlinput = document.getElementById('remote-url-input');
const asPdfRemote = document.getElementById('as-pdf-remote');
const urlButton = document.getElementById('cache-remote-button');

/* Initialize Content */

const init = async () =>  {
	const options = await optionsStorage.getAll();

	asPdf.value = options.asPdfDefault;
	asPdfRemote.value = options.asPdfDefault;

	currentPageButton.addEventListener('click', handleCacheCurrent(tab));
	urlButton.addEventListener('click', handleCacheRemote(urlinput.value));
}

/* Event Handlers */

const handleCacheCurrent = async (tab) => {
	asPdf.value ? await cacheDocument(window.location.href) : await cacheCurrent(tab);
}

const handleCacheRemote = async (url) => {
	asPdfRemote.value ? await cacheDocument(url) : await cacheRemote(tab);
}

/* Run */

init();