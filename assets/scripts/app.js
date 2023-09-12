const monthsAndDays = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const clientName = document.getElementById("name");
const dateOfBirthElement = document.getElementById("date-of-birth");
const joinDateElement = document.getElementById("date-joining-service");
const leaveDateElement = document.getElementById("date-leaving-service");
const finalPensionableSalary = document.getElementById(
  "final-pensionable-salary"
);
const accrualNumerator = document.getElementById("accrual-rate-numerator");
const accrualDenominator = document.getElementById("accrual-rate-denominator");
const submitBtn = document.getElementById("submit-btn");

let dateOfBirth;
let joinDate;
let leaveDate;
let pensionableService;
let pensionAtDol;

const onSubmit = () => {
  const outputDiv = document.getElementById("output-formatted");
  if (outputDiv) {
    outputDiv.remove();
  }
  runCalculations();
};

const runCalculations = () => {
  convertAllDates();
  pensionableService = calculatePensionableService(joinDate, leaveDate);
  pensionAtDol = calculatePensionAtDOL(pensionableService);
  logInfo();
  printOutput();
};

const convertAllDates = () => {
  dateOfBirth = convertToDate(dateOfBirthElement);
  joinDate = convertToDate(joinDateElement);
  leaveDate = convertToDate(leaveDateElement);
};

const convertToDate = (input) => {
  return new Date(input.value);
};

const calculatePensionableService = (joinDate, leaveDate) => {
  let yearDifference = leaveDate.getFullYear() - joinDate.getFullYear();
  let monthDifference = leaveDate.getMonth() - joinDate.getMonth();

  if (
    leaveDate.getDate() !== monthsAndDays[leaveDate.getMonth() + 1] &&
    joinDate.getDate() > leaveDate.getDate() &&
    joinDate.getMonth() !== leaveDate.getMonth()
  ) {
    monthDifference -= 1;
  }

  return {
    years: monthDifference < 0 ? yearDifference - 1 : yearDifference,
    months: monthDifference < 0 ? 12 + monthDifference : monthDifference,
  };
};

const calculatePensionAtDOL = (input) => {
  let pensionableServCalc = input.years + input.months / 12;
  return (
    pensionableServCalc *
    (accrualNumerator.value / accrualDenominator.value) *
    finalPensionableSalary.value
  );
};

const logInfo = () => {
  console.log(clientName.value);
  console.log(dateOfBirth);
  console.log(joinDate);
  console.log(leaveDate);
  console.log(finalPensionableSalary.value);
  console.log(`${accrualNumerator.value} / ${accrualDenominator.value}`);
  console.log(pensionableService);
};

const createClientNameNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "client-name-output");
  const node = document.createTextNode(input);
  div.appendChild(node);
  return div;
};

const createDOBNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "dob-output");
  const node = document.createTextNode(input);
  div.appendChild(node);
  return div;
};

const createJoinDateNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "join-date-output");
  const node = document.createTextNode(input);
  div.appendChild(node);
  return div;
};

const createLeaveDateNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "leave-date-output");
  const node = document.createTextNode(input);
  div.appendChild(node);
  return div;
};

const createFinalPensionableSalaryNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "final-pensionable-salary-output");
  const node = document.createTextNode(input);
  div.appendChild(node);
  return div;
};

const createAccrualNode = (numerator, denominator) => {
  const div = document.createElement("div");
  div.setAttribute("id", "accrual-output");
  const node = document.createTextNode(`${numerator} / ${denominator}`);
  div.appendChild(node);
  return div;
};

const createPensionableServicesNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "pensionable-services-output");
  const node = document.createTextNode(
    `Years: ${input.years}` +
      " " +
      `Months: ${input.months}` +
      " " +
      `${input.years + input.months / 12}`
  );
  div.appendChild(node);
  return div;
};

const createPensionAtDOLNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "pension-at-dol-output");
  const node = document.createTextNode(input);
  div.appendChild(node);
  return div;
};

const printOutput = () => {
  const outputDiv = document.createElement("div");
  outputDiv.setAttribute("id", "output-formatted");

  let nodes = [
    createClientNameNode(clientName.value),
    createDOBNode(dateOfBirth),
    createJoinDateNode(joinDate),
    createLeaveDateNode(leaveDate),
    createFinalPensionableSalaryNode(finalPensionableSalary.value),
    createAccrualNode(accrualNumerator.value, accrualDenominator.value),
    createPensionableServicesNode(pensionableService),
    createPensionAtDOLNode(pensionAtDol),
  ];

  for (node of nodes) {
    outputDiv.append(node);
  }

  document.body.append(outputDiv);
};

submitBtn.addEventListener("click", onSubmit);
