const init = () => {
  setTimeout(() => {
    console.log.bind(console, "%cWarning", "color: red; font-size: 64px");
    console.log.bind(
      console,
      "%cDo not paste anything on this console unless you know what you are doing, otherwise, without knowing what you are doing, your money or even personal data can be stolen!",
      "font-size: large"
    );
  });

  const DEBUG = false; // set true to print data to console

  //  If not debug mode disable console functions

  if (!DEBUG) {
    if (!window.console) window.console = {};
    let methods = ["log", "debug", "warn", "info"];
    for (let i in methods) {
      console[methods[i]] = () => {};
    }
  }

  const loginpage = document.getElementsByClassName("login")[0],
    walletpage = document.getElementsByClassName("wallet")[0],
    status = document.getElementById("status"),
    loginstatus = document.getElementById("loginstatus"),
    navname = document.getElementById("navbar-name"),
    miners = document.getElementsByClassName("bash")[0],
    login = document.querySelector("#login"),
    send = document.querySelector("#send"),
    minerHashrate = document.getElementById("minerHR"),
    loader = document.getElementById("loader");
    ws = new WebSocket("ws://51.15.127.80:15808");

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ // if is a phone

    let centers = document.querySelectorAll(".center"); // removes center
    [].forEach.call(centers, (el) => {
      if(!/iPad/.test(navigator.userAgent)) el.classList.remove("center");
    });

    document.getElementsByClassName("footer")[0].innerHTML = `Duino-Coin WebWallet made with
          <i class="fas fa-coffee"></i>, <i class="fas fa-code"></i> and <i class="fas fa-heart"></i> by revox 2020<br/>
          Background photo from pexels.com Edit made by LDarki 2021`;
  }

  let version_received = 0,
    sendinfo,
    ducoprice,
    oldbalance = 0,
    curr_bal = 0,
    profitcheck = 0,
    balance = 0,
    totalHashes = 0;

  n = new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();
  document.getElementById("date").innerHTML =
    "<img height='16em' width='16em' src='https://github.com/revoxhere/duino-coin/blob/master/Resources/NewWallet.ico?raw=true'>&nbsp;DUCO WebWallet (v2.0) " +
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
    let cutducoprice = 1 * ducoprice;
    cutducoprice = cutducoprice.toFixed(6);
    document.getElementById("ducoprice").innerHTML = cutducoprice + " $";
    console.log(data);
  });

  const calculateHashrate = (hashes) => {
    hashes = parseFloat(hashes);
    let hashrate = hashes.toFixed(2) + " h/s";

    if (hashes / 1000 > 0.5) hashrate = (hashes / 1000).toFixed(2) + " Kh/s";
    if (hashes / 1000000 > 0.5) hashrate = (hashes / 1000000).toFixed(2) + " Mh/s";
    if (hashes / 1000000000 > 0.5) hashrate = (hashes / 1000000000).toFixed(2) + " Gh/s";

    return hashrate;
  };

  const MinerApi = (username) => {
    let myMiners = [];
    let contentjson = {};
    getJSON(
      "https://raw.githubusercontent.com/revoxhere/duco-statistics/master/api.json"
    ).then((data) => {
      contentjson = data;
      for (process in contentjson["Miners"]) {
        if (contentjson["Miners"][process]["User"].includes(username)) {
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
          calculateHashrate(myMiners[miner]["Hashrate"]) +
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

          totalHashes = totalHashes + myMiners[miner]["Hashrate"];
      }
    });
    minerHashrate.innerHTML = "⚡ Hashrate: ~" + calculateHashrate(totalHashes);
    totalHashes = 0;
  }

  const ProfitCalculator = () => {
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

  ws.onerror = () => {
    loginstatus.innerHTML = "Proxy server failed to connect";
    status.classList.remove("idle");
    status.classList.add("error");
  };

  ws.onmessage = (event) => {
    let server_message = event.data;
    console.log("Server: " + server_message);

    if (version_received == 0 && server_message.includes("2.")) {
      loginstatus.innerHTML = "Proxy server is online";
      status.classList.remove("idle");
      status.classList.add("connected");
      version_received = 1;
    } else if (server_message == "OK") {
      loginstatus.innerHTML = "Logged-in successfully!";

      let username = document.getElementById("username").value;

      navname.innerHTML = username;

      window.setInterval(() => {
        loader.style.display = "none";
        loader.style.opacity = "0";

        walletpage.style.display = "block";
        walletpage.style.opacity = "1";
      }, 500);

      window.setInterval(() => {
        MinerApi(username);
      }, 3500);

      window.setInterval(() => {
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
        let today = new Date();
        let time =
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

  document.getElementsByClassName("alertC")[0].onclick = (event) => {
    document.getElementById("notificate").classList.add("hide");
  };

  login.onclick = (event) => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    loginpage.style.display = "none";
    loginpage.style.opacity = "0";

    loader.style.display = "block";
    loader.style.opacity = "1";

    ws.send("LOGI," + username + "," + password);
    window.setInterval(() => {
      if(isWSOpen(ws)) ws.send("BALA");
    }, 750);
  };

  send.onclick = (event) => {
    let recipient = document.getElementById("recipient").value;
    let amount = document.getElementById("amountInput").value;
    ws.send("SEND,-," + recipient + "," + amount);
    sendinfo = 1;
    document.getElementById("notificate").classList.remove("hide");
  };

  document.getElementsByClassName("login-container")[0].addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      login.click();
    }
  });

  // Modal Functions

    const trigger = document.querySelector('.modal_trigger');
    const modal = document.querySelector('.modal');
    const modalbg = document.querySelector('.modal_bg');
    const content = document.querySelector('.modal_content');
    const closer = document.querySelector('.modal_close');
    const w = window;
    let isOpen = false;
    const contentDelay = 100;
    const len = trigger.length;
  
    var getId = function(event) {
      event.preventDefault();
      var self = this;
      makeDiv(self, modal);
    };
  
    var makeDiv = function(self, modal) {
      var fakediv = document.getElementById('modal_temp');
      if (fakediv === null) {
        var div = document.createElement('div');
        div.id = 'modal_temp';
        self.appendChild(div);
        moveTrig(self, modal, div);
      }
    };
  
    var moveTrig = function(trig, modal, div) {
      var trigProps = trig.getBoundingClientRect();
      var m = modal;
      var mProps = m.querySelector('.modal_content').getBoundingClientRect();
      var transX, transY, scaleX, scaleY;
      var xc = w.innerWidth / 2;
      var yc = w.innerHeight / 2;
  
      trig.classList.add('modal_trigger--active');
  
      scaleX = mProps.width / trigProps.width;
      scaleY = mProps.height / trigProps.height;
  
      scaleX = scaleX.toFixed(3); 
      scaleY = scaleY.toFixed(3);
  
      transX = Math.round(xc - trigProps.left - trigProps.width / 2);
      transY = Math.round(yc - trigProps.top - trigProps.height / 2);
  
      if (m.classList.contains('modal--align-top')) {
        transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
      }

      div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
      div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';
  
  
      window.setTimeout(function() {
        window.requestAnimationFrame(function() {
          open(m, div);
        });
      }, contentDelay);
    };
  
    var open = function(m, div) {
      if (!isOpen) {
        var content = m.querySelector('.modal_content');
        m.classList.add('modal--active');
        content.classList.add('modal_content--active');
        content.addEventListener('transitionend', hideDiv, false);
        isOpen = true;
      }
  
      function hideDiv() {
        div.style.opacity = '0';
        content.removeEventListener('transitionend', hideDiv, false);
      }
    };
  
    var close = function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      var target = event.target;
      var div = document.getElementById('modal_temp');

      if (isOpen && target.classList.contains('modal_bg') || target.classList.contains('modal_close')) {

        div.style.opacity = '1';
        div.removeAttribute('style');
        modal.classList.remove('modal--active');
        content.classList.remove('modal_content--active');
        trigger.style.transform = 'none';
        trigger.style.webkitTransform = 'none';
        trigger.classList.remove('modal_trigger--active');

        div.addEventListener('transitionend', removeDiv, false);
        isOpen = false;
      }
  
      function removeDiv() {
        setTimeout(function() {
          window.requestAnimationFrame(function() {
            div.remove();
          });
        }, contentDelay - 50);
      }
    };
    trigger.addEventListener('click', getId, false);
    closer.addEventListener('click', close, false);
    modalbg.addEventListener('click', close, false);

    var donateBtns = document.querySelectorAll('#donate');

    [].forEach.call(donateBtns, function(div) {
      div.onclick = () => {
        var copyText = document.getElementById(div.dataset.id);
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
        
        var tooltip = document.getElementById(div.dataset.tooltip);
        tooltip.innerHTML = "Copied: " + copyText.value;
      }
      div.onmouseout = () => {
        var tooltip = document.getElementById(div.dataset.tooltip);
        tooltip.innerHTML = "Copy to clipboard";
      }
    });

    /* THEME CHANGER */

    const switcher = document.getElementById("theme-changer");

    const themeStyle = document.createElement( 'link' );
    themeStyle.rel  = 'stylesheet';
    document.head.appendChild( themeStyle );

      if (localStorage.getItem('mode') === 'blue')
      {
        themeStyle.href = "assets/css/blue.css";
        switcher.checked = true;
      }
      else {
        themeStyle.href = "assets/css/gray.css";
        switcher.checked = false;
      }

      switcher.onchange = () => {
        if(switcher.checked == true)
        {
          localStorage.setItem('mode', "blue");
          themeStyle.href = "assets/css/blue.css";
        }
        else {
          localStorage.setItem('mode', "gray");
          themeStyle.href = "assets/css/gray.css";
        }
      };
};

if (document.addEventListener) { 
  document.addEventListener("DOMContentLoaded", init, false);
}
else if (/WebKit/i.test(navigator.userAgent)) { 
  let _timer = setInterval(() => {
    if (/loaded|complete/.test(document.readyState)) {
      init(); 
    }
  }, 10);
}
else window.onload = init;