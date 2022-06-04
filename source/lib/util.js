async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    
    let [tab] = await chrome.tabs.query(queryOptions);  // `tab` will either be a `tabs.Tab` instance or `undefined`.

    return tab;
}

function sanitize(filename) {
    return filename.replace(/[<>:"/\\|?*\x00-\x1F~]/g, '-');
}

async function patchSubject(blob) {
    let mht = await readBlob(blob);
    mht = mht.replace(/^(Subject: )(.*)$/m, `$1${tab.title}`);
    return new Blob([mht], { type: 'multipart/related' });
}

function readBlob(blob) {
    return new Promise(function (resolve, reject) {
        const fr = new FileReader();
        fr.onerror = function () {
            reject(fr.error);
        }
        fr.onload = function () {
            resolve(fr.result);
        }
        fr.readAsText(blob);
    });
}


function toPromise(fn, ...args) {
    return new Promise(function (resolve, reject) {
      args.push(function () {
        const error = chrome.runtime.lastError;
        error ? reject.call(this, error) : resolve.apply(this, arguments);
      });
      fn.apply(this, args);
    });
}

function handleError(error) {
    console.error(error);
}

export default {
    getCurrentTab,
    patchSubject,
    readBlob,
    sanitize,
    toPromise,
    handleError
}