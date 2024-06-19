const { ipcRenderer } = require('electron');

const btnAudit = document.getElementById('btnAudit');
const loadingBar = document.getElementById('loadingBar');
const btnAbout = document.getElementById('btnAbout');

btnAudit.addEventListener('click', () => {
    // Show loading bar
    loadingBar.style.display = 'block';

    // Simulate long-running process
    setTimeout(() => {
        // Hide loading bar
        loadingBar.style.display = 'none';
    }, 3000); // Replace 3000 with actual execution time
});

btnAbout.addEventListener('click', () => {
    // Display About table
    displayAboutTable();
});

function displayAboutTable() {
    // Create and populate table
    const aboutTable = document.createElement('table');
    for (let i = 0; i < 5; i++) {
        const row = aboutTable.insertRow();
        for (let j = 0; j < 15; j++) {
            const cell = row.insertCell();
            cell.textContent = `Row ${i + 1}, Column ${j + 1}`;
        }
    }

    // Append table to body
    document.body.appendChild(aboutTable);
}
