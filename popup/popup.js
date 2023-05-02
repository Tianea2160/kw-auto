const saveBtn = document.getElementById("saveBtn");
const loginId = document.getElementById("loginId");
const loginPwd = document.getElementById("loginPwd");
const toggle = document.querySelector("input[name=checkbox]");
const icon = document.querySelector(".icon");
const shToggle = document.getElementById("shToggle");
const shButton = document.getElementById("shButton");

function encryption(content) {
    return window.btoa(content);
}

function decryption(encodedContent) {
    return window.atob(encodedContent);
}

chrome.storage.sync.get("OnOffState")
    .then(res => {
        if (res.OnOffState === "ON") {
            toggle.checked = true;
            icon.src = "../asset/icon/kw_auto_on.png"
        } else if (res.OnOffState === "OFF") {
            toggle.checked = false;
            icon.src = "../asset/icon/kw_auto_off.png"
        }
    })

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        chrome.storage.sync.set({OnOffState: "ON"})
        icon.src = "../asset/icon/kw_auto_on.png"
    } else {
        chrome.storage.sync.set({OnOffState: "OFF"})
        icon.src = "../asset/icon/kw_auto_off.png"
    }
})

shButton.addEventListener("click", (e) => {
    if (shButton.innerText === "SHOW") {
        shButton.innerText = "HIDE";
        loginPwd.type = "active";
    } else if (shButton.innerText === "HIDE") {
        shButton.innerText = "SHOW";
        loginPwd.type = "password";
    }
})

// 저장된 아이디 비밀번호 불러오기
chrome.storage.sync.get("loginId")
    .then(res => loginId.value = decryption(res.loginId));
chrome.storage.sync.get("loginPwd")
    .then(res => loginPwd.value = decryption(res.loginPwd));

// local storage에 저장해야함
saveBtn.addEventListener("click", (e) => {
    chrome.storage.sync.set({loginId: encryption(loginId.value)});
    chrome.storage.sync.set({loginPwd: encryption(loginPwd.value)});
})
