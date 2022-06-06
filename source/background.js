
import {
    setPopup,
} from './lib/util';
import './storage/options-storage.js';
import { getCurrentTab } from './lib/tab';
import browser from 'webextension-polyfill';
import { handleBrowseCache, initDeUnivCache } from './storage/deUnivCache';
import { handleCacheCurrent, handleCacheRemote } from './lib/cache';
import optionsStorage from './storage/options-storage.js';

/**
 * @title background.js
 * @author Alpine-lines
 * @notice DeUniv Browser Extension Service Worker
 *
 **/

/* Install */
chrome.runtime.onInstalled.addListener(async () => {
    await optionsStorage.getAll();
    chrome.contextMenus.create({
        contexts: ['action'],
        id: 'cache-content',
        title: 'Cache current tab for offline reading',
    });
    // chrome.contextMenus.create({
    //     contexts: ["cache-content-as-pdf"],
    //     title: "Cache current tab for offline reading as a PDF file",
    // });
    chrome.contextMenus.create({
        contexts: ['action'],
        id: 'browse-cached-content',
        title: 'Browse Your DeUniv Cache',
    });
});

/* Event Listeners */

chrome.storage.sync.set({key: 'key', value: {title: 'title', cacheId: 1, url: 'https://fuckery.org'}});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == 'cache-content') {
        handleCacheCurrent(tab);
    // } else if (info.menuItemId == 'cache-content') {
        // cacheDocument(tab);
    } else if (info.menuItemId === 'browse-cached-content') {
        handleBrowseCache();
    }
});

chrome.action.onClicked.addListener(async tab => {
    await handleCacheCurrent(tab);
});

// chrome.action.onClicked.addListener(function (tab) {
    // handleCacheRemote(url);
// });

chrome.action.onClicked.addListener(async () => {
    await handleBrowseCache();
});

chrome.commands.onCommand.addListener(command => {
    console.log('onCommand event received for message:', command);
});

const run = async () => {};

run();

