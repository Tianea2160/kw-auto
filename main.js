// main page 동작 정의
const login = document.querySelector(".btn-login");

chrome.storage.sync.get("OnOffState")
    .then(res => {
        if (res.OnOffState === "ON") {
            if (login.innerText === "로그인") {
                login.click();
            }
        }
    })




