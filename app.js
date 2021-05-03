document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide Results portion
  document.querySelector('#results').style.display = 'none';
  // Show loader animation
  document.querySelector('.loading').style.display = 'block';
  
  setTimeout(quantifyLoan,'2000');
  e.preventDefault();
});

function quantifyLoan() {
  
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const duration = document.getElementById('duration');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(duration.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  console.log(x);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  console.log(monthly);
  
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Hide Loader animation
    document.querySelector('.loading').style.display = 'none';
    // Show results portion
    document.getElementById('results').style.display = 'block';
  }
  else {
    // console.log('Please check your numbers');
    showError('Please check your numbers');
  }
}

// Function showError
function showError(error) {
  clearError();
  // Hide Loader animation
  document.querySelector('.loading').style.display = 'none';
  // Hide results portion
  document.getElementById('results').style.display = 'none';
  // Create a div element
  const errDiv = document.createElement('div');
  // Add class name to errDiv element for styling
  errDiv.className = 'alert alert-danger'
  // Get card element
  const cardElement = document.querySelector('.card');
  // Get heading element
  const headingElement = document.querySelector('.heading');
  
  //Create a text node under errDiv
  errDiv.appendChild(document.createTextNode(error));
  
  cardElement.insertBefore(errDiv,headingElement);
  
  // Clear error after 3 sec
  setTimeout(clearError, 3000);
}

// Function clear error
function clearError() {
  const errText = document.querySelector('.alert');
  console.log(errText);
  if (errText !== null) {
    errText.remove();
  }
}