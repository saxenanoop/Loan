let currentLoanType = 'home';

function changeLoanType(type) {
    currentLoanType = type;
    document.querySelectorAll('.loan-type button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.loan-type button[onclick="changeLoanType('${type}')"]`).classList.add('active');
}

function calculateEMI(principal, rate, tenureInMonths) {
    let monthlyRate = rate / 1200; // convert annual rate to monthly
    return principal * monthlyRate * Math.pow((1 + monthlyRate), tenureInMonths) / (Math.pow((1 + monthlyRate), tenureInMonths) - 1);
}

function calculateLoan() {
    let principal = parseFloat(document.getElementById('loanAmount').value.replace(/,/g, ''));
    let rate = parseFloat(document.getElementById('interestRate').value);
    let tenure = parseFloat(document.getElementById('loanTenure').value);
    let tenureUnit = document.getElementById('tenureUnit').value;
    let tenureInMonths = tenureUnit === 'years' ? tenure * 12 : tenure;

    let emi = calculateEMI(principal, rate, tenureInMonths);
    let totalInterest = (emi * tenureInMonths) - principal;
    let totalPayment = emi * tenureInMonths;

    document.getElementById('loanEMI').innerText = `₹${emi.toFixed(2)}`;
    document.getElementById('totalInterest').innerText = `₹${totalInterest.toFixed(2)}`;
    document.getElementById('totalPayment').innerText = `₹${totalPayment.toFixed(2)}`;

    // Pie chart (simplified representation)
    let principalPercentage = (principal / totalPayment) * 100;
    let interestPercentage = (totalInterest / totalPayment) * 100;
    document.getElementById('pieChart').innerHTML = `
        <svg viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="none" stroke="#ddd" stroke-width="2"/>
            <circle cx="16" cy="16" r="15" fill="none" stroke="#4CAF50" stroke-width="2" stroke-dasharray="${principalPercentage} ${100 - principalPercentage}" transform="rotate(-90) translate(-32)"/>
            <circle cx="16" cy="16" r="15" fill="none" stroke="#FFC107" stroke-width="2" stroke-dasharray="${interestPercentage} ${100 - interestPercentage}" transform="rotate(${principalPercentage - 90}) translate(-32)"/>
        </svg>
    `;
}

// Slider integration
document.querySelectorAll('.range-slider input[type="range"]').forEach(slider => {
    slider.addEventListener('input', function() {
        let inputField = document.getElementById(this.id.replace('Slider', ''));
        inputField.value = this.value;
        if (this.id.includes('Amount')) {
            inputField.value = parseInt(this.value).toLocaleString('en-IN');
        }
    });
});

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        let slider = document.getElementById(this.id + 'Slider');
        if (slider) {
            slider.value = this.value.replace(/,/g, '');
            if (this.id.includes('Amount')) {
                this.value = parseInt(this.value.replace(/,/g, '')).toLocaleString('en-IN');
            }
        }
    });
});

// Initial setup
document.getElementById('loanAmount').value = '50,00,000';
document.getElementById('interestRate').value = '8.5';
document.getElementById('loanTenure').value = '20';
