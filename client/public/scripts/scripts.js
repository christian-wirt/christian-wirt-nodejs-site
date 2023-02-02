const darkModeButton = document.getElementById("darkMode");
const toggleNavButton = document.getElementById("toggleNav");
const nav = document.getElementById("nav-div").classList;

//Turn dark mode on or off.
darkModeButton.onclick = function toggleDarkMode() {
    const bodyClassList = document.querySelector("body").classList;
    const darkModeElements = document.querySelectorAll(".dark-mode");
    const beginText = document.querySelector("#begin-text").classList;
    for (let i=0; i<darkModeElements.length; i++) {
        darkModeElements[i].classList.toggle("white-mode");
        darkModeElements[i].classList.toggle("black-mode");                          
    }
    if (bodyClassList.contains("white-mode")) {       
        darkModeButton.innerHTML = "Dark Mode";
    }
    else {
        darkModeButton.innerHTML = "Light Mode";
    }
}

//Expand or collapse the nav bar.
toggleNavButton.onclick = function toggleNav() {
    if (nav.contains("nav-wrapper-collapsed")) {
        nav.remove("nav-wrapper-collapsed")
        nav.add("nav-wrapper-expanded");
    }
    else {
        nav.remove("nav-wrapper-expanded");
        nav.add("nav-wrapper-collapsed");
    }
}

//Collapse nav bar automatically if page gets to a certain width.
const mediaQuery = window.matchMedia("(min-width: 769px)");
mediaQuery.addListener(windowChange);
function windowChange(e) {
    if (e.matches) {  
        if (nav.contains("nav-wrapper-expanded")) {
            nav.remove("nav-wrapper-expanded");
            nav.add("nav-wrapper-collapsed");
        }
    }
} 

//Change which div is showing in the "Where I Began" section
function changeTab(page) {
    const visiblePage = document.getElementById(page);
    const allPages = document.getElementById("begin-text").children;
    for (var i=0; i<allPages.length; i++) {
        allPages[i].classList.remove("d-block");
        allPages[i].classList.add("v-hidden");
    }
    visiblePage.classList.remove("v-hidden");
    visiblePage.classList.add("d-block");
    changeListItemColor(page);
}

function changeListItemColor(li) {
    startList = document.getElementById("start-list").children;
    startListItem = document.getElementById(li + "-li");
    for (let i=0; i<startList.length; i++) {
        startList[i].classList.remove("active");
        // startList[i].classList.remove("cherry-tree");
    }
    startListItem.classList.add("active");
    // startListItem.classList.add("cherry-tree");
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function getDateTime() {
    //Grab the date object
    let date = new Date();
    let PM = false;

    let hour = date.getHours();
    if (hour === 12) {
        PM = true;
    }
    else if (hour > 12) {
        hour = hour - 12;
        PM = true;
    }
    else if (hour === 0) {
        hour = hour + 12;
    }

    let minute = String(date.getMinutes()).padStart(2, '0');
    let second = String(date.getSeconds()).padStart(2, '0');
    let day = weekday[date.getDay()];
    if (PM) {
        document.querySelector("#dateTime").innerHTML = `It is ${hour}:${minute}:${second} PM on ${day}.`; 
    }
    else {
        document.querySelector("#dateTime").innerHTML = `It is ${hour}:${minute}:${second} AM on ${day}.`; 
    }

}
setInterval(getDateTime, 1000);

// const logo = document.querySelectorAll("#logo path");

// for (let i=0; i<logo.length; i++) {
//     console.log("Letter " + i + " is " + logo[i].getTotalLength());
// }

function resumeClick() {
    const resume = document.getElementById('resume');
    const myDevExperience = document.getElementById('myDevExperience');
    resume.classList.toggle('resume-zoom');
    myDevExperience.classList.toggle('d-none');
}

function validateForm(form) {

    const id = document.getElementById(`id${form}`).value;

    if (form !== 3) {
        const fullName = document.getElementById(`name${form}`).value;
        if (fullName.match(/[0-9!@#\$%\^\&*\)\(+=._-]+$/)) {
            alert('Please enter a valid full name.')
            return false;
        }    
    }

    if (id.match(/\D/)) {
        alert('Please enter a positive number for Id.');
        return false;
    }
    
    return true;

}