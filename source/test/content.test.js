// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// API test for chrome.extension.pageCapture.
// browser_tests.exe --gtest_filter=ExtensionPageCaptureApiTest.*

import {
  getCache,
  getCachedData,
  setCachedData,
  handleBrowseCachedData
} from '../storage/deUnivCache';
import { waitForCurrentTabLoaded } from '../lib/tab';

const assertEq = chrome.test.assertEq;
const assertTrue = chrome.test.assertTrue;
const fail = chrome.test.callbackFail;
const pass = chrome.test.callbackPass;

var testUrl = 'http://www.github.com/Alpine-lines/deUniv-browser-extension';

const testPageCapture = (data, isFile) => {
  assertEq(undefined, chrome.runtime.lastError);
  assertTrue(data != null);
  assertTrue(data.size > 100);
  var reader = new FileReader();
  reader.onload = function(e) {
    if (!isFile) {
      var text = e.target.result;
      assertTrue(text.indexOf(testUrl) != -1);
      assertTrue(text.indexOf('logo.png') != -1);
    }
    // Run the GC so the blob is deleted.
    window.setTimeout(function() {
      window.gc();
    });
    window.setTimeout(function() {
      chrome.test.notifyPass();
    }, 0);
  };
  reader.readAsText(data);
};

const testCacheCurrent = async () => {
  chrome.tabs.create({url: testUrl}, callbackPass(() => {
    waitForCurrentTabLoaded(async () => {
      const filename = `${sanitize(tab.title)}.mht`;
      const title = filename.replace('.mht', '');
      assertEq('deUniv-browser-extension.mht', filename, `it should parse the filename properly`);
      const blob = await toPromise(chrome.pageCapture.saveAsMHTML, { tabId: tab.id });
      download(filename, chrome.test.callbackPass(() => await patchSubject(blob)));
      testPageCapture(await getCachedData(title), false);
    });
  }));
};

const testCacheRemote = async () => {
  const title =  testUrl.substring(testUrl.lastIndexOf('/')+1, testUrl.indexOf(';'));
  const filename = filename.concat('.mht');
  assertEq('deUniv-browser-extension.mht', filename, `it should parse the filename properly`);
  const response = await fetch(chrome.runtime.getURL(url));
  const blob = await response.blob();
  download(filename, await patchSubject(blob));
  testPageCapture(await getCachedData(title), false);
};

const testCacheDocument = async () => {};

const testBrowseCache = async () => {};

chrome.test.getConfig(config => {
  
  chrome.test.runTests([
    async function handleCacheCurrentNoPDF(asPdf=false) {
      asPdf = false; // Mock: simulate asPdf.value being false;
      asPdf ? await testCacheDocument(window.location.href) : await testCacheCurrent(tab);
    },
    async function handleCacheCurrentAsPDF(asPdf=false) {
      asPdf = false; // Mock: simulate asPdf.value being false;
      asPdf ? await testCacheDocument(window.location.href) : await testCacheCurrent(tab);
    },
    async function handleCacheRemoteNoPDF() {
      asPdf = false; // Mock: simulate asPdf.value being false;
      asPdf ? await testCacheDocument(testUrl) : await testCacheRemote(tab);
    },
    // async function handleCacheRemoteAsPDF() {
    //   asPdf = false; // Mock: simulate asPdf.value being false;
    //   asPdf ? await testCacheDocument(testUrl) : await testCacheRemote(tab);
    // },
    async function handleBrowseCacheTest(cachedDataContainer) {
      testBrowseCachedData(cachedDataContainer => {

      })
    }
  ]);
});