// Imports
const express = require('express')
const axios = require('axios')
const raspi = require('raspi');
const I2C = require('raspi-i2c').I2C;
const FormData = require('form-data')

const app = express()
const i2c = new I2C()
const path = 'http://192.168.0.53:5000/'

var sensorZero, sensorOne, sensorTwo, sensorThree, triggeredSensors, images

var triggered = false
var counter = 0

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

Array.prototype.move = function(from,to){
  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};

function getRandomSelection() {
	// Calculates a random new image sequence using the api
	console.log('Retrieving random selection')

	axios.get(path)
	.then((response) => {
		images = response.data
		console.log(images)
	})
	.catch((error) => {
		console.log(error)
	})
}

function getNNSelection(indexes) {
	// Calculates a new image sequence by using the image id's (indexes) we got
	// from the client.

	console.log('Retrieving calculated image sequence')

	var form = new FormData()

	form.append(0, indexes[0])
	form.append(1, indexes[1])

	axios.post(path + 'nn', form, {
		headers: form.getHeaders(),
	})
	.then(response => {
		// TODO: Handle image sorting
		var new_images = response.data

		// retrieve array length
		var nrEmpty = 16 - new_images.length

		// only add empty objects if array is less then 16
		for (var i = 0; i < nrEmpty; i++) {
			var empty = { id: Math.random() }
			new_images.push(empty)
		}

		// random positioning of array objects
		var shuffeled_array = shuffle(new_images)

		// find new position of the first selected image
		var firstNewPos = shuffeled_array.findIndex(x => x.id === indexes[0])
		// move the first selected image to the same place
		var new_array = shuffeled_array.move(firstNewPos, triggeredSensors[0])

		console.log('old array');
		console.log(shuffeled_array)

		console.log('new array');
		console.log(new_array)


		images = new_array

		io.emit('setImages', images)


	})
	.catch((error) => {
		console.log(error)
	})
}

function getSensorData() {
	// Big sensor function which is constantly checking for all the sensor values
	// If there is a change, let the client know

	sensorZero = i2c.readByteSync(0x20, 0x00)
	sensorOne = i2c.readByteSync(0x20, 0x01)
	sensorTwo = i2c.readByteSync(0x24, 0x00)
	sensorThree = i2c.readByteSync(0x24, 0x01)

	if (triggered == false) {
		// First sensor
		if (sensorZero == 250) {
		  // 1 + 2
		  triggeredSensors = [0,1]
      io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 238) {
		  // 1 + 3
		  triggeredSensors = [0,2]
			io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 190) {
		  // 1 + 4
		  triggeredSensors = [0,3]
			io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 254 && sensorOne == 254) {
		  // 1 + 5
		  triggeredSensors = [0,4]
			io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 254 && sensorOne == 251) {
		  // 1 + 6
		  triggeredSensors = [0,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 254 && sensorOne == 239) {
		  // 1 + 7
		  triggeredSensors = [0,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 254 && sensorOne == 191) {
		  // 1 + 8
		  triggeredSensors = [0,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 254 && sensorZero == 254) {
		  // 1 + 9
		  triggeredSensors = [0,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 251 && sensorZero == 254) {
		  // 1 + 10
		  triggeredSensors = [0,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 239 && sensorZero == 254) {
		  // 1 + 11
		  triggeredSensors = [0,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 191 && sensorZero == 254) {
		  // 1 + 12
		  triggeredSensors = [0,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 254 && sensorZero == 254) {
		  // 1 + 13
		  triggeredSensors = [0,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 251 && sensorZero == 254) {
		  // 1 + 14
		  triggeredSensors = [0,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 239 && sensorZero == 254) {
		  // 1 + 15
		  triggeredSensors = [0,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 191 && sensorZero == 254) {
		  // 1 + 16
		  triggeredSensors = [0,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// Second sensor
		if (sensorZero == 235) {
		  // 2 + 3
		  triggeredSensors = [1,2]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 187) {
		  // 2 + 4
		  triggeredSensors = [1,3]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorOne == 254) {
		  // 2 + 5
		  triggeredSensors = [1,4]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorOne == 251) {
		  // 2 + 6
		  triggeredSensors = [1,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorOne == 239) {
		  // 2 + 7
		  triggeredSensors = [1,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorOne == 191) {
		  // 2 + 8
		  triggeredSensors = [1,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorTwo == 254) {
		  // 2 + 9
		  triggeredSensors = [1,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorTwo == 251) {
		  // 2 + 10
		  triggeredSensors = [1,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 254 && sensorTwo == 239) {
		  // 2 + 11
		  triggeredSensors = [1,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorTwo == 191) {
		  // 2 + 12
		  triggeredSensors = [1,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorThree == 254) {
		  // 2 + 13
		  triggeredSensors = [1,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorThree == 251) {
		  // 2 + 14
		  triggeredSensors = [1,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorThree == 239) {
		  // 2 + 15
		  triggeredSensors = [1,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 251 && sensorThree == 191) {
		  // 2 + 16
		  triggeredSensors = [1,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// Third sensor
		if (sensorZero == 175) {
		  // 3 + 4
		  triggeredSensors = [2,3]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorOne == 254) {
		  // 3 + 5
		  triggeredSensors = [2,4]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorOne == 251) {
		  // 3 + 6
		  triggeredSensors = [2,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorOne == 239) {
		  // 3 + 7
		  triggeredSensors = [2,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorOne == 191) {
		  // 3 + 8
		  triggeredSensors = [2,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorTwo == 254) {
		  // 3 + 9
		  triggeredSensors = [2,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorTwo == 251) {
		  // 3 + 10
		  triggeredSensors = [2,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorTwo == 239) {
		  // 3 + 11
		  triggeredSensors = [2,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorTwo == 191) {
		  // 3 + 12
		  triggeredSensors = [2,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorThree == 254) {
		  // 3 + 13
		  triggeredSensors = [2,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorThree == 251) {
		  // 3 + 14
		  triggeredSensors = [2,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorThree == 239) {
		  // 3 + 15
		  triggeredSensors = [2,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 239 && sensorThree == 191) {
		  // 3 + 16
		  triggeredSensors = [2,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// Fourth sensor
		if (sensorZero == 191 && sensorOne == 254) {
		  // 4 + 5
		  triggeredSensors = [3,4]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorOne == 251) {
		  // 4 + 6
		  triggeredSensors = [3,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorOne == 239) {
		  // 4 + 7
		  triggeredSensors = [3,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorOne == 191) {
		  // 4 + 8
		  triggeredSensors = [3,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorTwo == 254) {
		  // 4 + 9
		  triggeredSensors = [3,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorTwo == 251) {
		  // 4 + 10
		  triggeredSensors = [3,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorTwo == 239) {
		  // 4 + 11
		  triggeredSensors = [3,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorTwo == 191) {
		  // 4 + 12
		  triggeredSensors = [3,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorThree == 254) {
		  // 4 + 13
		  triggeredSensors = [3,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorThree == 251) {
		  // 4 + 14
		  triggeredSensors = [3,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorThree == 239) {
		  // 4 + 15
		  triggeredSensors = [3,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 191 && sensorThree == 191) {
		  // 4 + 16
		  triggeredSensors = [3,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}


		// Fifth sensor
		if (sensorOne == 250) {
		  // 5 + 6
		  triggeredSensors = [4,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 238) {
		  // 5 + 7
		  triggeredSensors = [4,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 190) {
		  // 5 + 8
		  triggeredSensors = [4,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorTwo == 254) {
		  // 5 + 9
		  triggeredSensors = [4,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorTwo == 251) {
		  // 5 + 10
		  triggeredSensors = [4,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorTwo == 239) {
		  // 5 + 11
		  triggeredSensors = [4,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorTwo == 191) {
		  // 5 + 12
		  triggeredSensors = [4,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorThree == 254) {
		  // 5 + 13
		  triggeredSensors = [4,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorThree == 251) {
		  // 5 + 14
		  triggeredSensors = [4,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorThree == 239) {
		  // 5 + 15
		  triggeredSensors = [4,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 254 && sensorThree == 191) {
		  // 5 + 16
		  triggeredSensors = [4,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}


		// Sixth sensor
		if (sensorOne == 235) {
		  // 6 + 7
		  triggeredSensors = [5,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 187) {
		  // 6 + 8
		  triggeredSensors = [5,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorTwo == 254) {
		  // 6 + 9
		  triggeredSensors = [5,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorTwo == 251) {
		  // 6 + 10
		  triggeredSensors = [5,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorTwo == 239) {
		  // 6 + 11
		  triggeredSensors = [5,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorTwo == 191) {
		  // 6 + 12
		  triggeredSensors = [5,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorThree == 254) {
		  // 6 + 13
		  triggeredSensors = [5,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorThree == 251) {
		  // 6 + 14
		  triggeredSensors = [5,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorThree == 239) {
		  // 6 + 15
		  triggeredSensors = [5,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 251 && sensorThree == 191) {
		  // 6 + 15
		  triggeredSensors = [5,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 7th sensor
		if (sensorOne == 175) {
		  // 7 + 8
		  triggeredSensors = [6,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorTwo == 254) {
		  // 7 + 9
		  triggeredSensors = [6,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorTwo == 251) {
		  // 7 + 10
		  triggeredSensors = [6,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorTwo == 239) {
		  // 7 + 11
		  triggeredSensors = [6,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorTwo == 191) {
		  // 7 + 12
		  triggeredSensors = [6,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorThree == 254) {
		  // 7 + 13
		  triggeredSensors = [6,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorThree == 251) {
		  // 7 + 14
		  triggeredSensors = [6,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorThree == 239) {
		  // 7 + 15
		  triggeredSensors = [6,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 239 && sensorThree == 191) {
		  // 7 + 16
		  triggeredSensors = [6,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		//8th sensor
		if (sensorOne == 191 && sensorTwo == 254) {
		  // 8 + 9
		  triggeredSensors = [7,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorTwo == 251) {
		  // 8 + 10
		  triggeredSensors = [7,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorTwo == 239) {
		  // 8 + 11
		  triggeredSensors = [7,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorTwo == 191) {
		  // 8 + 12
		  triggeredSensors = [7,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorThree == 254) {
		  // 8 + 13
		  triggeredSensors = [7,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorThree == 251) {
		  // 8 + 14
		  triggeredSensors = [7,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorThree == 239) {
		  // 8 + 15
		  triggeredSensors = [7,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 191 && sensorThree == 191) {
		  // 8 + 16
		  triggeredSensors = [7,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		//9th sensor
		if (sensorTwo == 250) {
		  // 9 + 10
		  triggeredSensors = [8,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 238) {
		  // 9 + 11
		  triggeredSensors = [8,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 190) {
		  // 9 + 12
		  triggeredSensors = [8,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 254 && sensorThree == 254) {
		  // 9 + 13
		  triggeredSensors = [8,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 254 && sensorThree == 251) {
		  // 9 + 14
		  triggeredSensors = [8,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 254 && sensorThree == 239) {
		  // 9 + 15
		  triggeredSensors = [8,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 254 && sensorThree == 191) {
		  // 9 + 16
		  triggeredSensors = [8,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 10th sensor
		if (sensorTwo == 235) {
		  // 10 + 11
		  triggeredSensors = [9,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 187) {
		  // 10 + 12
		  triggeredSensors = [9,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 251 && sensorThree == 254) {
		  // 10 + 13
		  triggeredSensors = [9,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 251 && sensorThree == 251) {
		  // 10 + 14
		  triggeredSensors = [9,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 251 && sensorThree == 239) {
		  // 10 + 15
		  triggeredSensors = [9,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 251 && sensorThree == 191) {
		  // 10 + 16
		  triggeredSensors = [9,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 11th sensor
		if (sensorTwo == 175) {
		  // 11 + 12
		  triggeredSensors = [10,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 239 && sensorThree == 254) {
		  // 11 + 13
		  triggeredSensors = [10,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 239 && sensorThree == 251) {
		  // 11 + 14
		  triggeredSensors = [10,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 239 && sensorThree == 239) {
		  // 11 + 15
		  triggeredSensors = [10,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 239 && sensorThree == 191) {
		  // 11 + 16
		  triggeredSensors = [10,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}


		// 12th sensor
		if (sensorTwo == 191 && sensorThree == 254) {
		  // 12 + 13
		  triggeredSensors = [11,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 191 && sensorThree == 251) {
		  // 12 + 14
		  triggeredSensors = [11,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 191 && sensorThree == 239) {
		  // 12 + 15
		  triggeredSensors = [11,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 191 && sensorThree == 191) {
		  // 12 + 16
		  triggeredSensors = [11,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 13th sensor
		if (sensorThree == 250) {
		  // 13 + 14
		  triggeredSensors = [12,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 238) {
		  // 13 + 15
		  triggeredSensors = [12,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 190) {
		  // 13 + 16
		  triggeredSensors = [12,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 14th sensor
		if (sensorThree == 235) {
		  // 14 + 15
		  triggeredSensors = [13,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 187) {
		  // 14 + 16
		  triggeredSensors = [13,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 15th sensor
		if (sensorThree == 175) {
		  // 15 + 16
		  triggeredSensors = [14,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}
	}

	// All the sensors are not active
	if (triggered == true && sensorZero == 255 && sensorOne == 255 && sensorTwo == 255 && sensorThree == 255) {
		// Reset image sequence
		console.log('Reset sequence')
    axios.get(path)
    .then((response) => {
    	images = response.data
    	io.emit('reset', images)
		})
	  .catch((error) => {
    	console.log(error)
  	})
		triggered = false
	}

	// Runs the sensor checker every 500 ms
	setTimeout(getSensorData, 500)
}

// -------------------------------------------------------------------------- //
// Main server
// -------------------------------------------------------------------------- //

// Get first image sequence
getRandomSelection()

server = app.listen(3002, () => {
	console.log('i2c server running on port 3002');
})

const io = require('socket.io')(server, {
	// increase ping timeout to prevent reconnections
	pingTimeout: 60000,
});

io.on('connection', (socket) => {
	// maybe this client counter also needs to be implemented here
	console.log('Client connected')
	socket.emit('reset', images)

	getSensorData()

	socket.on('calculateN', (data) => {
		// because all the four clients send the same data we use a counter
		// in order to only do something with the data send by one client. In
		// this case the last (3) client.
		if (counter === 3) {
			console.log('send');
			console.log(counter)
			getNNSelection(data)
			counter = 0
		} else if (counter < 3) {
			counter++
		}
	})
})
