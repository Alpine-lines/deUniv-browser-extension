import notify from './notify';
import { waitForCurrentTabLoaded } from './tab';
import { parseCacheItemMetadata } from './util';
import { setCachedData } from '../storage/deUnivCache';

// const commonActionId = 'SAVE_FOR_OFFLINE'

const cacheCurrent = async tab => waitForCurrentTabLoaded(async () => {
    await saveContentToCache(parseCacheItemMetadata(tab));
});

const cacheRemote = async url => {
    await saveContentToCache(parseCacheItemMetadata(url));
};

const cacheDocument = async (url, options) => {
    // TODO: implement function cacheDocument
};

const saveContentToCache = async (fileMetadata) => {
    await chrome.downloads.download({
        conflictAction: 'prompt',
        name: fileMetadata.filename,
        saveAs: true,
        url: fileMetadata.url,
        namespace: 'cache'
    }, async cacheId => {
        fileMetadata.cacheId = cacheId;
        await setCachedData(fileMetadata);
        notify(fileMetadata);
    });
}

// Event Handlers
export const handleCacheCurrent = async tab => {
	asPdf.value ? await cacheDocument(window.location.href) : await cacheCurrent(tab);
};

export const handleCacheRemote = async url => {
	asPdfRemote.value ? await cacheDocument(url) : await cacheRemote(tab);
};


export const cache = {
    cacheCurrent,
    cacheRemote,
    cacheDocument,
    handleCacheCurrent,
    handleCacheRemote,
};
