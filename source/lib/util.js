// import "browser-polyfill.js";

export const setPopup = async tab => {
    if (/^file:\/\/\/.*\.mht(ml)?$/i.test(tab.url)) {
        chrome.browserAction.setBadgeText({ tabId: tab.id, text: 'info' });
        const fileEnabled = await toPromise(chrome.permissions.contains, {
            origins: ['file:///*'],
        });
        chrome.browserAction.setPopup({
            tabId: tab.id,
            popup: fileEnabled ? 'content.html' : 'permissions.html',
        });
    }
};

export const sanitize = filename => filename.replace(/[<>:"/\\|?*\x00-\x1F~]/g, '-');

export const patchSubject = async blob => {
    let mht = await readBlob(blob);
    mht = mht.replace(/^(Subject: )(.*)$/m, `$1${tab.title}`);
    return new Blob([mht], { type: 'multipart/related' });
};

export const readBlob = blob => new Promise((resolve, reject) => {
        const fr = new FileReader();
        
        fr.addEventListener('error', () => {
            reject(fr.error);
        });

        fr.addEventListener('load', () => {
            resolve(fr.result);
        });

        fr.readAsText(blob);
    });

export const toPromise = async (fn, ...args) => {
    return new Promise((resolve, reject) => {
      args.push(() => {
        const error = chrome.runtime.lastError;
        error ? fn.call(reject, error) : fn.apply(resolve, arguments);
      });
      fn.apply(resolve, args);
    });
};

export const handleError = error => console.error(error);

// export default util = {
    // setPopup,
    // sanitize,
    // patchSubject,
    // readBlob,
    // handleError,
    // toPromise,
// };
