import {
  handleCacheCurrent,
  handleCacheRemote,
} from '../lib/cache';
import 'webext-base-css';
import '../styles/styles.css';
import '../styles/options.css';
import optionsStorage  from '../storage/options-storage';
import { getCache, handleBrowseCache } from '../storage/deUnivCache';

// Initializer
const init = async () => {
	const storage = await getCache();
	alert(JSON.parse(storage));
	const browseCachedDataButton = document.querySelector('#browse-cached-data-button');
	const asPdf = document.querySelector('#as-pdf');
	const cacheCurrentButton = document.querySelector('#cache-current-button');
	const urlInput = document.querySelector('#remote-url-input');
	const asPdfRemote = document.querySelector('#as-pdf-remote');
	const cacheRemoteButton = document.querySelector('#cache-remote-button');

	const options = await optionsStorage.getAll();

	asPdf.value = options.asPdfDefault;
	asPdfRemote.value = options.asPdfDefault;

	cacheCurrentButton.addEventListener('click', handleCacheCurrent);
	cacheRemoteButton.addEventListener('click', handleCacheRemote);
	browseCachedDataButton.addEventListener('click', handleBrowseCache);
};

init();
