var osc = require("osc");

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    broadcast: true,
    localPort: 4444,
    metadata: false
});


var udpClient = new osc.UDPPort({
    localAddress: "255.255.255.255",
    broadcast: true,
    localPort: 3333,
    metadata: true
});



/****************
 * OSC Over UDP *
 ****************/
var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            console.log("address: " + addressInfo.address);
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }
    return ipAddresses;
};




udpClient.on("ready", function () {
    
     console.log("Cliente listo");
});

udpClient.open();

var cosa = { address: '/CubeX', args: [ 1, 186, 'cosa' ] };


//udpClient.send(cosa);



udpPort.on("ready", function () {
    
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
    
});


udpPort.on("message", function (oscMessage) {
    console.log(oscMessage);
    //udpClient.send(oscMessage);
});


udpPort.on("error", function (err) {
    console.log(err);
});


udpPort.open();
