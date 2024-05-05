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
    var expenseCategory = document.getElementById('expense-category').value;

    // Validar que la cantidad ingresada sea un número
    if (isNaN(expenseAmount)) {
    alert('Por favor, ingrese una cantidad válida.');
    return;
    }

    // Agregar el gasto a la lista
    addExpense(expenseName, expenseAmount, expenseDate,expenseCategory);

    // Limpiar el formulario
    document.getElementById('expense-form').reset();
});


// Variable para almacenar el total de gastos
var totalExpense = 0; 

// Función para agregar un gasto a la lista y actualizar el total
function addExpense(name, amount, date, category) {
    var expenseList = document.getElementById('expense-list');

    var expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Cantidad:</strong> ${formatCurrency(amount)}</p>
        <p><strong>Fecha:</strong> ${date}</p>
        <p><strong>Categoría:</strong> ${category}</p>
        <button class="delete-btn">Eliminar</button>
    `;

    expenseList.appendChild(expenseItem);

    // Sumar el nuevo gasto al total
    totalExpense += amount; 
    document.getElementById('total-expense').textContent = 'Total gastado hasta el momento: ' + formatCurrency(totalExpense);

    // Evento para eliminar el gasto cuando se hace clic en el boton de eliminar
    expenseItem.querySelector('.delete-btn').addEventListener('click', function() {
        totalExpense -= amount;
        document.getElementById('total-expense').textContent = 'Total gastado hasta el momento: ' + formatCurrency(totalExpense);
        expenseItem.remove(); 
    });
}



