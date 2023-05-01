// login page 구현
function encryption(content) {
    return window.btoa(content);
}

function decryption(encodedContent) {
    return window.atob(encodedContent);
}

const loginId = document.getElementById("loginId");
const loginPwd = document.getElementById("loginPwd");
const loginBtn = document.querySelector('.btn');

const login = () => {
    // promise 병렬 처리
    Promise.all([
        chrome.storage.sync.get("loginId"),
        chrome.storage.sync.get("loginPwd")
    ]).then(res => {
        if (!res[0]?.loginId || !res[1]?.loginPwd) {
            alert("KW Auto: id or password is not saved!\nPlease fill out the information.");
            return;
        }
        loginId.value = decryption(res[0]?.loginId);
        loginPwd.value = decryption(res[1]?.loginPwd);
        loginBtn.click();
    }).catch(e => {
        console.log(e);
    })
}

chrome.storage.sync.get("OnOffState")
    .then(res => {
        if (res.OnOffState === "ON") {
            login();
        }
    });


