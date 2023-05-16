let loggedIn = false;
let balance = 0;
let curr_bal = 0;
let profitcheck = 0;
let duco_price = 0.0065;
let daily_average = [];
let oldb = 0;
let total_hashrate = 0;
let start = Date.now();
let timestamps = [];
let balances = [];
let user_items;
let cache_miners = 0;
let username, password;
let notify_shown = false;
let transaction_limit = 5;
let first_launch = true;
let start_time = Date.now();
let start_balance = 0;
const STAKING_PERC = 1.5;
const STAKE_DAYS = 21;
const date_opt = { day: 'numeric', month: "long", year: 'numeric' };

const MD5 = function(d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() };

function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) _ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f }

function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0; for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ }

function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ }

function Y(d, _) {
    d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _;
    for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
        var h = m,
            t = f,
            g = r,
            e = i;
        f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e)
    }
    return Array(m, f, r, i)
}

function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) }

function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) }

function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) }

function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) }

function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) }

function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m }

function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

function component_to_hex(c) {
    /* https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

if (localStorage.getItem("minerExpanded")) {
    if (localStorage.getItem("minerExpanded") == "true") document.getElementById("mcontainer").style.maxHeight = "100%";
    else document.getElementById("mcontainer").style.maxHeight = "150px";
}


let minertableexpanded = 0;

function toggleexpand() {
    if (!minertableexpanded) {
        document.getElementById("mcontainer").style.maxHeight = "100%";
        minertableexpanded = 1;
        localStorage.setItem("minerExpanded", "true");
    } else {
        document.getElementById("mcontainer").style.maxHeight = "150px";
        minertableexpanded = 0;
        localStorage.setItem("minerExpanded", "false");
    }
}

let transactiontableexpanded = 0;

function toggletxexpand() {
    if (!transactiontableexpanded) {
        document.getElementsByClassName(".tcontainer").style.maxHeight = "100%";
        transactiontableexpanded = 1;
    } else {
        document.getElementsByClassName(".tcontainer").style.maxHeight = "10.5em";
        transactiontableexpanded = 0;
    }
}

function get_user_color(username) {
    /* https://www.cluemediator.com/create-a-random-color-based-on-a-string-using-javascript */
    const firstAlphabet = username.charAt(0).toLowerCase();
    const asciiCode = firstAlphabet.charCodeAt(0);
    const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    let num = Math.round(0xffffff * parseInt(colorNum));
    let r = num >> 16 & 255;
    let g = num >> 8 & 255;
    let b = num & 255;

    return component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
};

let qrUser = "";

const genQrCode = () => {

    qrUser = username;

    if ((!qrUser || qrUser.length === 0) || (qrUser == null || qrUser == "null")) // if it's empty try with form data
    {
        qrUser = $('#usernameinput').val();
        qrUser = qrUser.replace(/^[ ]+|[ ]+$/g, '');

        if ((!qrUser || qrUser.length === 0) || (qrUser == null || qrUser == "null")) // if it's empty try with localStorage data
        {
            qrUser = localStorage.getItem('username');
            if ((!qrUser || qrUser.length === 0) || (qrUser == null || qrUser == "null")) // if it's empty try with username div
            {
                qrUser = $("#username").text() || "Error";
            }
        }
    }

    const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "svg",
        data: `duco:${qrUser}`,
        dotsOptions: {
            color: "#ff9326",
            type: "square"
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        cornersDotOptions: {
            type: "square",
            color: "#ff4662"
        },
        cornersSquareOptions: {
            type: "square",
            color: "#ff4662"
        },
    });

    qrCode.getRawData("svg").then((buffer) => {
        let objectURL = URL.createObjectURL(buffer);
        document.getElementById("qrcode").src = objectURL;
    }).catch((err) => {
        console.error(err);
        document.getElementById("qrcode").src = `./assets/loadfailed.jpg`;
    });
}

const srcToFile = (src) => {
    return (fetch(src)
        .then((res) => { return res.arrayBuffer(); })
    );
}

const shareQR = async () => {
    try {
        const url = document.getElementById("qrcode").src;
        const blob = await fetch(url).then(r => r.blob());

        let image = new Image(); // get the svg blob and conver it to png file
        image.onload = async () => {

            let canvas = document.createElement('canvas');

            canvas.widht = 250;
            canvas.height = 250;

            let context = canvas.getContext('2d');

            context.drawImage(image, 0, 0);

            let img = canvas.toDataURL('image/png'); // get dataURL

            let file = new File([await (srcToFile(img))], 'qrcode.png', { type: "image/png" }); // make a new File object

            navigator.share({
                title: 'Hello',
                text: 'This is my Duino-Coin QR Code!',
                files: [file],
            }); // Share :)
        };

        image.src = URL.createObjectURL(blob);
    } catch (e) {
        console.log(`Error trying to share the QR Code: ${e}`);
    }
}

const downloadQR = () => {
    let data = document.getElementById("qrcode").src;
    let filename = `Duco_QRCode_${username}.svg`;
    const elem = window.document.createElement('a');
    elem.href = data;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}

let qrCanvas = document.querySelector('#qrscanner');
let qrVideo = document.createElement("video");
let qrCtx = qrCanvas.getContext("2d");

document.getElementById('qrFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(e) {
    if (e.target.files.length) {
        document.querySelector("#qrFile-name").innerHTML = e.target.files[0].name;
        let cnv = document.createElement('canvas');
        let ctx = cnv.getContext('2d');

        let file = e.target.files[0],
            url = URL.createObjectURL(file),
            img = new Image();

        img.onload = function() {
            URL.revokeObjectURL(this.src);
            cnv.width = 250;
            cnv.height = 250;
            ctx.drawImage(this, 0, 0);

            imageData = ctx.getImageData(0, 0, 250, 250);

            for (let y = 0; y < imageData.height; y++) { // convert any color to black and white
                for (let x = 0; x < imageData.width; x++) {
                    let i = (y * 4) * imageData.width + x * 4;
                    let avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                    imageData.data[i] = avg;
                    imageData.data[i + 1] = avg;
                    imageData.data[i + 2] = avg;
                }
            }

            let code = jsQR(imageData.data, 250, 250, {
                inversionAttempts: "attemptBoth",
            });

            if (code) {
                let modal = document.querySelector('#modal-qrcode-scanner');
                let html = document.querySelector('html');
                modal.classList.remove('is-active');
                html.classList.remove('is-clipped');

                document.getElementById('recipientinput').value = code.data.split(':')[1];

                stopCamera();
            }
        };

        img.src = url;
    }
}

const checkRights = () => {
    let constraints = { video: { facingMode: 'environment' } };
    let cameraFeedPromise = navigator.mediaDevices.getUserMedia(constraints);

    cameraFeedPromise.then((mediaStream) => {
        window.localStream = mediaStream;
        qrVideo.srcObject = mediaStream;
        qrVideo.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
        qrVideo.play();
        requestAnimationFrame(tick);
    });
    cameraFeedPromise.catch(function(err) {
        console.log(err.name);
    });
}

function stopCamera() {
    localStream.getTracks().forEach(track => track.stop())
}

function tick() {
    if (qrVideo.readyState === qrVideo.HAVE_ENOUGH_DATA) {

        qrCanvas.style.width = '100%';
        qrCanvas.style.height = '100%';
        qrCanvas.width = qrCanvas.offsetWidth;
        qrCanvas.height = qrCanvas.width * (9 / 16);

        qrCtx.drawImage(qrVideo, 0, 0, qrCanvas.width, qrCanvas.height);

        let imageData = qrCtx.getImageData(0, 0, qrCanvas.width, qrCanvas.height);

        let code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
        });

        if (code) {
            let modal = document.querySelector('#modal-qrcode-scanner');
            let html = document.querySelector('html');
            modal.classList.remove('is-active');
            html.classList.remove('is-clipped');

            document.getElementById('recipientinput').value = code.data.split(':')[1];

            stopCamera();
        }
    }
    requestAnimationFrame(tick);
}

// Registering Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/wallet/serviceWorker.js');
}

const rememberLogin = document.querySelector("#rememberinput");

const historicPrices = document.querySelector('#historicPrices');

const historicPricesCtx = historicPrices.getContext('2d');

let gradient = historicPricesCtx.createLinearGradient(0, 0, 0, 400);

gradient.addColorStop(0, 'rgba(255, 180, 18, .5)');
gradient.addColorStop(.5, 'rgba(171, 121, 12, 0)');

let hPricesDate = []
let hPrices = [];

const drawGraph = () => {
    new Chart(historicPricesCtx, {
        type: 'line',
        data: {
            labels: hPricesDate,
            datasets: [{
                label: '',
                data: hPrices,
                fill: true,
                backgroundColor: gradient,
                borderColor: 'rgba(255, 180, 18, 1)',
                borderJoinStyle: 'round',
                borderCapStyle: 'round',
                borderWidth: 3,
                pointRadius: 0,
                pointHitRadius: 10,
                lineTension: .2,
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: "Price History",
                    position: "bottom",
                    fullWidth: true,
                    fontSize: 16
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(item, data) { // Value Fix
                            return item.parsed.y + ' $';
                        }
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        display: false,
                    },
                    display: false
                },
                x: {
                    ticks: {
                        display: false
                    },
                    gridLines: {
                        display: false,
                    },
                    scaleLabel: {
                        display: false,
                    },
                    display: false
                }
            }
        }
    });
}

fetch('https://server.duinocoin.com/historic_prices?currency=max&limit=30').then(res => res.json()).then(response => {
    let data = response.result;

    for (day in data.reverse()) {
        hPricesDate.push(data[day]["day"]);
        hPrices.push(data[day]["price"])
    }

    drawGraph();
}).catch(err => {

    for (let i = 0; i < 30; i++) {
        hPricesDate.push(new Date().toLocaleDateString());
        hPrices.push(Math.random() * (100 - 1) + 1);
    }

    console.log(err);

    drawGraph();
});

let graphToggled = false;

const toggleGraph = () => {
    if (graphToggled) {
        historicPrices.classList.add('is-hidden');
        $("#heightFix").addClass("is-hidden");
        $("#userData").fadeIn();
        graphToggled = false;
    } else {
        $("#userData").fadeOut('slow', () => {
            $("#heightFix").removeClass("is-hidden");
            $("#historicPrices").fadeIn('slow', () => {
                historicPrices.classList.remove('is-hidden');
            });
        });
        graphToggled = true;
    }
}

const sWarningsBtn = document.querySelector("#showWarnings");
const disableAnimsBtn = document.querySelector("#disableAnims");
const disableIoTBtn = document.querySelector("#disableIoT");

if (localStorage.getItem("disableAnims")) {
    if (localStorage.getItem("disableAnims") == "true") disableAnimsBtn.checked = true;
    else disableAnimsBtn.checked = false;
}

if (localStorage.getItem("disableIoT")) {
    if (localStorage.getItem("disableIoT") == "true") {
        $("#iotbox").fadeOut(function() {
            $("#mcontainer").css("max-height", "20em");
        });
        disableIoTBtn.checked = true;
    } else {
        $("#mcontainer").css("max-height", "10em");
        setTimeout(function() {
            $("#iotbox").fadeIn();
        }, 300)
        disableIoTBtn.checked = false;
    }
}

disableIoTBtn.addEventListener("click", function() {
    if (this.checked) {
        localStorage.setItem("disableIoT", "true");
        $("#iotbox").fadeOut(function() {
            $("#mcontainer").css("max-height", "20em");
        });
    } else {
        localStorage.setItem("disableIoT", "false");
        $("#mcontainer").css("max-height", "10em");
        setTimeout(function() {
            $("#iotbox").fadeIn();
        }, 300)
    }
});

disableAnimsBtn.addEventListener("click", function() {
    if (this.checked) {
        localStorage.setItem("disableAnims", "true");
    } else {
        localStorage.setItem("disableAnims", "false");
        backgroundAnimation = setAnimation(draw, canvas);
    }
});

if (localStorage.getItem("hideWarnings")) {
    if (localStorage.getItem("hideWarnings") == "true") sWarningsBtn.checked = true;
    else sWarningsBtn.checked = false;
}

sWarningsBtn.addEventListener("click", function() {
    if (this.checked) {
        localStorage.setItem("hideWarnings", "true");
    } else {
        localStorage.setItem("hideWarnings", "false");
    }
});

const inputs = document.querySelectorAll(".input");

function changepass() {
    old_pass = document.getElementById("oldpass").value;
    new_pass = document.getElementById("newpass").value;
    new_pass_conf = document.getElementById("newpass_conf").value;

    if (new_pass != new_pass_conf) {
        update_element("changepass_text", "New passwords don't match")
    } else {
        fetch("https://server.duinocoin.com/changepass/" + encodeURIComponent(username) +
                "?password=" + encodeURIComponent(old_pass) +
                "&newpassword=" + encodeURIComponent(new_pass))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    update_element("changepass_text", data.result);
                    $('#oldpass').val('');
                    $('#newpass').val('');
                    $('#newpass_conf').val('');
                } else {
                    update_element("changepass_text", data.message);
                }
            });
    }
}

function adblock_penalty() {
    return; // disabled
    $("#wrapbutton").attr("disabled", true);
    $("#wrapbutton").removeClass("modal-button");
    $("#wrapbutton").removeAttr("data-target");
    $("#wrapbutton").attr("data-tooltip", "Disable your adblocking software. We're paying for this");

    $("#sendbutton").attr("disabled", true);
    $("#sendbutton").removeClass("modal-button");
    $("#sendbutton").removeAttr("data-target");
    $("#sendbutton").attr("data-tooltip", "Disable your adblocking software. We're paying for this");

    $("#stakebutton").attr("disabled", true);
    $("#stakebutton").removeClass("modal-button");
    $("#stakebutton").removeAttr("data-target");
    $("#stakebutton").attr("data-tooltip", "Disable your adblocking software. We're paying for this");

    $("#expandbutton").attr("disabled", true);
    $("#expandbutton").removeClass("modal-button");
    $("#expandbutton").attr("onclick", "#");
    $("#expandbutton").attr("data-tooltip", "Disable your adblocking software. We're paying for this");
}

function send() {
    let recipient = document.getElementById('recipientinput').value
    let amount = document.getElementById('amountinput').value
    let memo = document.getElementById('memoinput').value

    if (recipient && amount) {
        document.getElementById("send_confirm").classList.add("is-loading");
        $.getJSON('https://server.duinocoin.com/transaction/' +
            '?username=' + encodeURIComponent(username) +
            "&password=" + encodeURIComponent(password) +
            "&recipient=" + encodeURIComponent(recipient) +
            "&amount=" + encodeURIComponent(amount) +
            "&memo=" + encodeURIComponent(memo),
            function(data) {
                document.getElementById("send_confirm").classList.remove("is-loading");
                $('#recipientinput').val('');
                $('#amountinput').val('');
                $('#memoinput').val('');
                if (data.success == true) {
                    serverMessage = data["result"].split(",");
                    if (serverMessage[0] == "OK") {
                        let modal_send = document.querySelector('#modal-send');
                        document.querySelector('html').classList.remove('is-clipped');
                        modal_send.classList.remove('is-active');

                        let modal_success = document.querySelector('#modal_success');
                        document.querySelector('#modal_success .modal-card-body .content p')
                            .innerHTML = `<span class='subtitle has-text-success'><b>` +
                            serverMessage[1] +
                            `</b></span><br> Transaction hash: <a target="_blank" href='https://explorer.duinocoin.com?search=` +
                            serverMessage[2] + "'>" +
                            serverMessage[2] +
                            `</a></p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_success.classList.add('is-active');
                    }

                } else {
                    serverMessage = data["message"].split(",");

                    let modal_send = document.querySelector('#modal-send');
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_send.classList.remove('is-active');

                    let modal_error = document.querySelector('#modal_error');
                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                        `<b>An error has occurred while sending funds: </b>` + serverMessage[1] + `</b><br></p>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_error.classList.add('is-active');
                }
            })
    }
}

function wrap() {
    wrap_network = document.getElementById("wrap_network").value;
    wrap_amount = document.getElementById("wrap_amount").value;
    address = document.getElementById("wrap_address").value;

    if (wrap_amount >= 50) {
        document.getElementById("wrap_confirm").classList.add("is-loading");

        if (wrap_network == "wDUCO (Tron, TRX)") {
            fetch("https://server.duinocoin.com/wduco_wrap/" + encodeURIComponent(username) +
                    "?password=" + encodeURIComponent(password) +
                    "&address=" + encodeURIComponent(address) +
                    "&amount=" + encodeURIComponent(wrap_amount))
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        update_element("wrap_text", "<span class='has-text-success-dark'>" + data.result + "</span>");
                        $('#wrap_amount').val('');
                        $('#wrap_address').val('');
                    } else {
                        update_element("wrap_text", "<span class='has-text-danger-dark'>" + data.message + "</span>");
                    }
                    document.getElementById("wrap_confirm").classList.remove("is-loading");
                    setTimeout(function() {
                        update_element("wrap_text", "")
                    }, 10000)
                });
        } else {
            if (wrap_network == "bscDUCO (Binance Smart Chain, BSC)") recipient = "bscDUCO";
            else if (wrap_network == "maticDUCO (Polygon, MATIC)") recipient = "maticDUCO";
            else if (wrap_network == "celoDUCO (Celo)") recipient = "celoDUCO";

            fetch("https://server.duinocoin.com/transaction/" +
                    "?username=" + encodeURIComponent(username) +
                    "&password=" + encodeURIComponent(password) +
                    "&recipient=" + encodeURIComponent(recipient) +
                    "&memo=" + encodeURIComponent(address) +
                    "&amount=" + encodeURIComponent(wrap_amount))
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        update_element("wrap_text", "<span class='has-text-success-dark'>Successful wrapping</span>");
                        $('#wrap_amount').val('');
                        $('#wrap_address').val('');
                    } else {
                        update_element("wrap_text", "<span class='has-text-danger-dark'>" + data.message + "</span>");
                    }
                    document.getElementById("wrap_confirm").classList.remove("is-loading");
                    setTimeout(function() {
                        update_element("wrap_text", "")
                    }, 10000)
                });
        }
    } else {
        update_element("wrap_text", "<span class='has-text-danger-dark'>Minimum wrappable amount is 50 DUCO</span>");
        setTimeout(function() {
            update_element("wrap_text", "");
        }, 10000);
    }
}

document.querySelector("#stake_max").addEventListener("click", function() {
    // Round down the value of balance
    let roundedBalance = Math.floor(balance);

    // Set the rounded down value to the input field
    document.getElementById("stake_amount").value = roundedBalance;
});


function stake_counter() {
    stake_amount_text = document.getElementById("stake_amount_text")
    stake_date_text = document.getElementById("stake_date_text");
    stake_amount = document.getElementById("stake_amount").value;

    if (!stake_amount || stake_amount < 20) stake_amount = 0;
    else stake_amount = stake_amount * (1 + (STAKING_PERC / 100))

    stake_day = new Date(new Date().setDate(new Date().getDate() + STAKE_DAYS));
    update_element("stake_date_text", stake_day.toLocaleDateString());
    update_element("stake_amount_text", `${round_to(2, stake_amount)} DUCO`);
}

function stake() {
    stake_amount = document.getElementById("stake_amount").value;
    stake_text = document.getElementById("stake_text");
    if (stake_amount >= 20) {
        document.getElementById("stake_confirm").classList.add("is-loading");
        fetch("https://server.duinocoin.com/stake/" + encodeURIComponent(username) +
                "?password=" + encodeURIComponent(password) +
                "&amount=" + encodeURIComponent(stake_amount))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    update_element("stake_text",
                        `<a href='https://explorer.duinocoin.com/?search=${
                                data.result.split(",")[1]
                            }' target='_blank' class='has-text-success-dark'>
                                ${data.result.split(",")[0]}
                            </a>`
                    );
                    $('#stake_amount').val('');
                } else {
                    update_element("stake_text", "<span class='has-text-danger-dark'>" + data.message + "</span>");
                }
                document.getElementById("stake_confirm").classList.remove("is-loading");
                setTimeout(function() {
                    update_element("stake_text", "")
                }, 10000)
            });
    }
}


function set_mining_key() {
    mining_key = document.getElementById("mining_key").value;
    if (mining_key) {
        document.getElementById("mkey_confirm").classList.add("is-loading");
        fetch("https://server.duinocoin.com/mining_key" +
                "?u=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password) +
                "&k=" + encodeURIComponent(mining_key), { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    update_element("key_text", data.result);
                    $("#miner_pass").text(mining_key);
                } else {
                    update_element("stake_text", "<span class='has-text-danger-dark'>" + data.message + "</span>");
                }
                document.getElementById("mkey_confirm").classList.remove("is-loading");
                setTimeout(function() {
                    update_element("key_text", "")
                }, 10000)
            });
    }
}


function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    window.location.reload(true);
}

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

/* Parallax background */
let canvas = document.getElementById('background');
let ctx = canvas.getContext('2d');
let mouse = { x: 0, y: 0 };
let backgroundAnimation = null;
let images = [];
let lastData = { x: 0, y: 0 };
let resized = false;
const times = [];

// Find vendor prefix, if any
let vendors = ['ms', 'moz', 'webkit', 'o'];
for (let i = 0; i < vendors.length && !window.requestAnimationFrame; i++) {
    window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
}

// Use requestAnimationFrame if available
if (window.requestAnimationFrame) {
    let next = 1,
        anims = {};

    window.setAnimation = function(callback, element) {
        let current = next++;
        anims[current] = true;

        let animate = () => {
            if (!anims[current]) { return; }
            window.requestAnimationFrame(animate, element);
            callback();
        };
        window.requestAnimationFrame(animate, element);
        return current;
    };

    window.clearAnimation = function(id) {
        delete anims[id];
    };
} else // Make a interval timer
{
    window.setAnimation = function(callback, element) {
        return window.setInterval(callback, 1000 / 60);
    }
    window.clearAnimation = window.clearInterval;
}

document.addEventListener('mousemove', (ev) => {
    mouse.x = ev.clientX;
    mouse.y = ev.clientY;
});

const canvasResize = () => {
    canvas.width = 1920;
    canvas.height = 1080;
    resized = true;
    draw();
};

window.addEventListener('resize', canvasResize);

let loadImages = () => {
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let img = new Image();
    img.src = canvas.getAttribute('data-background');
    img.onload = () => {
        backgroundAnimation = setAnimation(draw, canvas);
    }

    img.onerror = () => {
        loadImages(); // If the image fails to load then load it again
    }

    images = {
        background: img
    };
}

const draw = () => {
    if (localStorage.getItem("disableAnims") == "true") clearAnimation(backgroundAnimation);

    let cw = canvas.width;
    let ch = canvas.height;

    let width = cw,
        height = ch;

    let x = (mouse.x - width) * 0.01;
    let y = (mouse.y - height) * 0.01;

    const const_width = window.innerWidth / 100;
    const const_height = window.innerHeight / 100;

    if (!images.background) loadImages(); // if the image isn't loaded then load it

    if (lastData.x != x || lastData.y != y || resized) { // If the user move the mouse, update the background

        if (resized) resized = false;

        lastData = { x: x, y: y };

        try {
            // Draw BG
            ctx.globalAlpha = 1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(images.background, x, y, width + const_width, height + const_height);
        } catch (err) {
            console.log(`Failed to draw background image: ${err}`);
        }
    }
};

function round_to(precision, value) {
    if (precision < 1) precision = 1;
    power_of_ten = 10 ** precision;
    return Math.round(value * power_of_ten) / power_of_ten;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function key_from_value(object, value) {
    try {
        return capitalize(Object.keys(object).find(key => object[key] === value));
    } catch (err) {
        return 'Unknown';
    }
}

/* Accurate daily calculator by Lukas */
function calculdaily(newb, oldb, user_items) {
    // Ducos since start / time * day
    if (start_balance == 0) {
        start_balance = newb;
        start_time = Date.now();
    } else {
        let daily = 86400000 * (newb - start_balance) / (Date.now() - start_time);
        // Large values mean transaction or big block - ignore this value
        if (daily > 0 && daily < 500) {
            daily = round_to(3, daily)

            if (user_items.includes(3) && user_items.includes(4)) {
                // Both upgrades, 20%
                no_upgrade_earning = round_to(3, daily / 1.20);
                upgrade_earning = round_to(4, daily - no_upgrade_earning);
                update_element("estimatedprofit", `
                    <i class="far fa-star fa-spin"></i>
                    Earning about <b>` + no_upgrade_earning + `</b> ᕲ a day
                    <span class="has-text-success-dark">(+${upgrade_earning} ᕲ)`);
            } else if ((user_items.includes(3))) {
                // 5%
                no_upgrade_earning = round_to(3, daily / 1.05);
                upgrade_earning = round_to(4, daily - no_upgrade_earning);
                update_element("estimatedprofit", `
                    <i class="far fa-star fa-spin"></i>
                    Earning about <b>` + no_upgrade_earning + `</b> ᕲ a day
                    <span class="has-text-success-dark">(+${upgrade_earning} ᕲ)`);
            } else if ((user_items.includes(3))) {
                // 15%
                no_upgrade_earning = round_to(3, daily / 1.15);
                upgrade_earning = round_to(4, daily - no_upgrade_earning);
                update_element("estimatedprofit", `
                    <i class="far fa-star fa-spin"></i>
                    Earning about <b>` + no_upgrade_earning + `</b> ᕲ a day
                    <span class="has-text-success-dark">(+${upgrade_earning} ᕲ)`);
            } else {
                // No upgrade
                update_element("estimatedprofit", `
                    <i class="far fa-star fa-spin"></i>
                    Earning about <b>` + daily + `</b> ᕲ a day`);
            }

            avgusd = round_to(5, daily * duco_price);
            update_element("estimatedprofitusd", "(≈<b>$" + avgusd + "</b>)");
        }
    }
}

let adBlockEnabled = false
const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
try {
    fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
} catch (e) {
    adBlockEnabled = true
}

function update_element(element, value) {
    // Nicely fade in the new value if it changed
    element = "#" + element;
    old_value = $(element).text()

    if ($("<div>" + value + "</div>").text() != old_value) {
        if (localStorage.getItem("disableAnims") == "false") $(element).fadeOut('fast', function() {
            $(element).html(value);
            $(element).fadeIn('fast');
        });
        else $(element).html(value);
        return true;
    }
    return false;
}

const categories = document.querySelector("#categories");
const sortPrices = document.querySelector("#sortPrices");

function miner_notify() {
    let modal_error = document.querySelector('#modal_error');
    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
        `<b>You're wasting power</b><br>Your total miner efficiency is <b>less than 20%</b>, because you're using too many miners.<br>Big farms are not good for Duino-Coin, as you won't earn more but only put more load on the servers. You can read more about it <a href="https://github.com/revoxhere/duino-coin/wiki/FAQ#q-can-i-create-a-mining-farm-with-esp-boards-or-arduinos" target="_blank">here</a>.<br>Consider making your rig smaller.</p>`;
    document.querySelector('html').classList.add('is-clipped');
    modal_error.classList.add('is-active');
}

function shop_buy(item_name) {
    $(`#${item_name}_button`).addClass("is-loading");
    fetch("https://server.duinocoin.com/shop_buy/" + encodeURIComponent(username) +
            "?item=" + item_name +
            "&password=" + encodeURIComponent(password))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                update_element("shop_text", "<span class='has-text-success-dark'>" + data.result + "</span>");
                user_items.push(item_name);
                refresh_shop(user_items);
            } else {
                update_element("shop_text", "<span class='has-text-danger-dark'>" + data.message + "</span>");
            }
            $(`#${item_name}_button`).removeClass("is-loading");
            setTimeout(function() {
                update_element("shop_text", "")
            }, 10000)
        });
}

sortPrices.addEventListener("change", (evt) => {
    evt.preventDefault();
    try {
        let filter = evt.target.value;

        let elements = document.querySelectorAll("[data-categories]");
        let elms = [];
        let sorted = [];

        elements.forEach((elm) => {
            elms.push(elm);
        })

        if (filter == "asc") sorted = elms.sort((a, b) => { return parseInt(a.dataset.price) + parseInt(b.dataset.price); });
        else sorted = elms.sort((a, b) => { return parseInt(a.dataset.price) - parseInt(b.dataset.price); });

        sorted.forEach((elm) => {
            let parent = elm.parentNode;
            parent.insertBefore(elm, parent.firstChild);
        })
    } catch (e) {
        console.log(e);
    }
});


categories.addEventListener('change', (evt) => {
    try {
        evt.preventDefault();
        let filter = evt.target.value;

        let elements = document.querySelectorAll("[data-categories]");

        elements.forEach((elm) => {
            if (elm.dataset.categories.includes(filter)) {
                let parent = elm.parentNode;
                parent.insertBefore(elm, parent.firstChild);
            }
        });
    } catch (e) {
        console.log(e);
    }
});

const usableItems = [
    1, // christmas hat
    2, // sunglasses
    3 // bow tie
];

let enabledItems = JSON.parse(localStorage.getItem("enabledItems")) || usableItems;

function toggleItem(itemid) {
    if (enabledItems.includes(itemid)) // disable item
    {
        let index = enabledItems.indexOf(itemid);

        if (index > -1) {
            enabledItems.splice(index, 1);
        }

        switch (itemid) {
            case 1:
                $("#hat").fadeOut();
                break;
            case 2:
                $("#sunglasses").fadeOut();
                break;
            case 3:
                $("#bowtie").fadeOut();
                break;
        }
    } else // enable item
    {
        enabledItems.push(itemid);

        switch (itemid) {
            case 1:
                $("#hat").fadeIn();
                break;
            case 2:
                $("#sunglasses").fadeIn();
                break;
            case 3:
                $("#bowtie").fadeIn();
                break;
        }
    }

    localStorage.setItem("enabledItems", JSON.stringify(enabledItems));
}

function refresh_event() {
    fetch(`https://server.duinocoin.com/event`)
        .then(response => response.json())
        .then(data => {
            $("#week_topic").html(data.result.topic);
            $("#week_desc").html(data.result.description);
            $("#week_date").html(new Date(data.result.ends * 1000).toLocaleString("default", date_opt));

            full_time = new Date(data.result.ends * 1000) - new Date(data.result.starts * 1000);
            elapsed_time = new Date() - new Date(data.result.starts * 1000);

            $("#week_end").attr('value', elapsed_time);
            $("#week_end").attr('max', full_time);

            /*$("#week_end").click((evt) => {
                try {
                    $('#laugh')[0].play();
                }
                catch(e) {}
            });*/
        });
}

function refresh_shop(user_items) {
    fetch(`https://server.duinocoin.com/shop_items`)
        .then(response => response.json())
        .then(data => {
            shop_items = data.result;

            shop_items_final = "";
            for (item in shop_items) {
                if (user_items) {
                    if (!shop_items[item]["display"] && !(user_items.includes(parseInt(item)))) continue;
                }

                shop_items_final += `
                    <div class="column is-half fadeIn" data-price="${shop_items[item]["price"]}" data-categories="${shop_items[item]["category"]}">
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-left">
                                        <figure class="image is-48x48">
                                            <img src="${shop_items[item]["icon"]}">
                                        </figure>
                                    </div>
                                    <div class="media-content">
                                        <p class="title is-4">
                                            ${shop_items[item]["name"]}
                                        </p>
                                    </div>
                                </div>
                                <div class="content">
                                    ${shop_items[item]["description"]}<br>
                                    Price: <b>${shop_items[item]["price"]} DUCO</b>
                                </div>`;
                if (user_items && user_items.includes(parseInt(item))) {
                    if (usableItems.includes(parseInt(item))) {
                        shop_items_final += `
                                    <div id="switch-container">
                                        <label class="switch">
                                            <input type="checkbox" ${enabledItems.includes(parseInt(item)) ? "checked" : ""} onclick="toggleItem(${item});">
                                            <span class="slider round">
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    } else {
                        shop_items_final += `
                                    <button disabled class="button is-fullwidth">Owned</button>
                                </div>
                            </div>
                        </div>`;
                    }
                } else {
                    shop_items_final += `
                                <button id="${item}_button" onclick="shop_buy(${item})" class="button is-fullwidth">Buy</button>
                            </div>
                        </div>
                    </div>`;
                }
            }

            $("#shop_items").html(shop_items_final)
        });

    if (!user_items) return;

    if (user_items.includes(0)) {
        $("#useravatar").attr("src", "https://server.duinocoin.com/assets/items/0.png");
    }

    if (user_items.includes(1)) {
        $("#hat").attr("src", "https://server.duinocoin.com/assets/items/1.png")
        if (enabledItems.includes(1)) $("#hat").fadeIn();
    }

    if (user_items.includes(2)) {
        $("#sunglasses").attr("src", "https://server.duinocoin.com/assets/items/2.png")
        if (enabledItems.includes(2)) $("#sunglasses").fadeIn();
    }

    if (user_items.includes(3)) {
        $("#bowtie").attr("src", "https://server.duinocoin.com/assets/items/3.png")
        if (enabledItems.includes(3)) $("#bowtie").fadeIn();
    }

    if (user_items.includes(10)) {
        update_element("maxminercount", "75");
    }

    if (user_items.includes(11)) {
        update_element("maxminercount", "100");
    }

    if (user_items.includes(11) && user_items.includes(10)) {
        update_element("maxminercount", "125");
    }
}

function Node(name) {
    this.name = name;
    this.children = [];
}

function Tree(name) {
    this.tree = new Node(name);
}

Tree.prototype.addChild = function(parent, child) {
    function findParent(node) {
        var found;
        if (node.name === parent) return node;
        node.children.some(n => found = findParent(n));
        return found;
    }
    var node = findParent(this.tree) || this.tree;
    node.children.push(new Node(child));
};

const findAchievementIdByName = (obj, name) => {
    for (elm in obj) {
        if (obj[elm].name == name) return elm;
    }
}

const findAchievementByName = (obj, name) => {
    for (elm in obj) {
        if (obj[elm].name == name) return obj[elm];
    }
}

function findAchivementImage(name) {
    let border = "";

    if (findAchievementByName(achievements, name).reward > 0) border = "is-rewarded";

    if (user_achievements && user_achievements.includes(parseInt(findAchievementIdByName(achievements, name)))) {
        return `
            <img class="image is-48x48 img-reached ${border}" src="${findAchievementByName(achievements, name).icon}"/>
        `;
    } else { // not reached
        return `
            <img class="image is-48x48 img-gray ${border}" src="${findAchievementByName(achievements, name).icon}"/>
        `;
    }
}

function refresh_achievements(user_achievements) {
    fetch(`https://server.duinocoin.com/achievements`)
        .then(response => response.json())
        .then(data => {
            achievements = data.result;

            // Kolkastart fix
            achievements[99] = achievements[107];
            delete achievements[107];
            if (user_achievements.includes(107)) {
                user_achievements.push(99);
            }

            achievements_final = `<div class="tf-tree">`;

            /* 
                Note: if the parent don't exist it will use the -1 position
               -1 => First Child
                0 => After Professional photographer
                1 => After Freshman
                2 => After Rising star
                3 => After Steak? Nah, it's a stake!
                4 => After Entrepreneur
                5 => After Kolkastart
                6 => After Mining expert
                7 => After Beginner investor
                8 => After For better future
            */

            let achievements_hierarchy = {
                "Freshman": 0,
                "Brick by brick, block by block...": 1,
                "Rising star": 1,
                "Entrepreneur": 2,

                "Professional photographer": -1,
                "Steak? Nah, it's a stake!": 0,
                "My steak is done! I mean, the stake!": 3,

                "Beginner investor": 3,
                "For better future": 7,
                "The Godfather": 8,

                "Kolkastart": 1,
                "Mining empire": 6,
                "Mining expert": 5,

                "The braincell": -1,

                "Coming soon": 7
            }

            let achievement_tree = new Tree("Achievements");

            for (achievement in achievements) {
                let herarchy_number = parseInt(achievements_hierarchy[achievements[achievement].name]);

                switch (herarchy_number) {
                    case -1:
                        achievement_tree.addChild("Achievements", achievements[achievement].name);
                        continue;
                    case 0:
                        achievement_tree.addChild("Professional photographer", achievements[achievement].name);
                        continue;
                    case 1:
                        achievement_tree.addChild("Freshman", achievements[achievement].name);
                        continue;
                    case 2:
                        achievement_tree.addChild("Rising star", achievements[achievement].name);
                        continue;
                    case 3:
                        achievement_tree.addChild("Steak? Nah, it's a stake!", achievements[achievement].name);
                        continue;
                    case 4:
                        achievement_tree.addChild("Entrepreneur", achievements[achievement].name);
                        continue;
                    case 5:
                        achievement_tree.addChild("Kolkastart", achievements[achievement].name);
                        continue;
                    case 6:
                        achievement_tree.addChild("Mining expert", achievements[achievement].name);
                        continue;
                    case 7:
                        achievement_tree.addChild("Beginner investor", achievements[achievement].name);
                        continue;
                    case 8:
                        achievement_tree.addChild("For better future", achievements[achievement].name);
                        continue;
                }
            }

            function getChildrens(parent) {
                return parent["children"] || [];
            }

            function getChildrensHTML(parentAchievement) {
                let html = "";

                for (elm in getChildrens(parentAchievement)) {
                    let achievement = getChildrens(parentAchievement)[elm];
                    if (getChildrens(achievement) && Object.keys(getChildrens(achievement)).length !== 0) {
                        html += `
                        <li>
                            <div class="tf-nc" tip="${achievement.name}">
                                ${findAchivementImage(achievement.name)}
                            </div>
                            <ul>
                                ${getChildrensHTML(achievement)}
                            </ul>
                        </li>`;
                    } else {
                        html += `
                        <li>
                            <div class="tf-nc" tip="${achievement.name}">
                                ${findAchivementImage(achievement.name)}
                            </div>
                        </li>`;
                    }
                }

                return html;
            }

            let childs = "";

            for (elm in getChildrens(achievement_tree["tree"])) {
                let achievement = getChildrens(achievement_tree["tree"])[elm];
                if (getChildrens(achievement) && Object.keys(getChildrens(achievement)).length !== 0) {
                    childs += `
                    <li>
                        <div class="tf-nc" tip="${achievement.name}">
                            ${findAchivementImage(achievement.name)}
                        </div>
                        <ul>
                            ${getChildrensHTML(achievement)}
                        </ul>
                    </li>`;
                } else {
                    childs += `
                    <li>
                        <div class="tf-nc" tip="${achievement.name}">
                            ${findAchivementImage(achievement.name)}
                        </div>
                    </li>`;
                }
            }

            achievements_final += `
            <ul>
                <li>
                    <ul>
                        ${childs}
                    </ul>
                </li>
            </ul>
            </div>`;

            $("#achievements").html(achievements_final)
        });

    if (!user_achievements) return;
}

const isElementXPercentInViewport = function(el, percentVisible) {
    let
        rect = el.getBoundingClientRect(),
        windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    return !(
        Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / + -rect.height) * 100)) < percentVisible ||
        Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
    )
};

const updateToolTips = () => {
    Array.from(document.querySelectorAll('[tip]')).forEach(el => {
        let tip = document.querySelector('#tooltipFixed');

        el.addEventListener("mouseover", (evt) => {
            evt.preventDefault();

            tip.innerHTML = `
            <div class="card">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                ${findAchivementImage(el.getAttribute('tip'))}
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">${el.getAttribute('tip')}</p>
                        </div>
                    </div>

                    <div class="content">
                        ${findAchievementByName(achievements, el.getAttribute('tip')).description}
                    </div>
                </div>
            </div>`;

            let { x, y } = el.getBoundingClientRect();

            if (tip.style.visibility == "visible") return;

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in document.documentElement || typeof window.orientation !== 'undefined') { // if is phone use static position
                tip.style.left = `25%`;
                tip.style.top = `25%`;
            } else {
                // If is out of the screen change position
                if (!isElementXPercentInViewport(tip, 95)) {
                    tip.style.left = x - tip.offsetWidth + 'px';
                    tip.style.top = y - tip.offsetHeight + 'px';
                } else { // Default position (Achievement pos + 46px)
                    tip.style.left = (x + 46) + 'px';
                    tip.style.top = (y + 46) + 'px';
                }
            }
            tip.style.visibility = "visible";
            tip.style.opacity = 1;
        })

        el.addEventListener("mouseout", (evt) => {
            evt.preventDefault();
            tip.style.visibility = "hidden";
            tip.style.opacity = 0;
        })

    });
}

// On html change refresh the tooltips
$('#achievements').on('DOMSubtreeModified', updateToolTips);

window.addEventListener('load', function() {
    // CONSOLE WARNING
    console.log(`%cHold on!`, "color: red; font-size: 3em");
    console.log(`%cThis browser feature is intended for developers.\nIf someone instructed you to copy and paste something here to enable some feature or to "hack" someone's account, it usually means he's trying to get access to your account.`, "font-size: 1.5em;");
    console.log(`%cPlease proceed with caution.`, "color: orange; font-size: 1.5em;");

    const data = {
        labels: timestamps,
        datasets: [{
            data: balances,
        }]
    };

    const config = {
        options: {
            backgroundColor: "#e67e22",
            borderColor: "#e67e22",
            plugins: {
                legend: {
                    display: false
                }
            },
            elements: {
                line: {
                    tension: 0
                }
            }
        },
        type: 'line',
        data
    };

    function get_now() {
        const today = new Date();
        const time = today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
        return time;
    }

    // SCIENTIFIC PREFIX CALCULATOR
    const scientific_prefix = (value) => {
        value = parseFloat(value);
        if (value / 1000000000 > 0.5)
            value = round_to(2, value / 1000000000) + " G";
        else if (value / 1000000 > 0.5)
            value = round_to(2, value / 1000000) + " M";
        else if (value / 1000 > 0.5)
            value = round_to(2, value / 1000) + " k";
        else
            value = round_to(2, value) + " ";
        return value;
    };

    $('#txcount').on('change', function() {
        transaction_limit = this.value;
        document.getElementById('txsel').classList.add("is-loading");
    });
});

stopUpdate = false;

//USER DATA FROM API
const user_data = (username, first_open) => {

    try {
        fetch(`https://server.duinocoin.com/v3/users/${encodeURIComponent(username)}?limit=${transaction_limit}`)
            .then(response => {
                try {
                    return response.json();
                } catch (e) {
                    let result = response.text();
                    result.replace('Infinity', 0);
                    return JSON.parse(JSON.stringify(response));
                }
            })
            .then(data => {
                data = data.result;
                duco_price = data.prices.max;
                delete data.prices.max;

                user_items = data.items;
                if (first_open) {
                    refresh_shop(user_items);
                    refresh_event();

                    $('#form').hide("drop", { direction: "left" }, 300, function() {
                        $('#wallet').show("drop", { direction: "right" }, 300, function() {
                            initial_height = $('.adsbygoogle').height();
                            (adsbygoogle = window.adsbygoogle || []).push({});
                            setTimeout(function() {
                                if ($('.adsbygoogle').height() <= initial_height || adBlockEnabled) {
                                    $("#adblocker_detected").fadeIn();
                                    adBlockEnabled = true;
                                }
                            }, 3000)

                            $("iframe#news_iframe").attr('src', `https://server.duinocoin.com/news.html?v=${Date.now()}`);
                            $("iframe#news_iframe").attr('name', Date.now());
                            $('iframe#news_iframe').on("load", function() {
                                $("iframe#news_iframe").fadeIn(500);
                            });
                        });
                    });
                }

                user_achievements = data.achievements;
                refresh_achievements(user_achievements);

                balance = round_to(12 - parseFloat(data.balance.balance).toString().split(".")[0].length, parseFloat(data.balance.balance));
                if (first_open) {
                    $("#balance").html(balance);
                    if (adBlockEnabled) {
                        adblock_penalty();
                    }
                } else update_element("balance", balance);

                if (oldb != balance) {
                    if (data.miners.length) {
                        calculdaily(balance, oldb, user_items);
                        oldb = balance;
                        window.setTimeout(() => {
                            user_data(username, false);
                        }, 5 * 1000);
                    } else {
                        update_element("estimatedprofit", `
                                <i class="fa fa-times-circle"></i> No miners detected`);
                        update_element("estimatedprofitusd", ``);
                        window.setTimeout(() => {
                            user_data(username, false);
                        }, 10 * 1000);
                    }
                } else {
                    window.setTimeout(() => {
                        user_data(username, false);
                    }, 10 * 1000);
                }

                if (data.balance.created.includes("before")) data.balance.created += " (Welcome, OG member!)"
                $("#account_creation").html(data.balance.created)
                $("#last_login").html(new Date(data.balance.last_login * 1000).toLocaleString())

                if (data.balance.stake_amount) {
                    update_element("stake_info",
                        `<span>
                                <i class="has-text-success-dark fa fa-layer-group animated faa-slow faa-pulse"></i>
                                Staking <b>${round_to(2, data.balance.stake_amount)} DUCO</b>
                            </span><br>
                            <small>
                                Ends on <b>${
                                    new Date(data.balance.stake_date*1000).toLocaleString("default", date_opt)
                                }<br>
                                ${round_to(2, (
                                    data.balance.stake_amount * (
                                        1 + (STAKING_PERC/100)
                                    ) - data.balance.stake_amount
                                ))} DUCO
                                <span class="has-text-weight-normal">
                                    est. reward
                                </span>
                            </small>`);
                } else {
                    update_element("stake_info",
                        `<span>
                                <i class="fa fa-layer-group"></i>
                                Not staking
                            </span><br>
                            <small>
                                Click the <b>Stake coins</b> button to start
                            </small>`);
                }

                $("#ducousd_xmg").html("$" + round_to(6, data.prices.xmg));
                $("#ducousd_bch").html("$" + round_to(6, data.prices.bch));
                $("#ducousd_trx").html("$" + round_to(6, data.prices.trx));
                $("#ducousd_nano").html("$" + round_to(6, data.prices.nano));
                $("#duco_ubeswap").html("$" + round_to(5, data.prices.ubeswap));
                $("#duco_fluffyswap").html("$" + round_to(5, data.prices.fluffy));
                $("#duco_justswap").html("$" + round_to(5, data.prices.sunswap));
                $("#duco_pancake").html("$" + round_to(5, data.prices.pancake));
                $("#duco_sushi").html("$" + round_to(5, data.prices.sushi));

                balanceusd = round_to(4, balance * duco_price);
                if (first_open) {
                    $("#balancefiat").html(balanceusd);
                    $("#best_exchage").html(key_from_value(data.prices, duco_price));
                } else {
                    update_element("balancefiat", balanceusd);
                    update_element("best_exchage", key_from_value(data.prices, duco_price));
                }

                trustscore = data.balance.trust_score;
                if (data.balance.warnings < 1) {
                    verified = data.balance.verified;

                    if (verified === "yes") {
                        $("#verify").html(
                            `<span data-tooltip="Your account is verified. Kolka trust score: ${trustscore}">
                                <i class="fa icon-text has-text-success-dark fa-lg fa-check-circle"></i>
                            </span>`);
                    } else {
                        $("#verify").html(
                            `<a href="https://server.duinocoin.com/verify.html" data-tooltip="You have to verify your account. Kolka trust score: ${trustscore}" class="has-text-danger-dark icon-text" target="_blank">
                                    <i class="fa fa-times-circle animated faa-ring faa-slow icon"></i>
                                    <span>unverified</span>
                                </a>`);
                    }
                } else {
                    $("#verify").html(
                        `<span class="icon-text has-text-warning-dark" data-tooltip="Your account received ${data.balance.warnings} warning(s). Kolka trust score: ${trustscore}">
                                    <i class="fa fa-exclamation-triangle icon"></i>
                                    <span>suspicious</span>
                                </span>`);
                }

                user_miners = data.miners;

                if (cache_miners != user_miners.length) {

                    calculdaily(balance, oldb, user_items);
                    cache_miners = data.miners.length;
                    oldb = balance;
                }

                total_hashrate = 0;
                t_miners = []
                iot_devices = {}
                if (user_miners.length) {
                    $("#nominers").fadeOut(0);
                    $("#minertable").fadeIn(0)
                    for (let miner in user_miners) {
                        let miner_wallet_id = user_miners[miner]["wd"];
                        if (!miner_wallet_id) miner_wallet_id = Math.floor(Math.random() * 2812);
                        const miner_hashrate = user_miners[miner]["hashrate"];
                        const miner_rejected = user_miners[miner]["rejected"];
                        const miner_accepted = user_miners[miner]["accepted"];
                        total_hashrate += miner_hashrate;

                        if (!t_miners[miner_wallet_id]) {
                            t_miners[miner_wallet_id] = user_miners[miner];
                            t_miners[miner_wallet_id]["threads"] = 1;
                            t_miners[miner_wallet_id]["threadid"] = user_miners[miner]["threadid"];

                            if (user_miners[miner]["it"] != null) {
                                if (!user_miners[miner]["it"].includes(":")) {
                                    temp = parseTemperature(user_miners[miner]["it"].split("@")[0]);
                                    hum = user_miners[miner]["it"].split("@")[1];

                                    if (!hum) hum = `Error<br><small class="is-size-6 has-text-grey">Check your wiring and code</small>`;
                                    else hum += "%";

                                    iot_devices[user_miners[miner]["identifier"]] = {
                                        "Temperature": temp,
                                        "Humidity": hum
                                    }
                                } else {
                                    iot_devices[user_miners[miner]["identifier"]] = {}
                                    for (entry in user_miners[miner]["it"].split("@")) {
                                        key = user_miners[miner]["it"].split("@")[entry].split(":")[0];
                                        value = user_miners[miner]["it"].split("@")[entry].split(":")[1];
                                        iot_devices[user_miners[miner]["identifier"]][key] = value;
                                    }
                                }
                            }
                            continue;
                        } else if (t_miners[miner_wallet_id]) {
                            t_miners[miner_wallet_id]["hashrate"] += miner_hashrate;
                            t_miners[miner_wallet_id]["rejected"] += miner_rejected;
                            t_miners[miner_wallet_id]["accepted"] += miner_accepted;
                            t_miners[miner_wallet_id]["threads"] += 1;

                            if (user_miners[miner]["it"] != null) {
                                if (!user_miners[miner]["it"].includes(":")) {
                                    temp = parseTemperature(user_miners[miner]["it"].split("@")[0]);
                                    hum = user_miners[miner]["it"].split("@")[1];

                                    if (!hum) hum = `Error<br><small class="is-size-6 has-text-grey">Check you wiring and code</small>`;
                                    else hum += "%";

                                    iot_devices[user_miners[miner]["identifier"]] = {
                                        "Temperature": temp,
                                        "Humidity": hum
                                    }
                                } else {
                                    iot_devices[user_miners[miner]["identifier"]] = {}
                                    for (entry in user_miners[miner]["it"].split("@")) {
                                        key = user_miners[miner]["it"].split("@")[entry].split(":")[0];
                                        value = user_miners[miner]["it"].split("@")[entry].split(":")[1];
                                        iot_devices[user_miners[miner]["identifier"]][key] = value;
                                    }
                                }
                            }
                            continue;
                        }
                    }

                    t_miners = t_miners.sort(function(a, b) {
                        if (a.threadid < b.threadid) { return -1; }
                        if (a.threadid > b.threadid) { return 1; }
                        return 0;
                    });

                    miner_num = 0;
                    miners_html = "";

                    let minersOrder = JSON.parse(localStorage.getItem('minersOrder')) || [];

                    for (let orderIndex in minersOrder) {
                        let MinerData;
                        try { // if the element doesn't exist just ignore it
                            MinerData = t_miners.find(miner => miner.threadid == minersOrder[orderIndex].threadid);
                        } catch (e) {
                            continue;
                        }

                        if (!MinerData || MinerData == -1) continue; // prevent bugs

                        let Oldindex = t_miners.indexOf(MinerData);

                        t_miners.splice(Oldindex, 1); // change element order
                        t_miners.splice(minersOrder[orderIndex].order, 0, MinerData);
                    }

                    for (let miner in t_miners) {
                        miner_num += 1;
                        miner_threadid = t_miners[miner]["threadid"];
                        miner_hashrate = t_miners[miner]["hashrate"];
                        miner_identifier = t_miners[miner]["identifier"];
                        miner_software = t_miners[miner]["software"];
                        miner_diff = t_miners[miner]["diff"];
                        miner_rejected = t_miners[miner]["rejected"];
                        miner_accepted = t_miners[miner]["accepted"];
                        miner_sharetime = t_miners[miner]["sharetime"];
                        miner_pool = t_miners[miner]["pool"];
                        miner_algo = t_miners[miner]["algorithm"];
                        miner_count = t_miners[miner]["threads"];
                        miner_ki = t_miners[miner]["ki"];
                        miner_ping = t_miners[miner]["pg"];

                        iot_tag = ``
                        if (t_miners[miner]["it"])
                            iot_tag = `<small data-tooltip="Duino IoT (Beta) is enabled" class="tag is-success">IoT</small>`;

                        if (!miner_identifier || miner_identifier === "None") {
                            miner_name = miner_software;
                            miner_soft = "";
                        } else {
                            miner_name = miner_identifier;
                            miner_soft = miner_software + ", ";
                        }

                        let fMinerSoftware = null;
                        let fMinerObj = null;
                        let fMinerToolTip = null
                        
                        // Find miner software
                        for(let i of Object.keys(minerObj.miner_software)) { 
                            if(miner_software.includes(i)) {
                                fMinerSoftware = i;
                                break;
                            }
                        };

                        // Find miner_identifier or use default
                        if(fMinerSoftware) {
                            if(Object.keys(minerObj.miner_software[fMinerSoftware]).length > 1) {
                                for(const [index, element] of Object.values(minerObj.miner_software[fMinerSoftware]).entries()) {
                                    if( (element.miner_diff && element.miner_diff == miner_diff) ||
                                        (miner_identifier.includes(Object.keys(minerObj.miner_software[fMinerSoftware])[index])))
                                    {
                                        fMinerObj = element;
                                        break;
                                    }
                                }
                            }
                            if(!fMinerObj)
                            {
                                // Use default
                                fMinerObj = minerObj.miner_software[fMinerSoftware].default;
                            }
                        }
                        else
                        {
                            // Use default
                            fMinerObj = minerObj.miner_software.default.default;
                        }

                        let miner_diff_str = scientific_prefix(miner_diff)
                        let accepted_rate = round_to(1, (miner_accepted / (miner_accepted + miner_rejected) * 100))

                        let miner_efficiency = round_to(2, Math.pow(fMinerObj.percentage, miner_ki - 1) * 100);
                        let efficiency_color = "has-text-warning-dark";
                        if (miner_efficiency < 40) {
                            efficiency_color = "has-text-danger-dark";
                        } else if (miner_efficiency > 80) {
                            efficiency_color = "has-text-success-dark";
                        }

                        let accept_color = "has-text-warning-dark";
                        if (accepted_rate < 50) {
                            accept_color = "has-text-danger-dark";
                        } else if (accepted_rate > 95) {
                            accept_color = "has-text-success-dark";
                        }

                        let thread_string = "";
                        if (miner_count > 1) {
                            thread_string = `(${miner_count}x)`;
                        }

                        icon_class =            "has-text-danger";
                        icon_class_animation =  "fa fa-exclamation-triangle animated faa-flash";

                        if (localStorage.getItem("hideWarnings") == "true") {
                            icon_class =            "";
                            icon_class_animation =  "far fa-question-circle";
                        }

                        // Warning Tool Tip
                        let warning_message = "Operating normally";
                        if (miner_efficiency < 40) {
                            warning_message = "Too many miners - low Kolka efficiency";
                        } else if (accepted_rate < 50) {
                            warning_message = "Too many rejected shares";
                        } else if (fMinerObj.miner_type == "Unknown") {
                            warning_message = "Unknown miner";
                        }
                        
                        // Miner Tool Tip (Overrides)
                        if(fMinerObj["hashrate-max"] && miner_hashrate > fMinerObj["hashrate-max"])
                        {
                            fMinerToolTip = fMinerObj["hashrate-message-over"];
                        }
                        else if(fMinerObj["hashrate-min"] && miner_hashrate < fMinerObj["hashrate-min"])
                        {
                            fMinerToolTip = fMinerObj["hashrate-message-under"];
                        }
                        
                        // Construct Warning
                        let warning_icon = `
                            <span class="icon-text ${warning_message != "Operating normally" ? icon_class : 'has-text-success-dark'}" id="ui-tooltip-center" style="cursor: pointer;" title="${warning_message}">
                                <i class="icon mdi mdi-check-all"></i>
                            </span>`;

                        // Construct Warning Override
                        if(fMinerToolTip)
                        {
                            warning_icon = `
                                <span class="${icon_class}" id="ui-tooltip-center" style="cursor: pointer;" title="${fMinerToolTip}">
                                    <i class="icon ${icon_class_animation}"></i>
                                </span>`
                        }

                        miners_html += `
                                <tr data-index="${miner_num}" draggable="true" class="is-draggable">
                                    <th align="right">
                                            <span class="has-text-grey">
                                                ${miner_num}
                                            </span>
                                    </th>
                                    <th style="word-break: break-all">
                                            <span class="icon-text">
                                                <span class="icon minerIcon">
                                                    ${fMinerObj.icon}<wbr>
                                                </span>
                                            </span>
                                            <span class="has-text-weight-bold"">
                                                ${miner_name}
                                            </span>
                                            <span class="is-hidden" title="Thread Id">
                                                ${miner_threadid}           
                                            </span>
                                    </th>
                                    <th>
                                            <span class="has-text-weight-bold" id="ui-tooltip" title="Calculations per second">
                                                ${scientific_prefix(miner_hashrate)}H/s
                                            </span>
                                            <span class="has-text-weight-normal" id="ui-tooltip" title="Number of threads/cores">
                                                ${thread_string}
                                            </span>
                                    </th>
                                    <th>
                                        <span class="${accept_color}">
                                            ${accepted_rate}%
                                        </span>
                                        <span class="has-text-weight-normal">
                                            (${miner_accepted}/${(miner_accepted + miner_rejected)})
                                        </span>
                                    </th>
                                    <th align="center">
                                            <span class="icon-text">
                                                ${warning_icon}
                                            </span>
                                            <span class="icon-text expand-btn" style="cursor: pointer">
                                                <i class="icon fa fa-info-circle"></i>
                                            </span>
                                            ${iot_tag}
                                    </th>
                                </tr>
                                <tr>
                                    <td colspan="5" style="border: none;margin:none;padding:0;">
                                        <div class="content" style="display:none;">
                                            <div class="columns is-mobile">
                                                <div class="column">
                                                    <ul class="my-1">
                                                        <li id="ui-tooltip" title="Miner software">
                                                            <span>
                                                                ${miner_software}
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="Time it took to find the latest result">
                                                            <span class="has-text-weight-normal">
                                                                Last share:
                                                            </span>
                                                            <span class="has-text-weight-bold">
                                                                ${round_to(2, miner_sharetime)}s
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="Server your miner is connected to">
                                                            <span class="has-text-weight-normal">
                                                                Node: 
                                                            </span>
                                                            <span class="has-text-weight-bold">
                                                                ${miner_pool}
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="How hard is it to mine">
                                                            <span class="has-text-weight-normal">
                                                                Difficulty: 
                                                            </span>
                                                            <span class="has-text-weight-bold">
                                                                ${miner_diff_str}
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="Ping (network delay) is exluded from calculations">
                                                            <span class="has-text-weight-normal">
                                                                Ping: 
                                                            </span>
                                                            <span class="has-text-weight-bold">
                                                                ${miner_ping}ms 
                                                                <span class="has-text-success-dark">(compensated)</span>
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="column">
                                                    <ul class="my-1">
                                                        <li id="ui-tooltip" title="Used hashing algorithm">
                                                            <span class="has-text-weight-normal">
                                                                Algorithm:
                                                            </span>
                                                            <span class="has-text-weight-bold">
                                                                ${miner_algo}
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="Identifier used to separate miners in the API">
                                                            <span class="has-text-weight-normal">
                                                                Thread ID:
                                                            </span>
                                                            <span class="has-text-weight-bold" title="Thread Id">
                                                                ${miner_threadid} (${miner})
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="Identifier used to group same threads">
                                                            <span class="has-text-weight-normal">
                                                                Miner type:
                                                            </span>
                                                            <span class="has-text-weight-bold">
                                                                ${fMinerObj.miner_type}
                                                            </span>
                                                        </li>
                                                        <li id="ui-tooltip" title="Kolka efficiency drop">
                                                            <span class="has-text-weight-normal">
                                                                Earnings
                                                                <a href="https://github.com/revoxhere/duino-coin/wiki/FAQ#q-can-i-create-a-mining-farm-with-esp-boards-or-arduinos"
                                                                   target="_blank">(Kolka eff. drop)</a>:
                                                            </span>
                                                            <span class="has-text-weight-bold ${efficiency_color}">
                                                                ${miner_efficiency}%
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>`
                    }

                    if (Object.keys(iot_devices).length) {
                        iot_html = ``;
                        for (let device in iot_devices) {
                            if (device == "None") device_name = "IoT Reading";
                            else device_name = device;

                            iot_html += `<div class="columns is-multiline is-gapless">
                                                <div class="column is-full">
                                                    <div class="divider my-0">${device_name}</div>
                                                </div>`
                            for (let key in iot_devices[device]) {
                                if (key.toLowerCase().includes("temp")) {
                                    icon = "mdi mdi-thermometer";
                                    iot_devices[device][key] = iot_devices[device][key].replace("*", "°")
                                } else if (key.toLowerCase().includes("hum")) icon = "fa fa-tint";
                                else if (key.toLowerCase().includes("volt")) icon = "fa fa-bolt";
                                else if (key.toLowerCase().includes("amp")) icon = "fa fa-bolt";
                                else if (key.toLowerCase().includes("wat")) icon = "fa fa-bolt";
                                else icon = "fa fa-tachometer-alt";

                                iot_html += `
                                            <div class="column">
                                                <div class="columns is-mobile">
                                                    <div class="column has-text-centered">
                                                        <div>
                                                            <p class="heading mb-0">
                                                                <i class="${icon}"></i>
                                                                ${key}
                                                            </p>
                                                            <p class="title">${iot_devices[device][key]}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
                            }
                            iot_html += "</div>"
                        }
                        $("#iot").html(iot_html);
                    } else {
                        $("#iot").html(`
                                <div class="content">
                                    <span class="has-text-weight-bold">
                                        No internet of things devices detected.
                                    </span>
                                    <p class="has-text-weight-normal">
                                        Check your sensor wirings and make sure Duino IoT is enabled on your device. You can disable this feature in settings.
                                    </p>
                                </div>`);
                    }
                    if (!stopUpdate) $("#miners").html(miners_html);
                    $("#total_hashrate").html(scientific_prefix(total_hashrate) + "H/s");
                    $("#minercount").html(user_miners.length);

                    $( "[id=ui-tooltip-center]" ).tooltip({
                        position: {
                            my: "center bottom", 
                            at: "center top", 
                        },
                        tooltipClass: "ui-tooltip",
                    });

                    $( "[id=ui-tooltip]" ).tooltip({
                        position: {
                            my: "left bottom", 
                            at: "left top", 
                        },
                        tooltipClass: "ui-tooltip",
                    });

                    // We fill the dragListItems variable with the latest elements

                    dragListItems = minersList.querySelectorAll('tr.is-draggable');

                    if (first_open && user_miners.length >= 45) miner_notify();
                } else {
                    $("#minertable").fadeOut(function() {
                        $("#nominers").fadeIn();
                    });
                    $("#minercount").html("0");
                    $("#iot").html(`
                                <div class="content">
                                    <span class="has-text-weight-bold">
                                        No internet of things devices detected.
                                    </span>
                                    <p class="has-text-weight-normal">
                                        Check the wiring of your sensors and make sure Duino IoT is enabled on your device. You can disable this feature in settings.
                                    </p>
                                </div>`);
                }

                $(function() {
                    if (!stopUpdate) $("td[colspan=5]").find(".content").hide();
                    $(".expand-btn").click(function(event) {
                        let $target = $(event.target);
                        stopUpdate = !stopUpdate;
                        $target.closest("tr").next().find(".content").slideToggle(250);
                    });
                });

                user_transactions = data.transactions.reverse();
                if (user_transactions.length > 0) {
                    transactions_html = "";
                    for (let i in user_transactions) {
                        transaction_date = user_transactions[i]["datetime"];
                        transaction_amount = round_to(8, parseFloat(user_transactions[i]["amount"]));
                        transaction_hash_full = user_transactions[i]["hash"];
                        transaction_hash = transaction_hash_full.substr(transaction_hash_full.length - 16);
                        transaction_memo = user_transactions[i]["memo"];
                        transaction_recipient = user_transactions[i]["recipient"];
                        transaction_sender = user_transactions[i]["sender"];

                        if (transaction_memo == "None")
                            transaction_memo = "";
                        else
                            transaction_memo = "\"" + transaction_memo + "\""

                        if (transaction_sender == username) {
                            thtml = `
                                <div class="column is-full">
                                    <p class="title is-size-6">
                                        <i class="fa fa-arrow-right fa-fw has-text-danger"></i>
                                        <span class="has-text-weight-normal">
                                            Sent
                                            <span class="has-text-weight-bold">
                                                ${transaction_amount} DUCO
                                            </span>
                                            to
                                        </span>
                                        <a href="https://explorer.duinocoin.com/?search=${transaction_recipient}" target="_blank">
                                            ${transaction_recipient}
                                        </a>
                                        <span class="has-text-weight-normal">
                                            ${transaction_memo}
                                        </span>
                                    </p>
                                    <p class="subtitle is-size-7">
                                        <span>
                                            ${transaction_date}
                                        </span>
                                        <a href="https://explorer.duinocoin.com/?search=${transaction_hash_full}" target="_blank">
                                            ${transaction_hash}
                                        </a>
                                    </p>
                                </div>`;
                            transactions_html += thtml;
                        } else {
                            thtml = `
                                <div class="column is-full">
                                    <p class="title is-size-6">
                                        <i class="fa fa-arrow-left fa-fw has-text-success-dark"></i>
                                        <span class="has-text-weight-normal">
                                            Received
                                            <span class="has-text-weight-bold">
                                                ${transaction_amount} DUCO
                                            </span>
                                            from
                                        </span>
                                        <a href="https://explorer.duinocoin.com/?search=${transaction_sender}" target="_blank">
                                            ${transaction_sender}
                                        </a>
                                        <span class="has-text-weight-normal">
                                            ${transaction_memo}
                                        </span>
                                    </p>
                                    <p class="subtitle is-size-7">
                                        <span>
                                            ${transaction_date}
                                        </span>
                                        <a href="https://explorer.duinocoin.com/?search=${transaction_hash_full}" target="_blank">
                                            ${transaction_hash}
                                        </a>
                                    </p>
                                </div>`;
                            transactions_html += thtml;
                        }
                    }
                    update_element("transactions_table", transactions_html);
                } else
                    update_element("transactions_table", `<div class="column is-full">
                        <p class="title is-size-6">
                            No transactions yet or they're temporarily unavailable
                        </p>
                        <p class='subtitle is-size-6'>
                            If you have sent funds recently,
                            it will take a few seconds until the transaction will appear here.
                        </p>
                    </div>`);
            }).then(function() {
                document.getElementById('txsel').classList.remove("is-loading");
            });
    } catch (err) {
        console.error(err);
        user_data(username, false);
    }
}

// ENTER KEY AS LOGIN
let input_login = document.getElementById("submit");
input_login.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit").click();
    }
});

// If the user has the old password

if (localStorage.getItem("password") && localStorage.getItem("username")) {
    localStorage.removeItem("password");
    localStorage.removeItem("username");
}


// If the user has the auth-token

if (localStorage.getItem("authToken") && localStorage.getItem("username")) {
    $('#usernameinput').val(localStorage.getItem("username"));
    $('#passwordinput').val(localStorage.getItem("authToken"));
    rememberLogin.checked = true;

    username = localStorage.getItem("username");
    password = localStorage.getItem("authToken");

    $("#submit").addClass("is-loading");
    setTimeout(function() {
        grecaptcha.ready(function() {
            grecaptcha.execute('6LdJ9XsgAAAAAMShiVvOtZ4cAbvvdkw7sHKQDV-6', { action: 'submit' }).then(function(token) {
                $.getJSON(`https://server.duinocoin.com/v2/auth/check/${encodeURIComponent(username)}`, { token: localStorage.getItem("authToken"), captcha: token },
                        function(data) {
                            if (data.success == true) {
                                $("#ducologo").addClass("rotate");

                                $("#username").text(encodeURIComponent(username));
                                $("#email").text(`${data.result[1]}`);

                                $("#miner_pass").text(data.result[2]);
                                $("#mining_key").val(data.result[2]);

                                $("#useravatar").attr("src",
                                    `https://www.gravatar.com/avatar/${encodeURIComponent(MD5(data.result[1]))}` +
                                    `?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${encodeURIComponent(username)}/128/${get_user_color(username)}/ffffff/1`);

                                user_data(username, true);
                                genQrCode();

                                setInterval(function() {
                                    stake_counter();
                                }, 300);
                            } else {

                                localStorage.removeItem("authToken"); // If the token is invalid then delete the localStorage saved token

                                if (data.message.includes("This user doesn't exist")) {
                                    $("#usernamediv").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                                } else if (data.message.includes("captcha")) {
                                    let modal_error = document.querySelector('#modal_error');
                                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                        `<b>Incorrect captcha score</b><br>
                                    ReCaptcha didn't like your browser or your behavior.<br>
                                    🤖 If you're not a robot, just try again.<br>
                                    If the issue persists, try using a different network or browser.</p>`;
                                    document.querySelector('html').classList.add('is-clipped');
                                    modal_error.classList.add('is-active');
                                } else if (data.message.includes("banned")) {
                                    let modal_error = document.querySelector('#modal_error');
                                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                        `Your account is <b>banned</b>.<br>
                                    You have violated our <a href="https://github.com/revoxhere/duino-coin#terms-of-service">ToS</a> <br/>
                                    We don't want to see you here again.
                                    </p>`;
                                    document.querySelector('html').classList.add('is-clipped');
                                    modal_error.classList.add('is-active');
                                } else if (data.message.toLowerCase().includes("token")) {
                                    let modal_error = document.querySelector('#modal_error');
                                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                        `Login token has expired.<br>
                                    Login tokens have a limited lifetime to increase security.<br>
                                    Please just <b>login again</b> to refresh the token.
                                    </p>`;
                                    document.querySelector('html').classList.add('is-clipped');
                                    modal_error.classList.add('is-active');
                                } else {
                                    $("#passworddiv").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                                }
                            }
                        })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $("#ducologo").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                        let modal_error = document.querySelector('#modal_error');
                        document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                            `Network <b>connection problem</b>.<br>
                                Your web browser couldn't connect to the Duino-Coin servers for some reason.<br>
                                We'd like to help, but there are many possible causes.<br>
                                <b>Before asking the support, try disabling your browser extensions or similar programs and try again.</br>
                            </p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_error.classList.add('is-active');
                    })
                    .always(function() {
                        $("#submit").removeClass("is-loading");
                    })
                    .catch(function(err) {
                        console.error(err);
                        $("#ducologo").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                        let modal_error = document.querySelector('#modal_error');
                        document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                            `Network <b>connection problem</b>.<br>
                                Your web browser couldn't connect to the Duino-Coin servers for some reason.<br>
                                We'd like to help, but there are many possible causes.<br>
                                <b>Before asking the support, try disabling your browser extensions or similar programs and try again.</br>
                            </p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_error.classList.add('is-active');
                    });
            }).catch(function(err) {
                console.error(err);
                $("#ducologo").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                let modal_error = document.querySelector('#modal_error');
                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                    `<b>ReCaptcha issue</b>.<br>
                        Your web browser couldn't connect to Google's servers for some reason.<br>
                        🤖 If you're not a robot, just try again.<br>
                        If the issue persists, try using a different network or browser.
                    </p>`;
                document.querySelector('html').classList.add('is-clipped');
                modal_error.classList.add('is-active');
                $("#submit").removeClass("is-loading");
            });
        });
    }, 500);
}

$('#form').submit(function() {
    return false;
});



document.addEventListener('onautocomplete', function(e) {
    if (e.target.hasAttribute('autocompleted')) {
        if (e.target.id == "usernameinput") {
            $('#usernamediv').addClass("focus");
        }
        if (e.target.id == "passwordinput") {
            $('#passworddiv').addClass("focus");
        }
    }
})

setInterval(function() {
    $("#mcontainer").css("max-width", window.innerWidth - 80)
}, 1000)

// Fix the overflow on modal close (Fix the mistake)

let Modals = document.querySelectorAll('.modal');

Modals.forEach((modal) => {
    // If user clicks the X button

    modal.querySelector('.modal-close').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('html').classList.remove('is-clipped');
        modal.classList.remove('is-active');
    });

    // If user clicks the background

    modal.querySelector('.modal-background').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('html').classList.remove('is-clipped');
        modal.classList.remove('is-active');
    });
});


/*
    Temperature Unit changer
*/

const dropdown = document.querySelector('.dropdown-trigger');
dropdown.addEventListener('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    dropdown.parentElement.classList.toggle('is-active');
});

const selectedUnit = document.querySelector('#temp-unit');

selectedUnit.innerHTML = localStorage.getItem("tempUnit") || "Celcius";

document.querySelectorAll('#temp-unit-select a').forEach((elm) => {
    elm.addEventListener('click', function(event) {
        event.preventDefault();
        selectedUnit.innerHTML = elm.innerHTML;
        localStorage.setItem("tempUnit", elm.innerHTML);
        dropdown.parentElement.classList.remove('is-active');
    });
});

function login(token) {
    username = $('#usernameinput').val()
    //trim the username field to remove extra spaces
    username = username.replace(/^[ ]+|[ ]+$/g, '')
    password = $('#passwordinput').val()

    if (username && password) {
        $("#submit").addClass("is-loading");
        setTimeout(function() {
            $.getJSON(`https://server.duinocoin.com/v2/auth/${encodeURIComponent(username)}`, { password: window.btoa(unescape(encodeURIComponent(password))), captcha: token },
                    function(data) {
                        if (data.success == true) {
                            if (rememberLogin.checked) {
                                localStorage.setItem("username", encodeURIComponent(username));
                                localStorage.setItem("authToken", data.result[2]);
                            }

                            $("#ducologo").addClass("rotate");

                            $("#username").text(encodeURIComponent(username));
                            $("#email").text(`${data.result[1]}`);

                            $("#miner_pass").text(data.result[3]);
                            $("#mining_key").val(data.result[3]);

                            $("#useravatar").attr("src",
                                `https://www.gravatar.com/avatar/${encodeURIComponent(MD5(data.result[1]))}` +
                                `?d=https%3A%2F%2Fui-avatars.com%2Fapi%2F/${encodeURIComponent(username)}/128/${get_user_color(username)}/ffffff/1`);

                            user_data(username, true);
                            genQrCode();

                            setInterval(function() {
                                stake_counter();
                            }, 250);
                        } else {
                            if (data.message.includes("This user doesn't exist")) {
                                $("#usernamediv").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                            } else if (data.message.includes("captcha")) {
                                let modal_error = document.querySelector('#modal_error');
                                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                    `<b>Incorrect captcha score</b><br>
                                            ReCaptcha didn't like your browser or your behavior.<br>
                                            🤖 If you're not a robot, just try again.<br>
                                            If the issue persists, try using a different network or browser.</p>`;
                                document.querySelector('html').classList.add('is-clipped');
                                modal_error.classList.add('is-active');
                            } else if (data.message.includes("banned")) {
                                let modal_error = document.querySelector('#modal_error');
                                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                    `Your account is <b>banned</b>.<br>
                                            You have violated our <a href="https://github.com/revoxhere/duino-coin#terms-of-service">ToS</a> <br/>
                                            We don't want to see you here again.
                                            </p>`;
                                document.querySelector('html').classList.add('is-clipped');
                                modal_error.classList.add('is-active');
                            } else {
                                $("#passworddiv").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                            }
                        }
                    })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    $("#ducologo").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                    let modal_error = document.querySelector('#modal_error');
                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                        `Network <b>connection problem</b>.<br>
                                    Your web browser couldn't connect to the Duino-Coin servers for some reason.<br>
                                    We'd like to help, but there are many possible causes.<br>
                                    <b>Before asking the support, try disabling your browser extensions or similar programs and try again.</br>
                                </p>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_error.classList.add('is-active');
                })
                .always(function() {
                    $("#submit").removeClass("is-loading");
                })
                .catch(function(err) {
                    console.error(err);
                    $("#ducologo").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
                    let modal_error = document.querySelector('#modal_error');
                    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                        `Network <b>connection problem</b>.<br>
                                    Your web browser couldn't connect to the Duino-Coin servers for some reason.<br>
                                    We'd like to help, but there are many possible causes.<br>
                                    <b>Before asking the support, try disabling your browser extensions or similar programs and try again.</br>
                                </p>`;
                    document.querySelector('html').classList.add('is-clipped');
                    modal_error.classList.add('is-active');
                });
        }, 500);
    } else {
        $("#usernamediv").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
        $("#passworddiv").effect("shake", { duration: 750, easing: "swing", distance: 5, times: 3 });
    }
}

function parseTemperature(temp) {
    let unit = localStorage.getItem("tempUnit") || "Celcius";
    if (!temp) return `Error<br><small class="is-size-6 has-text-grey">Check your wiring and code</small>`;

    switch (unit) {
        case "Celcius":
            return temp + "°C";
        case "Fahrenheit":
            return ((temp * 1.8) + 32) + "°F";
        case "Kelvin":
            return (temp + 273.15) + "K";
        case "Rankine":
            return ((temp + 273.15) * 1.8) + "°Ra";
        default:
            return temp + "°C";
    }
}

/* Sortable Miners List */

const minersList = document.getElementById('miners');
var dragListItems = minersList.querySelectorAll('tr.is-draggable');

const getMouseOffset = (evt) => {
    const targetRect = evt.target.getBoundingClientRect()
    const offset = {
        x: evt.pageX - targetRect.left,
        y: evt.pageY - targetRect.top
    }
    return offset
}

const getElementVerticalCenter = (el) => {
    const rect = el.getBoundingClientRect()
    return (rect.bottom - rect.top) / 2
}

var dragEl;

function orderExists(json, elm) // Check if the order value already exists
{
    for (let i = 0; i < json.length; i++) {
        if (json[i].threadid == elm) {
            return true;
        }
    }
    return false;
}

function onDragOver(evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';

    let target = evt.target.closest('tr.is-draggable');

    if (target && target !== dragEl) {
        try {
            const idx = target.dataset.index;

            const offset = getMouseOffset(evt);
            const middleY = getElementVerticalCenter(evt.target);
            const placeholder = dragListItems[idx - 1];
            const draggedElm = dragEl.closest('tr.is-draggable');

            let lastOrder = {
                order: idx - 1,
                threadid: draggedElm.querySelector('span[title="Thread Id"]').innerHTML.replace(/\n/g, '').trim(), // get thread id and remove new line
            };

            let minersOrder = localStorage.getItem('minersOrder');

            if (minersOrder) {
                minersOrder = JSON.parse(minersOrder);
                if (orderExists(minersOrder, lastOrder.threadid)) // if element exists in the list
                {
                    for (let i = 0; i < minersOrder.length; i++) {
                        if (minersOrder[i].threadid == lastOrder.threadid) { // change the order
                            minersOrder[i].order = lastOrder.order;
                        }
                    }
                } else {
                    minersOrder.push(lastOrder); // else just add it
                }

            } else { // if the list doesn't exist make a empty list
                minersOrder = [];
                minersOrder.push(lastOrder);
            }

            localStorage.setItem('minersOrder', JSON.stringify(minersOrder)); // save the list

            placeholder.classList.add('placeholder'); // add dashed border

            if (offset.y > middleY) { // change the item position on drop
                minersList.insertBefore(draggedElm, placeholder)
            } else if (dragListItems[idx + 1]) {
                minersList.insertBefore(draggedElm.nextSibling || draggedElm, placeholder)
            }
        } catch (err) {
            console.log(err);
        }
    }
}

function onDragEnd(evt) {
    evt.preventDefault();

    dragEl.classList.remove('ghost');

    dragListItems.forEach((elm) => {
        elm.classList.remove('placeholder');
    });

    minersList.removeEventListener('dragover', onDragOver, false);
    minersList.removeEventListener('dragend', onDragEnd, false);
}

minersList.addEventListener('dragstart', function(evt) {
    dragEl = evt.target;

    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('Text', dragEl.textContent);

    minersList.addEventListener('dragover', onDragOver, false);
    minersList.addEventListener('dragend', onDragEnd, false);

    dragEl.classList.add('ghost'); // change element opacity
}, false);

/* Favorites Table */

const favoriteInput = document.getElementById('favoriteInput'),
    addFavorite = document.getElementById('addFavorite'),
    favoriteTable = document.getElementById('favoritesTable');

let favorites = localStorage.getItem('favorites') || "[]";
let favoritesJson = JSON.parse(favorites) || [];

const updateFavoritesTable = () => {
    if (favoritesJson) {
        favoriteTable.innerHTML = "";
        favoritesJson.forEach((elm) => {
            const tr = document.createElement('tr');
            let id = favoritesJson.indexOf(elm);

            tr.setAttribute('id', id);
            tr.classList.add("is-clickable");
            tr.onclick = () => useFavorite(id);

            tr.innerHTML = `
                <th>${elm["Username"]}</th>
                <th class="is-pulled-right">
                    <i class="fa fa-trash mr-2 is-clickable" onclick="removeFavorite(${id}); event.stopPropagation();"></i>
                </th>
            `;
            favoriteTable.appendChild(tr);
        });
    }
}

const useFavorite = (id) => {
    let modal = document.querySelector('#modal-favorites');
    let html = document.querySelector('html');
    modal.classList.remove('is-active');
    html.classList.remove('is-clipped');

    document.getElementById('recipientinput').value = favoritesJson[id].Username;
};

const removeFavorite = (id) => {
    favoritesJson.splice(id, 1);
    localStorage.setItem('favorites', JSON.stringify(favoritesJson));
    favoriteTable.removeChild(favoriteTable.querySelector(`tr[id="${id}"]`));
    updateFavoritesTable();
};

addFavorite.addEventListener('click', () => {
    if (favoriteInput.value) {
        if (favoritesJson) {
            if (favoritesJson.indexOf(favoriteInput.value) == -1) {
                favoritesJson.push({
                    "Username": favoriteInput.value
                });
            }
        } else {
            favoritesJson = [];
            favoritesJson.push({
                "Username": favoriteInput.value
            });
        }
        localStorage.setItem('favorites', JSON.stringify(favoritesJson));
        favoriteInput.value = '';
        updateFavoritesTable();
    }
});

updateFavoritesTable();

document.querySelector("#hidden").addEventListener("click", function(e) {
    e.preventDefault();
    $('#wallet').hide("drop", { direction: "right" }, 300, function() {
        $('.egg').show("drop", { direction: "right" }, 300);
    });
    type();
});

const startSnake = () => {

    var snakeGame = {
        ctx: $("#snakeGame")[0].getContext("2d"),
        w: $("#snakeGame").width(),
        h: $("#snakeGame").height()
    }

    var cw = 10;
    var d;
    var food;
    var score;
    let speed = 90;

    var snake_array;

    function make_snake() {
        var length = 4;
        snake_array = [];
        for (var i = length - 1; i >= 0; i--) {
            snake_array.push({ x: i, y: 0 });
        }
    }

    function make_food() {
        food = {
            x: Math.round(Math.random() * (snakeGame.w - cw) / cw),
            y: Math.round(Math.random() * (snakeGame.h - cw) / cw),
        };
    }

    function drawGame() {
        snakeGame.ctx.fillStyle = "black";
        snakeGame.ctx.fillRect(0, 0, snakeGame.w, snakeGame.h);
        snakeGame.ctx.strokeStyle = "lime";
        snakeGame.ctx.strokeRect(0, 0, snakeGame.w, snakeGame.h);

        var nx = snake_array[0].x;
        var ny = snake_array[0].y;

        if (d == "right") nx++;
        else if (d == "left") nx--;
        else if (d == "up") ny--;
        else if (d == "down") ny++;

        if (nx == -1 || nx == snakeGame.w / cw || ny == -1 || ny == snakeGame.h / cw || check_collision(nx, ny, snake_array)) {
            initGame();
            return;
        }

        if (nx == food.x && ny == food.y) {
            var tail = { x: nx, y: ny };
            score++;
            make_food();
        } else {
            var tail = snake_array.pop();
            tail.x = nx;
            tail.y = ny;
        }

        snake_array.unshift(tail);

        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
            paint_cell(c.x, c.y);
        }

        paint_cell(food.x, food.y);
        var score_text = "Score: " + score;
        snakeGame.ctx.fillStyle = "lime";
        snakeGame.ctx.font = "1em Lato";
        snakeGame.ctx.fillText(score_text, 5, snakeGame.h - 5);
    }

    function paint_cell(x, y) {
        snakeGame.ctx.fillStyle = "black";
        snakeGame.ctx.fillRect(x * cw, y * cw, cw, cw);
        snakeGame.ctx.strokeStyle = "white";
        snakeGame.ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    function check_collision(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (i != array.length && (array[i].x == x && array[i].y == y)) return true;
        }
        return false;
    }

    function initGame() {
        d = "right";
        make_snake();
        make_food();
        score = 0;

        if (typeof game_loop != "undefined") clearInterval(game_loop);
        game_loop = setInterval(drawGame, speed);
    }

    initGame();

    $(document).keydown(function(e) {
        var key = e.which;
        if (key == "37" && d != "right") d = "left";
        else if (key == "38" && d != "down") d = "up";
        else if (key == "39" && d != "left") d = "right";
        else if (key == "40" && d != "up") d = "down";
    })
}

let textToWrite = ` 
⠀⠀⠀⠀⠀⣀⣤⣴⣶⣶⣶⣦⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>  
⠀⠀⣠⣾⣿⣿⣿⣿⣿⣿⢿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
⢀⣾⣿⣿⣿⣿⣿⣿⣿⣅⢀⣽⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠁⠀⠀⣴⣶⡄⠀⣶⣶⡄⠀⣴⣶⡄<br/>   
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠀⠙⠋⠁⠀⠉⠋⠁⠀⠙⠋⠀<br/>   
⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
⠀⠀⠈⠙⠿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀<br/>   
<br/>   
C:/Duino-Coin/EasterEgg/Snake> python3 main.py  
<br/>   
<br/>   
<br/>   
Starting game...    
`;

let screen = document.querySelector("#screen");
let i = 0,
    isTag, text;

function type() {
    text = textToWrite.slice(0, ++i);
    if (text === textToWrite) {
        screen.innerHTML = `<canvas width="400" height="400" id="snakeGame"></canvas>`;
        startSnake();
        return;
    }
    screen.innerHTML = text + `<span class='blinker'>&#32;</span>`;
    let char = text.slice(-1);
    if (char === "<") isTag = true;
    if (char === ">") isTag = false;
    if (isTag) return type();
    setTimeout(type, 30);
};
