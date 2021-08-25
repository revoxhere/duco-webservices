const register = document.querySelector(".register");
const registerInput = document.querySelector(".registerInput");
const modal_error = document.querySelector('#modal_error');
const modal_success = document.querySelector('#modal_success');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordconfirm');
const captchainfo = document.getElementById('captchainfo');

// RANDOM BACKGROUND
const bg_list = [
    'backgrounds/1-min.png',
    'backgrounds/2-min.png',
    'backgrounds/3-min.png',
    'backgrounds/4-min.png',
    'backgrounds/5-min.png',
    'backgrounds/6-min.jpg',
    'backgrounds/7-min.png',
    'backgrounds/8-min.png',
    'backgrounds/9-min.png'
]
let num = Math.floor(Math.random() * bg_list.length)
document.body.background = bg_list[num];
let captcha;
let server_message;
let version_received;
register.onclick = function(event) {
    captcha = grecaptcha.getResponse();
    if(checkInputs()){
        $("#logintext").text("Please wait...");
        $("#logincheck").hide(1);
        $("#loginload").show(1);
        $.getJSON('https://server.duinocoin.com/new_wallet/'
            + '?username=' + username.value.trim()
            + '&password=' + encodeURIComponent(password.value)
            + '&email=' + encodeURIComponent(email.value.trim())
            + '&captcha=' + captcha,
            function(data) {
            
            if (data.success == true) {
                $("#logintext").text("Register a new account");
                document.querySelector('#modal_success .modal-card-body .content p').innerHTML =
                        `<b>Sucessfully registered new account.<br>You can now go to the login page and authenticate with your credentials.<br>Soon you'll also receive an e-mail confirming the registration process.<br>Have fun using Duino-Coin!</b><br></p>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_success.classList.add('is-active');

                document.querySelector('#modal_success .delete').onclick = function() {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_success.classList.remove('is-active');
                }
            }
            else {
                server_message = data.message
                $("#logincheck").show(1);
                $("#loginload").hide(1);
                $("#logintext").text("Register a new account");
                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                        `<b>` + server_message + `. Please try again</b><br></p>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_error.classList.add('is-active');

                document.querySelector('#modal_error .delete').onclick = function() {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_error.classList.remove('is-active');
                }
            }
        });
    }
    else {
        return false;
    }
}

function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();

    let isFormValid = true;
    
    if(usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank.');
        isFormValid = false;
    } else {
        setSuccessFor(username);
    }
    
    if(emailValue === '') {
        setErrorFor(email, 'Email cannot be blank.');
        isFormValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email.');
        isFormValid = false;
    } else {
        setSuccessFor(email);
    }
    
    if(passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank.');
        isFormValid = false;
    } else {
        setSuccessFor(password);
    }
    
    if(passwordConfirmValue === '') {
        setErrorFor(passwordconfirm, 'Confirm password cannot be blank.');
        isFormValid = false;
    } else if(passwordValue !== passwordConfirmValue) {
        setErrorFor(passwordconfirm, 'The password and confirmation password do not match.');
        isFormValid = false;
    } else{
        setSuccessFor(passwordconfirm);
    }
    if(captcha !== undefined && captcha !==""){
        captchainfo.innerHTML = "";
    }
    else{
        isFormValid = false;
        console.log(captcha);
        captchainfo.innerHTML = "Please answer the captcha correctly!";
    }

    return isFormValid;
}

function setErrorFor(input, message) {
input.classList.add('is-danger');
const field = input.parentElement;
const small = field.querySelector('small');
small.innerText = message;
}

function setSuccessFor(input) {
input.classList.remove('is-danger');
const field = input.parentElement;
const small = field.querySelector('small');
small.innerText = '';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}