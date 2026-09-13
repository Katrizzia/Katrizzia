// Weight constants
const QUIZ_WEIGHT = 0.25;
const LAB_WEIGHT = 0.35;
const EXAM_WEIGHT = 0.40;

export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student;
  return quiz * QUIZ_WEIGHT + lab * LAB_WEIGHT + exam * EXAM_WEIGHT;
}

export function getAcademicStatus(grade) {
  if (grade >= 90) return "Excellent";
  if (grade >= 75) return "Passed";
  if (grade >= 70) return "Needs Improvement";
  return "Failed";
}

export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90: return "Outstanding";
    case grade >= 85: return "Very Good";
    case grade >= 80: return "Good";
    case grade >= 75: return "Satisfactory";
    default: return "Unsatisfactory";
  }
}

export function searchStudents(students, query) {
  if (!query) return [...students];
  const term = query.toLowerCase();
  return students.filter(s => s.name.toLowerCase().includes(term));
}

export function filterStudentsByBlock(students, block) {
  if (block === "All") return [...students];
  return students.filter(s => s.block === block);
}

export function filterStudentsByStatus(students, status) {
  if (status === "All") return [...students];
  return students.filter(s => getAcademicStatus(calculateFinalGrade(s)) === status);
}

export function calculateClassAverage(students) {
  if (students.length === 0) return 0;
  const total = students.reduce((sum, s) => sum + calculateFinalGrade(s), 0);
  return total / students.length;
}

export function countPassingStudents(students) {
  return students.filter(s => calculateFinalGrade(s) >= 75).length;
}

export function getTopStudent(students) {
  if (students.length === 0) return null;
  return students.reduce((top, current) =>
    calculateFinalGrade(current) > calculateFinalGrade(top) ? current : top
  );
}