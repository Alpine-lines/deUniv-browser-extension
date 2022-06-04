
const storageCache = {}; 

const initStorageCache = async () => {
    try {
        Object.assign(storageCache, await getAllStorageSyncData());
    } catch (error) {
        console.error(error);
    }
}

// Note: Once the Storage API gains promise support, this function can be greatly simplified.
function getAllStorageSyncData() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items); 
    });
  });
}

export default {
    storageCache, 
    initStorageCache,
    getAllStorageSyncData
}