const storageCache = [{}];

export const initDeUnivCache = async () => {
  Object.assign(
    storageCache, 
    await chrome.storage.sync.get(null, items => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(JSON.parse(items));
      }
    })
  );
}

// Getters
export const getCache = () => async () => storageCache.length > 1 
  ? storageCache 
  : await chrome.storage.sync.get(null, items => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    } else {
      resolve(JSON.parse(items));
    }
  });

export const getCachedData = key => new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], value => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(JSON.parse(value));
      }
    });
  });

// Setters
export const setCachedData = data => new Promise((resolve, reject) => {
  chrome.storage.sync.set({key: data.title, value: data}, () => {
    if (chrome.runtime.lastError) {
      reject(chrome.runtime.lastError);
    } else {
      resolve(data);
    }
  });
});

// Event Handlers
export const handleBrowseCache = async () => {
  const storage = await getCache();
  alert(JSON.stringify(storage))
  storage.filter(item => item.namespace === 'cache').map((value, i) => {
    const containerElement = document.querySelector('#cached-data-container');

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
}
export default {
  initDeUnivCache,
  getCache,
  getCachedData,
  setCachedData,
  handleBrowseCache,
};
