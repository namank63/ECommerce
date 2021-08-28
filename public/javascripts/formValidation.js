function registerFormValidation() {
    var username = document.registration.username;
    var createpassword = document.registration.createpassword;
    var confirmpassword = document.registration.confirmpassword;
    var uemail = document.registration.email;

    if(username_validation(username, 5, 10)) {
        if(email_validation(uemail)) {
            if(password_validation(createpassword, confirmpassword, 5, 10)) {
                return true;
            }
        }
    }
    return false;
}

function loginFormValidation() {
    var username = document.login.username;
    var password = document.login.password;

    if(username_validation(username, 5, 10)) {
        if(password_validation(password, password)) {
            return true;
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
    var passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/;
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
        alert("The length of password must be between 5 to 10 and it must contain at least a letter, a number and a special character");
        createpassword.focus();
        return false;
    }
}