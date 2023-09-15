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

const caseReference = document.getElementById("case-ref");
const schemeName = document.getElementById("scheme");
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
  logInfo();
  printOutput();
};

const runCalculations = () => {
  convertAllDates();
  pensionableService = calculatePensionableService(joinDate, leaveDate);
  pensionAtDol = calculatePensionAtDOL(pensionableService);
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
  console.log(schemeName.value);
  console.log(caseReference.value);
  console.log(clientName.value);
  console.log(dateOfBirth);
  console.log(joinDate);
  console.log(leaveDate);
  console.log(finalPensionableSalary.value);
  console.log(`${accrualNumerator.value} / ${accrualDenominator.value}`);
  console.log(pensionableService);
};

const formatOutputDate = (input) => {
  const dayString = String(input.getDate());
  const monthString = String(input.getMonth());
  const year = input.getFullYear();
  return (
    dayString.padStart(2, "0") + "/" + monthString.padStart(2, "0") + "/" + year
  );
};

const formatPensionableService = (input) => {
  return (
    input.years + "y " + input.months + " months: " + pensionableService.years + pensionableService.months / 12
  )
}

const createReferenceNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "case-reference-output");
  const bold = document.createElement("strong");
  const node = document.createTextNode(input);
  bold.appendChild(node);
  div.appendChild(bold);
  return div;
};

const createSchemeNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "scheme-name-output");
  const bold = document.createElement("strong");
  const node = document.createTextNode(input);
  bold.appendChild(node);
  div.appendChild(bold);
  return div;
};

const createClientNameNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "client-name-output");
  const bold = document.createElement("strong");
  const node = document.createTextNode(input);
  bold.appendChild(node);
  div.appendChild(bold);
  return div;
};

const createDOBNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("class", "date-outputs");
  div.setAttribute("id", "dob-output");
  const node = document.createTextNode(
    "DOB:            " + formatOutputDate(input)
  );
  div.appendChild(node);
  return div;
};

const createJoinDateNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("class", "date-outputs");
  div.setAttribute("id", "join-date-output");
  const node = document.createTextNode(
    "Date Joined: " + formatOutputDate(input)
  );
  div.appendChild(node);
  return div;
};

const createLeaveDateNode = (leaveDate, pensionableService) => {
  const div = document.createElement("div");
  div.setAttribute("class", "date-outputs");
  div.setAttribute("id", "leave-date-output");
  const node = document.createTextNode(
    "Date Left:     " + formatOutputDate(leaveDate) + ": " + formatPensionableService(pensionableService)
  );
  div.appendChild(node);
  return div;
};

const createFinalPensionableSalaryNode = (input) => {
  const div = document.createElement("div");
  div.setAttribute("id", "final-pensionable-salary-output");
  const node = document.createTextNode(`FPS: ${input}`);
  div.appendChild(node);
  return div;
};

const createPensionAtDOLNode = (
  pensionableService,
  accrualNumerator,
  accrualDenominator,
  finalPensionableSalary,
  pensionAtDol
) => {
  const div = document.createElement("div");
  div.setAttribute("id", "pension-at-dol-output");
  const node = document.createTextNode(
    `Pension at exit: ${
      pensionableService.years + pensionableService.months / 12
    } x ${accrualNumerator}/${accrualDenominator} x ${finalPensionableSalary} = ${pensionAtDol}`
  );
  div.appendChild(node);
  return div;
};

const printOutput = () => {
  const outputDiv = document.createElement("div");
  outputDiv.setAttribute("id", "output-formatted");

  let nodes = [
    createReferenceNode(caseReference.value),
    createSchemeNode(schemeName.value),
    createClientNameNode(clientName.value),
    createDOBNode(dateOfBirth),
    createJoinDateNode(joinDate),
    createLeaveDateNode(leaveDate, pensionableService),
    createFinalPensionableSalaryNode(finalPensionableSalary.value),
    createPensionAtDOLNode(
      pensionableService,
      accrualNumerator.value,
      accrualDenominator.value,
      finalPensionableSalary.value,
      pensionAtDol
    ),
  ];

  if (pensionableService.years < 0) {
    outputDiv.append(
      document.createTextNode("Leave year must be after join year")
    );
  } else {
    for (node of nodes) {
      outputDiv.append(node);
    }
  }

  document.body.append(outputDiv);
};

submitBtn.addEventListener("click", onSubmit);
