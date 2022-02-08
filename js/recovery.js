const username = document.querySelector("#usernameinput");
const submit = document.querySelector("#submit");

const url = new URL(window.location);
const usern = url.searchParams.get("username");
const hash = url.searchParams.get("hash");

if (usern && hash) {
    fetch("https://server.duinocoin.com/recovering/" + usern + "?hash=" + hash).then(data => data.json()).then(data => {
        if (data.success && data.result.includes("new password")) {
            document.querySelector('#modal_success .modal-card-body .content p').innerHTML =
                `${data.result}<br/>
                Your new private key: <b>${data.password}</b><br/><br/>
                <p>Please consider changing the passphrase soon.</p>`;
            document.querySelector('html').classList.add('is-clipped');
            modal_success.classList.add('is-active');

            document.querySelector('#modal_success .delete').onclick = () => {
                document.querySelector('html').classList.remove('is-clipped');
                modal_success.classList.remove('is-active');
            }
        } else {
            document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                `<b>${data.message}</b>`;
            document.querySelector('html').classList.add('is-clipped');
            modal_error.classList.add('is-active');

            document.querySelector('#modal_error .delete').onclick = () => {
                document.querySelector('html').classList.remove('is-clipped');
                modal_error.classList.remove('is-active');
            }
        }
    }).catch(err => {
        document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
            `Server didn't respond properly or you are rate-limited for sending too many requests.<br/>
            <b>Please try again later.</b><br/><br/>
            ${err}`;

        document.querySelector('html').classList.add('is-clipped');
        modal_error.classList.add('is-active');

        document.querySelector('#modal_error .delete').onclick = () => {
            document.querySelector('html').classList.remove('is-clipped');
            modal_error.classList.remove('is-active');
        }
    });
}

const generatePassword = (e) => {
    event.preventDefault();
    const user = username.value;
    if (user) {
        submit.classList.add('is-loading');
        fetch("https://server.duinocoin.com/recovery?username=" + user).then(data => data.json()).then(data => {
            if (data.success && data.result.includes("sent")) {
                document.querySelector('#modal_success .modal-card-body .content p').innerHTML =
                    `<b>${data.result}</b>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_success.classList.add('is-active');

                document.querySelector('#modal_success .delete').onclick = () => {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_success.classList.remove('is-active');
                }
            } else {
                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                    `<b>${data.message}</b>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_error.classList.add('is-active');

                document.querySelector('#modal_error .delete').onclick = () => {
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
            submit.classList.remove('is-loading');
        });
    }
}

// Fix input label

const inputs = document.querySelectorAll(".input");

const addcl = () => {
    const parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

const remcl = () => {
    const parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

submit.addEventListener("click", generatePassword);
