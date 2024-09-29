document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration');
    const tableBody = document.getElementById('tableBody');
    const dobError = document.getElementById('dobError');

    loadEntries();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let username = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        let dateOfBirth = document.getElementById("dob").value;
        let acceptConditions = document.getElementById("accept").checked;
        console.log(username,email,pass,dateOfBirth,acceptConditions);

        // if (!username || !email || !pass || !dateOfBirth) {
        //     errorMessage.textContent = "All fields are required.";
        //     return;
        // }
        if (!isValidEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const age = calculateAge(dateOfBirth);
        if (!validAge(age)) {
            dobError.textContent = `You are ${age} years old. You must be between 18 and 55 years old. Please change your date of birth.`;
            return;
        } else {
            dobError.textContent = ''; // Clear the error message
        }

        errorMessage.textContent = '';

        const entry = {
            username,
            email,
            pass,
            dateOfBirth,
            acceptConditions
        };

        saveEntry(entry);
        form.reset();
        loadEntries();
    });

    function calculateAge(date) {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function validAge(age) {
        return age >= 18 && age <= 55;
    }
    function isValidEmail(email) {
        // Simple regex for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push(entry);
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        tableBody.innerHTML = '';
        entries.forEach((entry) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.username}</td>
                <td>${entry.email}</td>
                <td>${entry.pass}</td>
                <td>${entry.dateOfBirth}</td>
                <td>${entry.acceptConditions}</td>
            `;
            tableBody.appendChild(row);
        });
    }
});
