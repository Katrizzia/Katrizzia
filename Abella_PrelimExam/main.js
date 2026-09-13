import { students } from './students.js';
import {
  searchStudents, filterStudentsByBlock, filterStudentsByStatus
} from './gradeUtils.js';
import { displayStudents, displaySummary, displayMessage } from './display.js';

// UI Elements
const searchInput = document.getElementById('searchInput');
const blockFilter = document.getElementById('blockFilter');
const statusFilter = document.getElementById('statusFilter');
const applyBtn = document.getElementById('applyBtn');
const resetBtn = document.getElementById('resetBtn');

// Apply all filters and update display
function applyFiltersAndRender() {
  const query = searchInput.value.trim();
  const block = blockFilter.value;
  const status = statusFilter.value;

  let results = searchStudents(students, query);
  results = filterStudentsByBlock(results, block);
  results = filterStudentsByStatus(results, status);

  displayMessage("");
  if (results.length === 0) {
    displayStudents([]);
    displaySummary([]);
    displayMessage("No students found");
  } else {
    displayStudents(results);
    displaySummary(results);
  }
}

// Restore initial state
function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayMessage("");
  applyFiltersAndRender();
}

// Attach events
applyBtn.addEventListener('click', applyFiltersAndRender);
resetBtn.addEventListener('click', resetFilters);
searchInput.addEventListener('input', applyFiltersAndRender);
blockFilter.addEventListener('change', applyFiltersAndRender);
statusFilter.addEventListener('change', applyFiltersAndRender);

// Initial render
applyFiltersAndRender();