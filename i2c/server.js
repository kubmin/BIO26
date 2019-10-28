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

//callback()

function callback() {
	io.emit('24_00', {
		channel: 24,
		value: 00,
		data: i2c.readByteSync(0x24, 0x00)
	});
	io.emit('24_01', {
		channel: 24,
		value: 01,
		data: i2c.readByteSync(0x24, 0x01)
	});
	io.emit('20_00', {
		channel: 20,
		value: 00,
		data:  i2c.readByteSync(0x20, 0x00)
	});
	io.emit('20_01', {
		channel: 20,
		value: 01,
		data: i2c.readByteSync(0x20, 0x01)
	});
	setTimeout(callback, 100)
}
