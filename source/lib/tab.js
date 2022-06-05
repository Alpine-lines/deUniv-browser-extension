export const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

export default waitForCurrentTabLoaded = async callback => {
    await chrome.tabs.reload();
    await chrome.tabs.current(tab => {
        if (tab.status === 'complete') {
            callback();
            return;
        }

        window.setTimeout(() => {
            waitForCurrentTabLoaded(callback);
        }, 100);
    });
}
