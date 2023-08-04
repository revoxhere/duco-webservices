const register = document.querySelector(".register");
const registerInput = document.querySelector(".registerInput");
const modal_error = document.querySelector('#modal_error');
const modal_success = document.querySelector('#modal_success');
const username = document.getElementById('username');
const email = document.getElementById('email');
const miner_key = document.getElementById('miner_key');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordconfirm');
const captchainfo = document.getElementById('captchainfo');
const check1 = document.getElementById('check1');
const check2 = document.getElementById('check2');
const check3 = document.getElementById('check3');
const check4 = document.getElementById('check4');
const checkInfo = document.getElementById("checkinfo");
let captcha;
let server_message;
let version_received;

// RANDOM BACKGROUND
const bg_list = [
    "img/yenn-sea-1.jpg",
    "backgrounds/wallet/yenn-mountains-1.jpg",
]
let num = Math.floor(Math.random() * bg_list.length)
document.getElementById('background').style.backgroundImage = `url(${bg_list[num]})`;

register.onclick = function(event) {
    captcha = grecaptcha.getResponse();
    if (checkInputs()) {
        $("#logintext").text("Please wait...");
        $("#logincheck").hide(1);
        $("#loginload").show(1);
        fetch('https://server.duinocoin.com/register/' +
                '?username=' + encodeURIComponent(username.value.trim()) +
                '&password=' + encodeURIComponent(password.value) +
                '&email=' + encodeURIComponent(email.value.trim()) +
                '&key=' + encodeURIComponent(miner_key.value.trim()) +
                '&captcha=' + encodeURIComponent(captcha)).then(data => data.json()).then(
                (data) => {

                    if (data.success == true) {
                        $("#logintext").text("Create a new wallet");
                        document.querySelector('#modal_success .modal-card-body .content p').innerHTML =
                            `<b>Your wallet has been sucessfully created.</b>` +
                            `<br>You can now go to the login page and authenticate with your credentials.` +
                            `<br>Soon you'll also receive an e-mail confirming the registration process.` +
                            `<br><b>Have fun using Duino-Coin!</b><br></p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_success.classList.add('is-active');

                        document.querySelector('#modal_success .delete').onclick = function() {
                            document.querySelector('html').classList.remove('is-clipped');
                            modal_success.classList.remove('is-active');
                        }
                    } else {
                        server_message = data.message
                        $("#logincheck").show(1);
                        $("#loginload").hide(1);
                        $("#logintext").text("Create a new wallet");
                        document.querySelector('#modal_error .modal-card-body .content p').inner
                            `<b>` + server_message + `. Please try again</b><br></p>`;HTML =
                        document.querySelector('html').classList.add('is-clipped');
                        modal_error.classList.add('is-active');

                        document.querySelector('#modal_error .delete').onclick = function() {
                            document.querySelector('html').classList.remove('is-clipped');
                            modal_error.classList.remove('is-active');
                        }
                        hcaptcha.reset();
                    }
                })
            .catch((error) => {
                let modal_error = document.querySelector('#modal_error');
                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                    `Network <b>connection problem</b>.<br>
                        Your web browser couldn't connect to the Duino-Coin servers for some reason.<br>
                        We'd like to help, but there are many possible causes.<br>
                         <b>Before asking the support, try disabling your browser extensions or similar programs and try again.</br>
                    </p>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_error.classList.add('is-active');
                hcaptcha.reset();
                $("#logintext").text("Create a new wallet");

                document.querySelector('#modal_error .delete').onclick = function() {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_error.classList.remove('is-active');

                }
            });
    } else {
        return false;
    }
}

$(username).focusout(function() {
    fetch('https://server.duinocoin.com/users/' +
        encodeURIComponent(username.value.trim())
    ).then(data => data.json()).then(
        (data) => {
            if (data.success) setErrorFor(username, 'Username already taken');
            else setSuccessFor(username);
        });
});

function checkInputs() {
    // trim to remove the whitespaces
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();
    const miner_keyValue = miner_key.value.trim();
    const check1Value = check1.checked;
    const check2Value = check2.checked;
    const check3Value = check3.checked;
    const check4Value = check4.checked;

    let isFormValid = true;

    if (usernameValue === '') {
        setErrorFor(username, 'Username cannot be blank.');
        isFormValid = false;
    } else {
        setSuccessFor(username);
    }

    if (miner_keyValue === '') {
        isFormValid = false;
        setErrorFor(miner_key, 'Mining key cannot be blank.');
    } else {
        setSuccessFor(miner_key);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email cannot be blank.');
        isFormValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Not a valid email.');
        isFormValid = false;
    } else {
        setSuccessFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Password cannot be blank.');
        isFormValid = false;
    } else {
        setSuccessFor(password);
    }

    if (passwordConfirmValue === '') {
        setErrorFor(passwordconfirm, 'Confirm password cannot be blank.');
        isFormValid = false;
    } else if (passwordValue !== passwordConfirmValue) {
        setErrorFor(passwordconfirm, 'The password and confirmation password do not match.');
        isFormValid = false;
    } else {
        setSuccessFor(passwordconfirm);
    }
    if (captcha !== undefined && captcha !== "") {
        captchainfo.innerHTML = "";
    } else {
        isFormValid = false;
        captchainfo.innerHTML = "Please answer the captcha correctly!";
    }

    if (check1Value && check2Value && check3Value && check4Value) {
        checkInfo.innerHTML = "";
    } else {
        isFormValid = false;
        checkInfo.innerHTML = "Please read and agree to the rules to create an account!"
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

$(window).on('load', function() {
    $("#pageloader").fadeOut();
});
