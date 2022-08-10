const saveBtn = document.getElementById("saveBtn");
const loginId = document.getElementById("loginId");
const loginPwd = document.getElementById("loginPwd");
const toggle = document.querySelector("input[name=checkbox]");
const icon = document.querySelector(".icon");

chrome.storage.sync.get("OnOffState")
    .then(res => {
        if (res.OnOffState === "ON") {
            toggle.checked = true;
            icon.src = "../asset/icon/KWAuto.png"
        } else if (res.OnOffState === "OFF") {
            toggle.checked = false;
            icon.src = "../asset/icon/KWAuto-off.png"
        }
    })

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        chrome.storage.sync.set({OnOffState: "ON"})
        icon.src = "../asset/icon/KWAuto.png"
    } else {
        chrome.storage.sync.set({OnOffState: "OFF"})
        icon.src = "../asset/icon/KWAuto-off.png"
    }
})

// 저장된 아이디 비밀번호 불러오기
chrome.storage.sync.get("loginId")
    .then(res => loginId.value = res.loginId);
chrome.storage.sync.get("loginPwd")
    .then(res => loginPwd.value = res.loginPwd);

// local storage에 저장해야함
saveBtn.addEventListener("click", (e) => {
    chrome.storage.sync.set({loginId: loginId.value});
    chrome.storage.sync.set({loginPwd: loginPwd.value});
})
