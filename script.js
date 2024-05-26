// recuperar los gastos del local storege

window.addEventListener('load', function() {
    var expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Limpiar el ls... es lo unico que me sirvio para que no se duplicara los gastos al recargar la pagina
    localStorage.removeItem('expenses');

    expenses.forEach(function(expense) {
        addExpense(expense.name, expense.amount, expense.date, expense.category);
    });
});

// Codigo para añadir API de cotizacion del dolar actual

// direccion url de la API
const apiUrl = 'https://mindicador.cl/api/dolar';

// Función para obtener el valor del dolar
function obtenerValorDolar() {
    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener el valor del dólar.');
            }
            return response.json();
        })
        .then(data => {
            return data.serie[0].valor; 
        })
        .catch(error => {
            console.error('Error al obtener el valor del dólar:', error);
            return null;
        });
}



// Función para el DOM
function mostrarValorDolar() {
    obtenerValorDolar()
        .then(valorDolar => {
            if (valorDolar !== null) {
                document.getElementById('valor-dolar').textContent = 'Valor del dólar hoy: ' + valorDolar.toFixed(2) + ' CLP';
            } else {
                document.getElementById('valor-dolar').textContent = 'No se pudo obtener el valor del dólar.';
            }
        });
}

// Llamar a la funcion del dolar
mostrarValorDolar();



// Formatea la cantidad en dolares
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

    // Validar ingreso de datos
    if (isNaN(expenseAmount) || !expenseName || !expenseDate || !expenseCategory) {
        Swal.fire({
            title: "Falló la validación",
            text: "Favor ingresar datos faltantes",
            icon: "error"
            });
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

    // Guardar el gasto en ls como json
    var expense = {
        name: name,
        amount: amount,
        date: date,
        category: category
    };


    // Obtener los gastos existentes del lS o si no hay ninguno
    var expenses = JSON.parse(localStorage.getItem('expenses')) || []; 
    
    // Agregar el nuevo gasto al array de gastos
    expenses.push(expense);

    // Guardar el array de gastos actualizado en lS
    localStorage.setItem('expenses', JSON.stringify(expenses)); 


    // Se eliminar el gasto cuando se hace clic en el boton de eliminar
    expenseItem.querySelector('.delete-btn').addEventListener('click', function() {
        
        // eliminacion del gasto
        totalExpense -= amount; 
        document.getElementById('total-expense').textContent = 'Total gastado hasta el momento: ' + formatCurrency(totalExpense);
        expenseItem.remove(); 

        // Remover el gasto eliminado del array del LS
        expenses = expenses.filter(exp => exp !== expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    });
}



