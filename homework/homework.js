const select = document.querySelector(".form-control.form-control-sm");

const getYearhakgiAtnlcSbjectList = () => {
    return new Promise((resolve, reject) => {
        const _xhr = new XMLHttpRequest();
        _xhr.open("POST", "https://klas.kw.ac.kr/std/cmn/frame/YearhakgiAtnlcSbjectList.do", true);
        _xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        _xhr.onload = () => {
            if (_xhr.status == 200) {
                resolve(_xhr.response);
            } else {
                resolve("");
            }
        }
        _xhr.send(JSON.stringify({}));
    })
}

const getTaskStdList = (body) => {
    return new Promise((resolve, reject) => {
        const _xhr = new XMLHttpRequest();
        _xhr.open("POST", "https://klas.kw.ac.kr/std/lis/evltn/TaskStdList.do", true);
        _xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        _xhr.onload = () => {
            if (_xhr.status == 200) {
                resolve(_xhr.response);
            } else {
                resolve("");
            }
        }
        _xhr.send(JSON.stringify(body));
    })
}

const process = () => {
    getYearhakgiAtnlcSbjectList()
        .then(res => {
            // 기존에 있던 과제 관련 노드를 전부 삭제한다.
            const child = document.querySelectorAll(".HwProgress")
            child.forEach(ch => {
                let pa = ch.parentNode;
                pa.removeChild(ch);
            })
            return res;
        }).then(res => {
        const yearhakgi = JSON.parse(res);
        for (let i = 0; i < yearhakgi[select.selectedIndex]?.subjList.length; i++) {
            getTaskStdList({
                selectChangeYn: "Y",
                selectSubj: yearhakgi[select.selectedIndex].subjList[i].value,
                selectYearhakgi: select.value
            }).then(hw => {
                const hwArray = JSON.parse(hw);
                const doHwSize = hwArray.filter(h => h.submityn === "Y").length;
                const totalHwSize = hwArray.length;

                // 현재까지의 진행 상황 메세지로 만들기
                let hwMessage = "과제 " + doHwSize + "/" + totalHwSize + " 완료";

                // lessontime에 대해서 순회하면서 찾기
                for (let k = 1; k < 4; k++) {
                    let className = ".namecol0" + (i + 1) + ".lessontime" + k;
                    const subjDivs = document.querySelectorAll(className);
                    if (subjDivs.length === 0) continue;// 만약 아무것도 발견되지 않는다면 다음 단계 진행

                    for (let j = 0; j < subjDivs.length; j++) {
                        // 자식 요소 생성
                        const child = document.createElement("p");
                        child.setAttribute("class", "HwProgress");
                        child.innerText = hwMessage;
                        child.style.color = doHwSize === totalHwSize ? "green" : "red";

                        // append
                        subjDivs[j].appendChild(child);
                    }
                }
            })
        }
    })
}

window.onload = process;

// select가 동작하면 진행
select.addEventListener("change", () => {
    process();
});