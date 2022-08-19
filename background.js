// on/off 기능 초기화
chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.sync.set({"OnOffState": "ON"})
    }
)

// fold 기능 state 초기화
chrome.runtime.onInstalled.addListener(() => {
        chrome.storage.sync.set({"CalendarFoldState": "ON"})
    }
)