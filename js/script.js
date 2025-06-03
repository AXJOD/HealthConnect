// --- Appointment Listing and Filtering Logic ---
// Get the current logged-in user from localStorage
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Get all appointments from localStorage
function getAppointments() {
  return JSON.parse(localStorage.getItem('appointments')) || [];
}

// Show appointments for the current patient, with optional filtering
function showAppointments(filterDoctor = '', filterDate = '') {
  const user = getCurrentUser();
  // Only show appointments for the logged-in patient
  const appointments = getAppointments();
  const patientAppointments = appointments.filter(a => a.patientEmail === user?.email);
  let filtered = patientAppointments;
  // Filter by doctor name if provided
  if (filterDoctor) {
    filtered = filtered.filter(a => a.doctorName.toLowerCase().includes(filterDoctor.toLowerCase()));
  }
  // Filter by date if provided
  if (filterDate) {
    filtered = filtered.filter(a => a.date === filterDate);
  }
  // Render the filtered appointments in the table
  const tbody = document.querySelector('#appointmentsTable tbody');
  tbody.innerHTML = '';
  if (filtered.length === 0) {
    document.getElementById('emptyAppointmentsMsg').style.display = 'block';
    document.getElementById('appointmentsTable').style.display = 'none';
  } else {
    document.getElementById('emptyAppointmentsMsg').style.display = 'none';
    document.getElementById('appointmentsTable').style.display = '';
    filtered.forEach(app => {
      const tr = document.createElement('tr');
      const status = app.status || 'Pending';
      tr.innerHTML = `
        <td>${app.doctorName}</td>
        <td>${app.date}</td>
        <td>${app.time}</td>
        <td><span class="status-badge status-${status.toLowerCase()}">${status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// Initialize appointment page functionality
document.addEventListener('DOMContentLoaded', function() {
  // Filter button event: filter appointments by doctor name and date
  const filterBtn = document.getElementById('filterBtn');
  if (filterBtn) {
    filterBtn.onclick = function() {
      const doctor = document.getElementById('filterDoctor').value;
      const date = document.getElementById('filterDate').value;
      showAppointments(doctor, date);
    };
  }

  // Show all appointments on page load
  showAppointments();
}); 