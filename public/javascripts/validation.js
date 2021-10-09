const formType = document.getElementById('form-type');

if(formType != null && formType.innerHTML === 'Login') {
    console.log('Login Page');
    let gencaptcha = document.querySelector("#gencaptcha");
    let newCaptcha = generateCaptcha();
    gencaptcha.innerHTML = newCaptcha;

    document.getElementById("refreshButton").addEventListener("click", function(e) {
        e.preventDefault();
        newCaptcha = generateCaptcha();
        gencaptcha.innerHTML = newCaptcha;
    });
}

function generateCaptcha() {
    var chr1 = Math.ceil(Math.random() * 10) + '';  
    var chr2 = Math.ceil(Math.random() * 10) + '';  
    var chr3 = Math.ceil(Math.random() * 10) + '';  
    var str = new Array(4).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); });  
    var captchaCode = str + chr1 + '' + chr2 + '' + chr3;
    return captchaCode;
}

//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'my-form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
    return false;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'my-form-control success';
    return true;
}

//Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function registerFormValidation() {
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    if(checkRequired([username, email, password, password2])) {
        if(checkLength(username, 3, 15)) {
            if(checkLength(password, 6, 25) && checkLength(password2, 6, 25)) {
                if(checkEmail(email)) {
                    if(checkPasswordsMatch(password, password2)) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function loginFormValidation() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    let genCaptcha = document.querySelector("#gencaptcha");
    let enterCaptcha = document.querySelector("#entercaptcha");

    if(checkRequired([username, password, enterCaptcha])) {
        if(checkLength(username, 3, 15)) {
            if(checkLength(password, 6, 25)) {
                // if(checkCaptcha(enterCaptcha, genCaptcha)) {
                    return true;
                // }
            }
        }
    }

    return false;
}

function checkCaptcha(input1, input2) {
    if(input1.value === input2.innerHTML) {
        return showSuccess(input1);
    } else {
        return showError(input1, "Captcha did not match");
    }
}

//Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            return showError(input, `${getFieldName(input)} is required`);
        } else {
            return showSuccess(input);
        }
    });
    return true;
}

//Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        return showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        return showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        return showSuccess(input);
    }
}

//check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        return showSuccess(input);
    } else {
        return showError(input, 'Email is not valid');
    }
}

//Check password match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        return showError(input2, "Password do not match");
    }
    return true;
}