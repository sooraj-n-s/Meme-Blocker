chrome.runtime.onInstalled.addListener(()=> {
  chrome.storage.sync.get(['blockedSites'], (r)=>{
    if(!Array.isArray(r.blockedSites)) {
      chrome.storage.sync.set({ blockedSites: ['docs.google.com','mail.google.com','stackoverflow.com'] });
    }
  });
});

function shouldBlock(url, blockedSites){
  try { const hn = new URL(url).hostname; return blockedSites.some(s => hn.includes(s)); }
  catch(e) { return false; }
}

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;
  chrome.storage.sync.get(['blockedSites'], (r) => {
    const blocked = r.blockedSites || [];
    if (shouldBlock(details.url, blocked)) {
      const redirectUrl = chrome.runtime.getURL('blocked.html') + '?src=' + encodeURIComponent(details.url);
      chrome.tabs.update(details.tabId, { url: redirectUrl });
    }
  });
}, { url: [{ schemes: ['http','https'] }] });
