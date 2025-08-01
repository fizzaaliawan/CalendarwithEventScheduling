const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let selectedDate = null;
const events = {};

const calendarDates = document.getElementById('calendar-dates');
const monthYearLabel = document.getElementById('month-year-label');
const sidebarDate = document.getElementById('date');
const sidebarDay = document.getElementById('day');
const sidebarMonth = document.getElementById('month-year');
const modal = document.getElementById('event-modal');
const eventTitleInput = document.getElementById('event-title');
const saveEventButton = document.getElementById('save-event');
const deleteEventButton = document.getElementById('delete-event');
const closeModal = document.getElementById('close-modal');

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  calendarDates.innerHTML = '';
  monthYearLabel.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    calendarDates.appendChild(emptyDiv);
  }

  for (let d = 1; d <= lastDate; d++) {
    const dateDiv = document.createElement('div');
    dateDiv.textContent = d;
    const thisDate = new Date(currentYear, currentMonth, d);

    const dateKey = thisDate.toDateString();

    if (thisDate.toDateString() === today.toDateString()) {
      dateDiv.classList.add('current-date');
    }

    if (events[dateKey]) {
      dateDiv.classList.add('event-date');
    }

    dateDiv.addEventListener('click', () => {
      selectedDate = thisDate;
      updateSidebar(selectedDate);
      openModal(dateKey);
    });

    calendarDates.appendChild(dateDiv);
  }
}

function updateSidebar(dateObj) {
  sidebarDate.textContent = dateObj.getDate();
  sidebarDay.textContent = dateObj.toLocaleDateString('default', { weekday: 'long' });
  sidebarMonth.textContent = `${dateObj.toLocaleDateString('default', { month: 'long' })} ${dateObj.getFullYear()}`;
}

function openModal(dateKey) {
  eventTitleInput.value = events[dateKey] || '';
  modal.style.display = 'flex';
}

function closeModalBox() {
  modal.style.display = 'none';
}

saveEventButton.addEventListener('click', () => {
  if (!selectedDate) return;
  const key = selectedDate.toDateString();
  const title = eventTitleInput.value.trim();
  if (title) {
    events[key] = title;
  } else {
    delete events[key];
  }
  closeModalBox();
  renderCalendar();
});

deleteEventButton.addEventListener('click', () => {
  if (!selectedDate) return;
  const key = selectedDate.toDateString();
  delete events[key];
  closeModalBox();
  renderCalendar();
});

closeModal.addEventListener('click', closeModalBox);

document.getElementById('prev').addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

document.getElementById('next').addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

renderCalendar();
updateSidebar(date);
