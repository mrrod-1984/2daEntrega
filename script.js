// Formatea la cantidad en dólares
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Envía el formulario
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    var expenseName = document.getElementById('expense-name').value;
    var expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    var expenseDate = document.getElementById('expense-date').value;

    // Validar que la cantidad ingresada sea un número
    if (isNaN(expenseAmount)) {
    alert('Por favor, ingrese una cantidad válida.');
    return;
    }

    // Agregar el gasto a la lista
    addExpense(expenseName, expenseAmount, expenseDate);

    // Limpiar el formulario
    document.getElementById('expense-form').reset();
});


// Variable para almacenar el total de gastos
var totalExpense = 0; 

// Función para agregar un gasto a la lista y actualizar el total
function addExpense(name, amount, date) {
    var expenseList = document.getElementById('expense-list');

    var expenseItem = document.createElement('div');
    
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Cantidad:</strong> ${formatCurrency(amount)}</p>
        <p><strong>Fecha:</strong> ${date}</p>
        <button class="delete-btn">Eliminar</button>
    `;

    expenseList.appendChild(expenseItem);

    // suma el gasto al total 
    totalExpense += amount; 
    document.getElementById('total-expense').textContent = 'Total gastado: ' + formatCurrency(totalExpense);

    // Funcion para eliminar 
    expenseItem.querySelector('.delete-btn').addEventListener('click', function() {
        totalExpense -= amount;
        document.getElementById('total-expense').textContent = 'Total gastado: ' + formatCurrency(totalExpense);
        expenseItem.remove();
    });
}


