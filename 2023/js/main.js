const VISUAL_ITEMS = [1, 2, 3];
const CHAIN_ACCOUNTS = ["bscDUCO", "celoDUCO", "wDUCO", "maticDUCO"];
const STAKING_PERC = 1.0;
const BACKDROPS = [
    "calders",
    "Big_koelie",
    "NostalgiaXPS",
    "Xoiron",
    "revox",
    "if",
    "jpx13",
    "BjornNL",
    "NicoFR75",
    "CUTSDBZ",
    "Albedo",
    "Baphomet",
    "Jonny11",
    "Bujonek",
    "Kwiatens",
    "renderman",
    "CaptSwirly",
    "iNimbleSloth",
    "Mike_Morgan",
    "Ecthelias",
    "Kizeren Killeshan",
    "lunarismemo",
    "ismellcows"
];

let last_screen = "screen-user-desktop";
let username, password, verified;
let transaction_limit = 10;
let transactions = [];
let miners = [];
let wrap_api = [];
let enabledItems = JSON.parse(localStorage.getItem("enabledItems")) || VISUAL_ITEMS;
let miners_state_changed = true;
let api_url = "server.duinocoin.com";
let timedelta = 3;

let login_backdrop = BACKDROPS[Math.floor(Math.random() * BACKDROPS.length)];
if (on_mobile()) {
    last_screen = "screen-user-mobile";
    timedelta = 1;
    $("#backdrop-mobile").css("background-image",
        "url('/assets/community_screens/" + login_backdrop + ".jpg')")
    $("#image_author").text(login_backdrop)
} else {
    $("#backdrop-desktop").css("background-image",
        "url('/assets/community_screens/" + login_backdrop + ".jpg')")
    $("#image_author_desktop").text(login_backdrop)
}

const balanceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false, // Hide the legend
        },
        tooltip: {
            enabled: false, // Hide the tooltip
        },
        filler: {
            propagate: false, // Do not fill between datasets
        }
    },
    scales: {
        x: {
            display: false, // Hide the X-axis
        },
        y: {
            display: false, // Show the Y-axis
            title: {
                display: false, // Hide the Y-axis title
            },
        },
    },
    elements: {
        line: {
            tension: 0.5, // Adjust curve tension (0 to 1, 0 for straight lines)
        },
        point: {
            radius: 0, // Hide the data points
        },
    }
};

// Desktop - shorter versions
let adblockNotifications = [{
        title: "Oh, you're using an adblocker? Color us surprised! 🎉 Not.",
        description: "This website and other servers do not run on magic dust. Since you're so inclined on using an adblocker, maybe at least purchase our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or <a href='https://duinocoin.com/donate.html' target='_blank'>donate</a> to help?",
    },
    {
        title: "Attention, adblock aficionado! Yes, you!",
        description: "Help our crew sail smoothly by checking out our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or making a small <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. Whitelisting us is like shining a lighthouse on our financial challenges which aren't small.",
    },
    {
        title: "A wild adblocker appears!",
        description: "Explore our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> collection or give a modest <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> to support our digital menagerie. Maybe you don't care, if that's the case then don't be surprised we won't care about your account.",
    },
    {
        title: "To block or not to block, that is the adblocker's question.",
        description: "Join our quest for an ad-free and sustainable internet by perusing <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or making a humble <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. Whitelisting us casts a benevolent enchantment on our humble land.",
    },
    {
        title: "Adblocker strikes again! ⚔️🛡️",
        description: "Looks like you're very selfish... Battle server maintenance costs with your support - check out our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or <a href='https://duinocoin.com/donate.html' target='_blank'>donate</a>.",
    },
    {
        title: "Adblocker vs. Fairy Godmothers: The revenue battle!",
        description: "Script a happier ending with a humble <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> or exploring our <a href='https://store.duinocoin.com' target='_blank'>official merch</a>. Maybe even whitelist us? I don't think a SINGLE ad will drive you crazy.",
    },
    {
        title: "Adblockers, assemble! 🚫💂‍♂️",
        description: "Become an adblocker hero - support us by purchasing our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or making a small <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. If you can, please whitelist us. It's just a single ad.",
    },
    {
        title: "Adblockageddon! 🚀🌌",
        description: "Fuel our interstellar journey - check out our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or <a href='https://duinocoin.com/donate.html' target='_blank'>donate</a> as an adblocker astronaut. Whitelisting us opens a cosmic gateway to ad-supported content!",
    },
    {
        title: "Adblocker Artistry! 🎨🚫",
        description: "Craft a masterpiece of support - explore our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> collection or contribute a serene <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. Whitelisting us brings artistic vibrancy to the internet!",
    },
    {
        title: "Adblockers: The Quiet Rebellion 🤫🚫",
        description: "Join the silent rebellion with our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or a tranquil <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. Whitelisting us begins a quest for digital tranquility!",
    },
    {
        title: "Ad-free, Adored, Ad-supported! 🥰🚫",
        description: "Share the love - check out our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or shower us with a heartfelt <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. Whitelisting us brings love to an ad-free and ad-supported internet!",
    }
]

// Mobile longer versions since we have unlimited space
if (on_mobile()) {
    adblockNotifications = [{
            title: "Oh, you're using an adblocker? Color us surprised! 🎉 Not.",
            description: "Surprise, surprise! Another adblocker user in the house. While we understand the desire for an ad-free experience, our bills won't pay themselves. If you'd like to be a hero and help keep our servers running, consider supporting us by purchasing our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> or sparing a small <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>. We promise, no guilt trips here! Just a friendly reminder that your whitelisting powers can bring joy and content to both our team and the pixels. Let's make the internet a better place, one non-blocked ad at a time! 😄🚫🔍",
        },
        {
            title: "Attention, adblock aficionado! Yes, you!",
            description: "Ahoy, ad-blocking mate! We see you navigating the seas of the internet with that adblocker flag high. While we respect your preference for an ad-free voyage, our crew needs sustenance to continue sailing smoothly. If you find it in your heart (and wallet) to support our ship, check out our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> - treasure awaits! Alternatively, if you wish to drop some gold coins in our <a href='https://duinocoin.com/donate.html' target='_blank'>donation chest</a>, it will undoubtedly fuel our journey. By the way, no pressure on the whole whitelist thing, but think of it as shining a lighthouse to guide us through the stormy waves of financial challenges. 🏴‍☠️🚫💰",
        },
        {
            title: "A wild adblocker appears!",
            description: "Look who's tamed the virtual wilds with an adblocker! While you're enjoying an ad-free safari, our digital menagerie needs sustenance to thrive. If you're feeling adventurous, support our cause by exploring our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> collection - a treasure trove of delights! Alternatively, if you prefer a stealthy approach, a modest <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> can do wonders for our conservation efforts. Don't worry; we won't send a herd of sad emojis your way, but a few happy ones might be nice. Oh, and before you venture deeper into the web, consider adding a touch of magic by whitelisting us. You'll become a mythical creature in the realm of ad-supported content! 🦁🚫🌐",
        },
        {
            title: "To block or not to block, that is the adblocker's question.",
            description: "Hark, the eternal question: to block or not to block? While the adblocker provides sanctuary from the ad storm, our humble kingdom needs some support to stand tall. Thou art invited to peruse our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> emporium, where treasures await discerning eyes. Should thou be in a philanthropic mood, a humble <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> will gladden our virtual hearts. We shan't pester thee about the whitelist, but 'tis akin to casting a benevolent enchantment upon our humble land. Let us join forces to create an internet realm both ad-free and sustainable, where all may thrive in harmony. 🏰🚫💫",
        },
        {
            title: "Adblocker strikes again! ⚔️🛡️",
            description: "Hail, valiant adblocker user! Thy sword of ad-blocking prowess is undeniable, but even warriors need allies. As we battle the forces of server maintenance costs, thou canst lend thy hand in various ways. Behold our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> emporium - the spoils of victory shall be thine! Shouldst thou seek a noble quest, venture forth with a small <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>, and thy name shall be whispered in the halls of digital legend. And lo! Whitelisting us is like bestowing the blessing of the internet gods, ensuring the harmony of content and sustenance. Together, we shall forge a prosperous realm where everyone wins! ⚔️🚫🛍️",
        },
        {
            title: "Adblocker vs. Fairy Godmothers: The revenue battle!",
            description: "Alas, our tale unfolds as adblockers thwart the flow of revenue, and fairy godmothers seem scarce these days. Fear not, for thou hast the power to script a happier ending! Support our endeavors by perusing our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> - a realm of enchantment awaits thee! Shouldst thou wish to perform a good deed, a humble <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> shall pave the way to our financial salvation. And lo, whitelisting us is akin to unleashing a cascade of digital pixie dust, bringing prosperity to both our kingdom and thine ad-free browsing. Let's weave a tale of symbiotic harmony in the ever-changing land of the web! 🧚🚫✨",
        },
        {
            title: "Adblockers, assemble! 🚫💂‍♂️",
            description: "Calling all adblocker heroes! While you're protecting your screen from ads, spare a thought for our digital fortress. Supporting us is as easy as wielding a mouse - check out our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> and embrace your inner e-commerce warrior. Don't worry; we're not pulling any heartstrings here. But, just a tiny nudge: a <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> could upgrade our servers from a village hut to a grand castle. And if you decide to whitelist us, it's like offering an olive branch to the ever-hungry ad gods. So, let's unite and create a harmonious internet realm! 🏰🛡️💰",
        },
        {
            title: "Adblockageddon! 🚀🌌",
            description: "Adblockers have descended upon the internet like a cosmic storm, leaving us in need of celestial support. If you're an adblocker astronaut floating through the galaxy, consider fueling our mission with a quick visit to our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> store. And should you stumble upon a stardust pouch, a small <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> will aid our interstellar journey. No forceful persuasion here, but whitelisting us is like opening a cosmic gateway to the universe of ad-supported content. Together, we'll soar among the stars of sustainable internet. 🚀🌌🚫",
        },
        {
            title: "Adblocker Artistry! 🎨🚫",
            description: "Ah, the elegance of adblockers - a brushstroke of web browsing mastery. But while you craft your ad-free masterpiece, spare a thought for our virtual gallery. Peruse our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> collection, where art meets utility in a harmonious blend. An art connoisseur's spirit, you might decide to grant a small <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> to fuel our creative endeavors. And if you choose to grace us with your virtual signature by whitelisting, it's like an art collaboration that brings our content to life. Together, we'll curate an internet landscape that's both ad-free and artistically vibrant! 🎨🚫🎭",
        },
        {
            title: "Adblockers: The Quiet Rebellion 🤫🚫",
            description: "In the realm of silent adblockers, a rebellion brews against noisy ads. But while you fight the good fight for peace and tranquility, consider supporting our tranquil sanctuary too. Delve into our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> garden, where serenity and practicality intertwine. As you embrace the art of virtual zen, a serene <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a> could water our server gardens. And if you choose to whisper a few whitelisting mantras, the serene harmony of ads and content shall be restored. Let's embark on a quest for digital tranquility together! 🌿🚫🧘‍♀️",
        },
        {
            title: "Ad-free, Adored, Ad-supported! 🥰🚫",
            description: "Adored adblocker users, we cherish your preference for an ad-free experience. And as you fill your virtual heart with love, consider sharing some with us too. Explore our <a href='https://store.duinocoin.com' target='_blank'>official merch</a> kingdom, where love and practicality intertwine. Shower us with a heartfelt <a href='https://duinocoin.com/donate.html' target='_blank'>donation</a>, and we'll feel the virtual hugs. And if you choose to share the love by whitelisting us, it's like a virtual love fest between ads and content. Together, we'll create an internet where love reigns, ad-free and ad-supported! 🥰🚫💘",
        }
    ];
}

const receive_template = `
<div class="columns is-mobile is-vcentered txdialog">
    <div class="column is-narrow">
        <span class="icon">
            <center>
              <span class="fa-stack has-text-success mt-5">
                    <i class="fas fa-arrow-down fa-stack-1x"></i>
                    <i class="far fa-circle fa-stack-2x"></i>
              </span>
            </center>
        </span>
    </div>
    <div class="column">
        <h1 class="title shorttext is-size-6 has-text-weight-normal" style="overflow:hidden;">
            <b>{{SENDER}}</b> <i>{{MEMO}}</i>
        </h1>
        <h2 class="subtitle is-size-6 shorttext">
            {{DATE}} &bull;
            <a href="https://explorer.duinocoin.com/?search={{HASH_FULL}}">
                {{HASH}}
            </a>
            <a onclick="copy('{{HASH_FULL}}', this)">
                <i class="fa fa-copy"></i>
            </a>
        </h2>
    </div>
    <div class="column is-narrow has-text-right pr-0">
        <div class="title is-size-6">
            <b>{{AMOUNT}}</b><br>
        </div>
        <div class="subtitle is-size-6">
            DUCO
        </div>
    </div>
    <div class="column is-narrow" onclick="tx_details({{TX_NUM}})">
        <center>
            <div class="triangle"></div>
        </center>
    </div>
</div>`;

const wrap_template = `
<div class="columns is-mobile is-vcentered txdialog">
    <div class="column is-narrow">
        <span class="icon">
            <center>
              <span class="fa-stack has-text-info mt-5">
                    <i class="fas fa-redo fa-stack-1x"></i>
                    <i class="far fa-circle fa-stack-2x"></i>
              </span>
            </center>
        </span>
    </div>
    <div class="column">
        <h1 class="title shorttext is-size-6 has-text-weight-normal" style="overflow:hidden;">
            {{ADDRESS}}<br>
        </h1>
        <h2 class="subtitle is-size-6">
            {{DATE}} &bull;
            <a href="https://explorer.duinocoin.com/?search={{HASH_FULL}}">
                {{HASH}}
            </a>
            <a onclick="copy('{{HASH_FULL}}', this)">
                <i class="fa fa-copy"></i>
            </a>
        </h2>
    </div>
    <div class="column is-narrow has-text-right pr-0">
        <div class="title is-size-6">
            <b>{{AMOUNT}}</b><br>
        </div>
        <div class="subtitle is-size-6">
            DUCO
        </div>
    </div>
    <div class="column is-narrow" onclick="tx_details({{TX_NUM}})">
        <center>
            <div class="triangle"></div>
        </center>
    </div>
</div>`;

const send_template = `
<div class="columns is-mobile is-vcentered txdialog">
    <div class="column is-narrow">
        <span class="icon">
            <center>
              <span class="fa-stack has-text-danger mt-5">
                    <i class="fas fa-arrow-up fa-stack-1x"></i>
                    <i class="far fa-circle fa-stack-2x"></i>
              </span>
            </center>
        </span>
    </div>
    <div class="column">
        <h1 class="title shorttext is-size-6 has-text-weight-normal">
            <b>{{RECIPIENT}}</b> <i>{{MEMO}}</i>
        </h1>
        <h2 class="subtitle is-size-6 shorttext">
            {{DATE}} &bull;
            <a href="https://explorer.duinocoin.com/?search={{HASH_FULL}}">
                {{HASH}}
            </a>
            <a onclick="copy('{{HASH_FULL}}', this)">
                <i class="fa fa-copy"></i>
            </a>
        </h2>
    </div>
    <div class="column is-narrow has-text-right pr-0">
        <div class="title is-size-6">
            <b>{{AMOUNT}}</b><br>
        </div>
        <div class="subtitle is-size-6">
            DUCO
        </div>
    </div>
    <div class="column is-narrow" onclick="tx_details({{TX_NUM}})">
        <center>
            <div class="triangle"></div>
        </center>
    </div>
</div>`;

let exchange_template = `
    <div class="column" style="min-width:150px">
          <p class="title is-size-6">
            <a href="{{LINK}}" target="_blank" class="text-wrap">
                <span class="icon-text">
                    <img src="{{ICON}}" class="icon is-small">
                </span>
                {{NAME}}
            </a>
          </p>
          <p class="subtitle is-size-6 mb-0">
            &dollar;{{PRICE}} <small>{{TREND}}</small>
          </p>
          <small class="has-text-grey">
            {{TYPE}}
          </small>
    </div>`

if (on_mobile()) {
    exchange_template = `
    <div class="column" style="min-width:200px">
        <div class="box">
          <p class="title is-size-6">
            <a href="{{LINK}}" target="_blank" class="text-wrap">
                <span class="icon-text">
                    <img src="{{ICON}}" class="icon is-small">
                </span>
                {{NAME}}
            </a>
          </p>
          <p class="subtitle is-size-6 mb-0">
            &dollar;{{PRICE}} {{TREND}}
          </p>
          <small class="has-text-grey">
            {{TYPE}}
          </small>
        </div>
    </div>`
}

let iot_template = `
<div class="column mb-3" style="min-width:200px">
    <div class="box">
        <p class="title is-size-6">
            <i class="{{ICON}}"></i>
            {{DATA}}
        </p>
        <p class="subtitle is-size-6 mb-0">
            {{NAME}}
        </p>
        <small>{{DEVICE}}</small>
    </div>
</div>
`

let miner_template1 = `
<div class="column is-full">
    <div class="box">
        <div class="columns is-mobile is-vcentered">
            <div class="column is-narrow">
                <center>
                    <div class="icon is-large fa-2x">
                        {{ICON}}
                    </div>
                </center>
            </div>
            <div class="column">
                <p class="has-text-weight-bold is-size-6">
                    {{NAME}}
                </p>
                <p class="subtitle is-size-6 shorttext">
                    {{HASH}}
                    &bull; 
                    <span class="{{EFF_COLOR}}">{{EFF}}</span>
                    <span class="is-hidden-mobile">({{EFF_COUNT}} shares)</span>
                    <span class="is-hidden-mobile">{{DIFF}}</span>
                    <span class="is-hidden-mobile">{{PING}}</span>
                </p>
            </div>
            <div class="column is-narrow" onclick="miner_details('{{MINER_NUM}}')">
                <div class="triangle"></div>
            </div>
        </div>
    </div>
</div>`;

const miner_template2 = `
<div class="column is-full p-0 pl-3 mt-3 mr-5">
    <div class="columns is-mobile is-gapless">
        <div class="column is-narrow">
            <center>
                <figure class="icon">
                    {{ICON}}
                </figure>
            </center>
        </div>
        <div class="column mx-2">
            <span class="has-text-weight-bold">
                {{NAME}}
            </span>
        </div>
        <div class="column is-2 has-text-right">
            <span class="{{EFF_COLOR}}">
                {{EFF}}
            </span>
        </div>
        <div class="column ml-1 is-3 has-text-right">
            <span>
                {{HASH}}
            </span> 
        </div>
        <div class="column is-narrow mr-3 ml-3" onclick="miner_details('{{MINER_NUM}}')">
            <i class="fa fa-chevron-right"></i>
        </div>
    </div>
</div>
`

const achievement_template = `
<div class="column" style="min-width: 300px">
    <div class="box">
        <div class="columns is-mobile {{GRAY}}">
            <div class="column is-narrow">
                <img class="icon is-large" src="{{ICON}}">
            </div>
            <div class="column">
                <p class="title is-size-6">
                    {{TITLE}}
                    <small style="color:#FFA500">
                        {{REWARD}}
                    </small>
                </p>
                <p class="subtitle is-size-6">
                    {{SUBTITLE}}
                </p>
            </div>
        </div>
    </div>
</div>`

const shop_template = `
<div class="column" style="min-width: 300px">
    <div class="box">
        <div class="columns is-mobile">
            <div class="column is-narrow">
                <img class="icon is-large" src="{{ICON}}">
            </div>
            <div class="column">
                <p class="title is-size-6">
                    {{NAME}}
                </p>
                <p class="subtitle is-size-6">
                    {{DESCRIPTION}}
                </p>
            </div>
        </div>
        <div class="columns is-mobile is-vcentered">
            <div class="column">
                {{BUTTON}}
            </div>
        </div>
    </div>
</div>`


let miner_template = miner_template1;

$(document).ready(function() {
    if (localStorage.getItem("username") && localStorage.getItem("authToken")) {
        if (on_mobile()) {
            username = $("#login_username").val(localStorage.getItem("username"))
            password = $("#login_password").val(localStorage.getItem("authToken"))
            setTimeout(function() {
                $("#loginbutton").click();
            }, 500);
        } else {
            username = $("#login_username_desktop").val(localStorage.getItem("username"))
            password = $("#login_password_desktop").val(localStorage.getItem("authToken"))
            setTimeout(function() {
                $("#loginbutton_desktop").click();
            }, 500);
        }
    }


    saved_theme = localStorage.getItem('theme');
    if (saved_theme) {
        $(`#theme_mobile option[value='${saved_theme}']`).prop('selected', true).change();
        $(`#theme_desktop option[value='${saved_theme}']`).prop('selected', true).change();
    }
});

function login(token, connect_timeout=5000) {
    if (on_mobile()) {
        username_input = $("#login_username");
        password_input = $("#login_password");
        loginbutton = $("#loginbutton");
    } else {
        username_input = $("#login_username_desktop");
        password_input = $("#login_password_desktop");
        loginbutton = $("#loginbutton_desktop");
    }
    username = username_input.val().trim();
    password = password_input.val();

    if (!username && !password) {
        username_input.effect("shake", { distance: 5 });
        password_input.effect("shake", { distance: 5 });
        return;
    }

    if (!password) {
        password_input.effect("shake", { distance: 5 });
        return;
    }

    if (!username) {
        username_input.effect("shake", { distance: 5 });
        return;
    }

    loginbutton.addClass("is-loading");

    $.ajax({
        url: `https://${api_url}/v2/auth/${encodeURIComponent(username)}`
            + `?password=${window.btoa(unescape(encodeURIComponent(password)))}`,
        timeout: connect_timeout, 
        captcha: token,
        error: function(data, textStatus, xhr) {
            loginbutton.removeClass("is-loading");

            if (data.status == 429) { 
                alert_bulma("You are being rate limited! Slow down, spamming the buttons won't do anything good. Try again in a few seconds.");
            } else if (data.status == 502) {
                alert_bulma("APIs are down. Either there's some maintenance going on, or an outage has happened. Please try again later.")
            } else if (api_url != "server2.duinocoin.com") {
                toast_bulma(`Main server seems unreachable. Retrying with a backup node...`)
                api_url = "server2.duinocoin.com";
                login(token, 10000);
            } else {
                alert_bulma("Network error. Check your internet connection and make sure nothing is blocking server.duinocoin.com. It's also possible there is some maintenance going on - if that's the case, try again in a few minutes.");
            }
        },
        success: function(data) {
            loginbutton.removeClass("is-loading");
            if (data.success) {
                localStorage.setItem("username", encodeURIComponent(username));
                localStorage.setItem("authToken", data.result[2]);

                $(".username").text(username);
                $(".email").text(data.result[1]);
                $("#mining_key").val(data.result[3]);
                $("#mining_key_desktop").val(data.result[3]);

                user_data(username, true);
                setInterval(function() { user_data(username) }, 5000);

                if (on_mobile()) {
                    $("#login-mobile").hide(function() {
                        $("#wallet-mobile").show();
                        adblock_check();
                    });
                } else {
                    $("#useravatar").attr("src",
                        `https://www.gravatar.com/avatar/${encodeURIComponent(MD5(data.result[1]))}?d=retro`);

                    $("#login-desktop").fadeOut(function() {
                        $("#wallet-desktop").fadeIn();
                        adblock_check();
                    });
                }
            } else {
                if (data.message.includes("This user doesn't exist")) {
                    username_input.effect("shake", { distance: 5 });
                    return;
                } else if (data.message.includes("captcha")) {
                    alert_bulma("Incorrect captcha. Refresh and try again, if the issue persists make sure nothing blocks ReCaptcha");
                    return;
                } else if (data.message.includes("IP")) {
                    alert_bulma("Your IP address is considered malicious. If you're not doing anything wrong, change your network (e.g. to Wi-Fi or mobile data) or restart your router");
                    return;
                } else if (data.message.includes("banned")) {
                    document.getElementsByTagName('html')[0].remove();
                    return;
                } else if (data.message.includes("Token")) {
                    toast_bulma("Token expired. Please login again");
                    password_input.val('');
                    localStorage.removeItem("authToken");
                    return;
                } else if (data.message.includes("many requests")) {
                    alert_bulma("You are being rate limited! Slow down, spamming the buttons won't do anything good. Try again in a few seconds.");
                    return;
                } else {
                    password_input.effect("shake", { distance: 5 });
                    return;
                }
            }
        }
    })
}

let adBlockEnabled = false;

function adblock_check() {
    const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6607105763246092';

    try {
        fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true);
    } catch (e) {
        adBlockEnabled = true;
    }

    let initial_height = $('.adsbygoogle').height();
    (adsbygoogle = window.adsbygoogle || []).push({});
    setTimeout(function() {
        /*if ($('.adsbygoogle').height() <= initial_height) {
            adBlockEnabled = true;
        }*/

        if (adBlockEnabled) {
            selected_notif = Math.floor(Math.random() * adblockNotifications.length);
            adblock_title = adblockNotifications[selected_notif].title;
            adblock_desc = adblockNotifications[selected_notif].description;
            $(".adblock_title").html(adblock_title);
            $(".adblock_desc").html(adblock_desc);
            $(".adblocker_detected").fadeIn();
        }
    }, 3000);
}


last_e_tab = "tab-earnings";

function e_tab(transition_to) {
    if (last_e_tab == transition_to) return;
    $(`.${last_e_tab}`).removeClass("is-active");
    $(`.${transition_to}`).addClass("is-active");

    $(`.${last_e_tab}-content`).fadeOut(50, function() {
        $(`.${transition_to}-content`).fadeIn(120);
        last_e_tab = transition_to;
    });
}

function screen(transition_to) {
    if (last_screen == transition_to) return;

    if(transition_to == "screen-shop-desktop" && !localStorage.getItem("shop-open-blushybox")) {
        localStorage.setItem("shop-open-blushybox", true);
        $(".info-dot").fadeOut();
    } 

    $(`#${last_screen}-nav`).removeClass("navbar-selected");
    $(`#${transition_to}-nav`).addClass("navbar-selected");
    $(`#${last_screen}`).fadeOut(timedelta*50, function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        $(`#${transition_to}`).fadeIn(timedelta*120);
        last_screen = transition_to;
    });
}


let miner_list = JSON.parse(localStorage.getItem("miner_list"));
if (!miner_list) {
    miner_template = miner_template2;
    $(".minertogglebutton").html("<i class='fa fa-th-large'></i>")
}

function toggle_miner_view() {
    if (miner_template == miner_template2) {
        miner_template = miner_template1;
        $(".minertogglebutton").html("<i class='fa fa-list'></i>")
        localStorage.setItem("miner_list", true);
    } else {
        miner_template = miner_template2;
        $(".minertogglebutton").html("<i class='fa fa-th-large'></i>")
        localStorage.setItem("miner_list", false);
    }
    create_miners(miners);
}


let iot_collapsed = JSON.parse(localStorage.getItem("iot_collapsed"));
if (!iot_collapsed) {
    $(".iotspan").html("<i class='fa fa-caret-right'></i>&nbsp;IOT DATA");
    $(".iotdata").hide('normal');
}


function refresh_calcs() {
    $(".estimatedprofits").fadeOut(function() {
        $(".estimatedprofits_wait").fadeIn();
    });
    let start_balance = 0;
}


function toggle_iot() {
    if (!iot_collapsed) {
        $(".iotspan").html("<i class='fa fa-caret-down'></i>&nbsp;IOT DATA");
        iot_collapsed = true;
        $(".iotdata").show('normal');
    } else {
        $(".iotspan").html("<i class='fa fa-caret-right'></i>&nbsp;IOT DATA");
        iot_collapsed = false;
        $(".iotdata").hide('normal');
    }
    localStorage.setItem("iot_collapsed", iot_collapsed)
}


function store_balance(balance) {
    // Save every 10min at most
    if (Date.now() - get_stored_balance("dates").slice(-1)[0] > 10 * 60 * 1000 ||
        get_stored_balance().length < 10) {
        savedBalance = JSON.parse(localStorage.getItem('balance_history')) || [];
        savedBalance.push([balance, Date.now()]);

        if (savedBalance.length > 1000) {
            savedBalance.splice(0, savedBalance.length - 1000);
        }
        localStorage.setItem('balance_history', JSON.stringify(savedBalance));
    }
}


function get_stored_balance(type) {
    let data = JSON.parse(localStorage.getItem('balance_history'))

    if (!data) return []

    if (type == "dates") return (data.map(x => x[1]));
    return (data.map(x => x[0]));
}


function refresh_wrap_api() {
    fetch(`https://server.duinocoin.com/wrapped_duco_api.json`)
        .then(response => response.json())
        .then(data => {
            wrap_api = data;
        });
}


function refresh_achievements(user_achievements) {
    fetch(`https://${api_url}/achievements`)
        .then(response => response.json())
        .then(data => {
            achievements = data.result;

            finalhtml = "";
            total_achievements = -1;
            for (achievement in achievements) {
                achv = achievements[achievement]
                reward_string = "";
                if (achv.reward > 0) {
                    reward_string = `${achv.reward} <i class="fa fa-coins"></i>`
                }
                gray_str = "";
                if (!user_achievements.includes(Number(achievement))) {
                    gray_str = "grayed-out"
                }
                finalhtml += achievement_template
                    .replace("{{TITLE}}", achv.name)
                    .replace("{{GRAY}}", gray_str)
                    .replace("{{SUBTITLE}}", achv.description)
                    .replace("{{REWARD}}", reward_string)
                    .replace("{{ICON}}", achv.icon);
                total_achievements++;
            }
            $("#dash_achv_all").text(total_achievements)
            $("#dash_achv_unlocked").text(user_achievements.length)
            $(".achievements_all").text(total_achievements)
            $(".achievements_unlocked").text(user_achievements.length)
            $(".achievements_content").html(finalhtml)
        });
}

function create_prices(prices) {
    delete prices.nodes;
    delete prices.furim;
    
    delete prices.nano; // currently unavailable

    // global price
    if (prices["max"]["price"] > 0) {
        percentage = round_to(1, ((prices["max"]["change_24h"] / prices["max"]["price"]) * 100));
    } else {
        percentage = -100;
    }
    if (percentage > 0) {
        $(".price_trend").html(
            "<span class='has-text-success'><i class='fa fa-arrow-up'></i> " + percentage + "%</span>");
    } else if (percentage < 0) {
        $(".price_trend").html(
            "<span class='has-text-danger'><i class='fa fa-arrow-down'></i> " + percentage + "%</span>");
    }

    delete prices.max;
    //delete prices.bch;
    delete prices.nano;
    
    finalhtml = "";
    for (price in prices) {
        link = "https://exchange.duinocoin.com";
        icon = "assets/ducoexchange.png";
        type = "Unknown";
        if (price == "bch") {
            name = "DUCO Exchange";
            type = "DUCO <i class='fa fa-exchange-alt'></i> BCH";
        } else if (price == "xmg") {
            name = "DUCO Exchange";
            type = "DUCO <i class='fa fa-exchange-alt'></i> XMG";
        } else if (price == "trx") {
            name = "DUCO Exchange";
            type = "DUCO <i class='fa fa-exchange-alt'></i> TRX";
        } else if (price == "nano") {
            name = "DUCO Exchange";
            type = "DUCO <i class='fa fa-exchange-alt'></i> XNO";
        } else if (price == "fluffy") {
            name = "Fluffy<wbr>Swap";
            icon = "assets/fluffyswap.png";
            link = "https://fluffyswap.com";
            type = "DUCO <i class='fa fa-exchange-alt'></i> ALL"
        } else if (price == "sushi") {
            name = "Sushi<wbr>Swap";
            icon = "assets/sushiswap.png";
            type = "maticDUCO <i class='fa fa-exchange-alt'></i> MATIC"
            link = "https://medium.com/@johnny.mnemonic/guide-to-swapping-duino-coin-on-sushi-com-12bca3192ea2";
        } else if (price == "pancake") {
            name = "Pancake<wbr>Swap";
            icon = "assets/pancakeswap.png";
            type = "bscDUCO <i class='fa fa-exchange-alt'></i> BSC"
            link = "https://pancakeswap.finance/swap?inputCurrency=0xcf572ca0ab84d8ce1652b175e930292e2320785b"
        } else if (price == "ubeswap") {
            name = "Ube<wbr>Swap";
            icon = "assets/ubeswap.png";
            type = "celoDUCO <i class='fa fa-exchange-alt'></i> mCUSD"
            link = "https://info.ubeswap.org/pair/0x7703874bd9fdacceca5085eae2776e276411f171"
        } else if (price == "sunswap") {
            name = "Sun<wbr>Swap";
            icon = "assets/sunswap.png";
            type = "wDUCO <i class='fa fa-exchange-alt'></i> TRX"
            link = "https://sunswap.com/#/scan/detail/TWYaXdxA12JywrUdou3PFD1fvx2PWjqK9U"
        }

        if (prices[price]["price"] > 0) {
            percentage = round_to(1, ((prices[price]["change_24h"] / prices[price]["price"]) * 100));
        } else {
            percentage = -100;
        }

        trend = "";
        if (percentage > 0) {
            trend = "<span class='has-text-success'><i class='fa fa-arrow-up'></i> " + percentage + "%</span>";
        } else if (percentage < 0) {
            trend = "<span class='has-text-danger'><i class='fa fa-arrow-down'></i> " + percentage + "%</span>";
        }

        finalhtml += exchange_template
            .replace("{{LINK}}", link)
            .replace("{{NAME}}", name)
            .replace("{{ICON}}", icon)
            .replace("{{TYPE}}", type)
            .replace("{{PRICE}}", round_to(6, prices[price]["price"]))
            .replace("{{TREND}}", trend);
    }

    $(".prices-content").html(finalhtml);
}


function alert_bulma(content) {
    $("html").css("overflow-y", "hidden");
    $("#alert_content").html(content);
    $('#fullscreen_alert').fadeIn('fast');
    $(document).click(function(event) {
        if (event.target.id == ("fullscreen_alert") && $('#fullscreen_alert').is(":visible")) {
            close_alert();
        }
    });
}

function toast_bulma(content) {
    bulmaToast.toast({
        message: content,
        dismissible: true,
        closeOnClick: true,
        position: 'bottom-right',
        duration: 5000,
        animate: { in: 'fadeIn', out: 'fadeOut' },
    })
}

function close_alert() {
    $('#fullscreen_alert').fadeOut('fast', function() {
        $("html").css("overflow-y", "scroll");
    });
}


let start_balance = 0;

function calculdaily(newb, oldb, user_items) {
    /* Accurate daily calculator by Lukas */
    // Ducos since start / time * day
    if (start_balance == 0) {
        start_balance = newb;
        start_time = Date.now();
    } else {
        let daily = 86400000 * (newb - start_balance) / (Date.now() - start_time);
        // Large values mean transaction or big block - ignore this value
        if (daily > 0 && daily < 500 && miners.length) {
            daily = round_to(1, daily);
            $(".dailyprofit").text(daily)
            $(".estimatedprofits_wait").fadeOut(function() {
                $(".estimatedprofits_nominers").fadeOut(function() {
                    $(".estimatedprofits").fadeIn();
                });
            });
        }
    }
}


const user_data = (req_username, first_open) => {
    username = req_username;
    fetch(`https://${api_url}/v3/users/${encodeURIComponent(username)}?limit=${transaction_limit}`)
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
            duco_price = data.exch_rates["max"]["price"];
            create_prices(data.exch_rates);

            if (first_open) {
                if (api_url == "server2.duinocoin.com") {
                    $(".readonly_mode").fadeIn();
                }

                if (data.balance.created.includes("before")) {
                    $(".acc-creation-date").text(
                        data.balance.created + " - welcome, OG member!");
                } else $(".acc-creation-date").text(data.balance.created);

                $(".acc-last-login").text(
                    new Date(data.balance.last_login * 1000).toLocaleString('en-UK'));

                $(".acc-trustscore").text(data.balance.trust_score);

                user_achievements = data.achievements;
                refresh_achievements(user_achievements);
                refresh_wrap_api();

                user_items = data.items;
                refresh_shop(user_items);

                refresh_iot_charts();

                if (user_items.includes(12)) {
                    $(".starterbadge").fadeIn();
                }
                if (user_items.includes(13)) {
                    $(".blushyboxbadge").fadeIn();
                }
            }

            balance = round_to(
                16 - parseFloat(data.balance.balance).toString().split(".")[0].length,
                parseFloat(data.balance.balance)
            );
            store_balance(balance);

            if (first_open) oldb = balance;
            if (balance != oldb) {
                calculdaily(balance, oldb, user_items);
                oldb = balance;
            }
            
            /*function fetch_balance_data(username) {
                fetch(`http://127.0.0.1:5000/historic_balance?username=${username}`)
                    .then(response => response.json())
                    .then(data => {
                        create_balance_chart(data);
                    })
                    .catch(error => {
                        console.error('Error fetching balance data:', error);
                    });
                setTimeout(function() {
                    fetch_balance_data(username);
                }, 10000)
            }
            // fetch_balance_data(username);
            function create_balance_chart(data) {
                let chartContainer = document.getElementById('balance-chart-desktop');
                chartContainer.innerHTML = ''; // Clear existing charts
                console.log(data);
                let datasetsByThreadId = {};

                data.datasets.forEach(dataset => {
                    let threadId = dataset.label;
                    if (!datasetsByThreadId[threadId]) {
                        datasetsByThreadId[threadId] = [];
                    }
                    datasetsByThreadId[threadId].push(dataset);
                });

                for (let threadId in datasetsByThreadId) {
                    if (datasetsByThreadId.hasOwnProperty(threadId)) {
                        let datasets = datasetsByThreadId[threadId];

                        let ctx = chartContainer.getContext('2d');

                        new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: data.labels.map(timestamp => new Date(timestamp * 1000).toLocaleString()),
                                datasets: datasets
                            },
                            options: {
                                animation: {
                                    duration: 0
                                },
                                responsive: true,
                                elements: {
                                    line: {
                                        tension: 0.15,
                                    },
                                    point: {
                                        radius: 2,
                                    }
                                },
                                title: {
                                    display: true,
                                    text: threadId
                                },
                                scales: {
                                    y: {
                                        beginAtZero: false
                                    }
                                }
                            }
                        });
                    }
                }
            }*/

            if (first_open) {
                balanceChartData = {
                    labels: get_stored_balance("dates"),
                    datasets: [{
                        label: 'Balance',
                        borderColor: '#FC6803',
                        backgroundColor: 'rgba(252, 104, 3, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        showLine: true,
                        data: get_stored_balance("values"),
                        pointRadius: 0,
                        pluginData: {
                            fill: '+1',
                            borderColor: 'rgba(0, 0, 0, 0)',
                            borderDash: [5, 5],
                        },
                    }, ],
                };
                if (on_mobile()) {
                    balanceChartData = {
                        labels: get_stored_balance("dates"),
                        datasets: [{
                            label: 'Balance',
                            borderColor: '#FC6803',
                            backgroundColor: 'rgba(252, 104, 3, 0.2)',
                            borderWidth: 2,
                            fill: true,
                            showLine: true,
                            data: get_stored_balance("values"),
                            pointRadius: 0,
                            pluginData: {
                                fill: '+1',
                                borderColor: 'rgba(0, 0, 0, 0)',
                                borderDash: [5, 5],
                            },
                        }, ],
                    };
                    const ctx = document.getElementById('balanceChart').getContext('2d');
                    balanceChart = new Chart(ctx, {
                        type: 'line',
                        data: balanceChartData,
                        options: balanceChartOptions,
                    });
                }
            } else if (on_mobile()) {
                balanceChart.data.labels.push(Date.now());
                balanceChart.data.datasets.forEach((dataset) => {
                    dataset.data.push(balance);
                });
                balanceChart.update();
            }

            $(".balance").text(balance);
            balance_usd = balance * duco_price;
            $(".balanceusd").text(`$${
                round_to(
                8 - parseFloat(balance_usd).toString().split(".")[0].length,
                parseFloat(balance_usd)
            )}`);

            if (data.balance.stake_amount) {
                stake_reward = (data.balance.stake_amount *
                    (1 + (STAKING_PERC / 100)) -
                    data.balance.stake_amount);
                stake_date = new Date(data.balance.stake_date * 1000)
                    .toLocaleString("en-UK", date_opt);

                progress_min = data.balance.stake_date * 1000 - STAKE_DAYS * 86400000;
                progress_max = data.balance.stake_date * 1000;

                start = new Date(progress_min),
                    end = new Date(progress_max),
                    today = new Date();
                q = Math.abs(today - start);
                d = Math.abs(end - start);
                progress_val = (q / d) * 100
                $(".stakeprogress").attr('value', progress_val);
                $(".stakeprogress").text(progress_val.toFixed(2) + "%");

                $(".notstaking").fadeOut(function() {
                    $(".staking").fadeIn();
                });

                /* ------------- common -------- */

                $(".stakeamount").text(data.balance.stake_amount);
                $(".stakereward").text(stake_reward.toFixed(2))
                $(".stakedate").text(stake_date);
            } else {
                $(".staking").fadeOut(function() {
                    $(".notstaking").fadeIn();
                });
            }
            
            verified_for_slots = data.balance.max_miners;
            $(".verified_for_slots").html(`verified to use <b>${verified_for_slots}</b>`);
            
            trustscore = data.balance.trust_score;
            if (data.balance.warnings < 1) {
                verified = data.balance.verified;
                if (data.balance.verified_date === 0) {
                    verification_date = "before summer 2022"
                } else {
                    verification_date = new Date(data.balance.verified_date * 1000)
                        .toLocaleString('en-UK');
                }

                if (verified === "yes") {
                    $(".unverifiedbadge").fadeOut();
                    $(".verifiedbadge").fadeIn();
                    $(".acc-verification-date").text(verification_date);
                } else {
                    $(".acc-verification-date").html("never - <a href='https://server.duinocoin.com/verify.html' target='_blank'>verify here!</a>");
                    $(".verifiedbadge").fadeOut();
                    $(".unverifiedbadge").fadeIn();
                    $(".unverified_box").fadeIn();
                }
            } else {
                $(".verifiedbadge").fadeOut();
                $(".verifiedbadge").fadeOut();
                $(".warning_num").text(data.balance.warnings);
                $(".warning_box").fadeIn();
                $(".suspiciousbadge").fadeIn();
            }

            transactions = data.transactions.reverse();
            finalhtml = "";
            for (transaction in transactions) {
                tx = transactions[transaction];
                day = tx.datetime.split("/")[0]
                month = tx.datetime.split("/")[1]
                year = tx.datetime.split("/")[2].split(" ")[0]
                time = tx.datetime.split("/")[2].split(" ")[1]
                datetime_parsed = `${year}-${month}-${day}T${time}Z`

                sent_ago = timeSince(Date.parse(datetime_parsed));

                formatted_hash = tx.hash;
                if (formatted_hash.length > 8) {
                    formatted_hash = formatted_hash.slice(0, 5) + "..."
                }
                formatted_memo = "";
                if (tx.memo != "None") {
                    formatted_memo = "\"" + tx.memo + "\"";
                }

                if (tx.recipient == username) {
                    finalhtml += receive_template
                        .replace("{{AMOUNT}}", "<span class='has-text-weight-normal'>+</span>"+
                                                                round_to(8, tx.amount))
                        .replace("{{SENDER}}", tx.sender)
                        .replace("{{HASH}}", formatted_hash)
                        .replaceAll("{{HASH_FULL}}", tx.hash)
                        .replace("{{MEMO}}", formatted_memo)
                        .replace("{{DATE}}", sent_ago)
                        .replace("{{TX_NUM}}", transaction);
                } else {
                    if (!CHAIN_ACCOUNTS.includes(tx.recipient)) {
                        finalhtml += send_template
                            .replace("{{AMOUNT}}", "<span class='has-text-weight-normal'>-</span>"+
                                                                round_to(8, tx.amount))
                            .replace("{{RECIPIENT}}", tx.recipient)
                            .replace("{{HASH}}", formatted_hash)
                            .replaceAll("{{HASH_FULL}}", tx.hash)
                            .replace("{{MEMO}}", formatted_memo)
                            .replace("{{DATE}}", sent_ago)
                            .replace("{{TX_NUM}}", transaction);
                    } else {
                        finalhtml += wrap_template
                            .replace("{{AMOUNT}}", "<span class='has-text-weight-normal'>-</span>"+
                                                                round_to(8, tx.amount))
                            .replace("{{RECIPIENT}}", tx.recipient)
                            .replace("{{HASH}}", formatted_hash)
                            .replaceAll("{{HASH_FULL}}", tx.hash)
                            .replace("{{DATE}}", sent_ago)
                            .replace("{{ADDRESS}}", tx.memo)
                            .replace("{{TX_NUM}}", transaction);
                    }
                }
            }
            finalhtml += `<button class="button is-fullwidth more_tx" onclick="more_transactions()">
                            Load more
                          </button>`
            $(".transactions-content").html(finalhtml)
            $(".more_tx").removeClass("is-loading");

            user_miners = data.miners;
            create_miners(user_miners);

            if (data.notices.includes(1)) {
                $(".invalid_miner_keys").fadeIn();
            }
            if (data.notices.includes(2)) {
                $(".minercount_exceeded").fadeIn();
            }
            if (data.notices.includes(3)) {
                $(".verified_minercount_exceeded").fadeIn();
            }
        })
}
let loggedIn = true;
let balance = 0;
let curr_bal = 0;
let profitcheck = 0;
let duco_price = 0.0;
let daily_average = [];
let oldb = 0;
let total_hashrate = 0;
let start = Date.now();
let timestamps = [];
let balances = [];
let user_items;
let cache_miners = 0;
let notify_shown = false;
let first_launch = true;
let start_time = Date.now();
const STAKE_DAYS = 42;
const date_opt = { day: 'numeric', month: "long" };
oldb = 0;
stopUpdate = false;

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

function change_password() {
    changepass_old = $("#changepass_old");
    changepass_new = $("#changepass_new");
    changepass_confirm = $("#changepass_confirm");

    if (!changepass_old.val()) {
        $("#changepass_old").effect("shake", { distance: 5 });
        return;
    }

    if (!changepass_new.val() || changepass_new.val() == changepass_old.val()) {
        $("#changepass_new").effect("shake", { distance: 5 });
        return;
    }

    changepass_confirm.addClass("is-loading");
    fetch("https://server.duinocoin.com/changepass/" + encodeURIComponent(username) +
            "?password=" + encodeURIComponent(changepass_old.val()) +
            "&newpassword=" + encodeURIComponent(changepass_new.val()))
        .then(response => response.json())
        .then(data => {
            changepass_confirm.removeClass("is-loading");
            if (data.success) {
                changepass_old.val('');
                changepass_new.val('');
                changepass_confirm.addClass("is-success");
                changepass_confirm.html("<i class='fa fa-check'></i>");
            } else {
                changepass_confirm.addClass("is-danger");
                changepass_confirm.text("Error");
                alert_bulma(data.message);
            }
            setTimeout(function() {
                changepass_confirm.removeClass("is-danger");
                changepass_confirm.removeClass("is-success");
                changepass_confirm.text("Change");
            }, 3000);
        }).catch(error => {
            changepass_confirm.removeClass("is-loading");
            changepass_confirm.addClass("is-danger");
            changepass_confirm.text("Error");
            alert_bulma(error);
            setTimeout(function() {
                changepass_confirm.removeClass("is-danger");
                changepass_confirm.text("Change");
            }, 3000);
        });
}


function change_password_desktop() {
    changepass_old = $("#changepass_old_desktop");
    changepass_new = $("#changepass_new_desktop");
    changepass_confirm = $("#changepass_confirm_desktop");

    if (!changepass_old.val()) {
        $("#changepass_old_desktop").effect("shake", { distance: 5 });
        return;
    }

    if (!changepass_new.val() || changepass_new.val() == changepass_old.val()) {
        $("#changepass_new_desktop").effect("shake", { distance: 5 });
        return;
    }

    changepass_confirm.addClass("is-loading");
    fetch("https://server.duinocoin.com/changepass/" + encodeURIComponent(username) +
            "?password=" + encodeURIComponent(changepass_old.val()) +
            "&newpassword=" + encodeURIComponent(changepass_new.val()))
        .then(response => response.json())
        .then(data => {
            changepass_confirm.removeClass("is-loading");
            if (data.success) {
                changepass_old.val('');
                changepass_new.val('');
                changepass_confirm.addClass("is-success");
                changepass_confirm.html("<i class='fa fa-check'></i>");
            } else {
                changepass_confirm.addClass("is-danger");
                changepass_confirm.text("Error");
                alert_bulma(data.message);
            }
            setTimeout(function() {
                changepass_confirm.removeClass("is-danger");
                changepass_confirm.removeClass("is-success");
                changepass_confirm.text("Change");
            }, 3000);
        }).catch(error => {
            changepass_confirm.removeClass("is-loading");
            changepass_confirm.addClass("is-danger");
            changepass_confirm.text("Error");
            alert_bulma(error);
            setTimeout(function() {
                changepass_confirm.removeClass("is-danger");
                changepass_confirm.text("Change");
            }, 3000);
        });
}


function change_mining_key() {
    mining_key = $("#mining_key");
    changekey_confirm = $("#changekey_confirm");

    if (!mining_key.val()) mining_key.val("None")

    changekey_confirm.addClass("is-loading");
    fetch("https://server.duinocoin.com/mining_key" +
            "?u=" + encodeURIComponent(username) +
            "&password=" + encodeURIComponent(password) +
            "&k=" + encodeURIComponent(mining_key.val()), { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            changekey_confirm.removeClass("is-loading");
            if (data.success) {
                changekey_confirm.addClass("is-success");
                changekey_confirm.html("<i class='fa fa-check'></i>");
            } else {
                changekey_confirm.addClass("is-danger");
                changekey_confirm.text("Error");
                alert_bulma(data.message);
            }
            setTimeout(function() {
                changekey_confirm.removeClass("is-danger");
                changekey_confirm.removeClass("is-success");
                changekey_confirm.text("Set");
            }, 3000);
        }).catch(error => {
            changekey_confirm.removeClass("is-loading");
            changekey_confirm.addClass("is-danger");
            changekey_confirm.text("Error");
            alert_bulma(error);
            setTimeout(function() {
                changekey_confirm.removeClass("is-danger");
                changekey_confirm.text("Set");
            }, 3000);
        });
}


function change_mining_key_desktop() {
    mining_key = $("#mining_key_desktop");
    changekey_confirm = $("#changekey_confirm_desktop");

    if (!mining_key.val()) mining_key.val("None")

    changekey_confirm.addClass("is-loading");
    fetch("https://server.duinocoin.com/mining_key" +
            "?u=" + encodeURIComponent(username) +
            "&password=" + encodeURIComponent(password) +
            "&k=" + encodeURIComponent(mining_key.val()), { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            changekey_confirm.removeClass("is-loading");
            if (data.success) {
                changekey_confirm.addClass("is-success");
                changekey_confirm.html("<i class='fa fa-check'></i>");
            } else {
                changekey_confirm.addClass("is-danger");
                changekey_confirm.text("Error");
                alert_bulma(data.message);
            }
            setTimeout(function() {
                changekey_confirm.removeClass("is-danger");
                changekey_confirm.removeClass("is-success");
                changekey_confirm.text("Set");
            }, 3000);
        }).catch(error => {
            changekey_confirm.removeClass("is-loading");
            changekey_confirm.addClass("is-danger");
            changekey_confirm.text("Error");
            alert_bulma(error);
            setTimeout(function() {
                changekey_confirm.removeClass("is-danger");
                changekey_confirm.text("Set");
            }, 3000);
        });
}


function create_iotdevices(iot_devices) {
    $(".iotsection").fadeIn();

    finalhtml = "";
    for (device in iot_devices) {
        for (data in iot_devices[device]) {
            icon = "";
            if (data.toLowerCase().includes("temp")) {
                icon = "fa fa-thermometer-half";
                iot_devices[device][data] = iot_devices[device][data].replace("*", "°")
            } else if (data.toLowerCase().includes("hum")) icon = "fa fa-tint";
            else if (data.toLowerCase().includes("volt")) icon = "fa fa-bolt";
            else if (data.toLowerCase().includes("amp")) icon = "fa fa-bolt";
            else if (data.toLowerCase().includes("wat")) icon = "fa fa-bolt";

            finalhtml += iot_template
                .replace("{{DEVICE}}", device)
                .replace("{{DATA}}", iot_devices[device][data])
                .replace("{{ICON}}", icon)
                .replace("{{NAME}}", data);
        }
    }
    $(".iotdata").html(finalhtml);
}

function create_miners(user_miners) {
    total_hashrate = 0;
    t_miners = []
    iot_devices = {}
    if (user_miners.length) {
        for (let miner in user_miners) {
            let miner_wallet_id = user_miners[miner]["wd"];
            if (!miner_wallet_id) miner_wallet_id = Math.floor(Math.random() * 2812);
            const miner_hashrate = user_miners[miner]["hashrate"];
            const miner_rejected = user_miners[miner]["rejected"];
            const miner_accepted = user_miners[miner]["accepted"];
            const miner_sharerate = user_miners[miner]["sharerate"];
            total_hashrate += miner_hashrate;

            if (!t_miners[miner_wallet_id]) {
                t_miners[miner_wallet_id] = user_miners[miner];
                t_miners[miner_wallet_id]["threads"] = 1;
                t_miners[miner_wallet_id]["threadid"] = user_miners[miner]["threadid"];

                if (user_miners[miner]["it"] != null) {
                    if (!user_miners[miner]["it"].includes(":")) {
                        temp = user_miners[miner]["it"].split("@")[0];
                        hum = user_miners[miner]["it"].split("@")[1];

                        if (!hum) hum = `Error<br><small class="is-size-6 has-text-grey">
                                        Check your wiring and code</small>`;
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
                t_miners[miner_wallet_id]["sharerate"] += miner_sharerate;
                t_miners[miner_wallet_id]["hashrate"] += miner_hashrate;
                t_miners[miner_wallet_id]["rejected"] += miner_rejected;
                t_miners[miner_wallet_id]["accepted"] += miner_accepted;
                t_miners[miner_wallet_id]["threads"] += 1;

                if (user_miners[miner]["it"] != null) {
                    if (!user_miners[miner]["it"].includes(":")) {
                        temp = user_miners[miner]["it"].split("@")[0];
                        hum = user_miners[miner]["it"].split("@")[1];

                        if (!hum) hum = `Error<br><small class="is-size-6 has-text-grey">
                                        Check you wiring and code</small>`;
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

        if (Object.keys(iot_devices).length) {
            create_iotdevices(iot_devices);
        }

        t_miners = t_miners.sort(function(a, b) {
            if (a.identifier < b.identifier) { return -1; }
            if (a.identifier > b.identifier) { return 1; }
            return 0;
        });

        miners = t_miners;
        miner_num = 0;
        miners_html = "";

        for (let miner in t_miners) {
            miner_num += 1;
            miner_hashrate = t_miners[miner]["hashrate"];
            miner_identifier = t_miners[miner]["identifier"];
            miner_software = t_miners[miner]["software"];
            miner_diff = t_miners[miner]["diff"];
            miner_rejected = t_miners[miner]["rejected"];
            miner_accepted = t_miners[miner]["accepted"];
            miner_count = t_miners[miner]["threads"];
            miner_ping = t_miners[miner]["pg"];

            if (!miner_identifier || miner_identifier === "None") {
                miner_name = miner_software;
                miner_soft = "";
            } else {
                miner_name = miner_identifier;
                miner_soft = miner_software + ", ";
            }

            let miner_diff_str = scientific_prefix(miner_diff)
            let accepted_rate = round_to(1, (miner_accepted /
                (miner_accepted + miner_rejected) * 100))

            if (miner_software.includes("Starter")) {
                icon = `<img src="assets/starter.gif">`;
            } else if (miner_software.includes("BlushyBox")) {
                icon = `<img src="assets/blushybox.gif">`;
            } else if (miner_software.includes("ESP8266")) {
                icon = `<img src="assets/wemos.gif">`;
            } else if (miner_software.includes("ESP32-S2")) {
                icon = `<img src="assets/esp32s.gif">`;
            } else if (miner_software.includes("ESP32")) {
                icon = `<img src="assets/esp32.gif">`;
            } else if (miner_software.includes("AVR") && miner_diff >= 128) {
                icon = `<img src="assets/pico.gif">`;
            } else if (miner_software.includes("I2C")) {
                color = "#6ab04c";
                icon = `<i class="fa fa-microchip" style="color:${color}"></i>`;
            } else if (miner_software.includes("AVR")) {
                icon = `<img src="assets/arduino.gif">`;
            } else if (miner_software.includes("PC") &&
                (miner_identifier == "Raspberry Pi" ||
                    miner_identifier.includes("RPi"))) {
                icon = `<img src="assets/pi.gif">`;
            } else if (miner_software.includes("PC")) {
                color = "#F97F51";
                icon = `<i class="fa fa-laptop" style="color:${color}"></i>`;
            } else if (miner_software.includes("Web")) {
                color = "#009432";
                icon = `<i class="fa fa-lg fa-globe" style="color:${color}"></i>`;
            } else if (miner_software.includes("Android") ||
                miner_software.includes("Phone") ||
                miner_software.includes("Mini Miner")) {
                color = "#FA983A";
                icon = `<i class="fa fa-lg fa-mobile" style="color:${color}"></i>`;
            } else {
                color = "#EE4B2B";
                icon = `<i class="fa fa-lg fa-question-circle" style="color:${color}"></i>`;
            }

            let accept_color = "has-text-warning-dark";
            if (accepted_rate < 50) {
                accept_color = "has-text-danger-dark";
            } else if (accepted_rate > 95) {
                accept_color = "has-text-success-dark";
            }

            let thread_string = '';
            if (miner_count > 1) {
                thread_string = ` &bull; ${miner_count} threads`;
            }
            miner_name += thread_string;

            function textWidth(text, fontProp) {
                var tag = document.createElement('div')
                tag.style.position = 'absolute'
                tag.style.left = '-99in'
                tag.style.whiteSpace = 'nowrap'
                tag.style.font = fontProp
                tag.innerHTML = text

                document.body.appendChild(tag)
                var result = tag.clientWidth
                document.body.removeChild(tag)
                return result;
            }

            if ((on_mobile() && textWidth(miner_name, 'bold 16px Arial') > $(window).width() * 0.65) ||
                !on_mobile() && textWidth(miner_name, 'bold 16px Arial') > $(window).width() * 0.21) {
                miner_name = `<div class="marquee">
                                <div class="has-text-weight-bold marquee__content">
                                    ${miner_name}
                                </div>
                              </div>`;
            }

            miners_html += miner_template
                .replace("{{NAME}}", miner_name)
                .replace("{{ICON}}", icon)
                .replace("{{EFF}}", accepted_rate + "%")
                .replace("{{EFF_COUNT}}", scientific_prefix(miner_accepted))
                .replace("{{EFF_COLOR}}", accept_color)
                .replace("{{MINER_NUM}}", miner)
                .replace("{{DIFF}}", `&bull; diff ${scientific_prefix(miner_diff)}`)
                .replace("{{PING}}", `&bull; ${miner_ping}ms`)
                .replace("{{HASH}}", scientific_prefix(miner_hashrate) + "H/s");
        }
        $(".nominers").fadeOut();
        $(".miners-content").html(miners_html);
        $(".estimatedprofits_nominers").fadeOut(function() {
            if (miners_state_changed) {
                $(".estimatedprofits_wait").fadeIn();
                miners_state_changed = false;
            }
        });
    } else {
        miners_state_changed = true;
        $(".miners-content").html("");
        $(".nominers").fadeIn();
        $(".iotdata").fadeOut();
        $(".estimatedprofits").fadeOut(function() {
            $(".estimatedprofits_wait").fadeOut(function() {
                $(".estimatedprofits_nominers").fadeIn();
            });
        });
    }

    maxslots = 25;
    if (verified === "yes") maxslots = 50;
    if (verified === "yes" && user_items.includes(10)) maxslots = 75;
    if (verified === "yes" && user_items.includes(11)) maxslots = 100;
    if (verified === "yes" && user_items.includes(11) && user_items.includes(10)) maxslots = 125;
    $(".minercount").html(`<b>${user_miners.flat().length} out of ${maxslots}</b> slots used`);
}


function logout() {
    localStorage.removeItem('theme');
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("balance_history");
    location.reload()
}


function round_to(precision, value) {
    if (precision < 1) precision = 1;
    power_of_ten = 10 ** precision;
    return Math.round(value * power_of_ten) / power_of_ten;
}


function scientific_prefix(value) {
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
}


function focus_mining_key() {
    if (on_mobile()) screen('screen-settings-mobile');
    else screen('screen-settings-desktop')
    setTimeout(function() {
        if (on_mobile()) {
            $("#mining_key")[0].scrollIntoView();
            $("#mining_key").focus();
        } else {
            $("#mining_key_desktop")[0].scrollIntoView();
            $("#mining_key_desktop").focus();
        }
    }, 300)
}


function miner_details(miner_id) {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#minerdetails").show("slide", { direction: "right" }, '50');
    else {
        $("#minerdetails").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("minerdetails") && $('#minerdetails').is(":visible")) {
                close_minerdetails();
            }
        });
    }

    $("#miner_name").text(miners[miner_id]["software"])
    miner_ki = miners[miner_id]["ki"];
    miner_diff = miners[miner_id]["diff"];
    miner_identifier = miners[miner_id]["identifier"];
    miner_software = miners[miner_id]["software"];
    miner_hashrate = miners[miner_id]["hashrate"];
    miner_ping = miners[miner_id]["pg"];

    percentage = 0.8;
    miner_type = "Other";
    device_icon = "<i class='fa fa-check-circle has-text-success'></i>";
    hashrate_icon = "<i class='fa fa-check-circle has-text-success'></i>";
    ping_icon = "<i class='fa fa-check-circle has-text-success'></i>";
    accept_icon = "<i class='fa fa-check-circle has-text-success'></i>";
    diff_icon = "<i class='fa fa-check-circle has-text-success'></i>";
    hashrate_range = [1000, 99999999];
    diff_range = [1000, 99999999];

    if (miner_ping > 700) {
        ping_icon = "<i class='fa fa-exclamation-triangle has-text-warning'></i>";
    }

    if ((miners[miner_id]["accepted"] / (miners[miner_id]["accepted"] + miners[miner_id]["rejected"])) < 0.8) {
        accept_icon = "<i class='fa fa-exclamation-triangle has-text-warning'></i>";
    }

    if (miner_software.includes("Starter")) {
        color = "#BB4B00";
        icon = `<img src="assets/starter.gif">`;
        miner_type = "ESP8266";
        percentage = 0.96;
        hashrate_range = [18000, 30000];
        diff_range = [1000, 6000];
    } else if (miner_software.includes("BlushyBox")) {
        color = "#ec42f5";
        icon = `<img src="assets/blushybox.gif">`;
        miner_type = "ESP32";
        if (miner_software.includes("ESP8266")) miner_type = "ESP8266";
        percentage = 0.96;
        hashrate_range = [18000, 95000];
        diff_range = [1000, 9000];
    } else if (miner_software.includes("ESP8266")) {
        icon = `<img src="assets/wemos.gif">`;
        color = "#4895EF";
        miner_type = "ESP8266";
        percentage = 0.96;
        hashrate_range = [51000, 91000];
        diff_range = [4999, 5001];
    } else if (miner_software.includes("ESP32-S2")) {
        color = "#6B6B6B";
        icon = `<img src="assets/esp32s.gif">`;
        miner_type = "ESP32-S2";
        percentage = 0.96;
        hashrate_range = [65000, 130000];
        diff_range = [6399, 6401];
    } else if (miner_software.includes("ESP32")) {
        color = "#6B6B6B";
        icon = `<img src="assets/esp32.gif">`;
        miner_type = "ESP32";
        percentage = 0.96;
        hashrate_range = [40000, 200000];
        diff_range = [8199, 8201];
    } else if (miner_software.includes("AVR") && miner_diff >= 128) {
        icon = `<img src="assets/pico.gif">`;
        color = "#056938";
        miner_type = "AVR (Pico)";
        percentage = 0.96;
        hashrate_range = [15000, 25000];
        diff_range = [128, 2000];
    } else if (miner_software.includes("I2C")) {
        color = "#6ab04c";
        icon = `<i class="fa fa-microchip" style="color:${color}"></i>`;
        miner_type = "AVR (I²C)";
        percentage = 0.96;
        hashrate_range = [100, 400];
        diff_range = [8, 16];
    } else if (miner_software.includes("AVR")) {
        icon = `<img src="assets/arduino.gif">`;
        color = "#4261EE";
        miner_type = "AVR (Normal)";
        percentage = 0.96;
        hashrate_range = [100, 400];
        diff_range = [8, 16];
    } else if (miner_software.includes("PC") && (miner_identifier == "Raspberry Pi" || miner_identifier.includes("RPi"))) {
        icon = `<img src="assets/pi.gif">`;
        color = "#009700";
        miner_type = "PC (Raspberry Pi)";
    } else if (miner_software.includes("PC")) {
        color = "#F97F51";
        icon = `<i class="fa fa-3x fa-laptop" style="color:${color}"></i>`;
        miner_type = "PC (Normal)";
    } else if (miner_software.includes("Web")) {
        color = "#009432";
        icon = `<i class="fa fa-3x fa-globe" style="color:${color}"></i>`;
        miner_type = "PC (Web)";
    } else if (miner_software.includes("Android") || miner_software.includes("Phone") || miner_software.includes("Mini Miner")) {
        color = "#fa983a";
        icon = `<i class="fa fa-3x  fa-mobile" style="color:${color}"></i>`;
        miner_type = "Mobile";
    } else {
        color = "#16a085";
        icon = `<i class="fa fa-3x fa-question-circle" style="color:${color}"></i>`;
        miner_type = "Unknown!";
        device_icon = "<i class='fa fa-exclamation-triangle has-text-warning'></i>";
    }
    $("#miner_nav").css("background", color);
    $("#miner_icon").html(icon);

    miner_efficiency = round_to(2, Math.pow(percentage, miner_ki - 1) * 100);
    efficiency_color = "is-warning";
    if (miner_efficiency < 40) {
        efficiency_color = "is-danger";
    } else if (miner_efficiency > 80) {
        efficiency_color = "is-success";
    }

    if (miner_hashrate > hashrate_range[1] || miner_hashrate < hashrate_range[0]) {
        hashrate_icon = "<i class='fa fa-exclamation-triangle has-text-warning'></i>";
    }

    if (miner_diff > diff_range[1] || miner_diff < diff_range[0]) {
        diff_icon = "<i class='fa fa-exclamation-triangle has-text-warning'></i>";
    }

    let thread_string = '';
    if (miners[miner_id]["threads"] > 1) thread_string = `(${miners[miner_id]["threads"]} threads)`

    if (miners[miner_id]["sharerate"] <= 1) share_string = `${miners[miner_id]["sharerate"]} share/min`;
    else share_string = `${miners[miner_id]["sharerate"]} shares/min`;

    finalhtml = `
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Identifier
            </div>
            <div class="column">
                <b>${miners[miner_id]["identifier"]}</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Software
            </div>
            <div class="column">
                <b>${miners[miner_id]["software"]}</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Hashrate
            </div>
            <div class="column">
                <b>${scientific_prefix(miners[miner_id]["hashrate"])}H/s</b>
                ${thread_string}
            </div>
            <div class="column is-narrow">
                ${hashrate_icon}
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Accepted shares
            </div>
            <div class="column">
                <b>
                    ${miners[miner_id]["accepted"]} 
                    /
                    ${miners[miner_id]["accepted"]+miners[miner_id]["rejected"]}
                </b> (${round_to(1, (miners[miner_id]["accepted"]/
                        (miners[miner_id]["accepted"]+miners[miner_id]["rejected"]))*100)}%)
            </div>
            <div class="column is-narrow">
                ${accept_icon}
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Difficulty
            </div>
            <div class="column">
                <b>${scientific_prefix(miners[miner_id]["diff"])}</b>
            </div>
            <div class="column is-narrow">
                ${diff_icon}
            </div>
        </div>
        <div class="columns is-gapless is-mobile is-vcentered">
            <div class="column is-4">
                Efficiency
            </div>
            <div class="column">
                <progress class="progress ${efficiency_color} show-value" 
                          min="0" max="100" 
                          value="${miner_efficiency}">
                    ${miner_efficiency}
                </progress>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Ping
            </div>
            <div class="column is-3">
                <b>${miners[miner_id]["pg"]}ms</b>
            </div>
            <div class="column">
                (${miners[miner_id]["pool"].replace("pool", "node")})
            </div>
            <div class="column is-narrow">
                ${ping_icon}
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Last share
            </div>
            <div class="column">
                <b>${round_to(3, miners[miner_id]["sharetime"])}s</b>
                (${share_string})
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Device type
            </div>
            <div class="column">
                <b>${miner_type}</b>
            </div>
            <div class="column is-narrow">
                ${device_icon}
            </div>
        </div>`

    $("#miner_content").html(finalhtml)
}


function close_minerdetails() {
    if (on_mobile()) {
        $("#minerdetails").hide("slide", { direction: "right" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#minerdetails").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function buymenu() {
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#buymenu").show("slide", { direction: "right" }, '50');
    else {
        $("#buymenu").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("buymenu") && $('#buymenu').is(":visible")) {
                close_buymenu();
            }
        });
    }
    $("#receive_username").text(username);
}


function close_buymenu() {
    if (on_mobile()) {
        $("#buymenu").hide("slide", { direction: "right" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#buymenu").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function help_screen() {
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#help").show("slide", { direction: "down" }, '50');
    else {
        $("#help").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("help") && $('#help').is(":visible")) {
                close_help();
            }
        });
    }
}


function close_help() {
    if (on_mobile()) {
        $("#help").hide("slide", { direction: "down" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#help").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}

function adblock_alert() {
    //alert_bulma("Please disable your ad-blocking software. There is just a single ad space on this website and we have to pay the bills somehow.");
}


function view_achievements() {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#achievements").show("slide", { direction: "right" }, '50');
    else {
        $("#achievements").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("achievements") && $('#achievements').is(":visible")) {
                close_achievements();
            }
        });
    }
}


function close_achievements() {
    if (on_mobile()) {
        $("#achievements").hide("slide", { direction: "right" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#achievements").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function open_shop() {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#shop").show("slide", { direction: "right" }, '50');
    else {
        $("#shop").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("shop") && $('#shop').is(":visible")) {
                close_shop();
            }
        });
    }
}


function close_shop() {
    if (on_mobile()) {
        $("#shop").hide("slide", { direction: "right" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#shop").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function toggleItem(itemid) {
    if (enabledItems.includes(itemid)) {
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
    } else {
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


function refresh_iot_charts() {
    let charts = {};

    function fetch_iot_data(username) {
        let days = $("#iot-data-since").val();
        fetch(`https://${api_url}/historic_iot?username=${username}&days=${days}`)
            .then(response => response.json())
            .then(data => {
                if (data.datasets.length) create_iot_charts(data);
            })
            .catch(error => {
                console.error('Error fetching IoT data:', error);
            });
        setTimeout(function() {
            fetch_iot_data(username);
        }, 60 * 1000);
    }

    function create_iot_charts(data) {
        let chartContainer = document.getElementById('chartContainer');
        chartContainer.innerHTML = '';

        let startAtZero = $("#iot-start-zero").is(':checked');

        let chartColors = [
            'green', 'red', 'orange', 'blue', 'purple', 'cyan', 'magenta', 'yellow'
        ];

        let datasetsByThreadId = {};

        data.datasets.forEach(dataset => {
            let threadId = dataset.label;
            if (!datasetsByThreadId[threadId]) {
                datasetsByThreadId[threadId] = [];
            }
            datasetsByThreadId[threadId].push(dataset);
        });

        let color_idx = 0;
        for (let threadId in datasetsByThreadId) {
            if (datasetsByThreadId.hasOwnProperty(threadId)) {
                let datasets = datasetsByThreadId[threadId];

                let canvas_div = document.createElement('div');
                canvas_div.classList.add('column');
                canvas_div.classList.add('is-half');
                chartContainer.appendChild(canvas_div);

                let canvas = document.createElement('canvas');
                canvas_div.appendChild(canvas);

                let ctx = canvas.getContext('2d');

                datasets.forEach((dataset, index) => {
                    dataset.borderColor = chartColors[color_idx % chartColors.length];
                });

                if (charts[threadId]) {
                    charts[threadId].data.labels = data.labels.map(timestamp => new Date(timestamp * 1000).toLocaleString());
                    charts[threadId].data.datasets = datasets;
                    charts[threadId].options.scales.y.beginAtZero = startAtZero;
                    charts[threadId].update();
                } else {
                    charts[threadId] = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.labels.map(timestamp => new Date(timestamp * 1000).toLocaleString()),
                            datasets: datasets
                        },
                        options: {
                            animation: {
                                duration: 0
                            },
                            responsive: true,
                            elements: {
                                line: {
                                    tension: 0.15,
                                },
                                point: {
                                    radius: 2,
                                }
                            },
                            title: {
                                display: true,
                                text: threadId
                            },
                            scales: {
                                y: {
                                    beginAtZero: startAtZero
                                }
                            }
                        }
                    });
                }

                color_idx++;
            }
        }
    }

    fetch_iot_data(username);
}



function refresh_shop(user_items) {
    fetch(`https://server.duinocoin.com/shop_items`)
        .then(response => response.json())
        .then(data => {
            shop_items = data.result;

            finalhtml = "";
            for (item in shop_items) {
                if (user_items) {
                    if (!shop_items[item]["display"] && !(user_items.includes(parseInt(item)))) continue;
                }

                button_string = `
                        <button class="button is-fullwidth" disabled>
                            Owned
                        </button>`;
                if (VISUAL_ITEMS.includes(parseInt(item)) && user_items.includes(parseInt(item))) {
                    button_string = `
                    <label class="checkbox-label">
                        <input class="checkbox" type="checkbox" ${enabledItems.includes(parseInt(item)) ? "checked" : ""} onclick="toggleItem(${item});">
                        Display (PC)
                    </label>`
                } else if (!user_items.includes(parseInt(item))) {
                    button_string = `
                        <button class="button is-success is-fullwidth" onclick="shop_buy('${item}')" id="${item}_button">
                            Buy for
                            &nbsp;<i class="fa fa-coins"></i>&nbsp;
                            ${shop_items[item]["price"]} DUCO
                        </button>`;
                }

                finalhtml += shop_template
                    .replace("{{NAME}}", shop_items[item]["name"])
                    .replace("{{DESCRIPTION}}", shop_items[item]["description"])
                    .replace("{{ICON}}", shop_items[item]["icon"])
                    .replace("{{BUTTON}}", button_string);
            }
            $(".shop_content").html(finalhtml)
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
}


function shop_buy(item_name) {
    old_text = $(`#${item_name}_button`).html()
    $(`#${item_name}_button`).addClass("is-loading");
    fetch("https://server.duinocoin.com/shop_buy/" + encodeURIComponent(username) +
            "?item=" + item_name +
            "&password=" + encodeURIComponent(password))
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                $(`#${item_name}_button`).text("Success");
                user_items.push(item_name);
                refresh_shop(user_items);
            } else {
                $(`#${item_name}_button`).attr("disabled", true);
                $(`#${item_name}_button`).removeClass("is-success");
                $(`#${item_name}_button`).addClass("is-danger");
                $(`#${item_name}_button`).text("Error");
                alert_bulma(data.message);
            }
            $(`#${item_name}_button`).removeClass("is-loading");
            setTimeout(function() {
                $(`#${item_name}_button`).attr("disabled", false);
                $(`#${item_name}_button`).removeClass("is-danger");
                $(`#${item_name}_button`).addClass("is-success");
                $(`#${item_name}_button`).html(old_text);
            }, 3000)
        }).catch(function(error) {
            $(`#${item_name}_button`).removeClass("is-loading");
            $(`#${item_name}_button`).attr("disabled", true);
            $(`#${item_name}_button`).removeClass("is-success");
            $(`#${item_name}_button`).addClass("is-danger");
            $(`#${item_name}_button`).text("Error");
            alert_bulma(error);
            setTimeout(function() {
                $(`#${item_name}_button`).attr("disabled", false);
                $(`#${item_name}_button`).removeClass("is-danger");
                $(`#${item_name}_button`).addClass("is-success");
                $(`#${item_name}_button`).html(old_text);
            }, 3000)
        });
}


function tx_details(tx_id) {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#txdetails").show("slide", { direction: "right" }, '50');
    else {
        $("#txdetails").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("txdetails") && $('#txdetails').is(":visible")) {
                close_txdetails();
            }
        });
    }

    tx = transactions[tx_id];

    $("#transaction_id").text("#" + tx.id);

    if (CHAIN_ACCOUNTS.includes(tx.recipient)) {
        $("#transaction_nav").addClass("is-info")
        $("#transaction_icon_color").addClass("has-text-info");
        $("#transaction_icon").addClass("fa-redo")
    } else if (tx.sender == username) {
        $("#transaction_nav").addClass("is-danger")
        $("#transaction_icon_color").addClass("has-text-danger");
        $("#transaction_icon").addClass("fa-arrow-up")
    } else {
        $("#transaction_nav").addClass("is-success")
        $("#transaction_icon_color").addClass("has-text-success");
        $("#transaction_icon").addClass("fa-arrow-down")
    }

    finalhtml = `
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Status
            </div>
            <div class="column">
                <b>Delivered</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Sender
            </div>
            <div class="column">
                <b>${tx.sender}</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Recipient
            </div>
            <div class="column">
                <b>${tx.recipient}</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Amount
            </div>
            <div class="column">
                <b>${tx.amount} DUCO</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Date
            </div>
            <div class="column">
                <b>${tx.datetime} (UTC)</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column  is-4">
                Memo
            </div>
            <div class="column text-wrap">
                <b>"${tx.memo}"</b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                Hash
            </div>
            <div class="column text-wrap">
                <b>
                    <a href="https://explorer.duinocoin.com/?search=${tx.hash}" target="_blank">
                        ${tx.hash}
                    </a>
                    <a onclick="copy('${tx.hash}', this)">
                        <i class="fa fa-copy"></i>
                    </a>
                </b>
            </div>
        </div>
        <div class="columns is-gapless is-mobile">
            <div class="column is-4">
                ID
            </div>
            <div class="column">
                <b>${tx.id}</b>
                <a onclick="copy('${tx.id}', this)"><i class="fa fa-copy"></i></a>
            </div>
        </div>`

    $("#transaction_content").html(finalhtml);
}


function close_txdetails() {
    if (on_mobile()) {
        $("#txdetails").hide("slide", { direction: "right" }, '50', function() {
            $("#transaction_nav").removeClass("is-danger")
            $("#transaction_icon_color").removeClass("has-text-danger");
            $("#transaction_nav").removeClass("is-success")
            $("#transaction_icon_color").removeClass("has-text-success");
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#txdetails").fadeOut('fast', function() {
            $("#transaction_nav").removeClass("is-danger")
            $("#transaction_icon_color").removeClass("has-text-danger");
            $("#transaction_nav").removeClass("is-success")
            $("#transaction_icon_color").removeClass("has-text-success");
            $("html").css("overflow-y", "scroll");
        });
    }
}


function open_txsend() {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#txsend").show("slide", { direction: "down" }, '50');
    else {
        $("#txsend").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("txsend") && $('#txsend').is(":visible")) {
                close_txsend();
            }
        });
    }
}


function close_txsend() {
    if (on_mobile()) {
        $("#txsend").hide("slide", { direction: "down" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#txsend").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function open_txwrap() {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#txwrap").show("slide", { direction: "down" }, '50');
    else {
        $("#txwrap").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("txwrap") && $('#txwrap').is(":visible")) {
                close_txwrap();
            }
        });
    }
}


function close_txwrap() {
    if (on_mobile()) {
        $("#txwrap").hide("slide", { direction: "down" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#txwrap").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function fill_stake_amount(percentage) {
    stake_amount = $("#stake_amount")
    stake_amount.val(round_to(3, (percentage / 100) * balance));

    stake_reward = $("#stake_reward");
    stake_reward.val(round_to(3, (stake_amount.val() *
        (1 + (STAKING_PERC / 100)))));
}


$("#stake_amount").on("input", function() {
    stake_amount = $("#stake_amount");
    stake_reward = $("#stake_reward");

    stake_reward.val(round_to(3, (stake_amount.val() *
        (1 + (STAKING_PERC / 100)))));
})


function open_stakemenu() {
    if (adBlockEnabled) adblock_alert();
    $("html").css("overflow-y", "hidden");
    if (on_mobile()) $("#stakemenu").show("slide", { direction: "right" }, '50');
    else {
        $("#stakemenu").fadeIn('fast');
        $(document).click(function(event) {
            if (event.target.id == ("stakemenu") && $('#stakemenu').is(":visible")) {
                close_stakemenu();
            }
        });
    }
}


function close_stakemenu() {
    if (on_mobile()) {
        $("#stakemenu").hide("slide", { direction: "right" }, '50', function() {
            $("html").css("overflow-y", "scroll");
        });
    } else {
        $("#stakemenu").fadeOut('fast', function() {
            $("html").css("overflow-y", "scroll");
        });
    }
}


function stake() {
    stake_amount = $("#stake_amount").val();
    stake_confirm = $("#stake_confirm");

    if (stake_amount < 20) {
        $("#stake_amount").effect("shake", { distance: 5 });
        return;
    }

    stake_confirm.addClass("is-loading");
    grecaptcha.ready(function() {
        grecaptcha.execute('6LdJ9XsgAAAAAMShiVvOtZ4cAbvvdkw7sHKQDV-6', { action: 'submit' }).then(function(token) {
            fetch("https://server.duinocoin.com/stake/" + encodeURIComponent(username) +
                    "?password=" + encodeURIComponent(password) +
                    "&amount=" + encodeURIComponent(stake_amount) +
                    "&captcha=" + encodeURIComponent(token))
                .then(response => response.json())
                .then(data => {
                    stake_confirm.removeClass("is-loading");
                    if (data.success) {
                        $('#stake_amount').val('');
                        stake_confirm.html("<i class='fa fa-check'></i>")
                        user_data(username);
                    } else {
                        stake_confirm.removeClass("is-success");
                        stake_confirm.addClass("is-danger");
                        stake_confirm.text("Error")
                        alert_bulma(data.message);
                    }
                    setTimeout(function() {
                        stake_confirm.removeClass("is-danger");
                        stake_confirm.addClass("is-success");
                        stake_confirm.text("Stake")
                    }, 3000);
                }).catch(error => {
                    stake_confirm.removeClass("is-loading");
                    stake_confirm.removeClass("is-success");
                    stake_confirm.addClass("is-danger");
                    stake_confirm.text("Error")
                    alert_bulma(error);
                    setTimeout(function() {
                        stake_confirm.removeClass("is-danger");
                        stake_confirm.addClass("is-success");
                        stake_confirm.text("Stake")
                    }, 3000);
                })
        });
    });
}


function update_wrap_fees() {
    wrap_network = document.getElementById("wrap_network").value;
    $(".wrap_fee").text(wrap_api["fee"][wrap_network]);
    $(".wrap_min").text(wrap_api["min"][wrap_network]);
}


function wrap() {
    wrap_network = document.getElementById("wrap_network").value;
    wrap_amount = document.getElementById("wrap_amount").value;
    address = document.getElementById("wrap_address").value;

    if (!address) {
        $("#wrap_address").effect("shake", { distance: 5 });
        return;
    }

    if (wrap_amount < wrap_api["min"][wrap_network] || wrap_amount > balance) {
        $("#wrap_amount").effect("shake", { distance: 5 });
        return;
    }

    document.getElementById("wrap_confirm").classList.add("is-loading");

    if (wrap_network == "wDUCO") {
        fetch("https://server.duinocoin.com/wduco_wrap/" + encodeURIComponent(username) +
                "?password=" + encodeURIComponent(password) +
                "&address=" + encodeURIComponent(address) +
                "&amount=" + encodeURIComponent(wrap_amount))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    $("#wrap_confirm").removeClass("is-info");
                    $("#wrap_confirm").addClass("is-success");
                    $("#wrap_confirm").text("Sucessful wrap");
                    $('#wrap_amount').val('');
                    $('#wrap_address').val('');
                } else {
                    $("#wrap_confirm").attr("disabled", true);
                    $("#wrap_confirm").removeClass("is-info");
                    $("#wrap_confirm").addClass("is-danger");
                    $("#wrap_confirm").text("Error");
                    alert_bulma(data.message);
                }
                document.getElementById("wrap_confirm").classList.remove("is-loading");
                setTimeout(function() {
                    $("#wrap_confirm").attr("disabled", false);
                    $("#wrap_confirm").removeClass("is-danger");
                    $("#wrap_confirm").removeClass("is-success");
                    $("#wrap_confirm").addClass("is-info");
                    $("#wrap_confirm").text("Wrap");
                }, 3000)
            }).catch(function(error) {
                document.getElementById("wrap_confirm").classList.remove("is-loading");
                $("#wrap_confirm").attr("disabled", true);
                $("#wrap_confirm").removeClass("is-info");
                $("#wrap_confirm").addClass("is-danger");
                $("#wrap_confirm").text("Error");
                alert_bulma(error);
                setTimeout(function() {
                    $("#wrap_confirm").attr("disabled", false);
                    $("#wrap_confirm").removeClass("is-danger");
                    $("#wrap_confirm").removeClass("is-success");
                    $("#wrap_confirm").addClass("is-info");
                    $("#wrap_confirm").text("Wrap");
                }, 3000)
            });
    } else {
        fetch("https://server.duinocoin.com/transaction/" +
                "?username=" + encodeURIComponent(username) +
                "&password=" + encodeURIComponent(password) +
                "&recipient=" + encodeURIComponent(wrap_network) +
                "&memo=" + encodeURIComponent(address) +
                "&amount=" + encodeURIComponent(wrap_amount))
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    $("#wrap_confirm").removeClass("is-info");
                    $("#wrap_confirm").addClass("is-success");
                    $("#wrap_confirm").text("Sucessful wrap");
                    $('#wrap_amount').val('');
                    $('#wrap_address').val('');
                } else {
                    $("#wrap_confirm").attr("disabled", true);
                    $("#wrap_confirm").removeClass("is-info");
                    $("#wrap_confirm").addClass("is-danger");
                    $("#wrap_confirm").text("Error");
                    alert_bulma(data.message.split(",")[1]);
                }
                document.getElementById("wrap_confirm").classList.remove("is-loading");
                setTimeout(function() {
                    $("#wrap_confirm").attr("disabled", false);
                    $("#wrap_confirm").removeClass("is-danger");
                    $("#wrap_confirm").removeClass("is-success");
                    $("#wrap_confirm").addClass("is-info");
                    $("#wrap_confirm").text("Wrap");
                }, 3000)
            }).catch(function(error) {
                document.getElementById("wrap_confirm").classList.remove("is-loading");
                $("#wrap_confirm").attr("disabled", true);
                $("#wrap_confirm").removeClass("is-info");
                $("#wrap_confirm").addClass("is-danger");
                $("#wrap_confirm").text("Error");
                alert_bulma(error);
                setTimeout(function() {
                    $("#wrap_confirm").attr("disabled", false);
                    $("#wrap_confirm").removeClass("is-danger");
                    $("#wrap_confirm").removeClass("is-success");
                    $("#wrap_confirm").addClass("is-info");
                    $("#wrap_confirm").text("Wrap");
                }, 3000)
            });
    }
}


function send() {
    let recipient = $('#send_recipient').val().trim()
    let amount = $('#send_amount').val().trim()
    let memo = $('#send_memo').val().trim()

    if (!recipient) {
        $("#send_recipient").effect("shake", { distance: 5 });
        return;
    }

    if (!amount) {
        $("#send_amount").effect("shake", { distance: 5 });
        return;
    }

    $("#send_confirm").addClass('is-loading');
    $.getJSON('https://server.duinocoin.com/transaction/' +
        '?username=' + encodeURIComponent(username) +
        "&password=" + encodeURIComponent(password) +
        "&recipient=" + encodeURIComponent(recipient) +
        "&amount=" + encodeURIComponent(amount) +
        "&memo=" + encodeURIComponent(memo),
        function(data) {
            $("#send_confirm").removeClass('is-loading');
            if (data.success == true) {
                $('#send_recipient').val('');
                $('#send_amount').val('');
                $('#send_memo').val('');
                $("#send_confirm").removeClass("is-danger");
                $("#send_confirm").addClass("is-success");
                $("#send_confirm").text("Sucessful transfer");
            } else {
                $("#send_confirm").text("Error");
                alert_bulma(data.message.split(",")[1])
            }
            setTimeout(function() {
                $("#send_confirm").attr("disabled", false);
                $("#send_confirm").removeClass("is-success");
                $("#send_confirm").addClass("is-danger");
                $("#send_confirm").text("Send");
            }, 3000);
        })
}


function refresh_event() {
    fetch(`https://${api_url}/event`)
        .then(response => response.json())
        .then(data => {
            if (data.result.topic != "None") {
                q = Math.abs(new Date() / 1000 - data.result.starts);
                d = Math.abs(data.result.ends - data.result.starts);
                progress_val = (q / d) * 100

                $(".event_box").fadeIn();
                $(".event_title").html(data.result.topic);
                $(".event_desc").html(data.result.description);
                $(".eventprogress").attr('value', progress_val);
            }
        });
}
refresh_event()


function more_transactions() {
    $(".more_tx").addClass("is-loading");
    transaction_limit += 10;
    user_data(username);
}


function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (Math.floor(interval) == 1) {
        return Math.floor(interval) + " year ago";
    }
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (Math.floor(interval) == 1) {
        return Math.floor(interval) + " month ago";
    }
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (Math.floor(interval) == 1) {
        return Math.floor(interval) + " day ago";
    }
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (Math.floor(interval) == 1) {
        return Math.floor(interval) + " hour ago";
    }
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (Math.floor(interval) == 1) {
        return Math.floor(interval) + " minute ago";
    }
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    if (Math.floor(seconds) == 1) {
        return Math.floor(seconds) + " second ago";
    }
    return Math.floor(seconds) + " seconds ago";
}


function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}


function copy(text, element) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
        $(element).html("<i class='fa fa-check'></i>")
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
        $(element).html("<i class='fa fa-times-circle'></i>")
    });

    setTimeout(function() {
        $(element).html("<i class='fa fa-copy'></i>")
    }, 1000)
}


function calculator_warning() {
    alert_bulma(`Estimated value straight from gathered benchmarks (2020-2021). It may not be very accurate at this time.`);
}



function estimated_price_warning() {
    alert_bulma(`Estimated value based on the highest exchange rate. No guarantee that any of the exchange sites has enough liquidity in it's reserves to swap your coins at that rate.`);
}


function estimated_earnings_warning() {
    alert_bulma(`Estimated value calculated from last balance changes. The estimation will not be 100% accurate and should only be used as a reference.`);
}


$(document).keyup(function(e) {
    if (e.key === "Escape") {
        close_alert();
        close_help();
        close_shop();
        close_stakemenu();
        close_txsend();
        close_txwrap();
        close_achievements();
        close_txdetails();
        close_minerdetails();
        close_buymenu();
        close_settings();
    } else if (e.key === "Enter") {
        setTimeout(function() {
            $("#loginbutton_desktop").click();
        }, 150);

    }
});


function on_mobile() {
    const ua = navigator.userAgent;
    if ($(window).width() >= 1024) return false;
    if (/Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return true;
    }
    return false;
}


function pass_reset_open() {
    $("#login-desktop").fadeOut('fast', function() {
        $("#login-mobile").fadeOut('fast', function() {
            $("#pass_reset").fadeIn('fast');
        });
    });
}


function register_open() {
    $("body").append('<script src="https://js.hcaptcha.com/1/api.js" async defer></script>');
    $("#login-desktop").fadeOut('fast', function() {
        $("#login-mobile").fadeOut('fast', function() {
            $("#register").fadeIn('fast');
        });
    });
}


function register_quiz_start() {
    $("#register_start").fadeOut('fast');
    $("#register_fail").fadeOut('fast', function() {
        $("#register_content_start").fadeOut('fast', function() {
            $("#register_content_1").fadeIn('fast');
            $("#register_buttons_1").fadeIn('fast');
        });
    });
}


function register_quiz_1(result) {
    if (result > 1) {
        $("#register_content_1").fadeOut('fast');
        $("#register_buttons_1").fadeOut('fast', function() {
            $("#register_content_2").fadeIn('fast');
            $("#register_buttons_2").fadeIn('fast');
        });
    } else {
        $("#register_content_1").fadeOut('fast');
        $("#register_buttons_1").fadeOut('fast', function() {
            $("#register_fail").fadeIn('fast');
        });
    }
}


function register_quiz_2(result) {
    if (result > 1) {
        $("#register_content_2").fadeOut('fast');
        $("#register_buttons_2").fadeOut('fast', function() {
            $("#register_content_3").fadeIn('fast');
            $("#register_buttons_3").fadeIn('fast');
        });
    } else {
        $("#register_content_2").fadeOut('fast');
        $("#register_buttons_2").fadeOut('fast', function() {
            $("#register_fail").fadeIn('fast');
        });
    }
}


function register_quiz_3(result) {
    if (result == 2) {
        $("#register_content_3").fadeOut('fast');
        $("#register_buttons_3").fadeOut('fast', function() {
            $("#register_content_4").fadeIn('fast');
            $("#register_buttons_4").fadeIn('fast');
        });
    } else {
        $("#register_content_3").fadeOut('fast');
        $("#register_buttons_3").fadeOut('fast', function() {
            $("#register_fail").fadeIn('fast');
        });
    }
}


function register_quiz_4(result) {
    if (result == 2) {
        $("#register_content_4").fadeOut('fast');
        $("#register_buttons_4").fadeOut('fast', function() {
            $("#register_content_5").fadeIn('fast');
            $("#register_buttons_5").fadeIn('fast');
        });
    } else {
        $("#register_content_4").fadeOut('fast');
        $("#register_buttons_4").fadeOut('fast', function() {
            $("#register_fail").fadeIn('fast');
        });
    }
}


function register_quiz_5(result) {
    if (result == 1) {
        $("#register_content_5").fadeOut('fast');
        $("#register_buttons_5").fadeOut('fast', function() {
            $("#register_content_6").fadeIn('fast');
            $("#register_buttons_6").fadeIn('fast');
        });
    } else {
        $("#register_content_5").fadeOut('fast');
        $("#register_buttons_5").fadeOut('fast', function() {
            $("#register_fail").fadeIn('fast');
        });
    }
}


function register_quiz_end() {
    $("#register_content_6").fadeOut('fast');
    $("#register_buttons_6").fadeOut('fast', function() {
        $("#register_end_1").fadeIn('fast');
    });
}


function register_end_1() {
    if (checkInputs_1()) {
        $("#register_end_1").fadeOut('fast', function() {
            $("#register_end_2").fadeIn('fast');
        });
    }
}


function register_end_2() {
    if (checkInputs_2()) {
        $("#register_button").addClass("is-loading");
        fetch('https://server.duinocoin.com/register/' +
                '?username=' + encodeURIComponent(register_username.val().trim()) +
                '&password=' + encodeURIComponent(register_password.val()) +
                '&email=' + encodeURIComponent(register_email.val().trim()) +
                '&key=' + encodeURIComponent(register_miner_key.val().trim()) +
                '&captcha=' + encodeURIComponent(captcha))
            .then(data => data.json()).then((data) => {
                $("#register_button").removeClass("is-loading");
                if (data.success == true) {
                    alert_bulma(`<b>Your wallet has been sucessfully created!</b><br><br>` +
                        `You can now go to the login page and authenticate with your credentials.` +
                        `Soon you'll also receive an e-mail confirming the registration process.` +
                        `<br><b>Have fun</b> using Duino-Coin!` +
                        `<br><button class="button is-fullwidth is-success mt-3" onclick="location.reload()">Back to login</button>`);
                } else {
                    server_message = data.message
                    alert_bulma(server_message + `<br>Please try again`);
                }
            })
            .catch((error) => {
                $("#register_button").removeClass("is-loading");
                alert_bulma(`Your web browser couldn't connect to the Duino-Coin servers.<br><br>

                We'd like to help, but there are many possible causes - 
                before asking the support, try disabling your browser extensions 
                or similar programs and try again.<br><br>

                Make sure nothing blocks server2.duinocoin.com`);
            });
    }
}


$(register_username).focusout(function() {
    fetch(`https://${api_url}/users/` +
        encodeURIComponent(register_username.val().trim())
    ).then(data => data.json()).then(
        (data) => {
            if (data.success) setErrorFor(register_username, 'Username is already taken');
            else setSuccessFor(register_username);
        });
});


check1 = $('#check1');
check2 = $('#check2');
register_email = $("#register_email")
captchainfo = $('#captchainfo');
checkInfo = $("#checkInfo");
register_miner_key = $('#register_miner_key');
let captcha;

function checkInputs_2() {
    captcha = grecaptcha.getResponse();
    const emailValue = register_email.val().trim();
    const miner_keyValue = register_miner_key.val().trim();
    const check1Value = check1.is(':checked');
    const check2Value = check2.is(':checked');
    let isFormValid = true;

    if (miner_keyValue === '') {
        isFormValid = false;
        setErrorFor(register_miner_key, 'Mining key cannot be blank.');
    } else {
        setSuccessFor(register_miner_key);
    }

    if (emailValue === '') {
        setErrorFor(register_email, 'Email cannot be blank.');
        isFormValid = false;
    } else if (!isEmail(emailValue)) {
        setErrorFor(register_email, 'Not a valid email.');
        isFormValid = false;
    } else {
        setSuccessFor(register_email);
    }

    if (captcha !== undefined && captcha !== "") {
        captchainfo.text("");
    } else {
        isFormValid = false;
        captchainfo.text("Please answer the captcha correctly!");
    }

    if (check1Value && check2Value) {
        checkInfo.text("");
    } else {
        isFormValid = false;
        checkInfo.text("Please read and agree to the rules to create an account!");
    }

    return isFormValid;
}

register_username = $("#register_username");
register_password = $("#register_password");
register_password_c = $("#register_password_c");


function checkInputs_1() {
    const usernameValue = register_username.val().trim();
    const passwordValue = register_password.val().trim();
    const passwordConfirmValue = register_password_c.val().trim();
    let isFormValid = true;

    if (usernameValue === '') {
        setErrorFor(register_username, 'Username cannot be blank');
        isFormValid = false;
    } else {
        setSuccessFor(register_username);
    }

    if (passwordValue === '') {
        setErrorFor(register_password, 'Password cannot be blank');
        isFormValid = false;
    } else {
        setSuccessFor(register_password);
    }

    if (passwordConfirmValue === '') {
        setErrorFor(register_password_c, 'Confirm password cannot be blank');
        isFormValid = false;
    } else if (passwordValue !== passwordConfirmValue) {
        setErrorFor(register_password_c, 'The password and confirmation password do not match');
        isFormValid = false;
    } else {
        setSuccessFor(register_password_c);
    }

    return isFormValid;
}


function setErrorFor(input, message) {
    input.addClass('is-danger');
    const field = input.parent();
    const small = field.children('small')[0];
    small.innerText = message;
}


function setSuccessFor(input) {
    input.removeClass('is-danger');
    const field = input.parent();
    const small = field.children('small')[0];
    small.innerText = '';
}


function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


function generatePassword() {
    const user = $("#reset_username");
    if (user.val()) {
        $("#reset_button").addClass("is-loading");
        fetch("https://server.duinocoin.com/recovery?username=" + user.val())
            .then(data => data.json()).then(data => {
                $("#reset_button").removeClass("is-loading");
                if (data.success && data.result.includes("sent")) {
                    alert_bulma(`${data.result}`);
                } else {
                    alert_bulma(`${data.message}`);
                }
            }).catch(err => {
                $("#reset_button").removeClass("is-loading");
                alert_bulma(`Your web browser couldn't connect to the Duino-Coin servers.<br><br>

                    We'd like to help, but there are many possible causes - 
                    before asking the support, try disabling your browser extensions 
                    or similar programs and try again.<br><br>

                    Make sure nothing blocks server2.duinocoin.com`);
            });
    } else {
        setErrorFor(user, "Enter your username!")
    }
}


url = new URL(window.location);
recovery_username = url.searchParams.get("username");
recovery_hash = url.searchParams.get("hash");

if (recovery_username && recovery_hash) {
    fetch("https://server.duinocoin.com/recovering/" + recovery_username + "?hash=" + recovery_hash)
        .then(data => data.json()).then(data => {
            if (data.success && data.result.includes("new password")) {
                alert_bulma(`${data.result}<br><br>

                Your new passphrase: <b>${data.password}</b><br><br>

                Please consider changing it soon.`);
            } else {
                alert_bulma(`<b>${data.message}</b>`);
            }
        })
        .catch(err => {
            alert_bulma(`Your web browser couldn't connect to the Duino-Coin servers.<br><br>

                We'd like to help, but there are many possible causes - 
                before asking the support, try disabling your browser extensions 
                or similar programs and try again.<br><br>

                Make sure nothing blocks server2.duinocoin.com`);
        });
}

greetings = [
    "Welcome back",
    "Hello again",
    "Nice to see you",
    "Hi there",
    "Greetings",
    "Welcome aboard",
    "Hey",
    "Hello",
    "Great to see you",
    "Back in action",
    "Howdy",
    "It's good to have you back",
    "Good to have you here once more",
    "Greetings",
    "Happy mining",
    "Welcome to the vault",
    "May the Kolka be with you",
    "Good luck and have fun",
    "Have a nice day",
    "Hey there",
    "It's been a while",
    "Glad to see you're back",
    "Back and ready for more",
    "Welcome aboard once more",
    "You were missed",
    "It's a pleasure to see you again"
]

$(".greeting").text(greetings[Math.floor(Math.random() * greetings.length)]);

$("#theme_desktop").on('change', function() {
    selected_theme = $("#theme_desktop").val();

    if (selected_theme == "Terminal") {
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', false);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Terminal');
    } else if (selected_theme == "Glossy") {
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', false);
        localStorage.setItem('theme', 'Glossy');
    } else if (selected_theme == "Retro") {
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', false);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Retro');
    } /* else if (selected_theme == "Halloween") {
        //$("#theme-halloween").attr('disabled', false);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Halloween');
    } */ else {
        // default adaptive - disable all
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Adaptive');
    }
});

$("#theme_mobile").on('change', function() {
    selected_theme = $("#theme_mobile").val();

    if (selected_theme == "Terminal") {
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', false);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Terminal');
    } else if (selected_theme == "Glossy") {
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', false);
        localStorage.setItem('theme', 'Glossy');
    } else if (selected_theme == "Retro") {
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', false);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Retro');
    } /* else if (selected_theme == "Halloween") {
        $("#theme-halloween").attr('disabled', false);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Halloween');
    } */ else {
        // default adaptive - disable all
        //$("#theme-halloween").attr('disabled', true);
        $("#theme-retro").attr('disabled', true);
        $("#theme-terminal").attr('disabled', true);
        $("#theme-glossy").attr('disabled', true);
        localStorage.setItem('theme', 'Adaptive');
    }
});


window.addEventListener('load', function() {
    console.log(`%cHold on!`, "color: red; font-size: 3em");
    console.log(`%cThis browser feature is intended for developers.\nIf someone instructed you to copy and paste something here to enable some feature or to "hack" someone's account, it usually means he's trying to get access to your account.`, "font-size: 1.5em;");
    console.log(`%cDo not execute unknown code here. We will not be responsible for your loss.`, "color: orange; font-size: 1.5em;");
});

// ------ helper MD5 functions ------- //

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

// ------ 2021 estimated earnings from various devices ------ //

let multiplier = document.getElementById('multiplier');
let inputHashrate = document.getElementById('input-hashrate');

multiplier.addEventListener('input', updateValueDevices);
inputHashrate.addEventListener('input', updateValueDevices);

function floatmap(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

let device = document.getElementById('device-type');
let input_devices = document.getElementById('input-devices');

device.addEventListener('input', updateValueDevices);
input_devices.addEventListener('input', updateValueDevices);

function updateValueDevices(e) {
    /* https://github.com/revoxhere/duino-coin#some-of-the-officially-tested-devices-duco-s1 */

    let result = 0;
    let hashrate = inputHashrate.value * parseInt(multiplier.value); //* multiplier.value;

    if (hashrate <= 0 || input_devices.value <= 0 || input_devices.value > 125 || hashrate > 50000) {
        update_element("values", "Error");
        return;
    }

    if (device.value === 'PC') {
        $(".device_selector").fadeOut('fast', function() {
            $(".hashrate_selector").fadeIn('fast');
        });

        //result = (0.000363636 * hashrate) + 1.54545 // 2021
        result = (0.0013 * hashrate) + 2.2 // 2023?

        // extreme diff tier, TODO (2021)
        if (hashrate > 8000) result = floatmap(result, 14.2, 100, 12.2, 30); 
    } else {
        $(".hashrate_selector").fadeOut('fast', function() {
            $(".device_selector").fadeIn('fast');
        });

        if (device.value === 'AVR') basereward = 8
        if (device.value === 'ESP8266') basereward = 4
        if (device.value === 'ESP32') basereward = 6

        // kolka efficiency drop
        for (i = 0; i < input_devices.value; i++) {
            result += basereward;
            basereward *= 0.94;
        }
    }
    update_element("values", round_to(2, result) + " ᕲ/day");
}

if (localStorage.getItem("shop-open-blushybox")) {
    $(".info-dot").fadeOut();
} 
