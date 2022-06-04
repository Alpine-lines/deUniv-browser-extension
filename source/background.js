// eslint-disable-next-line import/no-unassigned-import
import {
    cacheCurrent,
    cacheRemote
} from './lib/cache';
import './options-storage.js';
import { getCurrentTab } from './lib/util';
import { initStorageCache } from './storage/deUnivCache';

/**
 * @title background.js 
 * @author Alpine-lines
 * @notice DeUniv Browser Extension Service Worker
 * 
 **/

 chrome.runtime.onInstalled.addListener(async () => {
    await initStorageCache();
    // chrome.storage.sync.set({number: 1}, function() {
    // 
    // });
});

chrome.action.onClicked.addListener(async (tab) => {
    try {
      await initStorageCache;
    } catch (e) {
        errorHandler(e);
    }
    // Normal action handler logic.
});

// chrome.browserAction.onClicked.addListener(function (tab) {
//     cacheCurrent(tab);
// });

// chrome.browserAction.onClicked.addListener(function (tab) {
    // cacheRemote(url);
// });

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        contexts: ["page"],
        title: "Cache current tab for offline reading",
        onclick: cacheCurrent(getCurrentTab),
    });
    chrome.contextMenus.create({
        contexts: ["page"],
        title: "Cache a remote webpage for offline reading (must provide a URL)",
        onclick: cacheRemote,
    });
    chrome.contextMenus.create({
        contexts: ["page"],
        title: "Browse Your DeUniv Cache",
        onclick: getAllStorageSyncData(),
    });
})

chrome.commands.onCommand.addListener((command) => {
    console.log('onCommand event received for message: ', command);
});

const run = async () =>  {
    async function setPopup(tab) {
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
    }
  
    // chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //   if (changeInfo.status == 'loading') {
    //     setPopup(tab);
    //   }
    // });
  
    // const tabs = await toPromise(chrome.tabs.query, {})
    // for (const tab of tabs) {
    //   setPopup(tab);
    // }
  }
  
  run();
  
