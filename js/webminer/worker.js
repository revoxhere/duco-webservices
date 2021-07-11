importScripts("hashes.js");  

function getTime()
{
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return h + ":" + m + ":" + s;
}

onmessage = function (event)
{
    if (event.data.startsWith("Start"))
    {
        let getData = event.data.split(",");

        let username = getData[1];
        let rigid = getData[2];
        let workerVer = getData[3];
    
        if (rigid === "")
        {
            rigid = "None";
        }

        function connect()
        {
            var socket = new WebSocket("wss://server.duinocoin.com:14808");

            socket.onmessage = function(event)
            {
                var serverMessage = event.data;
                if (serverMessage.includes("2."))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Connected to node. Server is on version " + serverMessage);
                    socket.send("JOB," + username + ",LOW");
                }
                else if (serverMessage.includes("GOOD"))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share accepted:" + result);
                    postMessage("GoodShare");
                    socket.send("JOB," + username + ",LOW");
                }
                else if (serverMessage.includes("BAD"))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share rejected: " + result);
                    postMessage("BadShare");
                    socket.send("JOB," + username + ",LOW");
                }
                else if (serverMessage.includes("This user doesn't exist"))
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": User not found!");
                    postMessage("Error");
                }
                else if (serverMessage.length > 40)
                {
                    console.log(`${getTime()} | ` + "CPU" + workerVer + ": Job received: " + serverMessage);
                    job = serverMessage.split(",");
                    difficulty = job[2];

                    startingTime = performance.now();
                    for (result = 0; result < 100 * difficulty + 1; result++)
                    {
                        var ducos1 = new Hashes.SHA1().hex(job[0] + result);
                        if (job[1] === ducos1)
                        {
                            endingTime = performance.now();
                            timeDifference = (endingTime - startingTime) / 1000;
                            hashrate = (result / timeDifference).toFixed(2);

                            postMessage("UpdateLog," + `${getTime()} | ` + "CPU" + workerVer + ": Share found: " + result + " Time: " + timeDifference + " Hashrate: " + hashrate + "<br>");
                            console.log(`${getTime()} | ` + "CPU" + workerVer + ": Share found: " + result + " Time: " + timeDifference + " Hashrate: " + hashrate);
                            postMessage("UpdateHashrate," + timeDifference + "," + hashrate);

                            socket.send(result + "," + hashrate + ",Official Webminer v2.6.1," + rigid);
                        }
                    }
                }
            }

            socket.onerror = function(event)
            {
                console.error("CPU" + workerVer + "WebSocket error observed, trying to reconnect: ", event);
                socket.close("Reason: Error occured in WebWorker.");
            }

            socket.onclose = function(event)
            {
                console.error("CPU" + workerVer + ": WebSocket close observed, trying to reconnect: ", event);
                setTimeout(function()
                {
                    connect();
                }, 1000);
            }
        }
        connect();
    }
}
