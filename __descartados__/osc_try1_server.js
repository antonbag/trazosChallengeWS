const dgram = require('dgram')
const OSC = require('osc-js')

const socket = dgram.createSocket('udp4')

// send a messsage via udp
const message = new OSC.Message('/CubeX', 21)
const binary = message.pack()
socket.send(new Buffer(binary), 0, binary.byteLength, 6969, '192.168.1.50')
console.log("enviado")

// receive a message via UDP
socket.on('message', data => {
  const msg = new OSC.Message()
  msg.unpack(data)
  console.log(msg.args)
})
