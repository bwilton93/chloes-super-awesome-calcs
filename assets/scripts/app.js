let clientName = document.getElementById("name");
let dateOfBirth = document.getElementById("date-of-birth");
let joinDate = document.getElementById("date-joining-service");
let leaveDate = document.getElementById("date-leaving-service");
let finalPensionableSalary = document.getElementById(
  "final-pensionable-salary"
);
let accrualNumerator = document.getElementById("accrual-rate-numerator");
let accrualDenominator = document.getElementById("accrual-rate-denominator");
let submitBtn = document.getElementById("submit-btn");

let pensionableService;

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

const runCalculations = () => {
  convertAllDates();
  pensionableService = calculatePensionableService(joinDate, leaveDate);
  logInfo();
  printOutput();
};

const convertAllDates = () => {
  dateOfBirth = convertToDate(dateOfBirth);
  joinDate = convertToDate(joinDate);
  leaveDate = convertToDate(leaveDate);
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

  return { years: yearDifference, months: monthDifference };
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

const printOutput = () => {
  let outputDiv = document.createElement("div");
  let nameNode = document.createTextNode(clientName.value);
  outputDiv.append(nameNode);
  document.body.append(outputDiv);
};

submitBtn.addEventListener("click", runCalculations);
