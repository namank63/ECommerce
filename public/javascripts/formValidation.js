var gencaptcha = document.querySelector("#gencaptcha");
var newCaptcha = generateCaptcha();
gencaptcha.innerHTML = newCaptcha;
var refreshFunctionCheck = false;

document.getElementById("refreshButton").addEventListener("click", function() {
    refreshFunctionCheck = true;
    newCaptcha = generateCaptcha();
    gencaptcha.innerHTML = newCaptcha;
});

function registerFormValidation() {
    var username = document.registration.username;
    var createpassword = document.registration.createpassword;
    var confirmpassword = document.registration.confirmpassword;
    var uemail = document.registration.email;

    if(username_validation(username, 5, 16)) {
        if(email_validation(uemail)) {
            if(password_validation(createpassword, confirmpassword, 5, 16)) {
                return true;
            }
        }
    }
    return false;
}

function generateCaptcha() {
    var chr1 = Math.ceil(Math.random() * 10) + '';  
    var chr2 = Math.ceil(Math.random() * 10) + '';  
    var chr3 = Math.ceil(Math.random() * 10) + '';  
    var str = new Array(4).join().replace(/(.|$)/g, function () { return ((Math.random() * 36) | 0).toString(36)[Math.random() < .5 ? "toString" : "toUpperCase"](); });  
    var captchaCode = str + chr1 + '' + chr2 + '' + chr3;
    return captchaCode;
}

function loginFormValidation() {
    var username = document.login.username;
    var password = document.login.password;
    var entercaptcha = document.login.entercaptcha;
    var gencaptcha = document.querySelector("#gencaptcha");

    if(username_validation(username, 5, 16)) {
        if(password_validation(password, password)) {
            if(gencaptcha.innerHTML === entercaptcha.value) {
                return true;
            } else {
                if(refreshFunctionCheck == false)
                    alert("Enter correct Captcha!!");
            }
        }
    }
    return false;
}

function username_validation(username, mx, my) {
    var uid_len = username.value.length;
    if (uid_len == 0 || uid_len >= my || uid_len < mx) {
        alert("Username length must be between "+ mx + " to " + my);
        username.focus();
        return false;
    }
    return true;
}

function email_validation(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(uemail.value.match(mailformat)) {
        return true;
    } else {
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}

function password_validation(createpassword, confirmpassword) {
    var passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,16}$/;
    var passid_len = createpassword.value.length;
    if(createpassword.value.match(passwordFormat)) {
        if(createpassword.value == confirmpassword.value) {
            return true;
        } else {
            alert("Password did not match!!");
            confirmpassword.focus();
            return false;
        }
    } else {
        alert("The length of password must be between 5 to 16 and it must contain at least a letter, a number and a special character");
        createpassword.focus();
        return false;
    }
}

