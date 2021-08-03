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
let first_launch = true;

window.addEventListener('load', function() {
    // CONSOLE WARNING
    console.log("%cCaution!", "color: red; font-size: 10em");
    console.log(`%cThis browser feature is intended for developers. 
    If someone instructed you to copy and paste something here to enable some feature or to "hack" someone's account, 
    it is a fraud. If you do, this person will be able to access your account.`, "font-size: 1.5em;");

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

    const data = {
        labels: timestamps,
        datasets: [{
            data: balances,
        }]
    };

    const config = {
        options: {
            backgroundColor: '#ff9770',
            borderColor: '#ff9770',
            plugins: {
                legend: {
                    display: false
                }
            }
        },
        type: 'line',
        data
    };

    const balance_chart = new Chart(
        document.getElementById('balance_chart'),
        config
    );

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
                duco_price = round_to(5, data["Duco price"]);

                update_element("ducousd", "≈ $" + duco_price);
                update_element("ducousd_bch", "≈ $" + round_to(5, data["Duco price BCH"]));
                update_element("ducousd_trx", "≈ $" + round_to(5, data["Duco price TRX"]));

                update_element("ducousd_xrp", "≈ $" + round_to(5, data["Duco price XRP"]));
                update_element("ducousd_dgb", "≈ $" + round_to(5, data["Duco price DGB"]));
                //update_element("ducousd_nano", "≈ $" + round_to(5, data["Duco price NANO"]));

                update_element("duco_nodes", "≈ $" + round_to(5, data["Duco Node-S price"]));

                update_element("duco_justswap", "≈ $" + round_to(5, data["Duco JustSwap price"]));

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

    //USER DATA FROM API
    const user_data = (username) => {
        $.getJSON('https://server.duinocoin.com/users/' + username, function(data) {
            data = data.result;
            balance = parseFloat(data.balance.balance);
            let balanceusd = balance * duco_price;
            console.log("Balance received: " + balance + " ($" + balanceusd + ")");

            if (first_launch) {
                push_to_graph(balance);
                first_launch = false;
            }
            push_to_graph(balance);

            if (oldb != balance) {
                calculdaily(balance, oldb)
                oldb = balance;
            }

            balance = round_to(8, balance);
            update_element("balance", balance + " DUCO");

            balanceusd = round_to(4, balanceusd);
            update_element("balanceusd", "≈ $" + balanceusd);

            user_miners = data.miners;
            console.log(user_miners)
            console.log("Miner data received " + user_miners.length);

            if (user_miners.length > 0) {
                let user_miners_html = '';
                let miner_name = '';
                let diffString = '';

                for (let miner in user_miners) {
                    miner_hashrate = user_miners[miner]["hashrate"];
                    miner_identifier = user_miners[miner]["identifier"];
                    miner_software = user_miners[miner]["software"];
                    miner_diff = user_miners[miner]["diff"];
                    miner_rejected = user_miners[miner]["rejected"];
                    miner_accepted = user_miners[miner]["accepted"];
                    miner_sharetime = user_miners[miner]["sharetime"];

                    if (miner_identifier === "None")
                        miner_name = miner_software;
                    else
                        miner_name = miner_identifier +
                        "<span class='has-text-grey'> (" +
                        miner_software +
                        ")</span>";

                    diffString = scientific_prefix(miner_diff)
                    accepted_rate = round_to(1, (miner_accepted / (miner_accepted + miner_rejected) * 100)) + "%"

                    user_miners_html += `
                            <div class="column is-full">
                                <p class="title is-size-6">
                                    <i class="fas fa-spin fa-cog fa-fw"></i>
                                    <span class="has-text-primary">
                                        ` + miner_name + `
                                    </span>
                                    -
                                    <span>
                                        ` + scientific_prefix(miner_hashrate) + `H/s
                                    </span>
                                    <span class="has-text-grey">
                                        (` + miner_sharetime.toFixed(2) + `s)
                                    </span>
                                </p>
                                <p class="subtitle is-size-7">
                                    <b>` + miner_accepted + "/" + (miner_accepted + miner_rejected) + `
                                        <span class="has-text-success-dark">
                                            (` + accepted_rate + `)
                                        </span>
                                    </b> accepted shares,
                                    difficulty <b>` + diffString + `</b>
                                </p>
                            </div>`;

                    total_hashrate += miner_hashrate;
                }
                update_element("minercount", "(" + user_miners.length + ")");
                update_element("miners", user_miners_html);
                update_element("total_hashrate", "Total hashrate: " + scientific_prefix(total_hashrate) + "H/s");
                total_hashrate = 0;
            } else {
                update_element("miners", `
                    <div class="column is-full">
                        <p class='title is-size-6'>
                            No miners detected
                        </p>
                        <p class='subtitle is-size-6 has-text-grey'>
                            If you have turned them on recently, 
                            it will take a minute or two until their stats will appear here.
                        </p>
                    </div>`);
            }

            user_transactions = data.transactions.reverse();
            console.log("Transaction list received " + user_transactions.length);

            let transactions_table = document.getElementById("transactions_table");
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

                    if (transaction_memo == "None") transaction_memo = "";
                    else transaction_memo = "\"" + transaction_memo + "\""

                    if (transaction_sender == username) {
                        thtml = `
                            <div class="column is-full">
                                <p class="title is-size-6">
                                    <i class="fa fa-arrow-right fa-fw"></i>
                                    <span class="has-text-danger">
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
                                    <span class="has-text-grey">
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
                                    <i class="fa fa-arrow-left fa-fw"></i>
                                    <span class="has-text-success-dark">
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
                                    <span class="has-text-grey">
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
                transactions_table.innerHTML = transactions_html;
            } else transactions_table.innerHTML = `<div class="column is-full">
                    <p class="title is-size-6">
                        No transactions yet or they're temporarily unavailable
                    </p>
                </div>`;
        });
    }


    function round_to(precision, value) {
        power_of_ten = 10 ** precision;
        return Math.round(value * power_of_ten) / power_of_ten;
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
            daily = round_to(2, daily)
            update_element("estimatedprofit", `
                <i class="far fa-star"></i>
                Earning about <b>` + daily + ` ᕲ</b> daily`);

            avgusd = round_to(2, daily * duco_price);
            update_element("estimatedprofitusd", "(≈ $" + avgusd + ")");
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
        let username = document.getElementById('usernameinput').value
        let password = document.getElementById('passwordinput').value

        if (username && password) {

            $("#logincheck").fadeOut('fast', function() {
                $("#loginload").fadeIn('fast');
            });

            document.getElementById('send').onclick = function() {
                let recipient = document.getElementById('recipientinput').value
                let amount = document.getElementById('amountinput').value
                let memo = document.getElementById('memoinput').value

                update_element("sendinginfo", "Requesting transfer...")
                document.getElementById("send").classList.add("is-loading");

                if (recipient && amount) {
                    update_element("sendinginfo", "Requesting transaction...");
                    $.getJSON('https://server.duinocoin.com/transaction/' +
                        '?username=' + username +
                        "&password=" + encodeURIComponent(password) +
                        "&recipient=" + recipient +
                        "&amount=" + amount +
                        "&memo=" + memo,
                        function(data) {
                            console.log(data);
                            if (data.success == true) {
                                serverMessage = data["result"].split(",");
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
                                    document.getElementById("send").classList.remove("is-loading");
                                    update_element("sendinginfo", "");
                                }

                            } else {
                                serverMessage = data["message"].split(",");
                                let modal_error = document.querySelector('#modal_error');
                                document.querySelector('#modal_error .modal-card-body .content p').innerHTML =
                                    `<b>An error has occurred while sending funds: </b>` + serverMessage[1] + `</b><br></p>`;
                                document.querySelector('html').classList.add('is-clipped');
                                modal_error.classList.add('is-active');

                                document.querySelector('#modal_error .delete').onclick = function() {
                                    document.querySelector('html').classList.remove('is-clipped');
                                    modal_error.classList.remove('is-active');
                                }
                                document.getElementById("send").classList.remove("is-loading");
                                update_element("sendinginfo", "");
                            }
                        })
                } else {
                    update_element("sendinginfo",
                        "<span class='subtitle is-size-6 mb-2 has-text-danger'><b>Fill in the blanks first</b></span>");
                    document.getElementById("send").classList.remove("is-loading");

                    setTimeout(() => {
                        update_element("sendinginfo", "");
                    }, 5000);
                }
            }

            update_element("logintext", "Authenticating...");
            $.getJSON('https://server.duinocoin.com/auth/?username=' +
                username +
                "&password=" +
                encodeURIComponent(password),
                function(data) {
                    if (data.success == true) {
                        console.log("User logged-in");

                        $("#login").hide('fast', function() {
                            $("#user").html("<b>" + username.toUpperCase() + "'S</b>");
                            user_data(username);
                            window.setInterval(() => {
                                user_data(username);
                            }, 10 * 1000);

                            get_duco_price();
                            window.setInterval(() => {
                                get_duco_price();
                            }, 30 * 1000);


                            window.setTimeout(() => {
                                $('iframe#news_iframe').attr('src', 'https://server.duinocoin.com/news.html');
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            }, 1000);
                            $("#wallet").show('slow');

                            // THEME SWITCHER
                            let themesel = document.getElementById('themesel');
                            themesel.addEventListener('input', updateValue);
                        });
                    } else {
                        update_element("logintext", data.message);
                        $("#loginload").fadeOut('fast');

                        setTimeout(() => {
                            update_element("logintext", "Login");
                            $("#logincheck").fadeIn('fast', function() {
                                $("#loginload").fadeOut('fast');
                            });
                        }, 5000);
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                update_element("logintext", "Incorrect password");
                $("#loginload").fadeOut('fast');

                setTimeout(() => {
                    update_element("logintext", "Login");
                    $("#logincheck").fadeIn('fast', function() {
                        $("#loginload").fadeOut('fast');
                    });
                }, 5000);
            })
        } else {
            update_element("logintext", "Fill in the blanks first");

            setTimeout(() => {
                update_element("logintext", "Login");
            }, 5000);
        }

    }

    document.getElementById("pageloader").setAttribute('class', "pageloader is-primary"); // After page is loaded
});