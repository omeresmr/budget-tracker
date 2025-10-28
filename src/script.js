"use strict";

///////////////
// DOM Elements

const dateInput = document.querySelector(".date-picker");
const amountInput = document.querySelector(".transaction-amount");
const descriptionInput = document.querySelector(".transaction-description");
const errorMessage = document.querySelector(".error");
const transactionTypeRadios = document.querySelectorAll('input[type="radio"]');
const revenueRadio = document.querySelector("#revenue");

const balanceDisplay = document.querySelector(".balance");
const spendingDisplay = document.querySelector(".spending");
const revenueDisplay = document.querySelector(".revenue");
const addTransactionButton = document.querySelector(".add-transaction");
const transactionsContainer = document.querySelector(".transactions");

///////////////
// Variables

const transactions = [];
const today = new Date().toISOString().split("T")[0];

let totalBalance = 0;
let totalRevenue = 0;
let totalSpending = 0;

///////////////
// Functions

const formatCurrency = (value) =>
  // Format the currency into german format (change the locale parameter to your ISO country code, and change the currency format)
  new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);

const displayError = (message) => {
  errorMessage.textContent = message;
  errorMessage.classList.remove("collapse");
};

// Disable the add trans. button, if there is a error message
const updateAddButtonState = () => {
  addTransactionButton.disabled = !errorMessage.classList.contains("collapse");
};

const isRadioSelected = () =>
  [...transactionTypeRadios].some((radio) => radio.checked);

const validateInputs = () => {
  // Get the date that got chose
  const dateValue = new Date(dateInput.value);

  // you can change these values in index.html (input type date)
  // 2010-01-01
  const minDate = new Date(dateInput.min);

  // 2045-12-31
  const maxDate = new Date(dateInput.max);

  // Check if user entered a trans. amount
  if (!amountInput.value) {
    displayError("Please enter a transaction amount.");

    // Check if user chose a trans. type
  } else if (!isRadioSelected()) {
    displayError("Please select a transaction type.");

    // Check if user chose a valid trans. date
  } else if (dateValue < minDate || dateValue > maxDate) {
    displayError("Date must be between 2010 and 2045.");

    // Check if user entered a trans. description
  } else if (!descriptionInput.value) {
    displayError("Please enter a description.");

    // Hide the error label
  } else {
    errorMessage.classList.add("collapse");
  }

  // disable or enable add button
  updateAddButtonState();
};

// Reset inputs & add trans. button
const resetForm = () => {
  amountInput.value = "";
  descriptionInput.value = "";
  transactionTypeRadios.forEach((radio) => (radio.checked = false));
  dateInput.value = today;
  addTransactionButton.disabled = true;
};

const toggleTextColor = (value, element) => {
  // if value is above 0, change text-color to green
  if (value > 0) {
    element.classList.add("text-green-500");
    element.classList.remove("text-red-500");
    // else if value is below 0, change text-color to red
  } else if (value < 0) {
    element.classList.add("text-red-500");
    element.classList.remove("text-green-500");
    // else change text-color to black
  } else {
    element.classList.remove("text-red-500");
    element.classList.remove("text-green-500");
  }
};

const updateTotalsUI = () => {
  // Show totals
  balanceDisplay.textContent = formatCurrency(totalBalance);
  spendingDisplay.textContent = formatCurrency(totalSpending);
  revenueDisplay.textContent = formatCurrency(totalRevenue);

  // Toggle text colors
  toggleTextColor(totalBalance, balanceDisplay);
  toggleTextColor(totalSpending, spendingDisplay);
  toggleTextColor(totalRevenue, revenueDisplay);
};

const renderTransaction = (transaction) => {
  const html = `
        <div data-id="${transaction.id}" class="transaction flex gap-4 justify-center items-center mx-8 last:mb-8">
          <div class="border border-white rounded-2xl flex justify-between items-center min-w-[320px]">
            <div class="flex flex-col ml-3">
              <p class="text-lg">${transaction.description}</p>
              <p class="font-bold text-sm -mt-2">${transaction.date}</p>
            </div>
            <p class="ml-24 mr-1 ${transaction.type === "revenue" ? "text-green-500" : "text-red-500"}">${transaction.type === "revenue" ? "+" : "-"}${transaction.amount} €</p>
          </div>
          <button>
            <img src="img/delete.png" alt="Delete Transaction" class="w-6 h-6 hover:cursor-pointer hover:opacity-90 active:opacity-80">
          </button>
        </div>
      </div>
  `;
  transactionsContainer.insertAdjacentHTML("beforeend", html);
};

const addTransaction = () => {
  // Replace the comma with a dot, so we can parse it into a number
  const amount = parseFloat(amountInput.value.replace(",", "."));

  // Get the transaction type
  const type = revenueRadio.checked ? "revenue" : "spending";

  // Update totals
  if (type === "revenue") {
    totalBalance += amount;
    totalRevenue += amount;
  } else {
    totalBalance -= amount;
    totalSpending -= amount;
  }

  // Create a new transaction object
  const newTransaction = {
    id: Date.now(),
    amount: amountInput.value,
    type: type,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // Save the transaction object
  transactions.push(newTransaction);
  saveTransactions();

  // Show the transaction
  renderTransaction(newTransaction);

  // Update totals
  updateTotalsUI();

  // Reset form
  resetForm();
};

const removeTransaction = (id) => {
  // Get the index to delete
  const index = transactions.findIndex((t) => t.id === id);

  // Get the transaction
  const selectedTransaction = transactions[index];

  // Update totals
  if (selectedTransaction.type === "revenue") {
    totalBalance -= selectedTransaction.amount;
    totalRevenue -= selectedTransaction.amount;
  } else {
    totalBalance += Number(selectedTransaction.amount);
    totalSpending += Number(selectedTransaction.amount);
  }

  // Update transactions array (remove the transaction)
  transactions.splice(index, 1);

  // Update localstorage
  saveTransactions();

  // Update UI
  updateTotalsUI();
};

///////////////
// LocalStorage functions

// Update "transactions" in localStorage
const saveTransactions = function () {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

const loadTransactions = function () {
  // Get "transactions" from localStorage
  const savedTransactions = localStorage.getItem("transactions");

  if (savedTransactions) {
    // Parse the JSON format into JS format
    const parsedTransactions = JSON.parse(savedTransactions);

    // Get the transactions and show them
    parsedTransactions.forEach((transaction) => {
      transactions.push(transaction);
      renderTransaction(transaction);

      // Replace the comma with a dot, so we can parse it into a number
      const amount = parseFloat(transaction.amount.replace(",", "."));

      // Update totals
      if (transaction.type === "spending") {
        totalBalance -= Number(amount);
        totalSpending -= Number(amount);
      } else {
        totalBalance += Number(amount);
        totalRevenue += Number(amount);
      }
    });

    // Update totals UI
    updateTotalsUI();
  }
};

// Event Listeners

addTransactionButton.addEventListener("click", addTransaction);

amountInput.addEventListener("input", () => {
  // Only allow digits and comma
  let cleaned = amountInput.value.replace(/[^0-9,]/g, "");

  // Split the input into before comma, and after comma
  const parts = cleaned.split(",");

  // Check if the user entered a comma
  if (parts.length > 1) {
    // Only allow one comma
    cleaned = cleaned.replace(/(,.*?),/g, "$1");
    if (parts[1].length > 2) {
      // Only allow 2 digits after the comma
      parts[1] = parts[1].slice(0, 2);
      cleaned = parts.join(",");
    }
  }

  amountInput.value = cleaned;
  validateInputs();
});

amountInput.addEventListener("paste", (event) => {
  // Prevent pasting
  event.preventDefault();

  // Remove every sign, thats not a comma or a digit
  const pasted = event.clipboardData.getData("text").replace(/[^0-9,]/g, "");

  // Split the pasted input into before comma, and after comma
  const parts = pasted.split(",");

  // Check if the user pasted a comma
  if (parts.length > 2) {
    // Slice the value after the comma to only 2 places
    parts[1] = parts[1].slice(0, 2);

    // Delete everything after the first comma
    while (parts.length > 1) parts.pop();
  }

  // Convert back to a string
  amountInput.value = parts.join(",");
});

descriptionInput.addEventListener("input", validateInputs);

transactionTypeRadios.forEach((radio) =>
  radio.addEventListener("change", validateInputs)
);

dateInput.addEventListener("change", () => {
  if (!dateInput.value) dateInput.value = today;
  validateInputs();
});

transactionsContainer.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    // Get the transaction el
    const transactionElement = e.target.closest(".transaction");

    // Get the ID of the el
    const transactionID = Number(transactionElement.dataset.id);

    // Remove the el from DOM
    transactionElement.remove();

    // Remove transaction
    removeTransaction(transactionID);
  }
});

// Load transactions once the Website (DOM) got load
document.addEventListener("DOMContentLoaded", loadTransactions);

// Set the value of the datePicker, to today
dateInput.value = today;
