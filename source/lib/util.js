// import "browser-polyfill.js";

import tab from "./tab";

export const sanitize = filename => filename.replace(/[<>:"/\\|?*\u0000-\u001F~]/g, '-');

export const parseCacheItemMetadata = tabOrUrl => {

    const urlText = isTab ? tabOrUrl.url.split('://')[1] : tabOrUrl.split('://')[1];
    const pathname = tabOrUrl.title ? tabOrUrl.title : `${urlText.split('/').slice(1).join('/')}`;
    const filename = tabOrUrl.title ? tabOrUrl.title : `${sanitize(urlText.split('/').slice(1).join('-'))}.mthml`
    const fileMetadata = {
        tite: `${root.split('.')[0]}: ${pathname.split('/')[-1]}}`,
        filename: filename,
        root: `${urlText.split('/')[0]}`,
        pathname: pathname,
        url: tabOrUrl ? tabOrUrl.url : tabOrUrl,
        type: '.mhtml',
    };
}

// export const patchSubject = async blob => {
//     let mht = await readBlob(blob);
//     mht = mht.replace(/^(Subject: )(.*)$/m, `$1${tab.title}`);
//     return new Blob([mht], { type: 'multipart/related' });
// };

// export const readBlob = blob => new Promise((resolve, reject) => {
//         const fr = new FileReader();

//         fr.addEventListener('error', () => {
//             reject(fr.error);
//         });

//         fr.addEventListener('load', () => {
//             resolve(fr.result);
//         });

//         fr.readAsText(blob);
//     });

export const toPromise = async (fn, ...args) => new Promise((resolve, reject) => {
      args.push(() => {
        const error = chrome.runtime.lastError;
        error ? fn.call(reject, error) : fn.apply(resolve, arguments);
      });
      fn.apply(resolve, args);
    });

export const handleError = error => console.error(error);

// export default util = {
    // setPopup,
    // sanitize,
    // patchSubject,
    // readBlob,
    // handleError,
    // toPromise,
// };
