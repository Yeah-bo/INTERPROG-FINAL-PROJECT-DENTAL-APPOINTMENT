// FORM ELEMENTS
const scheduleBtn = document.querySelector(".schedule-btn");
const nameInput = document.querySelector(".form-left input[type='text']");
const ageInput = document.querySelector(".form-left input[type='number']");
const contactInput = document.querySelector(".form-left input[placeholder='Contact No.']");
const dentistSelect = document.querySelector(".form-left select");
const dateInput = document.querySelector(".date-field input");
const timeFieldInput = document.querySelector(".time-field input");
const timePicker = document.getElementById("timepicker");
const mainWrapper = document.querySelector(".main-wrapper");

// CONFIRMATION ELEMENTS
const confirmationOverlay = document.getElementById("confirmationOverlay");
const confirmationModal = document.getElementById("confirmationModal");

// ===== CUSTOM CALENDAR =====
const calendar = document.getElementById("calendar");
const calendarMonth = document.getElementById("calendarMonth");
const datesGrid = document.getElementById("datesGrid");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let selectedDate = null;

dateInput.addEventListener("click", (e) => {
    e.stopPropagation();
    calendar.style.display = (calendar.style.display === "block") ? "none" : "block";
    timePicker.style.display = "none";
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".date-field")) calendar.style.display = "none";
});

function renderCalendar(year, month) {
    datesGrid.innerHTML = "";
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay === 0 ? 6 : firstDay - 1;
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    calendarMonth.textContent = `${monthNames[month]} ${year}`;

    for (let i = 0; i < startDay; i++) datesGrid.appendChild(document.createElement("div"));

    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
        const dateBtn = document.createElement("button");
        dateBtn.textContent = d;
        const thisDate = new Date(year, month, d);

        if (thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            dateBtn.classList.add("disabled");
        } else {
            dateBtn.addEventListener("click", () => {
                selectedDate = thisDate;
                dateInput.value = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
                calendar.style.display = "none";
            });
        }
        datesGrid.appendChild(dateBtn);
    }
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// ===== FORM RESTRICTIONS =====

// Age: allow manual delete, enforce min 1 if left empty
ageInput.setAttribute("min", "1");
ageInput.addEventListener("input", () => {
    ageInput.value = ageInput.value.replace(/\D/g, ""); // remove non-numbers
    if (ageInput.value !== "" && parseInt(ageInput.value) < 1) ageInput.value = "1";
});

// Contact: only numbers, max 11 digits, must start with 09
contactInput.addEventListener("focus", () => {
    if (contactInput.value === "") contactInput.value = "09";
});

contactInput.addEventListener("blur", () => {
    if (contactInput.value === "09") contactInput.value = "";
});

contactInput.addEventListener("input", () => {
    let val = contactInput.value.replace(/\D/g, ""); // remove non-numbers
    if (!val.startsWith("09")) {
        if (val.length >= 2) val = "09" + val.slice(2);
        else val = "09";
    }
    contactInput.value = val.slice(0, 11); // limit 11 digits
});

// ===== TIME PICKER =====
timeFieldInput.addEventListener("click", (e) => {
    e.stopPropagation();
    timePicker.style.display = (timePicker.style.display === "block") ? "none" : "block";
    calendar.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (!e.target.closest(".time-field")) timePicker.style.display = "none";
});

const timeRadios = document.querySelectorAll('input[name="apptTime"]');
timeRadios.forEach(radio => {
    radio.addEventListener("click", () => {
        timeFieldInput.value = radio.value;
        timePicker.style.display = "none";
    });
});

// ===== FORM VALIDATION =====
function validateForm() {
    if (nameInput.value.trim() === "") { alert("Please enter your name!"); return false; }
    if (!ageInput.value || parseInt(ageInput.value) < 1) { alert("Please enter a valid age!"); return false; }
    if (!contactInput.value || contactInput.value.length !== 11) { alert("Please enter a valid 11-digit mobile number"); return false; }
    if (dentistSelect.value === "Select Dentist") { alert("Please choose a dentist!"); return false; }
    if (!dateInput.value) { alert("Please select a preferred date!"); return false; }
    if (!timeFieldInput.value) { alert("Please select a preferred time!"); return false; }
    return true;
}

// ===== SCHEDULE APPOINTMENT =====
function scheduleAppointment() {
    if (!validateForm()) return;

    confirmationModal.innerHTML = `
        <h3>Appointment Scheduled Successfully!</h3>
        <p><strong>Name:</strong> ${nameInput.value}</p>
        <p><strong>Age:</strong> ${ageInput.value}</p>
        <p><strong>Contact:</strong> ${contactInput.value}</p>
        <p><strong>Dentist:</strong> ${dentistSelect.value}</p>
        <p><strong>Date:</strong> ${dateInput.value}</p>
        <p><strong>Time:</strong> ${timeFieldInput.value}</p>
        <button id="bookAnotherBtn">Close</button>
    `;
    confirmationOverlay.style.display = "flex";

    document.getElementById("bookAnotherBtn").addEventListener("click", () => {
        window.location.reload(); // reload page
    });

    // Reset form (keep overlay showing)
    nameInput.value = "";
    ageInput.value = "";
    contactInput.value = "";
    dentistSelect.value = "Select Dentist";
    dateInput.value = "";
    timeFieldInput.value = "";
}

scheduleBtn.addEventListener("click", scheduleAppointment);
