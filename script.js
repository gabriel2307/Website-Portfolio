// ----------------- Navbar -------------------
// Get the first element with the class 'toggle-button' and store it in the 'toggleButton' variable.
const toggleButton = document.getElementsByClassName('toggle-button')[0];

// Get the first element with the class 'navbar-links' and store it in the 'navbarLinks' variable.
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

// Add a click event listener to the 'toggleButton'.
toggleButton.addEventListener('click', () => {
  // Toggle the 'active' class on the 'navbarLinks' element to show/hide the navigation menu when the button is clicked.
  navbarLinks.classList.toggle('active');
});
// ---------------------------------------------


// --------------- Contact Form Send Mail -----------------
document.addEventListener('DOMContentLoaded', function () {
    var parent = document.getElementById('frmContact');

    parent.addEventListener('submit', function (event) {
        formDisableEnable();

        const data = {
            name: parent.querySelector('#txtName').value.trim(),
            email: parent.querySelector('#txtEmail').value.trim(),
            subject: parent.querySelector('#txtSubject').value.trim(),
            message: parent.querySelector('#txtMessage').value.trim()
        }

        if (formValidations(data)) {
            fetch('../send_mail.php', {
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(function (response) {
                    response.ok ? showSuccess() : showMessage();
                })
                .catch(function (error) {
                    showMessage();
                })
                .finally(function () {
                    formDisableEnable();
                });
        } else {
            formDisableEnable();
        }

        event.preventDefault();
    });

    function formDisableEnable() {
        Array.from(parent.elements).forEach(formElement => formElement.disabled = !formElement.disabled);
    }

    function formValidations(data) {
        cleanMessages();

        let canSend = true;

        if (!validateName(data.name)) {
            showMessage('errorName', 'Enter a valid name');
            canSend = false;
        }

        if (!validateEmail(data.email)) {
            showMessage('errorEmail', 'Enter a valid email address');
            canSend = false;
        }

        if (!validateSubject(data.subject)) {
            showMessage('errorSubject', 'Enter a valid subject');
            canSend = false;
        }

        if (!validateMessage(data.message)) {
            showMessage('errorMessage', 'Enter a valid message');
            canSend = false;
        }

        return canSend;
    }

    function cleanMessages() {
        showMessage(undefined, '');

        showMessage('errorName', '');
        showMessage('errorEmail', '');
        showMessage('errorSubject', '');
        showMessage('errorMessage', '');
    }

    function showSuccess() {
        showMessage(undefined, 'Email sent successfully!');
        parent.reset();
    }

    function showMessage(elementHTML = 'statusMessage', message = 'An unexpected error occurred.') {
        parent.querySelector('#' + elementHTML).innerHTML = message;
    }
});
// ---------------------------------------------------------

// Function to validate a name.
function validateName(name) {
    return rangeChars(name); // Calls rangeChars to check if the name's length falls within an acceptable range.
}

// Function to validate an email address using a regular expression.
function validateEmail(email) {
    return (new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)).test(email); // Checks if the email matches the regular expression pattern.
}

// Function to validate a subject.
function validateSubject(subject) {
    return rangeChars(subject); // Calls rangeChars to check if the subject's length falls within an acceptable range.
}

// Function to validate a message with optional minimum and maximum length.
function validateMessage(message) {
    return rangeChars(message, 5, 5000); // Calls rangeChars to check if the message's length falls within an acceptable range (5 to 5000 characters).
}

// Function to check if the length of a text falls within a specified range.
function rangeChars(text, min = 2, max = 100) {
    return (text.length >= min && text.length <= max); // Checks if the length of the text is within the specified range.
}