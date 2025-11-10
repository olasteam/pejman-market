let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let password = "noor123"; 

$(document).ready(function () {
    $(".datepicker").persianDatepicker({
        format: "YYYY/MM/DD",
        initialValue: true,
        autoClose: true
    });
});

function login() {
    let inputPass = document.getElementById('adminPass').value;
    if (inputPass === password) {
        document.getElementById('formsSection').style.display = 'block';
        document.getElementById('loginSection').style.display = 'none';
    } else {
        alert('رمز اشتباه است!');
    }
}

function addPurchase() {
    let title = document.getElementById('itemTitle').value;
    let amount = parseFloat(document.getElementById('itemAmount').value);
    let date = document.getElementById('itemDate').value;

    if (!title || !amount || !date) {
        alert('لطفا همه فیلدها را پر کنید');
        return;
    }

    let transaction = { type: 'خرید', title, amount, date };
    transactions.push(transaction);
    saveData();
    renderTransactions();
}

function addDeposit() {
    let amount = parseFloat(document.getElementById('depositAmount').value);
    let date = document.getElementById('depositDate').value;

    if (!amount || !date) {
        alert('لطفا همه فیلدها را پر کنید');
        return;
    }

    let transaction = { type: 'واریز', title: 'واریز به حساب سوپرمارکت', amount, date };
    transactions.push(transaction);
    saveData();
    renderTransactions();
}

function saveData() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function renderTransactions() {
    let tbody = document.querySelector('#transactionsTable tbody');
    tbody.innerHTML = '';

    let debt = 0;

    transactions.forEach(tr => {
        let row = `<tr>
            <td>${tr.type}</td>
            <td>${tr.title}</td>
            <td>${tr.amount}</td>
            <td>${tr.date}</td>
        </tr>`;
        tbody.innerHTML += row;

        if (tr.type === 'خرید') {
            debt += tr.amount;
        } else if (tr.type === 'واریز') {
            debt -= tr.amount;
        }
    });

    document.getElementById('totalDebt').innerText = "بدهی فعلی: " + debt + " تومان";
}

renderTransactions();
