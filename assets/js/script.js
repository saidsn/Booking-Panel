"use strict";


const selectTime = document.getElementById('select__time');
const dateInput = document.getElementById('date-input');
const calendar = document.querySelector('.calendar');
const monthYear = document.getElementById('month-year');
const daysContainer = document.querySelector('.days');
const weekdaysContainer = document.querySelector('.weekdays');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const freeTimes = [4, 5, 6]
let currentDate = new Date();

function showCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    monthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}`;

    daysContainer.innerHTML = '';

    for (const dayOfWeek of daysOfWeek) {
        const dayOfWeekElement = document.createElement('span');
        dayOfWeekElement.textContent = dayOfWeek;
        weekdaysContainer.appendChild(dayOfWeekElement);
    }

    const firstDayPosition = firstDay.getDay();

    for (let i = 0; i < firstDayPosition; i++) {
        const emptyCell = document.createElement('span');
        emptyCell.classList.add('empty-cell');
        daysContainer.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {

        const dayElement = document.createElement('span');
        dayElement.classList.add('date__days');
        if (!freeTimes.includes(i)) {
            dayElement.classList.add('disabled');
        }
        dayElement.textContent = i;
        dayElement.addEventListener('click', () => selectDate(i + 1));
        daysContainer.appendChild(dayElement);
    }

}

function selectDate(day) {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    dateInput.innerHTML = selectedDate.toISOString().split('T')[0];
    renderFreeTimes()

}

function prevMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    weekdaysContainer.innerHTML = ""
    showCalendar();
}

function nextMonth() {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    weekdaysContainer.innerHTML = ""
    showCalendar();
}

document.addEventListener('DOMContentLoaded', () => {
    showCalendar();
});

dateInput.addEventListener('click', () => {
    calendar.style.display = 'block';
});

const times = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    },
    {
        "start_time": "10:00",
        "end_time": "10:30"
    }

];

function renderFreeTimes() {
    selectTime.innerHTML = ""
    times.map(t => {
        const timess = `
     <div onclick="selectTimes(this)" class="time">
     <p class="time__start">${t.start_time}</p>
     <p class="time__end">${t.end_time}</p>
    </div>`

        selectTime.insertAdjacentHTML('beforeend', timess)
    })
    selectTime.style.display = 'flex';

}

let previousTarget = null;
function selectTimes(target) {
    const currentTarget = target;
    if (previousTarget) {
        previousTarget.classList.remove('active');
    }
    currentTarget.classList.add('active');
    previousTarget = currentTarget;
}
const success=document.querySelectorAll('.success');
const menuItems = document.querySelectorAll('.main__menu__item');
const nextButton = document.querySelector('.next__button');
const prevButton = document.querySelector('.prev__button');
const dataPanels = document.querySelectorAll('.dataPanel__center');
let activePanelIndex = 0;


dataPanels[activePanelIndex].classList.add('active');

function checkActivePanel() {
    menuItems.forEach((item, index) => {
        if (index === activePanelIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }

        if (index < activePanelIndex) {
            item.classList.add('passed');
            success[index].style.display='block';
        } else {
            item.classList.remove('passed');
            success[index].style.display='none';
        }
    })


}

checkActivePanel()
nextButton.addEventListener('click', () => {

    prevButton.style.display = 'block';
    if (activePanelIndex === 2) {
        nextButton.textContent = 'Confirm Booking';

    }
    if (activePanelIndex !== 3) {
        dataPanels[activePanelIndex].classList.remove('active');
        dataPanels[activePanelIndex].classList.add('inactive');

        activePanelIndex = (activePanelIndex + 1) % dataPanels.length;
        dataPanels[activePanelIndex].classList.remove('inactive');
        dataPanels[activePanelIndex].classList.add('active');
    }
    checkActivePanel()
});

prevButton.addEventListener('click', () => {
    dataPanels[activePanelIndex].classList.remove('active');
    dataPanels[activePanelIndex].classList.add('inactive');

    activePanelIndex = (activePanelIndex - 1 + dataPanels.length) % dataPanels.length;
    activePanelIndex === 0 ? prevButton.style.display = 'none' : prevButton.style.display = 'block';
    if (activePanelIndex < 3) {
        nextButton.textContent = 'Next'
    }
    dataPanels[activePanelIndex].classList.remove('inactive');
    dataPanels[activePanelIndex].classList.add('active');
    checkActivePanel()
});
