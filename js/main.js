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
        'https://i.imgur.com/trNkG47.png',
        'https://i.imgur.com/MWknhr6.png',
        'https://i.imgur.com/oYEEfLG.png',
        'https://i.imgur.com/7d11Dyg.png',
        'https://i.imgur.com/K1qr6tC.png',
        'https://i.imgur.com/g7fqQbn.png',
        'https://i.imgur.com/PsUqgsD.png',
        'https://i.imgur.com/HzPgf7J.jpg'
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
        switch (theme) {
            case 'dark':
                dark.attr('disabled', false);
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
                break;
            case 'altlight':
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', false);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                break;
            case 'light':
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', true);
                break;
            case 'crisp':
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', false);
                material.attr('disabled', true);
                break;
            case 'material':
            default:
                dark.attr('disabled', true);
                radiate.attr('disabled', true);
                alt.attr('disabled', true);
                crisp.attr('disabled', true);
                material.attr('disabled', false);
                break;
        }
    }


    // PRICE FROM API
    const GetData = () => {
        $.getJSON('https://server.duinocoin.com/statistics', function(data) {
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
    const UserData = (username) => {
        $.getJSON('https://server.duinocoin.com/users/' + username, function(data) {
            balance = parseFloat(data.result.balance.balance);
            let balanceusd = balance * ducoUsdPrice;
            console.log("Balance received: " + balance + "($" + balanceusd + ")");

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

            let jsonD = data.result.transactions.reverse();

            const transtable = document.getElementById("transactions");
            console.log("Transaction list received");
            if (jsonD.length > 0) {
                let transactions = "";
                for (let i in jsonD) {
                    let classD = "has-text-success-dark";
                    let symbolD = "+";
                    if (jsonD[i].sender == username) {
                        classD = "has-text-danger";
                        symbolD = "-";
                    }
                    transactions +=
                        `<tr><td data-label="Date" class="subtitle is-size-6 has-text-grey">${jsonD[i].datetime.substr(0, jsonD[i].datetime.length - 14)}</td>` +
                        `<td data-label="Amount" class="subtitle is-size-6  ${classD}"> ${symbolD} ${jsonD[i].amount.toFixed(2)} ᕲ</td>` +
                        `<td data-label="Sender" class="subtitle is-size-6">${jsonD[i].sender}</td>` +
                        `<td data-label="Recipient" class="subtitle is-size-6">${jsonD[i].recipient}</td>` +
                        `<td data-label="Hash">` +
                        `<a class="subtitle is-size-6" style="color:#8e44ad" href="https://explorer.duinocoin.com/?search=${jsonD[i].hash}">` +
                        `${jsonD[i].hash.substr(jsonD[i].hash.length - 5)}</a>` +
                        `<td data-label="Message" class="subtitle is-size-6 has-text-grey">${jsonD[i].memo}</td></tr>`;
                    if (i >= 10) break
                }
                transtable.innerHTML = transactions;
            } else transtable.innerHTML = `<tr><td data-label="Date">No transactions yet</td></tr>`;

            let myMiners = data.result.miners;
            console.log("Miner data received");
            let miners = document.getElementById("miners");
            miners.innerHTML = "";
            let minerHashrate = document.getElementById("minerHR");
            let minerId = '';
            let diffString = '';
            if (myMiners.length > 0) {
                for (let miner in myMiners) {
                    if (myMiners[miner]["identifier"] === "None")
                        minerId = "";
                    else
                        minerId = myMiners[miner]["identifier"];

                    if (myMiners[miner]["diff"] >= 1000000000)
                        diffString = Math.round(myMiners[miner]["diff"] / 1000000000) + "G";
                    else if (myMiners[miner]["diff"] >= 1000000)
                        diffString = Math.round(myMiners[miner]["diff"] / 1000000) + "M";
                    else if (myMiners[miner]["diff"] >= 1000)
                        diffString = Math.round(myMiners[miner]["diff"] / 1000) + "k";
                    else
                        diffString = myMiners[miner]["diff"];

                    if (minerId !== '') {
                        miners.innerHTML +=
                            "<b class='has-text-grey-light'>#" +
                            miner +
                            ":</b><b class='has-text-primary'> " +
                            minerId +
                            "</b> (" +
                            myMiners[miner]["software"] +
                            ") <b><span class='has-text-success'>" +
                            calculateHashrate(myMiners[miner]["hashrate"]) +
                            "</b></span><span class='has-text-info'> @ diff " +
                            diffString +
                            "</span>, " +
                            myMiners[miner]["accepted"] +
                            "/" +
                            (myMiners[miner]["accepted"] + myMiners[miner]["rejected"]) +
                            " <b class='has-text-success-dark'>(" +
                            Math.round(
                                (myMiners[miner]["accepted"] /
                                    (myMiners[miner]["accepted"] + myMiners[miner]["rejected"])) *
                                100
                            ) +
                            "%)</b><br>";
                    } else {
                        miners.innerHTML +=
                            "<b class='has-text-grey-light'>#" +
                            miner +
                            ":</b> " +
                            myMiners[miner]["software"] +
                            " <b><span class='has-text-success'>" +
                            calculateHashrate(myMiners[miner]["hashrate"]) +
                            "</b></span><span class='has-text-info'> @ diff " +
                            diffString +
                            "</span>, " +
                            myMiners[miner]["accepted"] +
                            "/" +
                            (myMiners[miner]["accepted"] + myMiners[miner]["rejected"]) +
                            " <b class='has-text-success-dark'>(" +
                            Math.round(
                                (myMiners[miner]["accepted"] /
                                    (myMiners[miner]["accepted"] + myMiners[miner]["rejected"])) *
                                100
                            ) +
                            "%)</b><br>";
                    }
                    totalHashes = totalHashes + myMiners[miner]["hashrate"];
                }
                minerHashrate.innerHTML = "Total hashrate: " + calculateHashrate(totalHashes);
                totalHashes = 0;
            } else {
                miners.innerHTML = "<b class='subtitle is-size-6'>No miners detected</b>" +
                    "<p class=' subtitle is-size-6 has-text-grey'>If you have turned them on recently, it will take a minute or two until their stats will appear here.</p>";
            }
        });
    }

    // PROFIT CALCULATOR
    const ProfitCalculator = () => {
        let prev_bal = curr_bal;
        curr_bal = balance;
        let daily = (curr_bal - prev_bal) * 1400;
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
            
            socket.onmessage = function(msg) {
                serverMessage = msg.data;

                if (loggedIn == false &&
                    versionReceived == false &&
                    serverMessage.includes("2.")) {
                    console.log("Version received: " + serverMessage);
                    versionReceived = true;
                }
                if (loggedIn == false &&
                    versionReceived) {
                    document.getElementById("logintext")
                        .innerText = "Authenticating...";
                    socket.send("LOGI," + username + "," + password + ",");
                }
                if (loggedIn == false &&
                    versionReceived &&
                    serverMessage.includes("OK")) {

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
                        "<img src='https://github.com/revoxhere/duino-coin/blob/master/Resources/NewWallet.ico?raw=true' class='icon'>" +
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

                    const transtable = document.getElementById("transactions");
                    transtable.innerHTML = `<tr><td data-label="Date">Please wait...</td></tr>`;

                    $("#login").hide(300, function() {
                        $("#wallet").show(300, function() {
                            window.setTimeout(() => {
                                UserData(username);
                                window.setInterval(() => {
                                    UserData(username);
                                }, 7 * 1000);

                                window.setInterval(() => {
                                    ProfitCalculator();
                                }, 10 * 1000);

                                GetData();
                                window.setInterval(() => {
                                    GetData();
                                }, 30 * 1000);

                                window.setTimeout(() => {
                                    (adsbygoogle = window.adsbygoogle || []).push({});
                                }, 1000);

                                loggedIn = true;
                            }, 200);
                        });
                    });
                }
                if (loggedIn == false &&
                    versionReceived &&
                    serverMessage.includes("NO")) {

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
                if (sending == true) {
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
