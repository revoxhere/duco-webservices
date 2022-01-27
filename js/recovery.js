let username = document.querySelector("#usernameinput");
let submit = document.querySelector("#submit");

let url = new URL(window.location);
let usern = url.searchParams.get("username");
let hash = url.searchParams.get("hash");

if(usern && hash)
{
    if (usern.length > 0 && hash.length > 0) {
        fetch("https://server.duinocoin.com/recovering/" + usern + "?hash=" + hash).then(data => data.json()).then(data => {
            if(data.success)
            {
                if(data.result.includes("new password"))
                {
                    document.querySelector('#modal_success .modal-card-body .content p').innerHTML =
                        `${data.result}<br/>
                        New Password: <b>${data.password}</b><br/><br/>
                        <p>Please consider change the password.</p>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_success.classList.add('is-active');

                    document.querySelector('#modal_success .delete').onclick = function() {
                        document.querySelector('html').classList.remove('is-clipped');
                        modal_success.classList.remove('is-active');
                    }
                }
                else {
                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                        `<b>${data.message}</b>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_error.classList.add('is-active');

                    document.querySelector('#modal_error .delete').onclick = function() {
                        document.querySelector('html').classList.remove('is-clipped');
                        modal_error.classList.remove('is-active');
                    }
                }
            }
            else {
                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                    `<b>${data.message}</b>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_error.classList.add('is-active');

                document.querySelector('#modal_error .delete').onclick = function() {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_error.classList.remove('is-active');
                }
            }        
        }).catch(err => {
            document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                `Maybe you are rate-limited.<br/>
                <b>Please try again later.</b><br/><br/>
                ${err}`;

            document.querySelector('html').classList.add('is-clipped');
            modal_error.classList.add('is-active');

            document.querySelector('#modal_error .delete').onclick = function() {
                document.querySelector('html').classList.remove('is-clipped');
                modal_error.classList.remove('is-active');
            }
        });
    }
}

const generatePassword = (e) => {
    event.preventDefault();
    let user = username.value;
    if (user.length > 0) {
        fetch("https://server.duinocoin.com/recovery?username=" + user).then(data => data.json()).then(data => {
            if (data.success)
            {
                if(data.result.includes("Email"))
                {
                    document.querySelector('#modal_success .modal-card-body .content p').innerHTML =
                        `<b>${data.result}</b>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_success.classList.add('is-active');

                    document.querySelector('#modal_success .delete').onclick = function() {
                        document.querySelector('html').classList.remove('is-clipped');
                        modal_success.classList.remove('is-active');
                    }
                }
                else {
                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                        `<b>${data.message}</b>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_error.classList.add('is-active');

                    document.querySelector('#modal_error .delete').onclick = function() {
                        document.querySelector('html').classList.remove('is-clipped');
                        modal_error.classList.remove('is-active');
                    }
                }
            }
            else
            {
                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                    `<b>${data.message}</b>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_error.classList.add('is-active');

                document.querySelector('#modal_error .delete').onclick = function() {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_error.classList.remove('is-active');
                }
            }   
        }).catch(err => {
            document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                `Maybe you are rate-limited.<br/>
                <b>Please try again later.</b><br/><br/>
                ${err}`;

            document.querySelector('html').classList.add('is-clipped');
            modal_error.classList.add('is-active');

            document.querySelector('#modal_error .delete').onclick = function() {
                document.querySelector('html').classList.remove('is-clipped');
                modal_error.classList.remove('is-active');
            }
        });
    }
}

// Fix input label

const inputs = document.querySelectorAll(".input");

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

submit.addEventListener("click", generatePassword);