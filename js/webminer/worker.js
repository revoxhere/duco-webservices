importScripts("hashes.js");  

let inProgress = false;
let hashrate = 0;
let SHA1 = new Hashes.SHA1();
let timeDifference;

function getTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return h + ":" + m + ":" + s;
}

let minerlog = [];

onmessage = function (event)
{
    if (String(event.data).startsWith("Start"))
    {

        let getData = event.data.split(",")

        let username = getData[1];
        let rigid = getData[2];
        let workerVer = getData[3];
    
        if (rigid === "")
        {
            rigid = "None"
        }

        connect();
        function connect()
        {
            socket = new WebSocket("wss://server.duinocoin.com:14808");
            console.log(`${getTime()} | ` + "CPU" + workerVer + ": Connected to node");

            socket.onmessage = function (msg)
            {
                serverMessage = msg.data;
                if (serverMessage.includes("2."))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Server is on version " + serverMessage)
                    socket.send("JOB," + username + ",LOW");
                }
                else if (serverMessage.includes("GOOD"))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share accepted:" + result);
                    postMessage("UpdateLog," + `${getTime()} | ` + "CPU" + workerVer + ": Share accepted: " + result + "<br>")
                    postMessage("GoodShare");
                    socket.send("JOB," + username + ",LOW");
                }
                else if (serverMessage.includes("BAD"))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share rejected: " + result);
                    postMessage("UpdateLog," + `${getTime()} | ` + "CPU" + workerVer + ": Share rejected: " + result + "<br>");
                    postMessage("BadShare");
                    socket.send("JOB," + username + ",LOW");
                }
                else if (serverMessage.includes("This user doesn't exist")) {
                    console.log("CPU" + workerVer + ": User not found!");
                    postMessage("Error");
                }
                else if (serverMessage.length > 40)
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Job received: " + serverMessage);
                    job = serverMessage.split(",");
                    difficulty = job[2];

                    startingTime = performance.now();
                    for (result = 0; result < 100 * difficulty + 1; result++) {
                        ducos1 = SHA1.hex(job[0] + result)
                        if (job[1] === ducos1)
                        {
                            endingTime = performance.now();
                            timeDifference = (endingTime - startingTime) / 1000;
                            hashrate = (result / timeDifference).toFixed(2);

                            console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share found: " + result + " Time: " + timeDifference + " Hashrate: " + hashrate);
                            postMessage("UpdateHashrate," + timeDifference + "," + hashrate)

                            socket.send(result + "," + hashrate + ",Official Webminer v2.55," + rigid); // send the result to the server
                        }
                    }
                }
            }
        }
        socket.onerror = function(event) {
            console.error("CPU" + workerVer + "WebSocket error observed, trying to reconnect: ", event);
            socket.close("Reason: Error occured in WebWorker.");
        }
        socket.onclose = function (event) {
            console.error("CPU" + workerVer + ": WebSocket close observed, trying to reconnect: ", event);
            setTimeout(function() {
                connect();
            }, 1000);
        }
    }
};
