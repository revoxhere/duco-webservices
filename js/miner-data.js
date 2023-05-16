const minerJson = `
{
	"miner_software": {
		"ESP8266": {
			"default": {
				"miner_type": "ESP8266",
				"icon": "<img src=\\\"img/wemos.gif\\\">",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": 8000,
				"hashrate-max": 45000,
				"hashrate-message-over": "Incorrect hashrate",
				"hashrate-message-under": "Use 160 MHz clock for optimal hashrate"
			}
		},
		"ESP32": {
			"default": {
				"miner_type": "ESP32",
				"icon": "<img src=\\"img/esp32.gif\\">",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": 30000,
				"hashrate-max": 48000,
				"hashrate-message-over": "Incorrect hashrate",
				"hashrate-message-under": "Use the 2.0.1 version of ESP32 library for optimal hashrate"
			}
		},
		"AVR": {
			"pico": {
				"miner_type": "AVR (Pico)",
				"icon": "<img src=\\"img/pico.gif\\">",
				"percentage": 0.96,
				"miner_diff": 333,
				"hashrate-min": null,
				"hashrate-max": null,
				"hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			},
			"default": {
				"miner_type": "AVR (Normal)",
				"icon": "<img src=\\"img/arduino.gif\\">",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": 280,
				"hashrate-max": 380,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"I2C": {
			"default": {
				"miner_type": "AVR (I²C)",
				"icon": "<img src=\\"img/arduino.gif\\">",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": 225,
				"hashrate-max": 270,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"PC": {
			"Raspberry Pi": {
				"miner_type": "AVR (Raspberry Pi)",
				"icon": "<img src=\\"img/pi.gif\\">",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			},
			"RPi": {
				"miner_type": "AVR (Raspberry Pi)",
				"icon": "<img src=\\"img/pi.gif\\">",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			},
			"default": {
				"miner_type": "PC (Normal)",
				"icon": "<i class=\\"fa fa-laptop\\" style=\\"color:#F97F51\\"></i>",
				"percentage": 0.96,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"Web": {
			"default": {
				"miner_type": "PC (Web)",
				"icon": "<i class=\\"fa fa-globe\\" style=\\"color:#009432\\"></i>",
				"percentage": 0.8,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"Android": {
			"default": {
				"miner_type": "Mobile",
				"icon": "<i class=\\"fa fa-mobile\\" style=\\"color:#fa983a\\"></i>",
				"percentage": 0.8,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"Phone": {
			"default": {
				"miner_type": "Mobile",
				"icon": "<i class=\\"fa fa-mobile\\" style=\\"color:#fa983a\\"></i>",
				"percentage": 0.8,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"Mini Miner": {
			"default": {
				"miner_type": "Mobile",
				"icon": "<i class=\\"fa fa-mobile\\" style=\\"color:#fa983a\\"></i>",
				"percentage": 0.8,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		},
		"default": {
			"default": {
				"miner_type": "Unknown",
				"icon": "<i class=\\"fa fa-question-circle\\" style=\\"color:#16a085\\"></i>",
				"percentage": 0.8,
				"miner_diff": null,
				"hashrate-min": null,
				"hashrate-max": null,
                "hashrate-message-over": "Incorrect hashrate",
                "hashrate-message-under": "Incorrect hashrate"
			}
		}
	}
}`;

const minerObj = JSON.parse(minerJson);