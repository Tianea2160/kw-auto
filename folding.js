const subjectbox = document.querySelector(".scheduletitle");
const calendarTable = document.querySelector(".scheduletb");
const calendarFoldButton = document.createElement("button");

calendarFoldButton.setAttribute("class", "btn2 btn-lightgreen");
calendarFoldButton.setAttribute("id", "foldBtn");

chrome.storage.sync.get("CalendarFoldState")
    .then(res => {
        if (res.CalendarFoldState === "OFF") calendarTable.style.display = "none";
        calendarFoldButton.innerText = res.CalendarFoldState === "OFF" ? "캘린더 펴기" : "캘린더 접기";
    })

subjectbox.insertBefore(calendarFoldButton, subjectbox.childNodes[0]);

calendarFoldButton.addEventListener("click", () => {
    chrome.storage.sync.get("CalendarFoldState")
        .then(res => {
            if (res.CalendarFoldState === "ON") {
                calendarTable.style.display = "none";
                calendarFoldButton.innerText = "캘린더 펴기";
                chrome.storage.sync.set({"CalendarFoldState": "OFF"});
            } else {
                //calendarFoldButton.innerText = "캘린더 접기";
                chrome.storage.sync.set({"CalendarFoldState": "ON"})
                    .then(() => location.reload());
            }
        })
});