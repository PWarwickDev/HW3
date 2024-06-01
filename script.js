/*
File: script.js
GUI Assignment: HW3 Creating an Interactive Dynamic Table
Paul Warwick, UMass Lowell Computer Science, paul_warwick@student.uml.edu
Copyright (c) 2024 by Paul Warwick. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by PW on 6/1/2024 at 5:04 pm.

Description: JavaScript file to manipulate html and css and make the table dynamic/deal with errors.
*/

// Add event listener which waits for HTML to be parsed before manipulating the DOM (Document Object Model)
document.addEventListener("DOMContentLoaded", () => {
    // collecting objects to be manipulated
    const form = document.getElementById('table-form');
    const tableContainer = document.getElementById('table-container');
    const errorMessage = document.getElementById('error-message');

    // Add event listener which waits for form completion, with "event" handling form submission
    form.addEventListener('submit', (event) => {
        // Intercepting the form submission, to be handled by the program
        event.preventDefault();

        // Clear previous error messages
        errorMessage.textContent = '';

        // Get values from the form
        const startMultiplier = parseInt(document.getElementById('start-multiplier').value, 10);
        const endMultiplier = parseInt(document.getElementById('end-multiplier').value, 10);
        const startMultiplicand = parseInt(document.getElementById('start-multiplicand').value, 10);
        const endMultiplicand = parseInt(document.getElementById('end-multiplicand').value, 10);

        // Validate inputs
        if (isNaN(startMultiplier) || isNaN(endMultiplier) || isNaN(startMultiplicand) || isNaN(endMultiplicand)) {
            displayError("Please enter valid numbers.");
            return;
        }

        // Range logic check
        if (startMultiplier > endMultiplier || startMultiplicand > endMultiplicand) {
            displayError("Start value must be less than or equal to end value.");
            return;
        }

        // Number can only be -50 <--> 50
        if (Math.abs(startMultiplier) > 50 || Math.abs(endMultiplier) > 50 ||
            Math.abs(startMultiplicand) > 50 || Math.abs(endMultiplicand) > 50) {
            displayError("Number entered was too large. Multipliers/Multiplicands can only be from -50 to 50.");
            return;
        }

        // Generate the table
        const table = generateTable(startMultiplier, endMultiplier, startMultiplicand, endMultiplicand);

        // Clear previous table and append the new one
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    });

    const generateTable = (startMultiplier, endMultiplier, startMultiplicand, endMultiplicand) => {
        const table = document.createElement('table');

        // Create table header
        const headerRow = document.createElement('tr');
        const headerCell = document.createElement('th');
        headerCell.textContent = '×'; // Adding multiplication symbol to signify the operation
        headerCell.classList.add('multiply-symbol');
        headerRow.appendChild(headerCell);

        // creating header cells, then appending to row
        for (let i = startMultiplier; i <= endMultiplier; i++) {
            const th = document.createElement('th');
            th.textContent = i;
            headerRow.appendChild(th);
        }

        // append that header row to table
        table.appendChild(headerRow);

        // Create table rows
        for (let i = startMultiplicand; i <= endMultiplicand; i++) {
            const row = document.createElement('tr');
            const headerCell = document.createElement('th');
            headerCell.textContent = i;
            row.appendChild(headerCell);

            // find products, change color of cell
            for (let j = startMultiplier; j <= endMultiplier; j++) {
                const cell = document.createElement('td');
                const product = i * j;
                cell.textContent = product;

                // Calculate hue based on row and column index. Aesthetic looking, especially at large ranges.
                // Gradient ensures consistent good style over small or large ranges.
                const rowHue = ((i - startMultiplicand) / (endMultiplicand - startMultiplicand)) * 360;
                const colHue = ((j - startMultiplier) / (endMultiplier - startMultiplier)) * 360;
                const hue = (rowHue + colHue) / 2;

                // adjust hue, saturation, lightness of cell (based on previous hue found)
                cell.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;

                // append result to row
                row.appendChild(cell);
            }

            // append that row
            table.appendChild(row);
        }

        return table;
    };


    // Error displaying, with message to output
    const displayError = (message) => {
        errorMessage.textContent = message;
    };
});
