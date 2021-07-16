let loggedIn = false;
let balance = 0;
let curr_bal = 0;
let profitcheck = 0;
let duco_price = 0.0065;
let daily_average = [];
let oldb = 0;
let success_once = false;
let alreadyreset = false;
let start = Date.now()
let totalHashes = 0;
let sending = false;
let awaiting_login = false;
let awaiting_data = false;
let awaiting_version = true;

window.addEventListener('load', function() {
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
        'backgrounds/9-min.png',
        'backgrounds/balkanac-1.png',
        'backgrounds/balkanac-2.png'
    ]

    let num = Math.floor(Math.random() * bg_list.length)
    document.body.background = bg_list[num];

    // THEME SWITCHER
    let themesel = document.getElementById('themesel');
    themesel.addEventListener('input', updateValue);

    function updateValue(e) {
        let theme = e.target.value;
        let radiate = $('#radiate');
        let alt = $('#alt');
        let crisp = $('#crisp');
        let material = $('#material');
        let frosted = $('#frosted');
        switch (theme) {
            case 'frosted':
                frosted.attr('disabled', false);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                break;
            case 'radiance':
                radiate.attr('disabled', false);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'altlight':
                radiate.attr('disabled', true);
                alt.attr('disabled', false);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'light':
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'crisp':
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', false);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'material':
            default:
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', false);
                frosted.attr('disabled', true);
                break;
        }
    }


    // PRICE FROM API
    const get_duco_price = () => {
        fetch("https://server.duinocoin.com/api.json")
            .then(response => response.json())
            .then(data => {
                duco_price = data["Duco price"];
                duco_price_list = round_to(5, duco_price).toString().split(".")
                duco_price_before_dot = duco_price_list[0]
                duco_after_dot = duco_price_list[1]

                update_element("ducousd", "≈ $" + duco_price_before_dot +
                    "<span class='has-text-weight-light'>." +
                    duco_after_dot + "</span>");
            })
    }

    // HASHRATE PREFIX CALCULATOR
    const scientific_prefix = (value) => {
        value = parseFloat(value);
        if (value / 1000000000 > 0.5)
            value = round_to(2, value / 1000000000) + " G";
        else if (value / 1000000 > 0.5)
            value = round_to(2, value / 1000000) + " M";
        else if (value / 1000 > 0.5)
            value = round_to(2, value / 1000) + " k";
        return value;
    };

    //USER DATA FROM API
    const user_data = (username) => {
        $.getJSON('https://server.duinocoin.com/users/' + username, function(data) {
            data = data.result;
            balance = parseFloat(data.balance.balance);
            let balanceusd = balance * duco_price;
            console.log("Balance received: " + balance + " ($" + balanceusd + ")");

            if (oldb != balance) {
                calculdaily(balance, oldb)
                oldb = balance;
            }

            let balance_list = round_to(8, balance).toString().split(".")
            balance_before_dot = balance_list[0]
            balance_after_dot = balance_list[1]

            update_element("balance", balance_before_dot +
                "<span class='has-text-weight-light'>." +
                balance_after_dot + "</span> ᕲ");

            let balanceusd_list = round_to(4, balanceusd).toString().split(".")
            balanceusd_before_dot = balanceusd_list[0]
            balanceusd_after_dot = balanceusd_list[1]

            update_element("balanceusd", "<span>≈ $</span>" +
                balanceusd_before_dot +
                "<span class='has-text-weight-light'>." +
                balanceusd_after_dot);

            myMiners = data.miners;
            console.log("Miner data received");

            if (myMiners.length > 0 || success_once) {
                let success_once = true;
                let user_miners_html = '';
                let minerId = '';
                let diffString = '';

                for (let miner in myMiners) {
                    miner_hashrate = myMiners[miner]["hashrate"];
                    miner_identifier = myMiners[miner]["identifier"];
                    miner_software = myMiners[miner]["software"];
                    miner_diff = myMiners[miner]["diff"];
                    miner_rejected = myMiners[miner]["rejected"];
                    miner_accepted = myMiners[miner]["accepted"];

                    if (miner_identifier === "None")
                        minerId = miner_software;
                    else
                        minerId = miner_identifier +
                        "</b><span class='has-text-grey'> (" +
                        miner_software +
                        ")</span>";

                    diffString = scientific_prefix(miner_diff)

                    user_miners_html += "<span class='has-text-grey-light'>#" +
                        miner +
                        ":</span> " +
                        "<b class='has-text-primary'>" +
                        minerId +
                        "</b>, " +
                        "<b><span class='has-text-success'>" +
                        scientific_prefix(miner_hashrate) +
                        "H/s</b></span>" +
                        "<span class='has-text-info'>" +
                        " @ diff " +
                        diffString +
                        "</span>, " +
                        miner_accepted +
                        "/" +
                        (miner_accepted + miner_rejected) +
                        " <b class='has-text-success-dark'>(" +
                        Math.round(
                            (miner_accepted /
                                (miner_accepted + miner_rejected)) *
                            100
                        ) +
                        "%)</b><br>";

                    totalHashes = totalHashes + miner_hashrate;
                }
                update_element("miners", user_miners_html);
                update_element("minerHR", "Total hashrate: " + scientific_prefix(totalHashes) + "H/s");
                totalHashes = 0;
            } else {
                update_element("miners", "<b class='subtitle is-size-6'>No miners detected</b>" +
                    "<p class='subtitle is-size-6 has-text-grey'>If you have turned them on recently, it will take a minute or two until their stats will appear here.</p>");
            }

            const transtable = document.getElementById("transactions");
            user_transactions = data.transactions.reverse();
            console.log("Transaction list received");
            if (user_transactions) {
                transactions_html = "";
                for (let i in user_transactions) {
                    transaction_date = user_transactions[i]["datetime"].substring(0, 5);
                    transaction_amount = round_to(8, parseFloat(user_transactions[i]["amount"]));
                    transaction_hash_full = user_transactions[i]["hash"];
                    transaction_hash = transaction_hash_full.substr(transaction_hash_full.length - 5);
                    transaction_memo = user_transactions[i]["memo"];
                    transaction_recipient = user_transactions[i]["recipient"];
                    transaction_sender = user_transactions[i]["sender"];

                    let transaction_color = "has-text-success-dark";
                    let transaction_symbol = "+";

                    if (transaction_sender == username) {
                        transaction_color = "has-text-danger";
                        transaction_symbol = "-";
                    }

                    hash_html = `<a class="subtitle is-size-6 monospace"` +
                        ` style="color:#8e44ad" target="_blank"` +
                        ` href="https://explorer.duinocoin.com/?search=${transaction_hash_full}">` +
                        `${transaction_hash}</a>`

                    transactions_html +=
                        `<tr><td data-label="Date" class="subtitle is-size-6 has-text-grey monospace">${transaction_date}<br>${hash_html}</td>` +
                        `<td data-label="Amount" class="subtitle is-size-6 ${transaction_color}"> ${transaction_symbol} ${transaction_amount} ᕲ</td>` +
                        `<td data-label="Sender" class="subtitle is-size-6">${transaction_sender}</td>` +
                        `<td data-label="Recipient" class="subtitle is-size-6">${transaction_recipient}</td>` +
                        `<td data-label="Message" class="subtitle is-size-6 has-text-grey">${transaction_memo}</td></tr>`;
                }
                transtable.innerHTML = transactions_html;
            } else transtable.innerHTML = `<td colspan="4">No transactions yet or they're temporarily unavailable</td>`;
        });
    }


    function round_to(precision, value) {
        power_of_ten = 10 ** precision;
        return Math.round(value * power_of_ten) / power_of_ten;
    }

    function update_element(element, value) {
        // Nicely fade in the new value if it changed
        element = "#" + element;
        old_value = $(element).html()

        if (value != old_value) {
            $(element).fadeOut('fast', function() {
                $(element).html(value);
                $(element).fadeIn('fast');
            });
        }
    }

    /* Accurate daily calculator by Lukas */
    function calculdaily(newb, oldb) {
        //Duco made in last seconds
        let ducomadein = newb - oldb;
        let time_passed = (Date.now() - start) / 1000;
        let daily = 86400 * ducomadein / time_passed;

        // Large values mean transaction or big block - ignore this value
        if (daily > 0 && daily < 500) {
            avg_list = round_to(2, daily).toString().split(".")
            avg_before_dot = avg_list[0]
            avg_after_dot = avg_list[1]

            update_element("estimatedprofit", avg_before_dot +
                "<span class='has-text-weight-light'>." +
                avg_after_dot + "</span> ᕲ");

            avgusd = daily * duco_price;
            avgusd_list = round_to(2, avgusd).toString().split(".")
            avgusd_before_dot = avgusd_list[0]
            avgusd_after_dot = avgusd_list[1]

            update_element("estimatedprofitusd", "<span>≈ $</span>" +
                avgusd_before_dot +
                "<span class='has-text-weight-light'>." +
                avgusd_after_dot +
                "</span>");
        }
        start = Date.now()
    }

    // ENTER KEY AS LOGIN
    let input_login = document.getElementById("login");
    input_login.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("loginbutton").click();
        }
    });

    // MAIN WALLET SCRIPT
    document.getElementById('loginbutton').onclick = function() {
        $("#logincheck").fadeOut('fast', function() {
            $("#loginload").fadeIn('fast');
        });

        update_element("logintext", "Connecting...");

        let username = document.getElementById('usernameinput').value
        let password = document.getElementById('passwordinput').value

        if (username && password) {
            let socket = new WebSocket("wss://server.duinocoin.com:15808", null, 5000, 5);

            socket.onclose = function(event) {
                if (loggedIn) {
                    console.error("Error Code: " + event.code);
                    let dataErr = "Unknown";

                    if (event.code == 1000) {
                        console.error("[Error] Normal closure");
                        dataErr = "Due to five minutes of inactivity the connection was closed from the server side for security reasons.";
                    } else if (event.code == 1001 || event.code == 1002) {
                        console.error("[Error] Server problem.");
                        dataErr = "Server closed the connection";
                    } else if (event.code == 1005) {
                        console.error("[Error] No status code was actually present");
                        dataErr = "No status code";
                    } else if (event.code == 1006) {
                        console.error("[Error] Connection was closed abnormally");
                        dataErr = "Connection closed abnormally (most likely a timeout)";
                    } else if (event.code == 1015) {
                        console.error("[Error] Failure to perform a TLS handshake");
                        dataErr = "TLS handshake error";
                    } else {
                        console.error("[Error] Unknown reason");
                    }

                    if (event.code == 1000) {
                        let modal_success = document.querySelector('#modal_success');
                        document.querySelector('#modal_success .modal-card-body .content p')
                            .innerHTML = dataErr + `<br><br><a href="/" class="button is-info">Refresh</a></p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_success.classList.add('is-active');

                        document.querySelector('#modal_success .delete').onclick = function() {
                            document.querySelector('html').classList.remove('is-clipped');
                            modal_success.classList.remove('is-active');
                        }
                    } else {
                        let modal_error = document.querySelector('#modal_error');
                        document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                            `<b>An error has occurred</b>, please try again later and if the problem persists ` +
                            `ask for help on our <a href="https://discord.gg/kvBkccy">Discord server</a> ` +
                            `with this code: <b>` + event.code + `</b>: <b>` + dataErr + `</b><br></p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_error.classList.add('is-active');

                        document.querySelector('#modal_error .delete').onclick = function() {
                            document.querySelector('html').classList.remove('is-clipped');
                            modal_error.classList.remove('is-active');
                        }
                    }
                }
            }


            document.getElementById('send').onclick = function() {
                let recipient = document.getElementById('recipientinput').value
                let amount = document.getElementById('amountinput').value
                let memo = document.getElementById('memoinput').value

                update_element("sendinginfo", "Requesting transfer...")
                document.getElementById("send").classList.add("is-loading");

                if (recipient && amount) {
                    update_element("sendinginfo", "Requesting transaction...");
                    socket.send("SEND," + memo + "," + recipient + "," + amount + ",");
                    sending = true;
                } else {
                    update_element("sendinginfo",
                        "<span class='subtitle is-size-7 mb-2 has-text-danger'><b>Fill in the blanks first</b></span>");
                    document.getElementById("send").classList.remove("is-loading");

                    setTimeout(() => {
                        update_element("sendinginfo", "");
                    }, 5000);
                }
            }

            socket.onmessage = function(msg) {
                serverMessage = msg.data;

                if (awaiting_version && sending == false) {
                    console.log("Version received: " + serverMessage);
                    awaiting_version = false;
                }
                if (awaiting_login == false && awaiting_version == false && sending == false) {
                    update_element("logintext", "Authenticating...");
                    socket.send("LOGI," + username + "," + password + ",");
                    awaiting_login = true;
                }
                if (awaiting_login && serverMessage.includes("OK") && sending == false) {

                    console.log("User logged-in");

                    let time = new Date().getHours();
                    let greeting = "Welcome back";
                    if (time < 12) {
                        greeting = "Have a wonderful morning";
                    }
                    if (time == 12) {
                        greeting = "Have a tasty noon";
                    }
                    if (time > 12 && time < 18) {
                        greeting = "Have a peaceful afternoon";
                    }
                    if (time >= 18) {
                        greeting = "Have a cozy evening";
                    }

                    update_element("wallettext", "<p class='subtitle is-size-3 mb-3'>" +
                        "<img src='https://github.com/revoxhere/duino-coin/blob/master/Resources/wave.png?raw=true' class='icon'>" +
                        " " + greeting + ", <b>" + username + "!</b></p>");

                    awaiting_login = false;
                    loggedIn = true;

                    $("#login").hide('fast', function() {
                        user_data(username);
                        window.setInterval(() => {
                            user_data(username);
                        }, 10 * 1000);

                        $("#wallet").show('fast', function() {
                            get_duco_price();
                            window.setInterval(() => {
                                get_duco_price();
                            }, 30 * 1000);

                            window.setTimeout(() => {
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            }, 1000);
                        });
                    });
                }
                if (awaiting_login && serverMessage.includes("NO") && sending == false) {
                    awaiting_login = false;
                    serverMessage = serverMessage.split(",")

                    update_element("logintext", serverMessage[1]);

                    $("#logincheck").fadeIn(1)
                    $("#loginload").fadeOut(1)

                    setTimeout(() => {
                        update_element("logintext", "Login");
                    }, 5000);
                }
                if (sending) {
                    serverMessage = serverMessage.toString().split(",");

                    if (serverMessage[0] == "OK") {
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

                        document.querySelector('#modal_success .delete').onclick = function() {
                            document.querySelector('html').classList.remove('is-clipped');
                            modal_success.classList.remove('is-active');
                        }

                    } else {
                        let modal_error = document.querySelector('#modal_error');
                        document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                            `<b>An error has occurred while sending funds: </b>` + serverMessage[1] + `</b><br></p>`;
                        document.querySelector('html').classList.add('is-clipped');
                        modal_error.classList.add('is-active');

                        document.querySelector('#modal_error .delete').onclick = function() {
                            document.querySelector('html').classList.remove('is-clipped');
                            modal_error.classList.remove('is-active');
                        }
                    }
                    document.getElementById("send").classList.remove("is-loading");
                    update_element("sendinginfo", "");
                    sending = false;
                }
            }
        } else {
            $("#logincheck").fadeIn(1)
            $("#loginload").fadeOut(1)

            update_element("logintext", "Please fill in the blanks first");

            setTimeout(() => {
                update_element("logintext", "Login");
            }, 5000);
        }
    }

    // Footer
    document.getElementById("pageloader").setAttribute('class', "pageloader is-primary is-left-to-right"); // After page is loaded

    let multiplier = document.getElementById('multiplier');
    let inputHashrate = document.getElementById('input-hashrate');

    multiplier.addEventListener('input', updateValueHashrate);
    inputHashrate.addEventListener('input', updateValueHashrate);

    function floatmap(x, in_min, in_max, out_min, out_max) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    }

    function updateValueHashrate(e) {
        hashrate = e.target.value * multiplier.value;

        /* https://github.com/revoxhere/duino-coin#some-of-the-officially-tested-devices-duco-s1 */
        result = (0.0026 * hashrate) + 2.7

        if (hashrate > 8000) result = floatmap(result, 25, 1000, 25, 40); // extreme diff tier, TODO

        update_element("values", round_to(2, result) + " ᕲ/day");
    }

    let device = document.getElementById('device-type');
    let input_devices = document.getElementById('input-devices');

    device.addEventListener('input', updateValueDevices);
    input_devices.addEventListener('input', updateValueDevices);

    function updateValueDevices(e) {
        if (device.value === 'AVR') basereward = 8
        if (device.value === 'ESP8266') basereward = 6
        if (device.value === 'ESP32') basereward = 7
        /* https://github.com/revoxhere/duino-coin#some-of-the-officially-tested-devices-duco-s1 */
        let result = 0;
        for (i = 0; i < input_devices.value; i++) {
            result += basereward;
            basereward *= 0.96;
        }
        update_element("values-devices", round_to(2, result) + " ᕲ/day");
    }

});
