async function handleEvent(tab, sender, sendResponse) {
  const url = sender ? sender.origin : new URL(tab.url).origin;
  if (tab === 'abort') {
    try {
      console.log(await fetch('http://localhost:8000', {
        method: 'head',
        cache: 'no-store'
      }));
    } catch (e) {
      console.log(e);
      return false;
    }
  }
  await chrome.declarativeNetRequest.updateSessionRules({
    addRules: [{
      "id": 1,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "responseHeaders": [{
          "header": "content-security-policy",
          "operation": "remove"
        }, {
          "header": "content-security-policy-report-only",
          "operation": "remove"
        }, {
          "header": "cross-origin-embedder-policy",
          "operation": "remove"
        }]
      },
      "condition": {
        "urlFilter": url,
        "resourceTypes": [
          "main_frame", 
          "sub_frame", 
          "script", 
          "object", 
          "xmlhttprequest", 
          "csp_report", 
          "other"
        ]
      }
    }],
    removeRuleIds: [1]
  });
  console.log(await await chrome.declarativeNetRequest.getSessionRules());
  await chrome.runtime.sendNativeMessage('nm_php', {});
}

chrome.runtime.onInstalled.addListener((e)=>console.log(e));

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e)=>console.log(e));

chrome.action.onClicked.addListener(handleEvent);

chrome.runtime.onMessageExternal.addListener(handleEvent);
