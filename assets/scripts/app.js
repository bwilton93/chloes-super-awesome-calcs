const clientName = document.getElementById("name");
const dateOfBirth = document.getElementById("date-of-birth");
const joinDate = document.getElementById("date-joining-service");
const leaveDate = document.getElementById("date-leaving-service");
const finalPensionableSalary = document.getElementById(
  "final-pensionable-salary"
);
const accrualNumerator = document.getElementById("accrual-rate-numerator");
const accrualDenominator = document.getElementById("accrual-rate-denominator");
const submitBtn = document.getElementById("submit-btn");

const RunCalculations = () => {
  logInfo();
};

const logInfo = () => {
  console.log(clientName.value);
  console.log(dateOfBirth.value);
  console.log(joinDate.value);
  console.log(leaveDate.value);
  console.log(finalPensionableSalary.value)
  console.log(`${accrualNumerator.value} / ${accrualDenominator.value}`)
};

submitBtn.addEventListener("click", RunCalculations);
