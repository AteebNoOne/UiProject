/**
* @class CalendarPicker.
* @description Provides a simple way to get a minimalistic calender in your DOM.
* @author Mathias Picker - 29 July 2020.
*/

class CalendarPicker {
    constructor(element, options) {
        // Core variables.
        this.date = new Date();
        this._formatDateToInit(this.date);

        this.day = this.date.getDay();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();

        // Storing the todays date for practical reasons.
        this.today = this.date;

        // The calendars value should always be the current date.
        this.value = this.date;

        // Ranges for the calendar (optional).
        this.min = options.min;
        this.max = options.max;
        this._formatDateToInit(this.min)
        this._formatDateToInit(this.max)

        // Element to insert calendar in.
        this.userElement = document.querySelector(element);

        // Destructuring current date as readable text.
        [this.dayAsText, this.monthAsText, this.dateAsText, this.yearAsText] = this.date.toString().split(' ')

        // The elements used to build the calendar.
        this.calendarWrapper = document.createElement('div');
        this.calendarElement = document.createElement('div')
        this.calendarHeader = document.createElement('header');
        this.calendarHeaderTitle = document.createElement('h4');
        this.navigationWrapper = document.createElement('section')
        this.previousMonthArrow = document.createElement('button');
        this.nextMonthArrow = document.createElement('button');
        this.calendarGridDays = document.createElement('section')
        this.calendarGrid = document.createElement('section');
        this.calendarDayElementType = 'time';

        // Hard-coded list of all days.
        this.listOfAllDaysAsText = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
        ];

        // Hard-coded list of all months.
        this.listOfAllMonthsAsText = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        // Creating the calendar
        this.calendarWrapper.id = 'calendar-wrapper';
        this.calendarElement.id = 'calendar';
        this.calendarGridDays.id = 'calendar-days';
        this.calendarGrid.id = 'calendar-grid';
        this.navigationWrapper.id = 'navigation-wrapper';
        this.previousMonthArrow.id = 'previousmonth';
        this.nextMonthArrow.id = 'nextmonth';

        this._insertHeaderIntoCalendarWrapper();
        this._insertCalendarGridDaysHeader();
        this._insertDaysIntoGrid();
        this._insertNavigationButtons();
        this._insertCalendarIntoWrapper();

        this.userElement.appendChild(this.calendarWrapper);
    }

    /**
     * @param {Number} The month number, 0 based.
     * @param {Number} The year, not zero based, required to account for leap years.
     * @return {Array<Date>} List with date objects for each day of the month.
     * @author Juan Mendes - 30th October 2012.
     */
    _getDaysInMonth = (month, year) => {
        if ((!month && month !== 0) || (!year && year !== 0)) return;

        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    /**
     * @param {DateObject} date.
     * @description Sets the clock of a date to 00:00:00 to be consistent.
     */
    _formatDateToInit = (date) => {
        if (!date) return;
        date.setHours(0, 0, 0);
    }

    /**
     * @description Inserts the calendar into the wrapper and adds eventListeners for the calender-grid.
     */
    _insertCalendarIntoWrapper = () => {
        this.calendarWrapper.appendChild(this.calendarElement);

        /**
         * @param {Event} event An event from an eventListener.
         */
        const handleSelectedElement = (event) => {
            if (event.target.nodeName.toLowerCase() === this.calendarDayElementType && !event.target.classList.contains('disabled')) {

                // Removes the 'selected' class from all elements that have it.
                Array.from(document.querySelectorAll('.selected')).forEach(element => element.classList.remove('selected'));

                // Adds the 'selected'-class to the selected date.
                event.target.classList.add('selected');

                this.value = event.target.value;

                // Fires the onValueChange function with the provided callback.
                this.onValueChange(this.callback);
            }
        }

        this.calendarGrid.addEventListener('click', handleSelectedElement, false);

        this.calendarGrid.addEventListener('keydown', (keyEvent) => {
            if (keyEvent.key !== 'Enter') return;

            handleSelectedElement(keyEvent);
        }, false);
    }

    /**
     * @description Adds the "main" calendar-header.
     */
    _insertHeaderIntoCalendarWrapper = () => {
        this.calendarHeaderTitle.textContent = `${this.listOfAllMonthsAsText[this.month]} - ${this.year}`;
        this.calendarHeader.appendChild(this.calendarHeaderTitle);
        this.calendarWrapper.appendChild(this.calendarHeader);
    }

    /**
     * @description Inserts the calendar-grid header with all the weekdays.
     */
    _insertCalendarGridDaysHeader = () => {
        this.listOfAllDaysAsText.forEach(day => {
            const dayElement = document.createElement('span');
            dayElement.textContent = day;
            this.calendarGridDays.appendChild(dayElement);
        })

        this.calendarElement.appendChild(this.calendarGridDays);
    }

    /**
     * @description Adds the "Previous" and "Next" arrows on the side-navigation.
     * Also inits the click-events used to navigating.
     */
    _insertNavigationButtons = () => {
        // Ugly long string, but at least the svg is pretty.
        const arrowSvg = '<img class="img-fluid" width="50" src="https://cdn-icons-png.flaticon.com/512/3236/3236907.png">';

        this.previousMonthArrow.innerHTML = arrowSvg;
        this.nextMonthArrow.innerHTML = arrowSvg;

        this.previousMonthArrow.setAttribute('aria-label', 'Go to previous month');
        this.nextMonthArrow.setAttribute('aria-label', 'Go to next month');

        this.navigationWrapper.appendChild(this.previousMonthArrow);
        this.navigationWrapper.appendChild(this.nextMonthArrow);

        this.navigationWrapper.addEventListener('click', (clickEvent) => {
            if (clickEvent.target.closest(`#${this.previousMonthArrow.id}`)) {
                if (this.month === 0) {
                    this.month = 11;
                    this.year -= 1;
                } else {
                    this.month -= 1;
                }
                this._updateCalendar();
            }

            if (clickEvent.target.closest(`#${this.nextMonthArrow.id}`)) {
                if (this.month === 11) {
                    this.month = 0;
                    this.year += 1;
                } else {
                    this.month += 1;
                }
                this._updateCalendar();
            }
        }, false)

        this.calendarElement.appendChild(this.navigationWrapper);
    }

    /**
     * @description Adds all the days for current month into the calendar-grid.
     * Takes into account which day the month starts on, so that "empty/placeholder" days can be added
     * in case the month for example starts on a Thursday.
     * Also disables the days that are not within the provided.
     */
    _insertDaysIntoGrid = () => {
        this.calendarGrid.innerHTML = '';

        let arrayOfDays = this._getDaysInMonth(this.month, this.year);
        let firstDayOfMonth = arrayOfDays[0].getDay();

        // Converting Sunday (0 when using getDay()) to 7 to make it easier to work with.
        firstDayOfMonth = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

        if (1 < firstDayOfMonth) {
            arrayOfDays = Array(firstDayOfMonth - 1).fill(false, 0).concat(arrayOfDays);
        }

        arrayOfDays.forEach(date => {
            const dateElement = document.createElement(date ? this.calendarDayElementType : 'span');
            const [Day, Month, Date, Year] = date.toString().split(' ');

            const dateIsTheCurrentValue = this.value.toString() === date.toString();


            if (dateIsTheCurrentValue) this.activeDateElement = dateElement;

            const dateIsBetweenAllowedRange = (this.min || this.max) && (date.toString() !== this.today.toString() && (date < this.min || date > this.max))
            if (dateIsBetweenAllowedRange) {
                dateElement.classList.add('disabled');
            } else {
                dateElement.tabIndex = 0;
                dateElement.value = date;
            }

            dateElement.textContent = date ? `${Date}` : '';
            this.calendarGrid.appendChild(dateElement);
            // getTeamEvents(date.toString());
            if (date.toString().indexOf('GMT') > -1) {
                var ds = convertDT(date.toString());
                getdayEvent(ds, dateElement, '8653691');
            }
        })

        this.calendarElement.appendChild(this.calendarGrid);
        this.activeDateElement.classList.add('selected');
    }

    /**
     * @description Updates the core-values for the calendar based on the new month and year
     * given by the navigation. Also updates the UI with the new values.
     */
    _updateCalendar = () => {
        this.date = new Date(this.year, this.month);

        [this.dayAsText, this.monthAsText, this.dateAsText, this.yearAsText] = this.date.toString().split(' ');
        this.day = this.date.getDay();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();

        window.requestAnimationFrame(() => {
            this.calendarHeaderTitle.textContent = `${this.listOfAllMonthsAsText[this.month]} - ${this.year}`;
            this._insertDaysIntoGrid();
            insertSlot();
        })
    }

    /**
     * @param {Function} callback
     * @description A "listener" that lets the user do something everytime the value changes.
     */
    onValueChange = (callback) => {
        if (this.callback) return this.callback(this.value);
        this.callback = callback;
    }
}
function insertSlot() {
    var parentdiv = document.createElement('div');
    parentdiv.classList.add('span-wrapper');
    var timediv = document.createElement('SPAN');
    timediv.classList.add('div-slots');
    timediv.innerHTML = 'Available Slots: ';
    var bslot = document.createElement('SPAN');
    bslot.classList.add('b-slot');
    bslot.innerHTML = '0';
    timediv.appendChild(bslot);
    parentdiv.appendChild(timediv);
    // DE.appendChild(timediv);
    $('time').append(parentdiv);
}
$(document).ready(function () {
    insertSlot();
    // $('time').append('<div class="div-slots">Slots: <span class="b-slot">0</span></div>');
    $('input[name="product"]').change(function () {
        if ($(this).val() == 'Tray') {
            $('#pm').attr('disabled', 'disabled');
        } else {
            $('#am, #pm').removeAttr('disabled');
        }
    });
    $('#previousmonth, #nextmonth').attr('type', 'button');
    $('time').click(function () {
        if ($('input[name="product"]:checked').val() == 'Tray') {
            $('#am').removeAttr('disabled');
        } else {
            $('#am, #pm').removeAttr('disabled');
        }
        var slots = $(this).html().split('<span class="b-slot">').pop().split('</span>')[0];
        if (slots == "1") {
            var slots_time = $(this).html().split('<span style="font-size: 10px;">').pop().split('</span>')[0];
            switch (slots_time) {
                case 'Morning':
                    $('#pm').attr('disabled', 'disabled');
                    break;
                case 'Afternoon':
                    $('#am').attr('disabled', 'disabled');
                    break;
            }
        } else {
            if ($('input[name="product"]:checked').val() == 'Tray') {
                $('#am').removeAttr('disabled');
            } else {
                $('#am, #pm').removeAttr('disabled');
            }
        }
    });
});
function convertDT(cdate) {
    var date = new Date(cdate);
    var date_selected = date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
    return date_selected;
}
function getdayEvent(ds, booked, calendar_id) {
    var timecounter = 0;
    var cal = false, morning = false, afternoon = false;
    $.ajax({
        url: 'https://api.teamup.com/kso4unar5qrtaexdvp/events?startDate=' + ds + '&endDate=' + ds,
        headers: { 'Teamup-Token': '41f8e143a4a4524fb24cc9f2cd2137b04efa34bb5fed65c1d5834feb6282ccf3', 'Content-type': 'application/json' },
        success: function (result) {
            if (result.events.length > 0) {
                console.log(result.events[0]);
                $.each(result.events, function (i, val) {
                    $.each(val, function (k, v) {
                        switch (k) {
                            case 'subcalendar_id':
                                if (val.subcalendar_id == calendar_id) {
                                    cal = true;
                                } else {
                                    cal = false;
                                }
                                break;
                            case 'start_dt':
                                if ((val.start_dt.indexOf('T08:00:00+10:00') > -1 || val.start_dt.indexOf('T12:30:00+10:00') > -1) && cal == true) {
                                    timecounter++;
                                    if (val.start_dt.indexOf('T08:00:00+10:00') > -1) { morning = true; }
                                    if (val.start_dt.indexOf('T12:30:00+10:00') > -1) { afternoon = true; }
                                    if (timecounter == 2) {
                                        var txt = "";
                                        booked.classList.add('disabled');
                                        booked.removeChild(booked.childNodes[2]);
                                        var c = booked.children[0].children[0].children[0];
                                        for (var i = 0; i < c.length; i++) {
                                            if (c[i].tagName == "SPAN") {
                                                c[i].innerHTML = "0";
                                            }
                                        }
                                    } else if (timecounter == 1) {
                                        if (morning == true || afternoon == true) {
                                            var cspan = document.createElement('SPAN');
                                            if (morning == true) { cspan.innerHTML = "Afternoon"; }
                                            else if (afternoon == true) { cspan.innerHTML = "Morning"; }
                                            cspan.classList.add('span-time');
                                            booked.children[0].children[0].appendChild(cspan);
                                        }
                                        var txt = "";
                                        var c = booked.children[0].children[0].children[0];
                                        for (var i = 0; i < c.length; i++) {
                                            if (c[i].tagName == "SPAN") {
                                                c[i].innerHTML = "1";
                                            }
                                        }
                                    }
                                }
                                break;
                            default:
                                break;
                        }
                    });
                });
            } else {
                if (result.events.length == 0 && !booked.classList.contains('disabled')) {
                    var c = booked.children[0].children[0];
                    for (var i = 0; i < c.length; i++) {
                        if (c[i].tagName == "SPAN") {
                            c[i].innerHTML = "2";
                        }
                    }
                }

            }
            console.log('Slots taken: ' + timecounter);
        }
    });
}

//

const nextYear = new Date().getFullYear() + 1;
const myCalender = new CalendarPicker('#myCalendarWrapper', {
    // If max < min or min > max then the only available day will be today.
    min: new Date(),
    max: new Date(nextYear, 10) // NOTE: new Date(nextYear, 10) is "Sun Nov 01 <nextYear>"
});

const currentDateElement = document.getElementById('current-date');
currentDateElement.textContent = myCalender.value;

const currentDayElement = document.getElementById('current-day');
currentDayElement.textContent = myCalender.value.getDay();

const currentToDateString = document.getElementById('current-datestring');
currentToDateString.textContent = myCalender.value.toDateString();

myCalender.onValueChange((currentValue) => {
    currentDateElement.textContent = currentValue;
    currentDayElement.textContent = currentValue.getDay();
    currentToDateString.textContent = currentValue.toDateString();

    console.log(`The current value of the calendar is: ${currentValue}`);
});