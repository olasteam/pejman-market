const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRjxUt1aRrxd5_0mcM0ou4w52i5wP_DLLs2GCE-DOz9h1xrniUrucfhJbOkJ0W_bf82nPkEiKWfrHNe/pub?output=csv";

async function fetchData() {
    try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();

        const rows = csvText.trim().split("\n").map(r => r.split(","));

        const headers = rows.shift();
        const data = rows.map(r => ({
            نوع: r[0],
            عنوان: r[1],
            مبلغ: Number(r[2]),
            تاریخ: r[3]
        }));

        renderTable(data);
        calculateSummary(data);

    } catch (err) {
        console.error("خطا در دریافت داده:", err);
    }
}

function renderTable(data) {
    const tbody = document.querySelector("#dataTable tbody");
    tbody.innerHTML = "";

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.نوع}</td>
            <td>${row.عنوان}</td>
            <td>${row.مبلغ.toLocaleString()}</td>
            <td>${row.تاریخ}</td>
        `;
        tbody.appendChild(tr);
    });
}

function calculateSummary(data) {
    let buyCount = 0;
    let payCount = 0;
    let totalBills = 0;
    let totalPays = 0;

    data.forEach(item => {
        if (item.نوع.trim() === "خرید") {
            buyCount++;
            totalBills += item.مبلغ;
        } else if (item.نوع.trim() === "واریز") {
            payCount++;
            totalPays += item.مبلغ;
        }
    });

    document.getElementById("buyCount").textContent = buyCount;
    document.getElementById("payCount").textContent = payCount;
    document.getElementById("totalPays").textContent = totalPays.toLocaleString();
    document.getElementById("finalDebt").textContent = (totalBills - totalPays).toLocaleString();
}

fetchData();
