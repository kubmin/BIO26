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
  console.log('emit function');

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


		for (var x = 0; x < new_images.length; x++) {
			// find new position of the first selected image
			var firstNewPos = shuffeled_array.findIndex(x => x.id === indexes[0])
			// move the first selected image to the same place
			var new_array = shuffeled_array.move(firstNewPos, triggeredSensors[0])

			// find new position of the second selected image
			var secondNewPos = shuffeled_array.findIndex(x => x.id === indexes[1])
			// move the second selected image to the same place
			new_array = new_array.move(secondNewPos, triggeredSensors[1])
		}

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

  console.log([sensorZero, sensorOne, sensorTwo, sensorThree])
  // console.log(triggered);

	if (triggered == false) {
		// First sensor
		if (sensorZero == 161) {
		  // 1 + 2
		  triggeredSensors = [0,1]
      io.emit('sensorData', triggeredSensors)
		  triggered = true
      console.log(triggered);
		} else if (sensorZero == 181) {
		  // 1 + 3
		  triggeredSensors = [0,2]
			io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 229) {
		  // 1 + 4
		  triggeredSensors = [0,3]
			io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 165 && sensorOne == 53) {
		  // 1 + 5
		  triggeredSensors = [0,4]
			io.emit('sensorData', triggeredSensors)
		  triggered = true
		} else if (sensorZero == 165 && sensorOne == 48) {
		  // 1 + 6
		  triggeredSensors = [0,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorOne == 36) {
		  // 1 + 7
		  triggeredSensors = [0,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorOne == 116) {
		  // 1 + 8
		  triggeredSensors = [0,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorTwo == 23) {
		  // 1 + 9
		  triggeredSensors = [0,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorTwo == 18) {
		  // 1 + 10
		  triggeredSensors = [0,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
    } else if (sensorZero == 165 && sensorTwo == 6) {
		  // 1 + 11
		  triggeredSensors = [0,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorTwo == 86) {
		  // 1 + 12
		  triggeredSensors = [0,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if ( sensorZero == 165 && sensorThree == 151) {
		  // 1 + 13
		  triggeredSensors = [0,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorThree == 146) {
		  // 1 + 14
		  triggeredSensors = [0,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorThree == 134) {
		  // 1 + 15
		  triggeredSensors = [0,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 165 && sensorThree == 214) {
		  // 1 + 16
		  triggeredSensors = [0,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// Second sensor
		if (sensorZero == 176) {
		  // 2 + 3
		  triggeredSensors = [1,2]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 224) {
		  // 2 + 4
		  triggeredSensors = [1,3]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorOne == 53) {
		  // 2 + 5
		  triggeredSensors = [1,4]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorOne == 48) {
		  // 2 + 6
		  triggeredSensors = [1,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorOne == 36) {
		  // 2 + 7
		  triggeredSensors = [1,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorOne == 116) {
		  // 2 + 8
		  triggeredSensors = [1,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorTwo == 23) {
		  // 2 + 9
		  triggeredSensors = [1,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorTwo == 18) {
		  // 2 + 10
		  triggeredSensors = [1,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorTwo == 6) {
		  // 2 + 11
		  triggeredSensors = [1,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorTwo == 86) {
		  // 2 + 12
		  triggeredSensors = [1,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorThree == 151) {
		  // 2 + 13
		  triggeredSensors = [1,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorThree == 146) {
		  // 2 + 14
		  triggeredSensors = [1,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorThree == 134) {
		  // 2 + 15
		  triggeredSensors = [1,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 160 && sensorThree == 214) {
		  // 2 + 16
		  triggeredSensors = [1,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// Third sensor
		if (sensorZero == 224) {
		  // 3 + 4
		  triggeredSensors = [2,3]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorOne == 53) {
		  // 3 + 5
		  triggeredSensors = [2,4]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorOne == 48) {
		  // 3 + 6
		  triggeredSensors = [2,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorOne == 36) {
		  // 3 + 7
		  triggeredSensors = [2,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorOne == 116) {
		  // 3 + 8
		  triggeredSensors = [2,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorTwo == 23) {
		  // 3 + 9
		  triggeredSensors = [2,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorTwo == 18) {
		  // 3 + 10
		  triggeredSensors = [2,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorTwo == 6) {
		  // 3 + 11
		  triggeredSensors = [2,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorTwo == 86) {
		  // 3 + 12
		  triggeredSensors = [2,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorThree == 151) {
		  // 3 + 13
		  triggeredSensors = [2,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorThree == 146) {
		  // 3 + 14
		  triggeredSensors = [2,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorThree == 134) {
		  // 3 + 15
		  triggeredSensors = [2,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 180 && sensorThree == 214) {
		  // 3 + 16
		  triggeredSensors = [2,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// Fourth sensor
		if (sensorZero == 228 && sensorOne == 53) {
		  // 4 + 5
		  triggeredSensors = [3,4]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorOne == 48) {
		  // 4 + 6
		  triggeredSensors = [3,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorOne == 36) {
		  // 4 + 7
		  triggeredSensors = [3,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorOne == 116) {
		  // 4 + 8
		  triggeredSensors = [3,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorTwo == 23) {
		  // 4 + 9
		  triggeredSensors = [3,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorTwo == 18) {
		  // 4 + 10
		  triggeredSensors = [3,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorTwo == 6) {
		  // 4 + 11
		  triggeredSensors = [3,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorTwo == 86) {
		  // 4 + 12
		  triggeredSensors = [3,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorThree == 151) {
		  // 4 + 13
		  triggeredSensors = [3,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorThree == 146) {
		  // 4 + 14
		  triggeredSensors = [3,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorThree == 134) {
		  // 4 + 15
		  triggeredSensors = [3,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorZero == 228 && sensorThree == 214) {
		  // 4 + 16
		  triggeredSensors = [3,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}


		// Fifth sensor
		if (sensorOne == 49) {
		  // 5 + 6
		  triggeredSensors = [4,5]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 37) {
		  // 5 + 7
		  triggeredSensors = [4,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 117) {
		  // 5 + 8
		  triggeredSensors = [4,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorTwo == 23) {
		  // 5 + 9
		  triggeredSensors = [4,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorTwo == 18) {
		  // 5 + 10
		  triggeredSensors = [4,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorTwo == 6) {
		  // 5 + 11
		  triggeredSensors = [4,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorTwo == 86) {
		  // 5 + 12
		  triggeredSensors = [4,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorThree == 151) {
		  // 5 + 13
		  triggeredSensors = [4,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorThree == 146) {
		  // 5 + 14
		  triggeredSensors = [4,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorThree == 134) {
		  // 5 + 15
		  triggeredSensors = [4,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 53 && sensorThree == 214) {
		  // 5 + 16
		  triggeredSensors = [4,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}


		// Sixth sensor
		if (sensorOne == 32) {
		  // 6 + 7
		  triggeredSensors = [5,6]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 112) {
		  // 6 + 8
		  triggeredSensors = [5,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorTwo == 23) {
		  // 6 + 9
		  triggeredSensors = [5,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorTwo == 18) {
		  // 6 + 10
		  triggeredSensors = [5,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorTwo == 6) {
		  // 6 + 11
		  triggeredSensors = [5,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorTwo == 86) {
		  // 6 + 12
		  triggeredSensors = [5,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorThree == 151) {
		  // 6 + 13
		  triggeredSensors = [5,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorThree == 146) {
		  // 6 + 14
		  triggeredSensors = [5,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorThree == 134) {
		  // 6 + 15
		  triggeredSensors = [5,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 48 && sensorThree == 214) {
		  // 6 + 15
		  triggeredSensors = [5,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 7th sensor
		if (sensorOne == 100) {
		  // 7 + 8
		  triggeredSensors = [6,7]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorTwo == 23) {
		  // 7 + 9
		  triggeredSensors = [6,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorTwo == 18) {
		  // 7 + 10
		  triggeredSensors = [6,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorTwo == 6) {
		  // 7 + 11
		  triggeredSensors = [6,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorTwo == 86) {
		  // 7 + 12
		  triggeredSensors = [6,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorThree == 151) {
		  // 7 + 13
		  triggeredSensors = [6,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorThree == 146) {
		  // 7 + 14
		  triggeredSensors = [6,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 36 && sensorThree == 134) {
		  // 7 + 15
		  triggeredSensors = [6,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 26 && sensorThree == 214) {
		  // 7 + 16
		  triggeredSensors = [6,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		//8th sensor
		if (sensorOne == 116 && sensorTwo == 23) {
		  // 8 + 9
		  triggeredSensors = [7,8]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorTwo == 18) {
		  // 8 + 10
		  triggeredSensors = [7,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorTwo == 6) {
		  // 8 + 11
		  triggeredSensors = [7,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorTwo == 86) {
		  // 8 + 12
		  triggeredSensors = [7,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorThree == 151) {
		  // 8 + 13
		  triggeredSensors = [7,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorThree == 146) {
		  // 8 + 14
		  triggeredSensors = [7,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorThree == 134) {
		  // 8 + 15
		  triggeredSensors = [7,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorOne == 116 && sensorThree == 214) {
		  // 8 + 16
		  triggeredSensors = [7,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		//9th sensor
		if (sensorTwo == 19) {
		  // 9 + 10
		  triggeredSensors = [8,9]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 7) {
		  // 9 + 11
		  triggeredSensors = [8,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 87) {
		  // 9 + 12
		  triggeredSensors = [8,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 23 && sensorThree == 151) {
		  // 9 + 13
		  triggeredSensors = [8,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 23 && sensorThree == 146) {
		  // 9 + 14
		  triggeredSensors = [8,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 23 && sensorThree == 134) {
		  // 9 + 15
		  triggeredSensors = [8,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 23 && sensorThree == 214) {
		  // 9 + 16
		  triggeredSensors = [8,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 10th sensor
		if (sensorTwo == 2) {
		  // 10 + 11
		  triggeredSensors = [9,10]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 82) {
		  // 10 + 12
		  triggeredSensors = [9,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 18 && sensorThree == 151) {
		  // 10 + 13
		  triggeredSensors = [9,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 18 && sensorThree == 146) {
		  // 10 + 14
		  triggeredSensors = [9,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 18 && sensorThree == 134) {
		  // 10 + 15
		  triggeredSensors = [9,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 18 && sensorThree == 214) {
		  // 10 + 16
		  triggeredSensors = [9,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 11th sensor
		if (sensorTwo == 70) {
		  // 11 + 12
		  triggeredSensors = [10,11]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 6 && sensorThree == 151) {
		  // 11 + 13
		  triggeredSensors = [10,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 6 && sensorThree == 146) {
		  // 11 + 14
		  triggeredSensors = [10,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 6 && sensorThree == 134) {
		  // 11 + 15
		  triggeredSensors = [10,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 6 && sensorThree == 214) {
		  // 11 + 16
		  triggeredSensors = [10,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}


		// 12th sensor
		if (sensorTwo == 86 && sensorThree == 151) {
		  // 12 + 13
		  triggeredSensors = [11,12]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 86 && sensorThree == 146) {
		  // 12 + 14
		  triggeredSensors = [11,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 86 && sensorThree == 134) {
		  // 12 + 15
		  triggeredSensors = [11,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorTwo == 86 && sensorThree == 214) {
		  // 12 + 16
		  triggeredSensors = [11,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 13th sensor
		if (sensorThree == 147) {
		  // 13 + 14
		  triggeredSensors = [12,13]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 135) {
		  // 13 + 15
		  triggeredSensors = [12,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 215) {
		  // 13 + 16
		  triggeredSensors = [12,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 14th sensor
		if (sensorThree == 130) {
		  // 14 + 15
		  triggeredSensors = [13,14]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		} else if (sensorThree == 210) {
		  // 14 + 16
		  triggeredSensors = [13,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}

		// 15th sensor
		if (sensorThree == 198) {
		  // 15 + 16
		  triggeredSensors = [14,15]
			io.emit('sensorData', triggeredSensors)
			triggered = true
		}
	}

	// All the sensors are not active
	if (triggered == true && sensorZero == 164 && sensorOne == 52 && sensorTwo == 22 && sensorThree == 150) {
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
    console.log('hello fromm calculateN');
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
