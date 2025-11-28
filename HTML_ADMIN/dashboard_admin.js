// Get references
const contentArea = document.getElementById('content-area');
const homeBtn = document.getElementById('home-btn');
const scheduleBtn = document.getElementById('schedule-btn');
const requestBtn = document.getElementById('request-btn');
const logoutBtn = document.getElementById('logout-btn');

// Function to load content and optionally change content background
function loadContent(content, contentColor) {
    contentArea.innerHTML = content;
    if (contentColor) {
        contentArea.style.backgroundColor = contentColor;
    }
}

// HOME button
homeBtn.addEventListener('click', () => {
    const homeContent = `
        <h2>HOME - Dashboard Overview</h2>
        <p>Welcome back, Admin! Here's a quick overview:</p>
        <ul>
            <li>Total Patients: 150</li>
            <li>Today's Appointments: 25</li>
            <li>Pending Requests: 5</li>
        </ul>
    `;
    loadContent(homeContent, '#167cb7');
});

// SCHEDULE FOR TODAY button
scheduleBtn.addEventListener('click', () => {
    const scheduleContent = `
        <h2>SCHEDULE FOR TODAY</h2>
        <table border="1" style="width: 100%; color: white;">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Patient Name</th>
                    <th>Appointment Type</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>9:00 AM</td><td>John Doe</td><td>Check-up</td></tr>
                <tr><td>10:30 AM</td><td>Jane Smith</td><td>Consultation</td></tr>
                <tr><td>2:00 PM</td><td>Bob Johnson</td><td>Follow-up</td></tr>
            </tbody>
        </table>
    `;
    loadContent(scheduleContent, '#156695');
});

// REQUEST button
requestBtn.addEventListener('click', () => {
    const requestContent = `
        <h2>PENDING REQUESTS</h2>
        <ul>
            <li>Request 1: New patient registration - Status: Pending</li>
            <li>Request 2: Appointment reschedule - Status: Approved</li>
            <li>Request 3: Medical record update - Status: In Review</li>
        </ul>
    `;
    loadContent(requestContent, '#104e73');
});

// LOGOUT button
logoutBtn.addEventListener('click', () => {
    alert('Logging out...');
    window.location.href = 'login_admin.html'; // Redirect to login page
});
