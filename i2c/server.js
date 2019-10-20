const express = require('express')
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;

const app = express();
const i2c = new I2C();

var toggle = false;

server = app.listen(3001, () => {
	console.log('i2c server running on port 3001');
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	console.log('client connected');
        callback();
})


function callback() {
	if (toggle == false) {
		io.emit('DATA', i2c.readByteSync(0x20, 0x00));
		toggle = true;
	} else {
		io.emit('DATA', i2c.readByteSync(0x20, 0x01));
		toggle = false;
	}
	setTimeout(callback, 100)
}
