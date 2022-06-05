import { handleError } from '../lib/util';

const storageCache = {};

export const initDeUnivCache = async () => {
  Object.assign(storageCache, await getCache());
}

// Getters
export const getCache = () => new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, items => {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(items);
    });
  });

export const getCachedData = key => new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], value => {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(value);
    });
  });

// Setters
export const setCachedData = data => new Promise((resolve, reject) => {
  chrome.storage.sync.set({key: data.title, value: data}, () => {
    chrome.runtime.lastError
      ? reject(chrome.runtime.lastError)
      : resolve(data);
  });
});

// Event Handlers
export const handleBrowseCache = async containerElement => await getCache().filter(item => item.namespace === 'cache').map((value, i) => {
  const cacheItem = document.createElement('div');
  cacheItem.setAttribute('id', `cache-item-${i}`);
  cacheItem.setAttribute('class', 'cache-item');

  containerElement.append(cacheItem);

  const cacheItemAnchor = document.createElement('a');
  cacheItemAnchor.setAttribute('id', `cache-item-anchor-${i}`);
  cacheItemAnchor.setAttribute('class', 'cache-item-anchor');

  cacheItem.innerText = value.title;

  cacheItemAnchor.addEventListener('click', viewCachedData(value.cacheId));

  cacheItem.append(cacheItemAnchor);
});// `<div id='cached-data-${key}' class='cached-data'><a href='${value.url}'${value.file}</a></div>`).join();

export default {
  initDeUnivCache,
  getCache,
  getCachedData,
  setCachedData,
  handleBrowseCache,
};
