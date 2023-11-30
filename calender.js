document.addEventListener('DOMContentLoaded', function () {
    const monthSelect = document.getElementById('monthSelect');
    const yearSelect = document.getElementById('yearSelect');
    const calendarContainer = document.getElementById('calendar');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    let selectedDates = [];

    // Populate month and year options
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear + i - 5);

    months.forEach((month, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.text = month;
      monthSelect.add(option);
    });

    years.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.text = year;
      yearSelect.add(option);
    });

    // Initial calendar render
    renderCalendar(new Date());

    // Event listeners for changing month and year
    prevMonthBtn.addEventListener('click', () => {
      const selectedMonth = parseInt(monthSelect.value);
      const selectedYear = parseInt(yearSelect.value);
      renderCalendar(new Date(selectedYear, selectedMonth - 1, 1));
    });

    nextMonthBtn.addEventListener('click', () => {
      const selectedMonth = parseInt(monthSelect.value);
      const selectedYear = parseInt(yearSelect.value);
      renderCalendar(new Date(selectedYear, selectedMonth + 1, 1));
    });

    monthSelect.addEventListener('change', () => {
      const selectedMonth = parseInt(monthSelect.value);
      const selectedYear = parseInt(yearSelect.value);
      renderCalendar(new Date(selectedYear, selectedMonth, 1));
    });

    yearSelect.addEventListener('change', () => {
      const selectedMonth = parseInt(monthSelect.value);
      const selectedYear = parseInt(yearSelect.value);
      renderCalendar(new Date(selectedYear, selectedMonth, 1));
    });

    calendarContainer.addEventListener('click', (event) => {
      const targetDate = parseInt(event.target.textContent);
      if (!isNaN(targetDate)) {
        const selectedDate = new Date(
          parseInt(yearSelect.value),
          parseInt(monthSelect.value),
          targetDate
        );

        if (selectedDates.includes(selectedDate.toString())) {
          // Remove date from selectedDates array and remove the clicked style
          selectedDates = selectedDates.filter(date => date !== selectedDate.toString());
          event.target.classList.remove('clicked-date');
        } else {
          // Add date to selectedDates array and add the clicked style
          selectedDates.push(selectedDate.toString());
          event.target.classList.add('clicked-date');
        }

        console.log('Selected Dates:', selectedDates);
      }
    });


        function renderCalendar(date) {
          const currentMonth = date.getMonth();
          const currentYear = date.getFullYear();
    
          monthSelect.value = currentMonth;
          yearSelect.value = currentYear;
    
          calendarContainer.innerHTML = '';
    
          // Days of the week
          const dayNames = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          dayNames.forEach(dayName => {
            const dayNameElement = document.createElement('div');
            dayNameElement.classList.add('day-name');
            dayNameElement.textContent = dayName;
            calendarContainer.appendChild(dayNameElement);
          });
    
          const firstDay = new Date(currentYear, currentMonth, 1);
          const lastDay = new Date(currentYear, currentMonth + 1, 0);
          const prevMonthLastDay = new Date(currentYear, currentMonth, 0);
    
          const daysInMonth = lastDay.getDate();
          const daysInPrevMonth = prevMonthLastDay.getDate();
    
          const startingDay = firstDay.getDay();
          const days = [...Array(6 * 7).keys()];
    
          days.forEach(index => {
            const day = index - startingDay + 1;
            const dateElement = document.createElement('div');
            dateElement.classList.add('day');
    
            if (index < startingDay) {
              dateElement.textContent = daysInPrevMonth - (startingDay - index) + 1;
              dateElement.classList.add('prev-month');
            } else if (index >= startingDay + daysInMonth) {
              dateElement.textContent = day - daysInMonth;
              dateElement.classList.add('next-month');
            } else {
              dateElement.textContent = day;
              dateElement.classList.add('current-month');
    
              // Check if the date is selected
              const currentDate = new Date(currentYear, currentMonth, day);
              if (selectedDates.includes(currentDate.toString())) {
                dateElement.classList.add('clicked-date');
              }
    
              // Check if the date is in the next month
              const nextMonthDate = new Date(currentYear, currentMonth + 1, day);
              if (nextMonthDate.getMonth() === currentMonth + 1) {
                dateElement.classList.add('next-month');
              }
            }
    
            calendarContainer.appendChild(dateElement);
    
            dateElement.addEventListener('click', () => {
              // Navigate to the previous or next month when clicking on a date
              if (dateElement.classList.contains('prev-month')) {
                const selectedMonth = parseInt(monthSelect.value);
                const selectedYear = parseInt(yearSelect.value);
                renderCalendar(new Date(selectedYear, selectedMonth - 1, 1));
              } else if (dateElement.classList.contains('next-month')) {
                const selectedMonth = parseInt(monthSelect.value);
                const selectedYear = parseInt(yearSelect.value);
                renderCalendar(new Date(selectedYear, selectedMonth + 1, 1));
              } else {
                // Add your logic for handling the click on a date in the current month
                console.log('Clicked on a date in the current month:', currentDate);
              }
            });
          });
        }
  });