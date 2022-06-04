// eslint-disable-next-line import/no-unassigned-import
import 'webext-base-css';
import './options.css';

// Don't forget to import this wherever you use it
import browser from 'webextension-polyfill';

import optionsStorage from './options-storage.js';

const asPdf = document.getElementById('as-pdf');
const currentPageButton = document.getElementById('save-current-page-html');
const urlinput = document.getElementById('save-url-input');
const asPdfUrl = document.getElementById('as-pdf-url');
const urlButton = document.getElementById('save-url-button');

const init = async () => {
	await optionsStorage.syncForm('#options-form');
	updateOutputColor();
}

init();
