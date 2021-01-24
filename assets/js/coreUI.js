function init() {
  setTimeout(
    console.log.bind(console, "%cWarning", "color: red; font-size: 64px")
  );
  
  setTimeout(
    console.log.bind(
      console,
      "%cDo not paste anything on this console unless you know what you are doing, otherwise, without knowing what you are doing, your money or even personal data can be stolen!",
      "font-size: large"
    )
  );

  const DEBUG = false; // set true to print data to console

  //  If not debug mode disable console functions

  if (!DEBUG) {
    if (!window.console) window.console = {};
    var methods = ["log", "debug", "warn", "info"];
    for (var i = 0; i < methods.length; i++) {
      console[methods[i]] = function () {};
    }
  }

  const loginpage = document.getElementsByClassName("login")[0],
    walletpage = document.getElementsByClassName("wallet")[0],
    status = document.getElementById("status"),
    loginstatus = document.getElementById("loginstatus"),
    navname = document.getElementById("navbar-name"),
    miners = document.getElementsByClassName("bash")[0],
    login = document.querySelector("#login"),
    loginInput = document.querySelector("#loginInput"),
    send = document.querySelector("#send"),
    ws = new WebSocket("ws://51.15.127.80:15808");

  if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ // if is a phone
    var centers = document.querySelectorAll(".center"); // removes center
    [].forEach.call(centers, function(el) {
      el.classList.remove("center");
    });

    var columns = document.querySelectorAll(".col-sm-4"); // changes columns size
    [].forEach.call(columns, function(el) {
      el.classList.remove("col-sm-4");
      el.classList.add("col-sm-3");
    });

    var minerC = document.querySelector(".col-sm-5");
    minerC.classList.remove("col-sm-5");
    minerC.classList.add("col-sm-4");

    document.getElementsByClassName("footer")[0].innerHTML = `Duino-Coin WebWallet made with<br/>
          <i class="fas fa-coffee"></i>, <i class="fas fa-code"></i> and <i class="fas fa-heart"></i> by revox 2020<br/>
          Background photo from pexels.com <br/>Edit made by LDarki 2021>`;
  }

  if(/iPad/i.test(navigator.userAgent)){ // if is a iPad
    var centers = document.querySelectorAll(".center"); // removes center
    [].forEach.call(centers, function(el) {
      el.classList.remove("center");
    });

    var minerC = document.querySelector(".col-sm-5");
    minerC.classList.remove("col-sm-5");
    minerC.classList.add("col-sm-7");

    var columns = document.querySelectorAll(".col-sm-3"); // changes columns size
    [].forEach.call(columns, function(el) {
      el.classList.remove("col-sm-3");
      el.classList.add("col-sm-6");
    });

    var columns = document.querySelectorAll(".col-sm-4"); // changes columns size
    [].forEach.call(columns, function(el) {
      el.classList.remove("col-sm-4");
      el.classList.add("col-sm-6");
    });

    document.getElementsByClassName("footer")[0].innerHTML = `Duino-Coin WebWallet made with>
          <i class="fas fa-coffee"></i>, <i class="fas fa-code"></i> and <i class="fas fa-heart"></i> by revox 2020<br/>
          Background photo from pexels.com Edit made by LDarki 2021`;
  }

  let message,
    version_received = 0,
    sendinfo,
    ducoprice,
    oldbalance = 0,
    curr_bal = 0,
    profitcheck = 0;

  n = new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();
  document.getElementById("date").innerHTML =
    "<img height='16em' width='16em' src='https://github.com/revoxhere/duino-coin/blob/master/Resources/NewWallet.ico?raw=true'>&nbsp;DUCO WebWallet (v1.9) " +
    d +
    "/" +
    m +
    "/" +
    y;

  // Get duco coin price

  getJSON(
    "https://raw.githubusercontent.com/revoxhere/duco-statistics/master/api.json"
  ).then((data) => {
    ducoprice = `${data["Duco price"]}`;
    var cutducoprice = 1 * ducoprice;
    cutducoprice = cutducoprice.toFixed(6);
    document.getElementById("ducoprice").innerHTML = cutducoprice + " $";
    console.log(data);
  });

  function MinerApi(username) {
    let myMiners = [];
    let contentjson = {};
    getJSON(
      "https://raw.githubusercontent.com/revoxhere/duco-statistics/master/api.json"
    ).then((data) => {
      contentjson = data;
      for (process in contentjson["Miners"]) {
        if (username.includes(contentjson["Miners"][process]["User"])) {
          myMiners.push(contentjson["Miners"][process]);
        }
      }
      miners.innerHTML = "";
      for (miner in myMiners) {
        let IsEstimated = "";
        if (myMiners[miner]["Is estimated"] == "True") {
          IsEstimated = " (Estimated)";
        }
        miners.innerHTML +=
          "<li>Miner #" +
          miner +
          " (" +
          myMiners[miner]["Software"] +
          ") " +
          Math.round(myMiners[miner]["Hashrate"] / 1000) +
          " kH/s" +
          IsEstimated +
          " @ diff " +
          myMiners[miner]["Diff"] +
          ", " +
          myMiners[miner]["Accepted"] +
          "/" +
          (myMiners[miner]["Accepted"] + myMiners[miner]["Rejected"]) +
          " (" +
          Math.round(
            (myMiners[miner]["Accepted"] /
              (myMiners[miner]["Accepted"] + myMiners[miner]["Rejected"])) *
              100
          ) +
          "%)" +
          " accepted shares (" +
          myMiners[miner]["Sharetime"] +
          "ms last share time)</li>";
      }
    });
  }

  function ProfitCalculator() {
    let prev_bal = curr_bal;
    curr_bal = balance;
    let tensec = curr_bal - prev_bal;
    let minute = tensec * 6;
    let hourly = minute * 60;
    let daily = hourly * 12;
    profitcheck++;

    if (tensec > 0 && profitcheck > 1) {
      profit_array = [minute, hourly, daily];
      document.getElementById("profitlabel").innerHTML =
        "~" + daily.toFixed(4) + " ᕲ/24h";
    }
  }

  ws.onerror = function () {
    loginstatus.innerHTML = "Proxy server failed to connect";
    status.classList.remove("idle");
    status.classList.add("error");
  };

  ws.onmessage = function (event) {
    let server_message = event.data;
    console.log("Server: " + server_message);

    if (version_received == 0 && server_message.includes("1.")) {
      loginstatus.innerHTML = "Proxy server is online";
      status.classList.remove("idle");
      status.classList.add("connected");
      version_received = 1;
    } else if (server_message == "OK") {
      loginstatus.innerHTML = "Logged-in successfully!";

      var username = document.getElementById("username").value;

      navname.innerHTML = username;

      fadeOut(loginpage);
      fadeIn(walletpage);

      window.setInterval(function () {
        MinerApi(username);
      }, 3500);

      window.setInterval(function () {
        ProfitCalculator();
      }, 10000);
    } else if (server_message.includes("NO")) {
      document.getElementById("error").classList.remove("hide");
    } else if (
      version_received == 1 &&
      server_message.includes(".") &&
      !isNaN(server_message) &&
      server_message.toString().indexOf(".") != -1
    ) {
      balanceusd = ducoprice * server_message;
      balanceusd = balanceusd.toFixed(6);

      balance = server_message * 1;
      cutbalance = balance.toFixed(6);

      difference = balance - oldbalance;
      difference = difference.toFixed(6);

      if (difference != 0) {
        oldbalance = cutbalance;
        var today = new Date();
        var time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        document.getElementById("lasttransaction").innerHTML =
          time + " : " + difference + " ᕲ";
      }

      document.getElementById("balancetext").innerHTML = cutbalance + " ᕲ";
      document.getElementById("usdbalancetext").innerHTML = "$" + balanceusd;
    } else if (sendinfo == 1) {
      document.getElementById("sendstatus").innerHTML =
        "Server message: " + server_message;
      sendinfo = 0;
    }
  };

  document.getElementsByClassName("alertC")[0].onclick = function (event) {
    document.getElementById("notificate").classList.add("hide");
  };

  login.onclick = function (event) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    ws.send("LOGI," + username + "," + password);
    window.setInterval(function () {
      ws.send("BALA");
    }, 750);
  };

  send.onclick = function (event) {
    var recipient = document.getElementById("recipient").value;
    var amount = document.getElementById("amountInput").value;
    ws.send("SEND,-," + recipient + "," + amount);
    sendinfo = 1;
    document.getElementById("notificate").classList.remove("hide");
  };
};

if (document.addEventListener) { 
  document.addEventListener("DOMContentLoaded", init, false);
}
else if (/WebKit/i.test(navigator.userAgent)) { 
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      init(); 
    }
  }, 10);
}
else window.onload = init;