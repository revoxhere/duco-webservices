let versionReceived = false;
let loggedIn = false;
let balance = 0;
let curr_bal = 0;
let profitcheck = 0;
let ducoUsdPrice = 0.0065;
let sending = false;
let daily_average = [];
window.addEventListener('load', function() {
    const usernameinput = document.getElementById('usernameinput');
    usernameinput.addEventListener('input', color);

    function color(e) {
        usernameinput.classList.add("is-info");
    }

    const passwordinput = document.getElementById('passwordinput');
    usernameinput.addEventListener('input', color_p);

    function color_p(e) {
        passwordinput.classList.add("is-info");
    }

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

    // THEME SWITCHER
    let themesel = document.getElementById('themesel');
    themesel.addEventListener('input', updateValue);

    function updateValue(e) {
        let theme = e.target.value;
        let dark = $('#dark');
        let radiate = $('#radiate');
        let alt = $('#alt');
        let crisp = $('#crisp');
        let material = $('#material');
        let frosted = $('#frosted');
        switch (theme) {
            case 'dark':
                dark.attr('disabled', false);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'frosted':
                frosted.attr('disabled', false);
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                break;
            case 'radiance':
                dark.attr('disabled', true);
                radiate.attr('disabled', false);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'altlight':
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', false);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'light':
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'crisp':
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', false);
                material.attr('disabled', true);
                frosted.attr('disabled', true);
                break;
            case 'material':
            default:
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', false);
                frosted.attr('disabled', true);
                break;
        }
    }


    // PRICE FROM API
    const GetData = () => {
        $.getJSON('https://server.duinocoin.com/api.json', function(data) {
            ducoUsdPrice = data["Duco price"];
            document.getElementById("ducousd")
                .innerHTML = "$" + (ducoUsdPrice).toFixed(4);
        });
    };

    // HASHRATE PREFIX CALCULATOR
    let totalHashes = 0;
    const calculateHashrate = (hashes) => {
        hashes = parseFloat(hashes);
        let hashrate = hashes.toFixed(2) + " H/s";

        if (hashes / 1000 > 0.5) hashrate = (hashes / 1000).toFixed(2) + " kH/s";
        if (hashes / 1000000 > 0.5)
            hashrate = (hashes / 1000000).toFixed(2) + " MH/s";
        if (hashes / 1000000000 > 0.5)
            hashrate = (hashes / 1000000000).toFixed(2) + " GH/s";

        return hashrate;
    };

    //USER DATA FROM API
    let success_once = false;
    const UserData = (username) => {
        $.getJSON('https://server.duinocoin.com/users/' + username, function(data) {
            data = data.result;
            balance = parseFloat(data.balance.balance);
            let balanceusd = balance * ducoUsdPrice;
            console.log("Balance received: " + balance + " ($" + balanceusd + ")");

            let balance_list = balance.toFixed(8).split(".")
            let balance_before_dot = balance_list[0]
            let balance_after_dot = balance_list[1]

            document.getElementById("balance")
                .innerHTML = balance_before_dot +
                "<span class='has-text-weight-normal'>." +
                balance_after_dot + " ᕲ";

            let balanceusd_list = balanceusd.toFixed(4).split(".")
            let balanceusd_before_dot = balanceusd_list[0]
            let balanceusd_after_dot = balanceusd_list[1]

            document.getElementById("balanceusd")
                .innerHTML = "<span class='has-text-weight-normal'>≈ $</span>" + balanceusd_before_dot +
                "." +
                balanceusd_after_dot;

            myMiners = data.miners;
            console.log("Miner data received");
            const miners = document.getElementById("miners");
            const minerHashrate = document.getElementById("minerHR");
            let minerId = '';
            let diffString = '';
            miners.innerHTML = "";
            if (myMiners || success_once) {
                success_once = true;
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

                    if (miner_diff >= 1000000000)
                        diffString = Math.round(miner_diff / 100000000) / 10 + "G";
                    else if (miner_diff >= 1000000)
                        diffString = Math.round(miner_diff / 100000) / 10 + "M";
                    else if (miner_diff >= 1000)
                        diffString = Math.round(miner_diff / 100) / 10 + "k";
                    else
                        diffString = miner_diff;

                    miners.innerHTML +=
                        "<span class='has-text-grey-light'>#" +
                        miner +
                        ":</span> " +
                        "<b class='has-text-primary'>" +
                        minerId +
                        "</b>, " +
                        "<b><span class='has-text-success'>" +
                        calculateHashrate(miner_hashrate) +
                        "</b></span>" +
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
                minerHashrate.innerHTML = "Total hashrate: " + calculateHashrate(totalHashes);
                totalHashes = 0;
            } else {
                miners.innerHTML = "<b class='subtitle is-size-6'>No miners detected</b>" +
                    "<p class=' subtitle is-size-6 has-text-grey'>If you have turned them on recently, it will take a minute or two until their stats will appear here.</p>";
            }


            const transtable = document.getElementById("transactions");
            user_transactions = data.transactions.reverse();
            console.log("Transaction list received");
            if (user_transactions) {
                let transactions = "";
                for (let i in user_transactions) {
                    console.log(user_transactions[i]["sender"])
                    transaction_date = user_transactions[i]["datetime"].substring(0,5);
                    transaction_amount = parseFloat(user_transactions[i]["amount"].toFixed(4));
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

                    hash_html = `<a class="subtitle is-size-6 monospace"`
                                +` style="color:#8e44ad" target="_blank"`
                                +` href="https://explorer.duinocoin.com/?search=${transaction_hash_full}">`
                                +`${transaction_hash}</a>`

                    transactions +=
                        `<tr><td data-label="Date" class="subtitle is-size-6 has-text-grey monospace">${transaction_date}<br>${hash_html}</td>` +
                        `<td data-label="Amount" class="subtitle is-size-6 ${transaction_color}"> ${transaction_symbol} ${transaction_amount} ᕲ</td>` +
                        `<td data-label="Sender" class="subtitle is-size-6">${transaction_sender}</td>` +
                        `<td data-label="Recipient" class="subtitle is-size-6">${transaction_recipient}</td>` +
                        `<td data-label="Message" class="subtitle is-size-6 has-text-grey">${transaction_memo}</td></tr>`;
                }
                transtable.innerHTML = transactions;
            } else transtable.innerHTML = `<td colspan="4">No transactions yet or they're temporarily unavailable</td>`;
        });
    }

    // PROFIT CALCULATOR
    const ProfitCalculator = () => {
        let prev_bal = curr_bal;
        curr_bal = balance;
        let daily = (curr_bal - prev_bal) * 864;
        profitcheck++;
        let avgusd;
        let avg_list;
        let avg_before_dot;
        let avg_after_dot;
        let avgusd_list;
        let avgusd_before_dot;
        let avgusd_after_dot;
        if ((curr_bal - prev_bal) > 0 && profitcheck > 1) {
            // High daily profit means a transaction or big block - that value should be ignored
            if (daily < 500) {
                // Get the average from profit calculations to not make it fluctuate as much
                daily_average.push(daily);
                let sum = daily_average.reduce((a, b) => a + b, 0);
                let avg = (sum / daily_average.length) || 0;
                avgusd = avg * ducoUsdPrice;
                //console.log("Estimated profit sum: " + sum + ", average: " + avg);

                avg_list = avg.toFixed(2).split(".")
                avg_before_dot = avg_list[0]
                avg_after_dot = avg_list[1]

                document.getElementById("estimatedprofit")
                    .innerHTML = avg_before_dot +
                    "<span class='has-text-weight-normal'>." +
                    avg_after_dot + " ᕲ";

                avgusd_list = avgusd.toFixed(2).split(".")
                avgusd_before_dot = avgusd_list[0]
                avgusd_after_dot = avgusd_list[1]

                document.getElementById("estimatedprofitusd")
                    .innerHTML = "<span class='has-text-weight-normal'>≈ $</span>" + avgusd_before_dot +
                    "." +
                    avgusd_after_dot;
            }
        }
    };



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
        $("#logincheck").hide(1)
        $("#loginload").show(1)
        document.getElementById("logintext").innerText = "Connecting...";

        let username = document.getElementById('usernameinput').value
        let password = document.getElementById('passwordinput').value

        if (username != null &&
            username !== "" &&
            username !== undefined &&
            password != null &&
            password !== "" &&
            password !== undefined) {
            let socket = new WebSocket("wss://server.duinocoin.com:15808", null, 5000, 5);

            document.getElementById('send').onclick = function() {
                document.getElementById("sendinginfo")
                    .innerHTML = "Requesting transfer..."
                document.getElementById("send").classList.add("is-loading");
                let recipient = document.getElementById('recipientinput').value
                let amount = document.getElementById('amountinput').value
                let memo = document.getElementById('memoinput').value
                if (recipient != null &&
                    recipient !== "" &&
                    recipient !== undefined &&
                    amount != null &&
                    amount !== "" &&
                    amount !== undefined) {
                    sending = true;

                    socket.send("SEND," + memo + "," + recipient + "," + amount + ",");
                    document.getElementById("sendinginfo").innerHTML = "Confirming transaction..."
                } else {
                    document.getElementById("sendinginfo")
                        .innerHTML = "<span class='subtitle is-size-7 mb-2 has-text-danger'><b>Fill in the blanks first</b></span>"
                    document.getElementById("send").classList.remove("is-loading");
                    sending = false;
                    setTimeout(() => {
                        document.getElementById("sendinginfo")
                            .innerHTML = "";
                    }, 5000);
                }
            }

            socket.onclose = function(event) {
                if (loggedIn) {
                    console.error("Error Code: " + event.code);
                    let dataErr = "Unknown";

                    if (event.code == 1000) {
                        console.error("[Error] Normal closure");
                        dataErr = "Connection closed from inactivity";
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
            let awaiting_login = false;
            let awaiting_data = false;
            let awaiting_version = true;
            socket.onmessage = function(msg) {
                serverMessage = msg.data;

                if (awaiting_version) {
                    console.log("Version received: " + serverMessage);
                    awaiting_version = false;
                }
                if (awaiting_login == false && awaiting_version == false) {
                    document.getElementById("logintext")
                        .innerText = "Authenticating...";
                    socket.send("LOGI," + username + "," + password + ",");
                    awaiting_login = true;
                }
                if (awaiting_login == true && awaiting_version == false && serverMessage.includes("OK")) {

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

                    document.getElementById("logintext").innerText = "Logged in";
                    document.getElementById("wallettext")
                        .innerHTML = "<p class='has-text-weight-light mb-1'>" +
                        "<img src='https://github.com/revoxhere/duino-coin/blob/master/Resources/wave.png?raw=true' class='icon'>" +
                        " " + greeting + ", <b>" + username + "!</b></p>";
                    document.getElementById("copyright")
                        .innerHTML = `<p class="subtitle is-size-7 has-text-grey has-text-weight-light mb-3">` +
                        `<span class="has-text-weight-normal">Duino-Coin Web Wallet</span> is developed by ` +
                        `<a href="https://github.com/revoxhere/">revox</a>, ` +
                        `<a href="https://www.instagram.com/vlegle/">Yennefer</a> & ` +
                        `<a href="https://github.com/LDarki">LDarki</a>, ` +
                        `hosted by <a href="https://kristian-kramer.com">Kristian</a> ` +
                        `and <a href="https://pages.github.com">GH Pages</a>` +
                        `<br><span class="is-size-7 has-text-grey">` +
                        `2020-2021 the <a href="https://duinocoin.com">Duino-Coin</a> project` +
                        `</span>` +
                        `<span class="is-size-7 has-text-grey">` +
                        `, distributed under the ` +
                        `<a href="https://opensource.org/licenses/MIT">` +
                        `MIT license` +
                        `</a></span></p>`


                    awaiting_login = false;
                    loggedIn = true;

                    const transtable = document.getElementById("transactions");
                    transtable.innerHTML = `<tr><td data-label="Date">Please wait...</td></tr>`;

                    $("#login").hide(300, function() {
                        $("#wallet").show(300, function() {
                            UserData(username);
                            window.setInterval(() => {
                                UserData(username);
                                ProfitCalculator();
                            }, 10 * 1000);

                            GetData();
                            window.setInterval(() => {
                                GetData();
                            }, 30 * 1000);

                            window.setTimeout(() => {
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            }, 1000);
                        });
                    });
                }
                if (awaiting_login == true && awaiting_version == false && serverMessage.includes("NO")) {
                    awaiting_login = false;
                    serverMessage = serverMessage.split(",")

                    document.getElementById("logintext")
                        .innerText = serverMessage[1];

                    $("#logincheck").show('fast')
                    $("#loginload").hide('fast')

                    setTimeout(() => {
                        document.getElementById("logintext")
                            .innerHTML = "Login"
                    }, 5000);
                }

                if (awaiting_login == false && awaiting_version == false && sending == true && awaiting_data == false) {
                    serverMessage = serverMessage.split(",");
                    if (serverMessage[0].includes("OK")) {
                        document.getElementById("sendinginfo")
                            .innerHTML = "<span class='subtitle is-size-7 mb-2 has-text-success'><b>" +
                            serverMessage[1] +
                            "</b></span> TXID: <a href='https://explorer.duinocoin.com?search=" +
                            serverMessage[2] + "'>" +
                            serverMessage[2] +
                            "</a>";
                    } else if (serverMessage[0].includes("NO")) {
                        document.getElementById("sendinginfo")
                            .innerHTML = "<span class='subtitle is-size-7 mb-2 has-text-danger'><b>" + serverMessage[1] + "</b></span>";
                    } else {
                        document.getElementById("sendinginfo")
                            .innerHTML = "<span class='subtitle is-size-7 mb-2 has-text-warning-dark'><b>Error sending request, please try again</b></span>";
                    }
                    document.getElementById("send").classList.remove("is-loading");
                    setTimeout(() => {
                        sending = false;
                        document.getElementById("sendinginfo")
                            .innerHTML = "";
                    }, 5000);
                }
            }
        } else {
            $("#logincheck").show('fast')
            $("#loginload").hide('fast')

            document.getElementById("logintext")
                .innerText = "Please fill in the blanks first";

            setTimeout(() => {
                document.getElementById("logintext")
                    .innerHTML = "Login"
            }, 5000);
        }
    }

    // Footer
    document.getElementById("pageloader").setAttribute('class', "pageloader is-primary is-left-to-right"); // After page is loaded

    let multiplier = document.getElementById('multiplier');
    let inputHashrate = document.getElementById('input-hashrate');
    let log = document.getElementById('values');

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

        if (hashrate < 1) log.textContent = "0 ᕲ/day";
        if (hashrate < 1) log.textContent = "0 ᕲ/day";
        else log.textContent = result.toFixed(2) + " ᕲ/day";
    }

    let device = document.getElementById('device-type');
    let input_devices = document.getElementById('input-devices');
    let log_devices = document.getElementById('values-devices');

    device.addEventListener('input', updateValueDevices);
    input_devices.addEventListener('input', updateValueDevices);

    let basereward;

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
        log_devices.textContent = result.toFixed(2) + " ᕲ/day";
    }

});