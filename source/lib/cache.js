import notify from './notify';
// import "browser-polyfill.js";
import waitForCurrentTabLoaded from './tab';
import { sanitize, patchSubject } from './util';
import { setCachedData } from '../storage/deUnivCache';

const cacheCurrent = async tab => waitForCurrentTabLoaded(async () => {
    const filename = `${sanitize(tab.title)}.mht`;
    let blob = await toPromise(chrome.pageCapture.saveAsMHTML, { tabId: tab.id });
    download(filename, await patchSubject(blob));
});

const cacheRemote = async url => {
    let filename =  url.substring(url.lastIndexOf('/')+1, url.indexOf(';'));
    let response = await fetch(chrome.runtime.getURL(url));
    let blob = await response.blob();
    download(await patchSubject(blob), filename, url);
}
 
const  cacheDocument = async (url, options) => {
    // TODO: implement function cacheDocument
}

async function download(blob, filename, url) {
    const fileMetadata = {
        title: filename.replace('.mht', ''),
        name: filename,
        url: URL.createObjectURL(blob),
        path: path, // TODO: path?
        type: filename.split('.')[-1] // TODO: working?
    };
    await chrome.downloads.download({
        conflictAction: 'prompt',
        name: fileMetadata.filename,
        saveAs: true,
        url: fileMetadata.url,
    });
    await setCachedData(fileMetadata);
    notify(fileMetadata);
}

// Event Handlers
export const handleCacheCurrent = async (tab) => {
	asPdf.value ? await cacheDocument(window.location.href) : await cacheCurrent(tab);
}

export const handleCacheRemote = async (url) => {
	asPdfRemote.value ? await cacheDocument(url) : await cacheRemote(tab);
}

// const commonActionId = 'SAVE_FOR_OFFLINE'

export const cache = {
    cacheCurrent,
    cacheRemote,
    cacheDocument,
    handleCacheCurrent,
    handleCacheRemote
};