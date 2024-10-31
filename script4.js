// Scroll to Calculator Card
function scrollToCalculator() {
    document.querySelector('#loan-calculator').scrollIntoView({ behavior: 'smooth' });
}

// Update Displayed Range Values
function updateAmountDisplay() {
    document.getElementById("amountDisplay").textContent = document.getElementById("amount").value;
}

function updateRateDisplay() {
    document.getElementById("rateDisplay").textContent = document.getElementById("rate").value;
}

function updateYearsDisplay() {
    document.getElementById("yearsDisplay").textContent = document.getElementById("years").value;
}

// Initialize the Chart variable
let loanChart;

// Function to create or update the loan chart
function updateLoanChart(principal, interest) {
    const ctx = document.getElementById("loanChart").getContext("2d");

    if (loanChart) {
        loanChart.destroy(); // Destroy existing chart if present
    }

    loanChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Principal", "Total Interest"],
            datasets: [
                {
                    data: [principal, interest],
                    backgroundColor: ["#1a73e8", "#ff7f50"],
                    hoverBackgroundColor: ["#145db2", "#e06c41"]
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom",
                },
                tooltip: {
                    callbacks: {
                        label: (context) => `${context.label}: ₹${context.raw.toLocaleString()}`
                    }
                }
            }
        }
    });
}

// Calculate Loan EMI and Update Chart
function calculateLoan() {
    const amount = parseFloat(document.getElementById("amount").value) * 100000; 
    const rate = parseFloat(document.getElementById("rate").value) / 100 / 12;
    const years = parseInt(document.getElementById("years").value);
    const months = years * 12;

    const monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -months));
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    // Update results in the DOM
    document.getElementById("monthlyPayment").textContent = monthlyPayment.toFixed(2);
    document.getElementById("totalPrincipal").textContent = amount.toFixed(2);
    document.getElementById("totalInterest").textContent = totalInterest.toFixed(2);
    document.getElementById("totalPayment").textContent = totalPayment.toFixed(2);

    // Update the chart with principal and interest
    updateLoanChart(amount, totalInterest);
}
function applyForLoan(message) {
    console.log(message);
    alert(message);
}


