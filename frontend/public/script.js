let selectedType = "Business";

function openTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active-tab'));
    document.getElementById(tab).classList.add('active-tab');

    document.querySelectorAll('.nav button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function selectClass(type, el) {
    selectedType = type;
    document.querySelectorAll('.travel-class button').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

async function addPassenger() {
    const name = document.getElementById("name").value;
    const flight = document.getElementById("flight").value;

    await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, flight, type: selectedType })
    });

    loadQueue();
}

async function loadQueue() {
    const res = await fetch("http://localhost:3000/passengers");
    const data = await res.json();

    document.getElementById("queueCount").innerText = data.length;

    document.getElementById("queueList").innerHTML =
        data.map(p => `<li>${p.name} - ${p.type}</li>`).join("");
}

async function serve() {
    await fetch("http://localhost:3000/serve", { method: "DELETE" });
    loadQueue();
    loadHistory();
}

async function loadHistory() {
    const res = await fetch("http://localhost:3000/history");
    const data = await res.json();

    document.getElementById("historyList").innerHTML =
        data.map(p => `<tr><td>${p.name}</td></tr>`).join("");

    document.getElementById("total").innerText = data.length;
    let business = 0;
    let priority = 0;
    let economy = 0;

    data.forEach(p => {
        if (p.type === "Business") business++;
        else if (p.type === "Priority") priority++;
        else if (p.type === "Economy") economy++;
    });

    document.getElementById("total").innerText = data.length;
    document.getElementById("business").innerText = business;
    document.getElementById("priority").innerText = priority;
    document.getElementById("economy").innerText = economy;
}

loadQueue();
loadHistory();