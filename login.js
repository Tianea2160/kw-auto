// login page 구현
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
        loginId.value = res[0]?.loginId;
        loginPwd.value = res[1]?.loginPwd;
        loginBtn.click();
    }).catch(e => {
        console.log(e);
    })
}

chrome.storage.sync.get("OnOffState")
    .then(res => {
        console.log(res.OnOffState);
        if (res.OnOffState === "ON") {
            login();
        }
    });


