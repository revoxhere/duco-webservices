let last_screen = "screen-user-mobile";
const CHAIN_ACCOUNTS = ["bscDUCO", "celoDUCO", "wDUCO", "maticDUCO"];
let username, password;
const STAKING_PERC = 1.0;
let transaction_limit = 10;
let transactions = [];
let miners = [];

const backdrops = [
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
	"Rbean",
	"Tsifios",
	"Shibby",
]

login_backdrop = backdrops[Math.floor(Math.random() * backdrops.length)];
$("#backdrop").css("background-image",
	"url('/assets/community_screens/" + login_backdrop + ".jpg')")
$("#image_author").text(login_backdrop)

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

const adblockNotifications = [{
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

const exchange_template = `
<div class="column" style="min-width:40vw">
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
		&dollar;{{PRICE}}
	  </p>
	  <small class="has-text-grey">
		{{TYPE}}
	  </small>
	</div>
</div>`

let iot_template = `
<div class="column mb-3" style="min-width:40vw">
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
<div class="column">
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
<div class="column">
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


if (localStorage.getItem("username") && localStorage.getItem("authToken")) {
	username = $("#login_username").val(localStorage.getItem("username"))
	password = $("#login_password").val(localStorage.getItem("authToken"))
	setTimeout(function() {
		$("#loginbutton").click();
	}, 150)
}


function login(token) {
	username = $("#login_username").val()
	password = $("#login_password").val()
	loginbutton = $("#loginbutton");

	if (!username && !password) {
		$("#login_username").effect("shake", { distance: 5 });
		$("#login_password").effect("shake", { distance: 5 });
		return;
	}

	if (!password) {
		$("#login_password").effect("shake", { distance: 5 });
		return;
	}

	if (!username) {
		$("#login_username").effect("shake", { distance: 5 });
		return;
	}

	loginbutton.addClass("is-loading");
	$.getJSON(`https://server.duinocoin.com/v2/auth/${encodeURIComponent(username)}`, {
		password: window.btoa(unescape(encodeURIComponent(password))),
		captcha: token
	}, function(data) {
		if (data.success) {
			localStorage.setItem("username", encodeURIComponent(username));
			localStorage.setItem("authToken", data.result[2]);
			$("#mining_key").val(data.result[3]);

			user_data(username, true);
			setInterval(function() { user_data(username) }, 12000);

			$("#login-mobile").hide(function() {
				$("#wallet-mobile").show();
				adblock_check();
			});
		} else {
			console.log(data.message);
			if (data.message.includes("This user doesn't exist")) {
				$("#login_username").effect("shake", { distance: 5 });
				return;
			} else if (data.message.includes("captcha")) {
				alert_bulma("Incorrect captcha. Refresh and try again. Make sure nothing blocks ReCaptcha");
				return;
			} else if (data.message.includes("banned")) {
				alert_bulma("User banned");
				return;
			} else if (data.message.includes("Token")) {
				alert_bulma("Token expired. Please login again");
				$("#login_password").val('');
				return;
			} else {
				$("#login_password").effect("shake", { distance: 5 });
				return;
			}
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		console.error(jqXHR, textStatus, errorThrown)
		alert_bulma(`Network is unreachable: ${jqXHR}, ${textStatus}, ${errorThrown}`)
	}).catch(function(err) {
		console.error(err);
		alert_bulma(`Network error: ${err}`)
	}).always(function() {
		loginbutton.removeClass("is-loading");
	});
}

function adblock_check() {
	let adBlockEnabled = false;
	const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

	try {
		fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true);
	} catch (e) {
		adBlockEnabled = true;
	}

	let initial_height = $('.adsbygoogle').height();
	(adsbygoogle = window.adsbygoogle || []).push({});
	setTimeout(function() {
		if ($('.adsbygoogle').height() <= initial_height) {
			adBlockEnabled = true;
		}

		if (adBlockEnabled) {
			selected_notif = Math.floor(Math.random() * adblockNotifications.length);
			adblock_title = adblockNotifications[selected_notif].title;
			adblock_desc = adblockNotifications[selected_notif].description;
			$("#adblock_title").html(adblock_title);
			$("#adblock_desc").html(adblock_desc);
			$("#adblocker_detected").fadeIn();
		}
	}, 2000);
}


function screen(transition_to) {
	if (last_screen == transition_to) return;

	$(`#${last_screen}-nav`).removeClass("navbar-selected");
	$(`#${transition_to}-nav`).addClass("navbar-selected");
	$(`#${last_screen}`).fadeOut(50, function() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		$(`#${transition_to}`).fadeIn(120);
		last_screen = transition_to;
	});
}


let miner_list = JSON.parse(localStorage.getItem("miner_list"));
if (!miner_list) {
	miner_template = miner_template2;
	$("#minertogglebutton").html("<i class='fa fa-th-large'></i>")
}
function toggle_miner_view() {
	if (miner_template == miner_template2) {
		miner_template = miner_template1;
		$("#minertogglebutton").html("<i class='fa fa-list'></i>")
		localStorage.setItem("miner_list",true);
	} else {
		miner_template = miner_template2;
		$("#minertogglebutton").html("<i class='fa fa-th-large'></i>")
		localStorage.setItem("miner_list",false);
	}
	create_miners(miners);
}


let iot_collapsed = JSON.parse(localStorage.getItem("iot_collapsed"));
if (!iot_collapsed) {
	$("#iotspan").html("<i class='fa fa-caret-right'></i>&nbsp;IOT DATA");
	$("#iotdata").hide('normal');
}


function toggle_iot() {
	if (!iot_collapsed) {
		$("#iotspan").html("<i class='fa fa-caret-down'></i>&nbsp;IOT DATA");
		iot_collapsed = true;
		$("#iotdata").show('normal');
	} else {
		$("#iotspan").html("<i class='fa fa-caret-right'></i>&nbsp;IOT DATA");
		iot_collapsed = false;
		$("#iotdata").hide('normal');
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


function refresh_achievements(user_achievements) {
	fetch(`https://server.duinocoin.com/achievements`)
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
			$("#achievements_all").text(total_achievements)
			$("#achievements_unlocked").text(user_achievements.length)
			$("#achievements_content").html(finalhtml)
		});
}


function create_prices(prices) {
	delete prices.nodes;
	delete prices.furim;

	finalhtml = "";
	for (price in prices) {
		link = "https://exchange.duinocoin.com";
		icon = "assets/ducoexchange.png";

		if (price == "bch") {
			name = "DUCO Exch. <wbr>BCH";
			type = "DUCO <i class='fa fa-exchange-alt'></i> BCH";
		}
		if (price == "xmg") {
			name = "DUCO Exch. <wbr>XMG";
			type = "DUCO <i class='fa fa-exchange-alt'></i> XMG";
		}
		if (price == "trx") {
			name = "DUCO Exch. <wbr>TRX";
			type = "DUCO <i class='fa fa-exchange-alt'></i> TRX";
		}
		if (price == "nano") {
			name = "DUCO Exch. <wbr>XNO";
			type = "DUCO <i class='fa fa-exchange-alt'></i> XNO";
		}

		if (price == "fluffy") {
			name = "Fluffy<wbr>Swap";
			icon = "assets/fluffyswap.png";
			link = "https://fluffyswap.com";
			type = "DUCO <i class='fa fa-exchange-alt'></i> ALL"
		}
		if (price == "sushi") {
			name = "Sushi<wbr>Swap";
			icon = "assets/sushiswap.png";
			type = "maticDUCO <i class='fa fa-exchange-alt'></i> MATIC"
			link = "https://medium.com/@johnny.mnemonic/guide-to-swapping-duino-coin-on-sushi-com-12bca3192ea2";
		}
		if (price == "pancake") {
			name = "Pancake<wbr>Swap";
			icon = "assets/pancakeswap.png";
			type = "bscDUCO <i class='fa fa-exchange-alt'></i> BSC"
			link = "https://pancakeswap.finance/swap?inputCurrency=0xcf572ca0ab84d8ce1652b175e930292e2320785b"
		}
		if (price == "ubeswap") {
			name = "Ube<wbr>Swap";
			icon = "assets/ubeswap.png";
			type = "celoDUCO <i class='fa fa-exchange-alt'></i> mCUSD"
			link = "https://info.ubeswap.org/pair/0x7703874bd9fdacceca5085eae2776e276411f171"
		}
		if (price == "sunswap") {
			name = "Sun<wbr>Swap";
			icon = "assets/sunswap.png";
			type = "wDUCO <i class='fa fa-exchange-alt'></i> TRX"
			link = "https://sunswap.com/#/scan/detail/TWYaXdxA12JywrUdou3PFD1fvx2PWjqK9U"
		}

		finalhtml += exchange_template
			.replace("{{LINK}}", link)
			.replace("{{NAME}}", name)
			.replace("{{ICON}}", icon)
			.replace("{{TYPE}}", type)
			.replace("{{PRICE}}", round_to(6, prices[price]));
	}

	$("#prices").html(finalhtml);
}


function alert_bulma(content) {
	$("html").css("overflow-y", "hidden");
	$("#alert_content").text(content);
	$('#fullscreen_alert').fadeIn('fast');
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
			$("#estimatedprofits").fadeIn();
			daily = round_to(3, daily);
			$("#dailyprofit").text(daily)

			/*if (user_items.includes(3) && user_items.includes(4)) {
				// Both upgrades, 20%
				no_upgrade_earning = round_to(3, daily / 1.20);
				upgrade_earning = round_to(4, daily - no_upgrade_earning);
			} else if ((user_items.includes(3))) {
				// 5%
				no_upgrade_earning = round_to(3, daily / 1.05);
				upgrade_earning = round_to(4, daily - no_upgrade_earning);
				$("#dailyprofit").text(no_upgrade_earning + " (+" +upgrade_earning+")")
			} else if ((user_items.includes(3))) {
				// 15%
				no_upgrade_earning = round_to(3, daily / 1.15);
				upgrade_earning = round_to(4, daily - no_upgrade_earning);
				$("#dailyprofit").text(no_upgrade_earning + " (+" +upgrade_earning+")")
			} else {
			}*/
		}
	}
}


const user_data = (req_username, first_open) => {
	username = req_username;
	fetch(`https://server.duinocoin.com/v2/users/${encodeURIComponent(username)}?limit=${transaction_limit}`)
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

			create_prices(data.prices);

			if (first_open) {
				$("#username").text(username);

				user_achievements = data.achievements;
				refresh_achievements(user_achievements);

				user_items = data.items;
				refresh_shop(user_items);

				if (user_items.includes(12)) {
					$("#starterbadge").fadeIn();
				}
			}

			balance = round_to(
				12 - parseFloat(data.balance.balance).toString().split(".")[0].length,
				parseFloat(data.balance.balance)
			);
			store_balance(balance);

			if (first_open) oldb = balance;
			if (balance != oldb) {
				calculdaily(balance, oldb, user_items);
				oldb = balance;
			}

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
				const ctx = document.getElementById('balanceChart').getContext('2d');
				balanceChart = new Chart(ctx, {
					type: 'line',
					data: balanceChartData,
					options: balanceChartOptions,
				});
			} else {
				balanceChart.data.labels.push(Date.now());
				balanceChart.data.datasets.forEach((dataset) => {
					dataset.data.push(balance);
				});
				balanceChart.update();
			}
			$("#balance").text(balance);
			balance_usd = balance * duco_price;
			$("#balanceusd").text(`$${balance_usd.toFixed(4)}`);

			if (data.balance.stake_amount) {
				date_opt = { day: 'numeric', month: "long" };
				stake_reward = (data.balance.stake_amount *
					(1 + (STAKING_PERC / 100)) -
					data.balance.stake_amount);
				stake_date = new Date(data.balance.stake_date * 1000)
					.toLocaleString("en-US", date_opt);

				progress_min = data.balance.stake_date * 1000 - 21 * 86400000;
				progress_max = data.balance.stake_date * 1000;

				start = new Date(progress_min),
					end = new Date(progress_max),
					today = new Date();
				q = Math.abs(today - start);
				d = Math.abs(end - start);
				progress_val = (q / d) * 100
				$("#stakeprogress").attr('value', progress_val);
				$("#stakeprogress").text(progress_val.toFixed(2) + "%");

				$("#stakeamount").text(data.balance.stake_amount);
				$("#stakereward").text(stake_reward.toFixed(2))
				$("#stakedate").text(stake_date);
				$("#notstaking").fadeOut(function() {
					$("#staking").fadeIn();
				});
			} else {
				$("#staking").fadeOut(function() {
					$("#notstaking").fadeIn();
				});
			}

			trustscore = data.balance.trust_score;
			if (data.balance.warnings < 1) {
				verified = data.balance.verified;

				if (verified === "yes") {
					$("#verifiedbadge").fadeIn();
				} else {
					$("#unverifiedbadge").fadeIn();
					$("#unverified_box").fadeIn();
				}
			} else {
				$("#warning_num").text(data.balance.warnings);
				$("#warning_box").fadeIn();
				$("#suspiciousbadge").fadeIn();
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
						.replace("{{AMOUNT}}", round_to(8, tx.amount))
						.replace("{{SENDER}}", tx.sender)
						.replace("{{HASH}}", formatted_hash)
						.replace("{{HASH_FULL}}", tx.hash)
						.replace("{{MEMO}}", formatted_memo)
						.replace("{{DATE}}", sent_ago)
						.replace("{{TX_NUM}}", transaction);
				} else {
					if (!CHAIN_ACCOUNTS.includes(tx.recipient)) {
						finalhtml += send_template
							.replace("{{AMOUNT}}", -round_to(8, tx.amount))
							.replace("{{RECIPIENT}}", tx.recipient)
							.replace("{{HASH}}", formatted_hash)
							.replace("{{HASH_FULL}}", tx.hash)
							.replace("{{MEMO}}", formatted_memo)
							.replace("{{DATE}}", sent_ago)
							.replace("{{TX_NUM}}", transaction);
					} else {
						finalhtml += wrap_template
							.replace("{{AMOUNT}}", -round_to(8, tx.amount))
							.replace("{{RECIPIENT}}", tx.recipient)
							.replace("{{HASH}}", formatted_hash)
							.replace("{{HASH_FULL}}", tx.hash)
							.replace("{{DATE}}", sent_ago)
							.replace("{{ADDRESS}}", tx.memo)
							.replace("{{TX_NUM}}", transaction);
					}
				}
			}
			$("#transactions").html(finalhtml)
			$("#more_tx").removeClass("is-loading");

			user_miners = data.miners;
			create_miners(user_miners);
		})
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


function create_iotdevices(iot_devices) {
	$("#iotsection").fadeIn();

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
	$("#iotdata").html(finalhtml);
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
						temp = parseTemperature(user_miners[miner]["it"].split("@")[0]);
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
						temp = parseTemperature(user_miners[miner]["it"].split("@")[0]);
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

			let percentage = 0.80;
			let miner_type = "Other";
			if (miner_software.includes("Starter")) {
				color = "#BB4B00";
				icon = `<img src="assets/starter.gif">`;
				miner_type = "ESP8266";
				percentage = 0.96;
			} else if (miner_software.includes("ESP8266")) {
				icon = `<img src="assets/wemos.gif">`;
				color = "#F5515F";
				miner_type = "ESP8266";
				percentage = 0.96;
			} else if (miner_software.includes("ESP32")) {
				color = "#5f27cd";
				icon = `<img src="assets/esp32.gif">`;
				miner_type = "ESP32";
				percentage = 0.96;
			} else if (miner_software.includes("AVR") && miner_diff == 333) {
				icon = `<img src="assets/pico.gif">`;
				color = "#16a085";
				miner_type = "AVR (Pico)";
				percentage = 0.96;
			} else if (miner_software.includes("I2C")) {
				icon = `<img src="assets/arduino.gif">`;
				color = "#B33771";
				miner_type = "AVR (I²C)";
				percentage = 0.96;
			} else if (miner_software.includes("AVR")) {
				icon = `<img src="assets/arduino.gif">`;
				color = "#B33771";
				miner_type = "AVR (Normal)";
				percentage = 0.96;
			} else if (miner_software.includes("PC") &&
				(miner_identifier == "Raspberry Pi" ||
					miner_identifier.includes("RPi"))) {
				icon = `<img src="assets/pi.gif">`;
				color = "#16a085";
				miner_type = "AVR (Raspberry Pi)";
				percentage = 0.96;
			} else if (miner_software.includes("PC")) {
				color = "#F97F51";
				icon = `<i class="fa fa-laptop" style="color:${color}"></i>`;
				miner_type = "PC (Normal)";
				if (Math.floor(Math.random() * 50) == 1) $("#magi_notify").fadeIn();
			} else if (miner_software.includes("Web")) {
				color = "#009432";
				icon = `<i class="fa fa-lg fa-globe" style="color:${color}"></i>`;
				miner_type = "PC (Web)";
			} else if (miner_software.includes("Android") ||
				miner_software.includes("Phone") ||
				miner_software.includes("Mini Miner")) {
				color = "#fa983a";
				icon = `<i class="fa fa-lg fa-mobile" style="color:${color}"></i>`;
				miner_type = "Mobile";
			} else {
				color = "#16a085";
				icon = `<i class="fa fa-lg fa-question-circle" style="color:${color}"></i>`;
				miner_type = "Unknown!";
			}

			let accept_color = "has-text-warning-dark";
			if (accepted_rate < 50) {
				accept_color = "has-text-danger-dark";
			} else if (accepted_rate > 95) {
				accept_color = "has-text-success-dark";
			}

			/*
			icon_class = "has-text-warning-dark";
			icon_class_animation = "fa fa-exclamation-triangle animated faa-flash";
			icon_class_alt = "has-text-danger";
			icon_class_animation_alt = "fa fa-exclamation-triangle animated faa-flash";

			warning_icon = '';
			if (miner_type == "AVR (I²C)" 
				&& !(miner_hashrate > 225 && miner_hashrate < 270) 
				&& miner_diff != 333) {
				warning_icon = `
					<span class="${icon_class_alt}" style="cursor: pointer;" 
						  data-tooltip="Incorrect hashrate">
						<i class="icon ${icon_class_animation_alt}"></i>
					</span>`
			} else if (miner_type == "AVR (Normal)" && !(miner_hashrate > 280 && miner_hashrate < 380) && miner_diff != 333) {
				warning_icon = `
					<span class="${icon_class_alt}" style="cursor: pointer;" data-tooltip="Incorrect hashrate">
						<i class="icon ${icon_class_animation_alt}"></i>
					</span>`
			} else if (miner_type == "ESP8266" && miner_hashrate > 45000) {
				warning_icon = `
					<span class="${icon_class_alt}" style="cursor: pointer;" data-tooltip="Incorrect hashrate">
						<i class="icon ${icon_class_animation_alt}"></i>
					</span>`
			} else if (miner_type == "ESP8266" && miner_hashrate < 8000) {
				warning_icon = `
					<span class="icon-text ${icon_class}" style="cursor: pointer;" data-tooltip="Use 160 MHz clock for optimal hashrate">
						<i class="icon ${icon_class_animation}"></i>
					</span>`
			} else if (miner_type == "ESP32" && miner_hashrate < 30000) {
				warning_icon = `
					<span class="icon-text ${icon_class}" style="cursor: pointer;" data-tooltip="Use the 2.0.1 version of ESP32 library for optimal hashrate">
						<i class="icon ${icon_class_animation}"></i>
					</span>`
			} else if (miner_type == "ESP32" && miner_hashrate > 48000) {
				warning_icon = `
					<span class="${icon_class_alt}" style="cursor: pointer;" data-tooltip="Incorrect hashrate">
						<i class="icon ${icon_class_animation_alt}"></i>
					</span>`
			}*/

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

			if (textWidth(miner_name, 'bold 16px Arial') > $(window).width() * 0.65) {
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
				.replace("{{EFF_COLOR}}", accept_color)
				.replace("{{MINER_NUM}}", miner)
				.replace("{{HASH}}", scientific_prefix(miner_hashrate) + "H/s");
		}
		$("#nominers").fadeOut();
		$("#miners").html(miners_html);

		maxslots = 50;
		if (user_items.includes(10)) maxslots = 75;
		if (user_items.includes(11)) maxslots = 100;
		if (user_items.includes(11) && user_items.includes(10)) maxslots = 125;
		$("#minercount").text(`${user_miners.flat().length} out of ${maxslots} slots used`);
	} else {
		$("#nominers").fadeIn();
		$("#estimatedprofits").fadeOut();
	}
}


function logout() {
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
	screen('screen-settings-mobile');
	setTimeout(function() {
		$("#mining_key")[0].scrollIntoView();
		$("#mining_key").focus();
	}, 300)
}


function miner_details(miner_id) {
	$("html").css("overflow-y", "hidden");
	$("#minerdetails").show("slide", { direction: "right" }, '50');

	$("#miner_name").text(miners[miner_id]["software"])
	miner_software = miners[miner_id]["software"];
	percentage = 0.8
	let miner_type = "Other";
	if (miner_software.includes("Starter")) {
		color = "#BB4B00";
		icon = `<img src="assets/starter.gif">`;
		miner_type = "ESP8266";
		percentage = 0.96;
	} else if (miner_software.includes("ESP8266")) {
		icon = `<img src="assets/wemos.gif">`;
		color = "#4895EF";
		miner_type = "ESP8266";
		percentage = 0.96;
	} else if (miner_software.includes("ESP32")) {
		color = "#6B6B6B";
		icon = `<img src="assets/esp32.gif">`;
		miner_type = "ESP32";
		percentage = 0.96;
	} else if (miner_software.includes("AVR") && miner_diff >= 333) {
		icon = `<img src="assets/pico.gif">`;
		color = "#056938";
		miner_type = "AVR (Pico)";
		percentage = 0.96;
	} else if (miner_software.includes("I2C")) {
		icon = `<img src="assets/arduino.gif">`;
		color = "#4261EE";
		miner_type = "AVR (I²C)";
		percentage = 0.96;
	} else if (miner_software.includes("AVR")) {
		icon = `<img src="assets/arduino.gif">`;
		color = "#4261EE";
		miner_type = "AVR (Normal)";
		percentage = 0.96;
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
	}
	$("#miner_nav").css("background", color);
	$("#miner_icon").html(icon);

	let miner_efficiency = round_to(2, Math.pow(percentage, miner_ki - 1) * 100);
	let efficiency_color = "is-warning";
	if (miner_efficiency < 40) {
		efficiency_color = "is-danger";
	} else if (miner_efficiency > 80) {
		efficiency_color = "is-success";
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
				<i class="fa has-text-success fa-check-circle"></i>
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
				<i class="fa has-text-success fa-check-circle"></i>
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
				<i class="fa has-text-success fa-check-circle"></i>
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
				<i class="fa has-text-success fa-check-circle"></i>
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
		</div>
		`

	$("#miner_content").html(finalhtml)
}


function close_minerdetails() {
	$("#minerdetails").hide("slide", { direction: "right" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
}


function buymenu() {
	$("html").css("overflow-y", "hidden");
	$("#buymenu").show("slide", { direction: "right" }, '50');
	$("#receive_username").text(username);
}


function close_buymenu() {
	$("#buymenu").hide("slide", { direction: "right" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
}


function help_screen() {
	$("html").css("overflow-y", "hidden");
	$("#help").show("slide", { direction: "down" }, '50');
}


function close_help() {
	$("#help").hide("slide", { direction: "down" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
}


function view_achievements() {
	$("html").css("overflow-y", "hidden");
	$("#achievements").show("slide", { direction: "right" }, '50');
}


function close_achievements() {
	$("#achievements").hide("slide", { direction: "right" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
}


function open_shop() {
	$("html").css("overflow-y", "hidden");
	$("#shop").show("slide", { direction: "right" }, '50');
}


function close_shop() {
	$("#shop").hide("slide", { direction: "right" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
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
				if (!user_items.includes(parseInt(item))) {
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
			$("#shop_content").html(finalhtml)
		});

	if (!user_items) return;

	if (user_items.includes(0)) {
		//$("#useravatar").attr("src", "https://server.duinocoin.com/assets/items/0.png");
	}

	if (user_items.includes(1)) {
		//$("#hat").attr("src", "https://server.duinocoin.com/assets/items/1.png")
		//$("#hat").fadeIn();
	}

	if (user_items.includes(2)) {
		//$("#sunglasses").attr("src", "https://server.duinocoin.com/assets/items/2.png")
		//if (enabledItems.includes(2)) $("#sunglasses").fadeIn();
	}

	if (user_items.includes(3)) {
		//$("#bowtie").attr("src", "https://server.duinocoin.com/assets/items/3.png")
		//if (enabledItems.includes(3)) $("#bowtie").fadeIn();
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
	$("html").css("overflow-y", "hidden");
	$("#txdetails").show("slide", { direction: "right" }, '50');

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
					<a href="https://explorer.duinocoin.com/?search=${tx.hash}">
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
	$("#txdetails").hide("slide", { direction: "right" }, '50', function() {
		$("#transaction_nav").removeClass("is-danger")
		$("#transaction_icon_color").removeClass("has-text-danger");
		$("#transaction_nav").removeClass("is-success")
		$("#transaction_icon_color").removeClass("has-text-success");
		$("html").css("overflow-y", "scroll");
	});
}


function open_txsend() {
	$("html").css("overflow-y", "hidden");
	$("#txsend").show("slide", { direction: "down" }, '50');
}


function close_txsend() {
	$("#txsend").hide("slide", { direction: "down" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
}


function open_txwrap() {
	$("html").css("overflow-y", "hidden");
	$("#txwrap").show("slide", { direction: "down" }, '50');
}


function close_txwrap() {
	$("#txwrap").hide("slide", { direction: "down" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
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
	$("html").css("overflow-y", "hidden");
	$("#stakemenu").show("slide", { direction: "right" }, '50');
}


function close_stakemenu() {
	$("#stakemenu").hide("slide", { direction: "right" }, '50', function() {
		$("html").css("overflow-y", "scroll");
	});
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


function wrap() {
	wrap_network = document.getElementById("wrap_network").value;
	wrap_amount = document.getElementById("wrap_amount").value;
	address = document.getElementById("wrap_address").value;

	if (!address) {
		$("#wrap_address").effect("shake", { distance: 5 });
		return;
	}

	if (wrap_amount >= 501) {
		document.getElementById("wrap_confirm").classList.add("is-loading");

		if (wrap_network == "wDUCO (Tron)") {
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
			if (wrap_network == "bscDUCO (Binance Smart Chain)") recipient = "bscDUCO";
			else if (wrap_network == "maticDUCO (Polygon)") recipient = "maticDUCO";
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
	} else {
		$("#wrap_amount").effect("shake", { distance: 5 });
	}
}


function send() {
	let recipient = document.getElementById('send_recipient').value
	let amount = document.getElementById('send_amount').value
	let memo = document.getElementById('send_memo').value

	if (!recipient) {
		$("#send_recipient").effect("shake", { distance: 5 });
		return;
	}

	if (!amount) {
		$("#send_amount").effect("shake", { distance: 5 });
		return;
	}

	document.getElementById("send_confirm").classList.add("is-loading");
	$.getJSON('https://server.duinocoin.com/transaction/' +
		'?username=' + encodeURIComponent(username) +
		"&password=" + encodeURIComponent(password) +
		"&recipient=" + encodeURIComponent(recipient) +
		"&amount=" + encodeURIComponent(amount) +
		"&memo=" + encodeURIComponent(memo),
		function(data) {
			document.getElementById("send_confirm").classList.remove("is-loading");
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
	fetch(`https://server.duinocoin.com/event`)
		.then(response => response.json())
		.then(data => {
			if (data.result.topic != "None") {
				$("#event_box").fadeIn();
				$("#event_title").html(data.result.topic);
				$("#event_desc").html(data.result.description);
			}
		});
}
refresh_event()


function more_transactions() {
	$("#more_tx").addClass("is-loading");
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
		return Math.floor(interval) + " d ago";
	}
	if (interval > 1) {
		return Math.floor(interval) + " d ago";
	}
	interval = seconds / 3600;
	if (Math.floor(interval) == 1) {
		return Math.floor(interval) + " h ago";
	}
	if (interval > 1) {
		return Math.floor(interval) + " h ago";
	}
	interval = seconds / 60;
	if (Math.floor(interval) == 1) {
		return Math.floor(interval) + " m ago";
	}
	if (interval > 1) {
		return Math.floor(interval) + " m ago";
	}
	if (Math.floor(seconds) == 1) {
		return Math.floor(seconds) + " s ago";
	}
	return Math.floor(seconds) + " s ago";
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
		console.log("run")
		$(element).html("<i class='fa fa-copy'></i>")
	}, 1000)
}


function estimated_price_warning() {
	alert_bulma(`Estimated value based on the highest exchange rate. No guarantee that any of the exchange sites has enough liquidity in it's reserves to swap your coins at that rate.`);
}


function estimated_earnings_warning() {
	alert_bulma(`Estimated value calculated from last balance changes. The estimation will not be 100% accurate and should only be used as a reference.`);
}


function on_mobile() {
	const ua = navigator.userAgent;
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return true;
    }
    return false;
}


if (!localStorage.getItem('first-launch') && on_mobile()) {
	alert_bulma("Hello! This is a beta version of the new mobile online wallet look. It's finished in ~80% but I'm open for suggestions - reach out to me on Discord (revox - Founder) or e-mail me at robert@piotrowsky.dev if you find something missing or needing a change. Have fun!")
	localStorage.setItem('first-launch', true);
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
	"Hey there",
	"It's been a while",
	"Glad to see you're back",
	"Back and ready for more",
	"Welcome aboard once more",
	"You were missed",
	"It's a pleasure to see you again"
]

$("#greeting").text(greetings[Math.floor(Math.random() * greetings.length)]);


window.addEventListener('load', function() {
    console.log(`%cHold on!`, "color: red; font-size: 3em");
    console.log(`%cThis browser feature is intended for developers.\nIf someone instructed you to copy and paste something here to enable some feature or to "hack" someone's account, it usually means he's trying to get access to your account.`, "font-size: 1.5em;");
    console.log(`%cDo not execute unknown code here. We will not be responsible for your loss.`, "color: orange; font-size: 1.5em;");
});
