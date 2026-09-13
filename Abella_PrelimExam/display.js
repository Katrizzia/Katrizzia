import { calculateFinalGrade, getAcademicStatus, getPerformanceRemark } from './gradeUtils.js';

const studentListEl = document.getElementById('studentList');
const classAverageEl = document.getElementById('classAverage');
const passingCountEl = document.getElementById('passingCount');
const displayedCountEl = document.getElementById('displayedCount');
const topStudentEl = document.getElementById('topStudent');
const messageAreaEl = document.getElementById('messageArea');

export function displayStudents(students) {
  if (students.length === 0) {
    studentListEl.innerHTML = "<p>No students found</p>";
    return;
  }

  studentListEl.innerHTML = "";
  students.forEach(({ id, name, block, quiz, lab, exam }) => {
    const grade = calculateFinalGrade({ id, name, block, quiz, lab, exam });
    const status = getAcademicStatus(grade);
    const remark = getPerformanceRemark(grade);

    const card = document.createElement('article');
    card.className = 'student-card';
    card.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Block:</strong> ${block}</p>
      <p>Quiz: ${quiz} | Lab: ${lab} | Exam: ${exam}</p>
      <p><strong>Final Grade:</strong> ${grade.toFixed(2)}</p>
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Performance:</strong> ${remark}</p>
    `;
    studentListEl.appendChild(card);
  });
}

export function displaySummary(students) {
  const avg = calculateFinalGrade.length > 0
    ? students.reduce((sum, s) => sum + calculateFinalGrade(s), 0) / students.length
    : 0;
  const passing = students.filter(s => calculateFinalGrade(s) >= 75).length;
  const top = students.reduce((t, s) =>
    !t || calculateFinalGrade(s) > calculateFinalGrade(t) ? s : t, null
  );

  classAverageEl.textContent = avg.toFixed(2);
  passingCountEl.textContent = passing;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = top
    ? `${top.name} (${calculateFinalGrade(top).toFixed(2)})`
    : "";
}

export function displayMessage(message) {
  messageAreaEl.textContent = message;
}