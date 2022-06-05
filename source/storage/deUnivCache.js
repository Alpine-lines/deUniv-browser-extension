import { handleError } from '../lib/util';

export const initDeUnivCache = async () => {
    try {
        window.deUnivCache = new Object.assign(deUnivCache, );
    } catch (error) {
        handleError(error);
    }
}

// *tmp*
//
// if (chrome.runtime.lastError) {
//   return reject(chrome.runtime.lastError);
// }  
// resolve(items);  

// Getters
export const getCache = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(
        items.map(item => JSON.parse(item))
      );
    });
  });
}

export const getCachedData = key => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (value) => {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(JSON.parse(value));
    });
  });
}

// Setters
export default async function setCachedData(data) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data.filename, (data) => {
      chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(JSON.stringify(data));
    });
  });
}

// export const deunivCache = {
//     initDeUnivCache,
//     getCache,
//     getCachedData,
//     setCachedData
// }