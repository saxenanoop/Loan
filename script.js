function calculateEMI(principal, rate, tenureInMonths) {
    let monthlyRate = rate / 1200; // convert annual rate to monthly
    return principal * monthlyRate * Math.pow((1 + monthlyRate), tenureInMonths) / (Math.pow((1 + monthlyRate), tenureInMonths) - 1);
}

function calculateLoan(loanType) {
    let principal = parseFloat(document.getElementById(`${loanType}LoanAmount`).value);
    let tenureInYears = parseFloat(document.getElementById(`${loanType}LoanTenure`).value);
    let tenureInMonths = tenureInYears * 12;
    let rate;

    switch(loanType) {
        case 'home':
            rate = 8.5; // Example rate for home loan
            break;
        case 'personal':
            rate = 12; // Example rate for personal loan
            break;
        case 'car':
            rate = 9.5; // Example rate for car loan
            break;
        case 'gold':
            rate = 11; // Example rate for gold loan
            break;
        default:
            return;
    }

    let emi = calculateEMI(principal, rate, tenureInMonths);
    let totalInterest = (emi * tenureInMonths) - principal;
    let totalPayment = emi * tenureInMonths;

    document.getElementById(`${loanType}LoanResult`).innerText = 
        `EMI: ₹${emi.toFixed(2)}, Total Interest: ₹${totalInterest.toFixed(2)}, Total Payment: ₹${totalPayment.toFixed(2)}`;
}

// Optional: Add some basic input validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0 || isNaN(this.value)) {
            this.value = ''; // Clear invalid input
        }
    });
});
