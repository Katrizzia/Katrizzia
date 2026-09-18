// --- DOM Selection ---
const profileCard = document.getElementById('profileCard');
const profileName = document.getElementById('profileName');
const profileProgram = document.getElementById('profileProgram');
const profileYear = document.getElementById('profileYear');
const profileStatus = document.getElementById('profileStatus');
const detailsPanel = document.getElementById('detailsPanel');
const studentIdDisplay = document.getElementById('studentIdDisplay');
const formMessage = document.getElementById('formMessage');

const nameInput = document.getElementById('nameInput');
const programInput = document.getElementById('programInput');
const yearInput = document.getElementById('yearInput');
const statusInput = document.getElementById('statusInput');

const updateBtn = document.getElementById('updateBtn');
const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');
const themeBtn = document.getElementById('themeBtn');
const resetBtn = document.getElementById('resetBtn');

// --- Initial State ---
const initialState = {
  name: 'Maria Santos',
  program: 'BS Information Technology',
  year: '3rd Year',
  status: 'active',
  studentId: '2026-001',
  detailsVisible: true,
  darkTheme: false
};

// --- Validation & Formatting ---
function isValidStudentName(name) {
  return name.trim().length >= 2;
}

function formatStudentStatus(status) {
  return status === 'active' ? 'Active' : 'Inactive';
}

// --- State Management ---
function setStatus(status) {
  profileCard.dataset.status = status;
  profileStatus.textContent = formatStudentStatus(status);

  if (status === 'active') {
    profileCard.classList.add('active');
    profileCard.classList.remove('inactive');
  } else {
    profileCard.classList.add('inactive');
    profileCard.classList.remove('active');
  }
}

// --- Profile Update ---
function updateProfile() {
  const nameVal = nameInput.value;

  if (!isValidStudentName(nameVal)) {
    formMessage.textContent = 'STUDENT NAME IS REQUIRED';
    return;
  }
  formMessage.textContent = '';

  // Safe content updates via textContent
  profileName.textContent = nameVal.trim();
  profileProgram.textContent = programInput.value;
  profileYear.textContent = yearInput.value;
  setStatus(statusInput.value);
}

// --- UI Toggles ---
function toggleDetails() {
  detailsPanel.classList.toggle('hidden');
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

// --- Reset ---
function resetProfile() {
  // Restore profile display
  profileName.textContent = initialState.name;
  profileProgram.textContent = initialState.program;
  profileYear.textContent = initialState.year;
  setStatus(initialState.status);
  profileCard.dataset.studentId = initialState.studentId;
  studentIdDisplay.textContent = `Student ID: ${initialState.studentId}`;

  // Restore form controls
  nameInput.value = '';
  programInput.value = initialState.program;
  yearInput.value = initialState.year;
  statusInput.value = initialState.status;

  // Clear message
  formMessage.textContent = '';

  // Restore panel visibility
  detailsPanel.classList.remove('hidden');

  // Restore theme
  document.body.classList.remove('dark-theme');
}

// --- Event Listeners ---
updateBtn.addEventListener('click', updateProfile);
toggleDetailsBtn.addEventListener('click', toggleDetails);
themeBtn.addEventListener('click', toggleTheme);
resetBtn.addEventListener('click', resetProfile);