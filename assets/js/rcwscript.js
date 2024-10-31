let currentDate = new Date();
let displayedDate = new Date();

/**
* Creates a calendar that can be displayed with a div with the id "calendar-widget". The calendar displays the passed month and highlights the current day.
*
* @param {moveNMonths} If one is added, then move to the next month. If -1 is passed, then move backwards to the previous month. Default: 0. Show current month and day. 
* @param {languageCode} language code (example: en) that was selected by the user in the widgets settings of wordpress. Default: en
* @param {styleClass} calendar style (example: orange) that was selected by the user in the widgets settings of wordpress. Default: lightgreen
**/

function loadCalendar(moveNMonths, languageCode, styleClass) {
    //DEBUG
    console.log(languageCode);
    console.log(styleClass);

    let showCurrentDay = true;
    if (moveNMonths !== 0) {
        showCurrentDay = false;
    }

    if (moveNMonths === 1) {
        // If current month is December, then increase year number. 
        if (displayedDate.getMonth() === 11) {
            displayedDate.setFullYear(displayedDate.getFullYear() + 1, 0, displayedDate.getDate());
            console.log(displayedDate.getMonth());
        } else {
            displayedDate.setFullYear(displayedDate.getFullYear(), displayedDate.getMonth() + moveNMonths, displayedDate.getDate());
            console.log(displayedDate.getMonth());
        }
    } else if (moveNMonths === -1) {
        //If current month is January, then decrease year number. 
        if (displayedDate.getMonth() === 0) {
            displayedDate.setFullYear(displayedDate.getFullYear() - 1, 11, displayedDate.getDate());
            console.log(displayedDate.getMonth());
        } else {
            displayedDate.setFullYear(displayedDate.getFullYear(), displayedDate.getMonth() + moveNMonths, displayedDate.getDate());
            console.log(displayedDate.getMonth());
        }
    }

    //Check if current date (day) is displayed
    if (currentDate.getDate() === displayedDate.getDate() && currentDate.getMonth() === displayedDate.getMonth() && currentDate.getFullYear() === displayedDate.getFullYear()) {
        showCurrentDay = true;
    }

    //Adjust the month and weekdays names to the selected language
    let weekDaysNames;
    let weekDaysNamesShort;
    let monthNames;
    switch (languageCode) {
        case "en":
            weekDaysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            weekDaysNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            break;
        case "de":
            weekDaysNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
            weekDaysNamesShort = ['SON', 'MON', 'DIE', 'MIT', 'DON', 'FRE', 'SAM'];
            monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
            break;
        case "fr":
            weekDaysNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
            weekDaysNamesShort = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];
            monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            break;
        case "zh":
            weekDaysNames = ['日', '一', '二', '三', '四', '五', '六'];
            weekDaysNamesShort = ['日', '一', '二', '三', '四', '五', '六'];
            monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            break;
        default:
            weekDaysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            weekDaysNamesShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            break;
    }

    //Adjust style of calendar
    let calendar = document.getElementById("calendar-widget");
    let calendarContentStyle;
    if (styleClass === undefined || styleClass === "") {
        styleClass
        calendar.classList.add("calendar-widget-lightgreen");
    } else {
        switch (styleClass) {
            case "calendar-widget-lightgreen":
                calendar.classList.add("calendar-widget-lightgreen");
                calendarContentStyle = "calendar-lightgreen";
                break;
            case "calendar-widget-orange":
                calendar.classList.add("calendar-widget-orange");
                calendarContentStyle = "calendar-orange";
                break;
            case "calendar-widget-violet":
                calendar.classList.add("calendar-widget-violet");
                calendarContentStyle = "calendar-violet";
                break;
            default:
                calendar.classList.add("calendar-widget-lightgreen");
                calendarContentStyle = "calendar-lightgreen";
        }
    }

    let lastDayDateOfPreviousMonthDate = new Date(displayedDate);
    lastDayDateOfPreviousMonthDate.setDate(0);
    const previousLastDayDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth(), 0).getDate();
    const indexOfLastDayDate = new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 0).getDay();
    const numberOfDaysInNextMonth = (7 - indexOfLastDayDate);
    let daysOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const currentYear = displayedDate.getFullYear();
    const currentMonth = displayedDate.getMonth();
    const currentDay = displayedDate.getDate();
    let isSunday;
    let isToday;

    //Check if it is a leap year
    if (currentYear % 4 === 0 && (currentYear % 100 !== 0 || currentYear % 400 === 0)) {
        daysOfMonths[1] = 29;
    }

    //Responsive enabled by default
    /*
    //Check if calendar is displayed on small windows (tablet/smartphone)
    screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    let responsive = screenWidth < 850 ? true : false;
    */
    let responsive = true;

    //Create calendar header
    calendar.innerHTML = '';
    calendar.insertAdjacentHTML("beforeend", `<div class="calendar-month-header ${calendarContentStyle}"><div id="month-left-button"> <span>&lt;</span> </div> <div class="calendar-month-title">${monthNames[currentMonth].toUpperCase()} ${currentYear}</div> <div id="month-right-button"> &gt; </div> </div>`);

    let sundayCounter = 1;
    //Load week days names - Monday to Sunday 
    for (let weekday = 1; weekday < 7; weekday++) {
        if (responsive) {
            calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name-responsive">${weekDaysNamesShort[weekday]} </div>`);
        }
        else {
            calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name">${weekDaysNames[weekday]} </div>`);
        }
    }
    if (responsive) {
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name-responsive sunday-header">${weekDaysNamesShort[0]} </div>`);
    } else {
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-weekday-name sunday-header">${weekDaysNames[0]} </div>`);
    }

    //Load days of the previous month that belong to a running week. Add days of previous month until the weekday where the current month starts
    for (let previousDays = lastDayDateOfPreviousMonthDate.getDay(); previousDays > 0; previousDays--) {
        isSunday = sundayCounter % 7 === 0 ? true : false;
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-day previous ${isSunday ? "sunday" : ""}" style="color: gray;">${previousLastDayDate - previousDays + 1} </div>`);
        sundayCounter += 1;
    }

    //Load days numbers of current month
    for (let day = 1; day <= daysOfMonths[currentMonth]; day++) {
        isSunday = sundayCounter % 7 === 0 ? true : false;
        isToday = showCurrentDay === true && currentDay === day ? true : false;
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-day ${isSunday ? "sunday" : ""} ${isToday ? "today " + calendarContentStyle : ""}">${day} </div>`);
        sundayCounter += 1;
    }

    //Load days of the next month that belong to a running week
    for (let nextDay = 1; nextDay <= numberOfDaysInNextMonth; nextDay++) {
        isSunday = sundayCounter % 7 === 0 ? true : false;
        calendar.insertAdjacentHTML("beforeend", `<div class="calendar-day ${isSunday ? "sunday" : ""}" style="color: gray;">${nextDay} </div>`);
        sundayCounter += 1;
    }

    loadArrowButtonsListeners(languageCode, styleClass);
};


function loadArrowButtonsListeners(languageCode, styleClass) {
    document.getElementById("month-left-button").addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        loadCalendar(-1, languageCode, styleClass);
    });
    document.getElementById("month-right-button").addEventListener("click", (clickEvent) => {
        clickEvent.preventDefault();
        loadCalendar(1, languageCode, styleClass);
    });
}