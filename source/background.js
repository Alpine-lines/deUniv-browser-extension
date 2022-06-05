// eslint-disable-next-line import/no-unassigned-import
import { 
    setPopup
} from './lib/util';
import { getCurrentTab } from './lib/tab';
import { handleCacheCurrent, handleCacheRemote } from './lib/cache';
import { initDeUnivCache } from './storage/deUnivCache';
import { initOptionStorage, refreshOptions } from './storage/options-storage.js';

/**
 * @title background.js 
 * @author Alpine-lines
 * @notice DeUniv Browser Extension Service Worker
 * 
 **/

/* Install */
chrome.runtime.onInstalled.addListener(async () => {
    initOptionStorage(); 
    await initDeUnivCache();
    chrome.contextMenus.create({
        contexts: ["page"],
        title: "Cache current tab for offline reading",
        onclick: handleCacheCurrent(getCurrentTab),
    });
    // chrome.contextMenus.create({
    //     contexts: ["page"],
    //     title: "Cache a remote webpage for offline reading (must provide a URL)",
    //     onclick: handleCacheRemote(window.location.href),
    // });
    chrome.contextMenus.create({
        contexts: ["page"],
        title: "Browse Your DeUniv Cache",
        onclick: getCache(),
    });
    setPopup();
});

/* Event Listeners */

chrome.browserAction.onClicked.addListener(async (tab) => {
    await handleCacheCurrent(tab);
});

// chrome.browserAction.onClicked.addListener(function (tab) {
    // handleCacheRemote(url);
// });

chrome.browserAction.onClicked.addListener(async (tab) => {
    await getCache();
});

chrome.commands.onCommand.addListener((command) => {
    console.log('onCommand event received for message: ', command);
});

const run = async () =>  {
    await refreshOptions();
}
  
run();
  
