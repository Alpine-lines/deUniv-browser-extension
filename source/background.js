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
        contexts: ["cache-current"],
        title: "Cache current tab for offline reading",
        onclick: handleCacheCurrent(getCurrentTab),
    });
    // chrome.contextMenus.create({
    //     contexts: ["cache-remote"],
    //     title: "Cache a remote webpage for offline reading (must provide a URL)",
    //     onclick: handleCacheRemote(window.location.href),
    // });
    chrome.contextMenus.create({
        contexts: ["browse-cache"],
        title: "Browse Your DeUniv Cache",
        onclick: getCache(),
    });
    setPopup();
});

/* Event Listeners */

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == 'cache-current') {
        handleCacheCurrent(tab);
    } else if (info.menuItemId == 'cache-remote') {
        handleCacheRemote(window.location.href);
    } else if (info.menuItemId === 'browse-cache') {
        handleBrowseCache();
    }
});

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
  
