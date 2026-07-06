const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("list-container");
const themeToggle = document.getElementById("themeToggle");

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = inputBox.value;

    const span = document.createElement("span");
    span.textContent = "\u00d7";

    li.appendChild(span);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

addBtn.addEventListener("click", addTask);

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("todo-data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("todo-data") || "";
}

function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

function getPreferredTheme() {
    return localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

themeToggle.addEventListener("click", function () {
    const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
});

applyTheme(getPreferredTheme());
showTask();
