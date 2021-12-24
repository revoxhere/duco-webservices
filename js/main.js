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
let username;
let notify_shown = false;
let transaction_limit = 5;
let first_launch = true;


function round_to(precision, value) {
    power_of_ten = 10 ** precision;
    return Math.round(value * power_of_ten) / power_of_ten;
}

/* Accurate daily calculator by Lukas */
function calculdaily(newb, oldb) {
    //Duco made in last seconds
    let ducomadein = newb - oldb;
    let time_passed = (Date.now() - start) / 1000;
    let daily = 86400 * ducomadein / time_passed;

    // Large values mean transaction or big block - ignore this value
    if (daily > 0 && daily < 500) {
        daily = round_to(1, daily)
        update_element("estimatedprofit", `
                <i class="far fa-star"></i>
                Earning about <b>` + daily + ` ᕲ</b> daily`);

        avgusd = round_to(3, daily * duco_price);
        update_element("estimatedprofitusd", "(≈ $" + avgusd + ")");
    }
    start = Date.now()
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
        $(element).fadeOut('fast', function() {
            $(element).html(value);
            $(element).fadeIn('fast');
        });
        return true;
    }
    return false;
}

function setcookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        var expires = "; expires=" + date.toGMTString();
    } else
        var expires = "";
    document.cookie = name + "=" + value + expires + ";path=/";
}

function getcookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

function delcookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

function miner_notify() {
    let modal_error = document.querySelector('#modal_error');
    document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
        `<b>You're wasting power</b><br>Your total miner efficiency is <b>less than 20%</b>, because you're using too many miners.<br>Big farms are not good for Duino-Coin, as you won't earn more but only put more load on the servers. You can read more about it <a href="https://github.com/revoxhere/duino-coin/wiki/FAQ#q-can-i-create-a-mining-farm-with-esp-boards-or-arduinos" target="_blank">here</a>.<br>Consider making your rig smaller.</p>`;
    document.querySelector('html').classList.add('is-clipped');
    modal_error.classList.add('is-active');

    document.querySelector('#modal_error .delete').onclick = function() {
        document.querySelector('html').classList.remove('is-clipped');
        modal_error.classList.remove('is-active');
    }
}




window.addEventListener('load', function() {
    // CONSOLE WARNING
    console.log(`%cHold on!`, "color: red; font-size: 3em");
    console.log(`%cThis browser feature is intended for developers.\nIf someone instructed you to copy and paste something here to enable some feature or to "hack" someone's account, it usually means he's trying to get access to your account.`, "font-size: 1.5em;");
    console.log(`%cPlease proceed with caution.`, "color: orange; font-size: 1.5em;");

    // RANDOM BACKGROUND
    const bg_list = [
        'backgrounds/wallet/yenn-sea-1.jpg',
        'backgrounds/wallet/yenn-sea-2.jpg',
        'backgrounds/wallet/yenn-mountains-1.jpg',
        'backgrounds/wallet/hge-sea-1.jpg'
    ]

    const num = Math.floor(Math.random() * bg_list.length)
    document.body.background = bg_list[num];

    fetch('https://duco.sytes.net/ducostats.json')
        .then(response => response.json())
        .then(data => {
            if (data["api"]["online"])
                api_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-success">
                            <i class="fas fa-check-square"></i>
                        </span>
                        <b>REST API</b>
                    </div>
                    <p class="block">
                        Operational since ` +
                new Date(data["api"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                    </p>
                </div>`;
            else
                api_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        <b>REST API</b>
                    </div>
                    <p class="block has-text-weight-bold">
                        Possible problems with the wallet and external sites since ` +
                new Date(data["api"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                        ${new Date(data["api"]["since"] * 1000).toLocaleTimeString("pl-PL")}
                    </p>
                </div>`;

            if (data["vps"]["online"])
                vps_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-success">
                            <i class="fas fa-check-square"></i>
                        </span>
                        <b>Master server</b>
                    </div>
                    <p class="block">
                        Operational since
                        ${new Date(data["vps"]["since"] * 1000).toLocaleDateString("pl-PL")}
                    </p>
                </div>`;
            else
                vps_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        <b>Master server</b>
                    </div>
                    <p class="block has-text-weight-bold">
                        Possible problems with pools syncing and transactions since ` +
                new Date(data["vps"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                        ${new Date(data["vps"]["since"] * 1000).toLocaleTimeString("pl-PL")}
                    </p>
                </div>`;

            if (data["node2"]["online"])
                star_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-success">
                            <i class="fas fa-check-square"></i>
                        </span>
                        <b>Star Pool</b>
                    </div>
                    <p class="block">
                        Operational since ` +
                new Date(data["node2"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                    </p>
                </div>`;
            else
                star_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        <b>Star Pool</b>
                    </div>
                    <p class="block has-text-weight-bold">
                        Possible problems with mining since ` +
                new Date(data["node2"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                        ${new Date(data["node2"]["since"] * 1000).toLocaleTimeString("pl-PL")}
                    </p>
                </div>`;

            if (data["node3"]["online"] === true)
                beyond_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-success">
                            <i class="fas fa-check-square"></i>
                        </span>
                        <b>Beyond Pool</b>
                    </div>
                    <p class="block">
                        Operational since ` +
                new Date(data["node3"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                    </p>
                </div>`;
            else
                beyond_status =
                `<div class="column">
                    <div class="icon-text">
                        <span class="icon has-text-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                        <b>Beyond Pool</b>
                    </div>
                    <p class="block has-text-weight-bold">
                        Possible problems with mining since ` +
                new Date(data["node3"]["since"] * 1000).toLocaleDateString("pl-PL") + `
                        ${new Date(data["node3"]["since"] * 1000).toLocaleTimeString("pl-PL")}
                    </p>
                </div>`;

            let final_html = api_status + vps_status + star_status + beyond_status;
            $("#server-status").html(final_html);
        })

    fetch('https://duco.sytes.net/ducorewards.json')
        .then(response => response.json())
        .then(data => {
            $("#avr_rewards").html(`~ ${Math.round(data.avr.dailycoins)} ᕲ daily`)
            $("#esp8266_rewards").html(`~ ${Math.round(data.esp8266.dailycoins)} ᕲ daily`)
            $("#esp32_rewards").html(`~ ${Math.round(data.esp32.dailycoins)} ᕲ daily`)
            $("#pc_rewards").html(`~ ${Math.round(data["pc/pi"].dailycoins*1.2)} ᕲ daily`)
        })

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

    const balance_chart = new Chart(
        document.getElementById('balance_chart'),
        config);

    function get_now() {
        const today = new Date();
        const time = today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
        return time;
    }

    function push_to_graph(balance) {
        timestamps.push(get_now());
        balances.push(balance);
        balance_chart.update();
    };

    function change_theme(e) {
        const radiate = $('#radiate');
        const frosted = $('#frosted');
        let theme = e.target.value;

        switch (theme) {
            case 'frosted':
                frosted.attr('disabled', false);
                radiate.attr('disabled', true);
                document.body.background = bg_list[num];
                setcookie("theme", 'frosted', 30);
                break;
            case 'radiance':
                radiate.attr('disabled', false);
                frosted.attr('disabled', true);
                document.body.background = "none";
                setcookie("theme", 'radiance', 30);
                break;
            case 'light':
                radiate.attr('disabled', true);
                frosted.attr('disabled', true);
                document.body.background = "none";
                setcookie("theme", 'light', 30);
                break;
        }
    }

    // PRICE FROM API
    const get_duco_price = () => {
        fetch("https://server.duinocoin.com/api.json")
            .then(response => response.json())
            .then(data => {
                $("#ducousd").html(" $" + round_to(5, data["Duco price"]));
                duco_price = round_to(5, data["Duco price"]);

                $("#ducousd_xmg").html("$" + round_to(5, data["Duco price XMG"]));
                $("#ducousd_bch").html("$" + round_to(5, data["Duco price BCH"]));
                $("#ducousd_trx").html("$" + round_to(5, data["Duco price TRX"]));
                $("#ducousd_nano").html("$" + round_to(5, data["Duco price NANO"]));

                $("#duco_nodes").html("$" + round_to(5, data["Duco Node-S price"]));
                $("#duco_justswap").html("$" + round_to(5, data["Duco JustSwap price"]));
                $("#duco_pancake").html("$" + round_to(5, data["Duco PancakeSwap price"]));
                $("#duco_sushi").html("$" + round_to(5, data["Duco SushiSwap price"]));
            })
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

    //USER DATA FROM API
    const user_data = (username, first_open) => {
        fetch(`https://server.duinocoin.com/users/${encodeURIComponent(username)}?limit=${transaction_limit}`)
            .then(response => response.json())
            .then(data => {
                data = data.result;
                balance = round_to(8, parseFloat(data.balance.balance));
                balanceusd = balance * duco_price;
                push_to_graph(balance);

                if (first_launch) {
                    push_to_graph(balance);
                    $("#balance").prop('Counter', 0).animate({
                        Counter: balance,
                    }, {
                        duration: 750,
                        easing: 'swing',
                        step: function(now) {
                            $("#balance").text(round_to(8, now));
                        }
                    });
                    first_launch = false;
                } else {
                    $("#balance").prop('Counter', oldb).animate({
                        Counter: balance,
                    }, {
                        duration: 750,
                        easing: 'swing',
                        step: function(now) {
                            $("#balance").text(round_to(8, now));
                        }
                    });
                }

                if (oldb != balance) {
                    calculdaily(balance, oldb);
                    oldb = balance;
                }

                balanceusd = round_to(4, balanceusd);
                if (first_open) $("#balanceusd").html("≈ $" + balanceusd);
                else update_element("balanceusd", "≈ $" + balanceusd);

                if (first_open) {
                    verified = data.balance.verified;
                    if (verified === "yes") {
                        $("#verify").html(
                            `<button disabled class="button mr-2 has-text-success-dark">
                                <i class="fa fa-check icon"></i>
                                <span id="verified">
                                    Your account is verified
                                </span>
                            </button>`);
                    } else {
                        $("#verify").html(
                            `<a href="https://server.duinocoin.com/verify.html" class="button mr-2 has-text-danger-dark" target="_blank">
                                <i class="fa fa-info-circle icon"></i>
                                <span id="verified">
                                    <b>Verify your account</b>
                                </span>
                            </a>`);
                    }
                }

                user_miners = data.miners;
                let miner_list = {
                    "AVR": [],
                    "ESP": [],
                    "PC": [],
                    "Other": []
                };
                let user_miners_html = "";
                let threaded_miners = {};

                if (user_miners.length) {
                    for (let miner in user_miners) {
                        let miner_wallet_id = user_miners[miner]["wd"];
                        if (!miner_wallet_id) miner_wallet_id = Math.random();
                        const miner_hashrate = user_miners[miner]["hashrate"];
                        const miner_rejected = user_miners[miner]["rejected"];
                        const miner_accepted = user_miners[miner]["accepted"];

                        if (!threaded_miners[miner_wallet_id]) {
                            threaded_miners[miner_wallet_id] = user_miners[miner];
                            threaded_miners[miner_wallet_id]["threads"] = 1;
                            continue;
                        } else if (threaded_miners[miner_wallet_id]) {
                            threaded_miners[miner_wallet_id]["hashrate"] += miner_hashrate;
                            threaded_miners[miner_wallet_id]["rejected"] += miner_rejected;
                            threaded_miners[miner_wallet_id]["accepted"] += miner_accepted;
                            threaded_miners[miner_wallet_id]["threads"] += 1;
                            continue;
                        }
                    }

                    for (let miner in threaded_miners) {
                        miner_hashrate = threaded_miners[miner]["hashrate"];
                        miner_identifier = threaded_miners[miner]["identifier"];
                        miner_software = threaded_miners[miner]["software"];
                        miner_diff = threaded_miners[miner]["diff"];
                        miner_rejected = threaded_miners[miner]["rejected"];
                        miner_accepted = threaded_miners[miner]["accepted"];
                        miner_sharetime = threaded_miners[miner]["sharetime"];
                        miner_pool = threaded_miners[miner]["pool"];
                        miner_algo = threaded_miners[miner]["algorithm"];
                        miner_count = threaded_miners[miner]["threads"];

                        if (miner_identifier === "None") {
                            miner_name = miner_software;
                            miner_soft = "";
                        } else {
                            miner_name = miner_identifier;
                            miner_soft = " &bull; " + miner_software;
                        }

                        let diffString = scientific_prefix(miner_diff)
                        let accepted_rate = round_to(1, (miner_accepted / (miner_accepted + miner_rejected) * 100))

                        let miner_type = "Other";
                        if (miner_software.includes("ESP8266")) {
                            icon = "fa-rss";
                            color = "#F5515F";
                            miner_type = "ESP";
                        } else if (miner_software.includes("ESP32")) {
                            icon = "fa-wifi";
                            color = "#5f27cd";
                            miner_type = "ESP";
                        } else if (miner_software.includes("AVR") || miner_software.includes("I2C")) {
                            icon = "fa-microchip";
                            color = "#B33771";
                            miner_type = "AVR";
                        } else if (miner_software.includes("PC")) {
                            icon = "fa-laptop";
                            color = "#F97F51";
                            miner_type = "PC";
                        } else if (miner_software.includes("Web")) {
                            icon = "fa-globe";
                            color = "#009432";
                            miner_type = "PC";
                        } else if (miner_software.includes("Android")) {
                            icon = "fa-mobile";
                            color = "#fa983a";
                        } else {
                            icon = "fa-question-circle";
                            color = "#16a085";
                        }

                        let accept_color = "has-text-warning-dark";
                        if (accepted_rate < 50) {
                            accept_color = "has-text-danger-dark";
                        } else if (accepted_rate > 95) {
                            accept_color = "has-text-success-dark";
                        }

                        let thread_string = "";
                        if (miner_count > 1) {
                            thread_string = `(${miner_count} threads)`;
                        }

                        miner_list[miner_type].push(`
                            <div class="column" style="min-width:50%">
                                <p class="title is-size-6">
                                    <i class="fas ${icon} fa-fw" style="color: ${color}"></i>
                                    <span class="has-text-weight-normal">
                                         ${miner_name}
                                    </span>
                                    <span class="has-text-weight-normal">
                                        &bull;
                                    </span>
                                    <span>
                                        ${scientific_prefix(miner_hashrate)}H/s
                                    </span>
                                    <span class="has-text-weight-normal">
                                        &bull;
                                    </span>
                                    <b class="${accept_color}">
                                        ${accepted_rate}%
                                    </b>
                                    <span class="has-text-weight-normal">
                                        correct shares
                                    </span>
                                    <span class="has-text-info-dark">
                                        ${thread_string}
                                    </span>
                                </p>
                                <p class="subtitle is-size-7">
                                    <b>
                                        ${miner_accepted}/${(miner_accepted + miner_rejected)}
                                    </b>
                                    total shares
                                    &bull; difficulty 
                                    <b>
                                        ${diffString}
                                    </b>
                                    (${miner_sharetime.toFixed(2)}s)
                                    &bull; node:
                                    <span class="has-text-info-dark">
                                        ${miner_pool}
                                    </span>
                                    &bull; algo:
                                    <span class="has-text-warning-dark">
                                        ${miner_algo}
                                    </span>
                                    <span>
                                        ${miner_soft}
                                    </span>
                                </p>
                            </div>`);
                        total_hashrate += miner_hashrate;
                    }

                    all_miners = 0
                    for (key in miner_list) {
                        if (miner_list[key].length) {
                            user_miners_html += `<div class="divider column is-full">${key} (${miner_list[key].length})</div>`;
                            for (worker in miner_list[key]) {
                                user_miners_html += miner_list[key][worker];
                            }
                            all_miners += miner_list[key].length
                        }
                    }

                    if (first_open) $("#minercount").html(`(${all_miners})`);
                    else update_element("minercount", `(${all_miners})`);

                    if (all_miners > 50 && !notify_shown) {
                        miner_notify();
                        notify_shown = true;
                    }

                    if (first_open) $("#total_hashrate").html(scientific_prefix(total_hashrate) + "H/s");
                    else update_element("total_hashrate", scientific_prefix(total_hashrate) + "H/s");

                    $("#miners").html(user_miners_html);
                    total_hashrate = 0;
                } else {
                    if (first_open) {
                        $("#miners").html(`
                               <div class="column is-full">
                                   <p class='title is-size-6'>
                                       No miners detected
                                   </p>
                                   <p class='subtitle is-size-6'>
                                       If you have turned them on recently, 
                                       it will take a minute or two until their stats will appear here.
                                   </p>
                               </div>`);

                    } else {
                        update_element("miners", `
                               <div class="column is-full">
                                   <p class='title is-size-6'>
                                       No miners detected
                                   </p>
                                   <p class='subtitle is-size-6'>
                                       If you have turned them on recently, 
                                       it will take a minute or two until their stats will appear here.
                                   </p>
                               </div>`);
                    }
                }

                user_transactions = data.transactions.reverse();
                if (user_transactions.length > 0) {
                    transactions_html = "";
                    for (let i in user_transactions) {
                        transaction_date = user_transactions[i]["datetime"];
                        transaction_amount = round_to(8, parseFloat(user_transactions[i]["amount"]));
                        transaction_hash_full = user_transactions[i]["hash"];
                        transaction_hash = transaction_hash_full.substr(transaction_hash_full.length - 8);
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
                                    <span>
                                        Sent
                                        ` + transaction_amount + `
                                        DUCO
                                    </span>
                                    <span>
                                        to
                                    </span>
                                    <a href="https://explorer.duinocoin.com/?search=` +
                                transaction_recipient + `" target="_blank">
                                        ` + transaction_recipient + `
                                    </a>
                                    <span class="has-text-weight-normal">
                                        ` + transaction_memo + `
                                    </span>
                                </p>
                                <p class="subtitle is-size-7">
                                    <span>
                                        ` + transaction_date + `
                                    </span>
                                    <a href="https://explorer.duinocoin.com/?search=` +
                                transaction_hash_full + `" target="_blank">
                                        (` + transaction_hash + `)
                                    </a>
                                </p>
                            </div>`;
                            transactions_html += thtml;
                        } else {
                            thtml = `
                            <div class="column is-full">
                                <p class="title is-size-6">
                                    <i class="fa fa-arrow-left fa-fw has-text-success"></i>
                                    <span>
                                        Received
                                        ` + transaction_amount + `
                                        DUCO
                                    </span>
                                    <span>
                                        from
                                    </span>
                                    <a href="https://explorer.duinocoin.com/?search=` +
                                transaction_sender + `" target="_blank">
                                        ` + transaction_sender + `
                                    </a>
                                    <span class="has-text-weight-normal">
                                        ` + transaction_memo + `
                                    </span>
                                </p>
                                <p class="subtitle is-size-7">
                                    <span>
                                        ` + transaction_date + `
                                    </span>
                                    <a href="https://explorer.duinocoin.com/?search=` +
                                transaction_hash_full + `" target="_blank">
                                        (` + transaction_hash + `)
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
                if (update_element("transactioncount", user_transactions.length)) {
                    document.getElementById('txsel').classList.remove("is-loading");
                }
            });
    }

    // ENTER KEY AS LOGIN
    let input_login = document.getElementById("login");
    input_login.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("loginbutton").click();
        }
    });

    // LOGOUT
    document.getElementById('logout').onclick = function() {
        delcookie("username");
        delcookie("password");
        window.location.reload(true);
    }

    // MAIN WALLET SCRIPT
    document.getElementById('loginbutton').onclick = function() {
        username = $('#usernameinput').val()
        //trim the username field to remove extra spaces
        username = username.replace(/^[ ]+|[ ]+$/g,'')
        password = $('#passwordinput').val()

        if (username && password) {
            document.getElementById('loginbutton').classList.add("is-loading")

            document.getElementById('send_button').onclick = function() {
                let modal_success = document.querySelector('#modal_send');
                document.querySelector('html').classList.add('is-clipped');
                modal_success.classList.add('is-active');
                document.querySelector('#modal_send .delete').onclick = function() {
                    document.querySelector('html').classList.remove('is-clipped');
                    modal_success.classList.remove('is-active');
                }
            }

            document.getElementById('send_confirm').onclick = function() {
                let recipient = document.getElementById('recipientinput').value
                let amount = document.getElementById('amountinput').value
                let memo = document.getElementById('memoinput').value

                if (recipient && amount) {
                    document.getElementById("send_confirm").classList.add("is-loading");
                    $.getJSON('https://server.duinocoin.com/transaction/' +
                        '?username=' + username +
                        "&password=" + encodeURIComponent(password) +
                        "&recipient=" + recipient +
                        "&amount=" + amount +
                        "&memo=" + memo,
                        function(data) {
                            $('#recipientinput').val('');
                            $('#amountinput').val('');
                            $('#memoinput').val('');
                            if (data.success == true) {
                                serverMessage = data["result"].split(",");
                                if (serverMessage[0] == "OK") {
                                    let modal_send = document.querySelector('#modal_send');
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

                                    document.querySelector('#modal_success .delete').onclick = function() {
                                        document.querySelector('html').classList.remove('is-clipped');
                                        modal_success.classList.remove('is-active');
                                    }
                                    document.getElementById("send_confirm").classList.remove("is-loading");
                                }

                            } else {
                                serverMessage = data["message"].split(",");

                                let modal_send = document.querySelector('#modal_send');
                                document.querySelector('html').classList.remove('is-clipped');
                                modal_send.classList.remove('is-active');

                                let modal_error = document.querySelector('#modal_error');
                                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                    `<b>An error has occurred while sending funds: </b>` + serverMessage[1] + `</b><br></p>`;
                                document.querySelector('html').classList.add('is-clipped');
                                modal_error.classList.add('is-active');

                                document.querySelector('#modal_error .delete').onclick = function() {
                                    document.querySelector('html').classList.remove('is-clipped');
                                    modal_error.classList.remove('is-active');
                                }
                                document.getElementById("send_confirm").classList.remove("is-loading");
                            }
                        })
                }
            }

            $.getJSON('https://server.duinocoin.com/auth/' +
                encodeURIComponent(username) +
                '?password=' +
                encodeURIComponent(password),
                function(data) {
                    if (data.success == true) {
                        if ($('#remember').is(":checked")) {
                            setcookie("password", encodeURIComponent(password), 30);
                            setcookie("username", encodeURIComponent(username), 30);
                        }
                        $("#login").fadeOut(250, function() {
                            document.getElementById('loginbutton').classList.remove("is-loading")
                            $("#user").html("<b>" + username + "</b>");
                            user_data(username, true);
                            window.setInterval(() => {
                                user_data(username, false);
                            }, 10 * 1000);

                            get_duco_price();
                            window.setInterval(() => {
                                get_duco_price();
                            }, 30 * 1000);

                            $("#wallet").fadeIn(250);

                            $("iframe#news_iframe").attr('src', 'https://server.duinocoin.com/news.html');

                            if (adBlockEnabled) {
                                $("#adblocker_detected").show()
                            } else {
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            }

                            // THEME SWITCHER
                            let themesel = document.getElementById('themesel');
                            themesel.addEventListener('input', change_theme);

                            document.getElementById('changepassbtn').onclick = function() {
                                let modal_success = document.querySelector('#modal_changepass');
                                document.querySelector('html').classList.add('is-clipped');
                                modal_success.classList.add('is-active');
                                document.querySelector('#modal_changepass .delete').onclick = function() {
                                    document.querySelector('html').classList.remove('is-clipped');
                                    modal_success.classList.remove('is-active');
                                }
                            }

                            document.getElementById('changepassconf').onclick = function() {
                                changepass(username);
                            }

                            function changepass(username) {
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

                            document.getElementById('wrapbtn').onclick = function() {
                                let modal_success = document.querySelector('#modal_wrap');
                                document.querySelector('html').classList.add('is-clipped');
                                modal_success.classList.add('is-active');
                                document.querySelector('#modal_wrap .delete').onclick = function() {
                                    document.querySelector('html').classList.remove('is-clipped');
                                    modal_success.classList.remove('is-active');
                                }
                            }

                            document.getElementById('wrapconf').onclick = function() {
                                wrap(username, password);
                            }

                            function wrap(username, password) {
                                amount = document.getElementById("wrap_amount").value;
                                address = document.getElementById("wrap_address").value;

                                fetch("https://server.duinocoin.com/wduco_wrap/" + encodeURIComponent(username) +
                                        "?password=" + encodeURIComponent(password) +
                                        "&address=" + encodeURIComponent(address) +
                                        "&amount=" + encodeURIComponent(amount))
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            update_element("wrap_text", "<span class='has-text-success-dark'>" + data.result + "</span>");
                                            $('#wrap_amount').val('');
                                            $('#wrap_address').val('');
                                        } else {
                                            update_element("wrap_text", "<span class='has-text-danger-dark'>" + data.message + "</span>");
                                        }
                                    });
                            }

                        });
                    } else {
                        window.setTimeout(() => {
                            $('#usernameinput').val('');
                            $('#passwordinput').val('');

                            let modal_error = document.querySelector('#modal_error');
                            document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                `<b>An error has occurred while logging in: </b>` + data.message + `</b><br></p>`;
                            document.querySelector('html').classList.add('is-clipped');
                            modal_error.classList.add('is-active');

                            document.querySelector('#modal_error .delete').onclick = function() {
                                document.querySelector('html').classList.remove('is-clipped');
                                modal_error.classList.remove('is-active');
                            }
                            document.getElementById('loginbutton').classList.remove("is-loading")
                        }, 150);
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                update_element("logintext", "Wallet API is unreachable");
                document.getElementById('loginbutton').classList.remove("is-loading")
                setTimeout(() => {
                    update_element("logintext", "");
                }, 5000);
            })
        }
    }
    if (getcookie("theme")) {
        cookie = getcookie("theme");
        $("#themesel").val(cookie);
        change_theme({ "target": { "value": cookie } });
    }

    if (getcookie("password") && getcookie("username")) {
        $('#usernameinput').val(getcookie("username"));
        $('#passwordinput').val(getcookie("password"));
        $('#loginbutton').click();
    }

    $("#loader-wrapper").fadeOut(); // After page is loaded
});
