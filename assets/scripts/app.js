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

const RunCalculations = () => {
  dateOfBirth = convertToDate(dateOfBirth);
  joinDate = convertToDate(joinDate);
};

const convertToDate = (input) => {
  return new Date(input.value);
};

var logInfo = function () {
  console.log(clientName.value);
  console.log(dateOfBirth.value);
  console.log(joinDate);
  console.log(typeof joinDate);
  console.log(leaveDate.value);
  console.log(finalPensionableSalary.value);
  console.log(`${accrualNumerator.value} / ${accrualDenominator.value}`);
};

submitBtn.addEventListener("click", RunCalculations);
