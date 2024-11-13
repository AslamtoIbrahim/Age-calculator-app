const day = document.getElementById('day');
const errorDay = document.getElementById('errorDay');
const month = document.getElementById('month');
const errorMonth = document.getElementById('errorMonth');
const year = document.getElementById('year');
const errorYear = document.getElementById('errorYear');
const calculateAgeButton = document.getElementById('calculate-age-button');
const resultYear = document.getElementById('result-year');
const resultMonth = document.getElementById('result-month');
const resultDay = document.getElementById('result-day');

calculateAgeButton.addEventListener('click', () => {
    const days = day.value;
    const months = month.value;
    const years = year.value;
    const isValidDay = validateDay(days);
    const isValidMonth = validateMonth(months);
    const isValidYear = validateYear(years);

    if (!isValidDay || !isValidMonth || !isValidYear) {
        return;
    }

    const age = calculateAge(days, months, years);
    console.log('day :' + age.days + ' months :' + age.months + ' years : ' + age.years);
    showAge(age.years, resultYear);
    showAge(age.months, resultMonth);
    showAge(age.days, resultDay);

});



function validateDay(dayValue) {
    const labelName = 'day';
    if (isNaN(dayValue)) {
        showSpecialError(day, errorDay, labelName);
        return false;
    }

    if (dayValue < 1 || dayValue > 31) {
        showSpecialError(day, errorDay, labelName);
        return false;
    }

    hideSpecialError(day, errorDay, labelName);
    return true;
}

function validateMonth(monthValue) {
    const labelName = 'month';
    if (isNaN(monthValue)) {
        showSpecialError(month, errorMonth, labelName);
        return false;
    }

    if (monthValue < 1 || monthValue > 12) {
        showSpecialError(month, errorMonth, labelName);
        return false;
    }

    hideSpecialError(month, errorMonth, labelName);
    return true;
}

function validateYear(yearValue) {
    const labelName = 'year';
    if (isNaN(yearValue) || yearValue === '') {
        showSpecialError(year, errorYear, labelName);
        return false;
    }

    if (yearValue > 2024 || yearValue < 1900) {
        showSpecialError(year, errorYear, labelName);
        return false;
    }

    hideSpecialError(year, errorYear, labelName);
    return true;
}

function showSpecialError(input, error, date) {
    showErrorMessage(error, `Must be a valid ${date}`);
    input.style.borderColor = 'hsl(0, 100%, 67%)';
    redColorLabel(date);
}
function hideSpecialError(input, error, date) {
    hideErrorMessage(error);
    input.style.borderColor = 'hsl(0, 0%, 86%)';
    greyColorLabel(date);
}


function showErrorMessage(error, message = 'Enter a valid number') {
    error.style.visibility = 'visible';
    error.classList.remove('warning');
    void error.offsetWidth;
    error.classList.add('warning');
    error.textContent = message;
}

function hideErrorMessage(error) {
    error.style.visibility = 'hidden';
    error.classList.remove('warning');
}

const redColorLabel = color => document.querySelector(`label[for="${color}"]`).style.color = 'hsl(0, 100%, 67%)';
const greyColorLabel = color => document.querySelector(`label[for="${color}"]`).style.color = 'hsl(0, 1%, 44%)';


function calculateAge(day, month, year) {
    const today = new Date();
    let years = today.getFullYear() - year;
    let days = today.getDate() - day;
    // the + 1 is because the months start from 0
    let months = today.getMonth() + 1 - month;

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { days, months, years }
}



function showAge(number, element) {
    const finalNumber = number;
    const duration = 3500;// 3.5s
    // calculate the duration for each update
    const interval = 50;// 50 milliseconds
    const increment = finalNumber / (duration / interval);
    let currentNumber = 0;
    const timer = setInterval(() => {
        // update the current number
        currentNumber += increment;
        // display the number on the screen
        // floor is for remoing fraction numbers
        element.textContent = Math.floor(currentNumber);

        // stope at the end of the final number
        if (currentNumber >= finalNumber) {
            clearInterval(timer);
            element.textContent = finalNumber;
        }
    }, interval);
}

controlCursor();
function controlCursor() {
    const fields = document.querySelectorAll('.fields');
    fields.forEach((field, index) => {

        field.addEventListener('keydown', (event) => {
            const key = event.key;
            const cursorPosition = fields[index].selectionStart;
            const length = fields[index].value.length;

            if (key === 'ArrowRight') {
                if (cursorPosition === length && index < (fields.length - 1)) {
                    if (index < (fields.length - 2)) {
                        // this for delying the set selection of last field
                        setTimeout(() => {
                            const ln = fields[index + 1].value.length;
                            fields[index + 1].setSelectionRange(ln, ln);
                        }, 0);
                    }
                    fields[index + 1].focus();

                }
            }

            if (key === 'ArrowLeft') {
                if (cursorPosition === 0 && index > 0) {
                    // fields[index -1].setSelectionRange(length, length);
                    setTimeout(() => {
                        fields[index - 1].focus();
                        const ln = fields[index - 1].value.length;
                        fields[index - 1].setSelectionRange(ln, ln);
                        console.log("length: ", fields[index - 1].value.length);

                    }, 0);

                }


                if (index === 3) {
                    setTimeout(() => {
                        const ln = fields[index - 1].value.length;
                        fields[index - 1].setSelectionRange(ln, ln);
                        fields[index - 1].focus();
                    }, 0);
                }
            }

            if (key === 'Enter') {
                if (index < (fields.length - 1)) {
                    fields[index + 1].focus();
                }
            }
            // console.log('cp: ', cursorPosition);
            // console.log('ln: ', length);
            // console.log('in: ', index);

        });
    });
}