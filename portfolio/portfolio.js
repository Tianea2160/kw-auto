// 기존의 html에 있던 요소들
const module = document.getElementById("appModule")
const table = document.querySelector(".AType")
const tbody = table.getElementsByTagName("tbody")[0]

// 새롭게 집어 넣는 검색 요소들
const input = document.createElement("input")
input.id = "search-input"
input.type = "text"
input.placeholder = "찾고자 하는 과목명을 적으세요"

const search = document.createElement("button")
search.id = "search-button"
search.type = "button"
search.innerText = "SEARCH"

const div = document.createElement("div")
div.id = "search-container"
div.appendChild(input)
div.appendChild(search)

// 검색을 클릭햇을 때의 동작
search.addEventListener("click", () => {
    // 기존의 table의 값을 전체 삭제
    const searchText = input.value
    for (let row of tbody.children) {
        if (row.children[2].innerText.includes(searchText)) { // table에 tr 안에 td 값을 필터링
            row.style.display = ""
        } else {
            row.style.display = "none"
        }
    }
})

// 엔터 키를 누를때 필터링이 되도록 정의
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        search.click()
    }
});

module.insertBefore(div, table)
