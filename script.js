document.getElementById('expense-form').addEventListener('submit', addExpense);
    
    let expenses = [];
    
    function addExpense(e) {
        e.preventDefault();
    
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;
        const category = document.getElementById('expense-category').value;
    
        // Date validation - User must put in a future date
        const inputDate = new Date(date);
        const currentDate = new Date();
        
        // Clear the time part of the current date
        currentDate.setHours(0, 0, 0, 0);
    
        if (inputDate <= currentDate) {
            document.getElementById('errorMessage').style.display = 'block';
            return;  
        } else {
            document.getElementById('errorMessage').style.display = 'none';
        }
    
        expenses.push({ name, amount, date, category });
    
        renderExpenses(expenses);
        updateTotal();
        document.getElementById('expense-form').reset();
    }
    
    function renderExpenses(expensesToRender) {
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = '';
    
        expensesToRender.forEach(expense => {
            const li = document.createElement('li');
            li.className = 'expense-item';
            li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)} - ${expense.date} - ${expense.category} <button onclick="deleteExpense('${expense.date}')"> X</button>`;
            expenseList.appendChild(li);
        });
    }
    
    // delete function
    function deleteExpense(date) {
        expenses = expenses.filter(expense => expense.date !== date);
        renderExpenses(expenses);
        updateTotal();
    }
     //   get total amount function
    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        document.getElementById('total-expenses').innerText = `Total: $${total.toFixed(2)}`;
    }
     //   filter function for both and category
    function filterExpenses() {
        const startDate = document.getElementById('filter-start-date').value;
        const endDate = document.getElementById('filter-end-date').value;
        const filterCategory = document.getElementById('filter-category').value;
    
        const filteredExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (!startDate || new Date(startDate) <= expenseDate) &&
                   (!endDate || expenseDate <= new Date(endDate)) &&
                   (!filterCategory || expense.category === filterCategory);
        });
    
        renderExpenses(filteredExpenses);
        updateFilteredTotal(filteredExpenses);
    }
    
     //   function to return total amount after filtering 
    function updateFilteredTotal(filteredExpenses) {
        const filteredTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        document.getElementById('filtered-total-expenses').innerText = `Filtered Total: $${filteredTotal.toFixed(2)}`;
    }