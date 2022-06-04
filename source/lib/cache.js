import { notify } from './notify';
import {
    patchSubject,
    sanitize
} from './util';

function waitForCurrentTabLoaded(callback) {
    chrome.tabs.reload();
    chrome.tabs.current(function(tab) {
        if (tab.status == 'complete') {
            callback();
            return;
        }
        window.setTimeout(function() {
            waitForCurrentTabLoaded(callback);
        }, 100);
    });
}

// function cacheCurrent(url, pdf=false) {
//     chrome.tabs.current(function(tab) {
//         chrome.tabs.reload(tab.id);
//         waitForCurrentTabLoaded(function() {
//             chrome.pageCapture.saveAsMHTML({'tabId': tab.id}, (mhtml) => {
//                 chrome.fileSystem.acceptOptions()
//                 chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(mhtml) {
//                     const f = mhtml.createWriter(function(writer) {
//                       writer.onerror = errorHandler;
//                       writer.onwriteend = function(e) {
//                         console.log('write complete', e);
//                         return e;
//                       };
//                       writer.write(new Blob([mhtml], {type: pdf ? 'application/pdf' : 'text/html'}));
//                     }, errorHandler);
//                     var fName = url.split("/").pop().split(";")[0];
//                     chrome.storage.sync().setItem(f.name, f.path);
//                     notify({
//                         name: f.name,
//                         path: f.path,
//                         fileType: pdf ? 'PDF' : 'HTML'
//                     })
//                 });
//             });
//         });
//     });
// }

async function cacheCurrent(tab) {
    waitForCurrentTabLoaded(() => {
        const filename = `${sanitize(tab.title)}.mht`;
        let blob = toPromise(chrome.pageCapture.saveAsMHTML, { tabId: tab.id });
        download(filename, await patchSubject(blob));
    });
}

async function cacheRemote(url) {
    let filename =  url.substring(url.lastIndexOf('/')+1, url.indexOf(';'));
    let response = await fetch(chrome.runtime.getURL(url));
    let blob = await response.blob();
    download(await patchSubject(blob), filename, url);
}
 
/* async function cacheDocument(url, options) {
   TODO: implement function cacheDocument
}*/

async function download(blob, filename, url) {
    const fileMetadata = {
        name: filename,
        url: URL.createObjectURL(blob),
        path: path, // TODO: path?
        type: filename.split('.')[-1] // TODO: working?
    }
    await chrome.downloads.download({
        conflictAction: 'prompt',
        filename: filename,
        saveAs: true,
        url: fileMetadata.url,
    });
    notify(fileMetadata);
}

// const commonActionId = 'SAVE_FOR_OFFLINE'

export default {
    cacheCurrent,
    cacheRemote,
    // cacheDocument
};