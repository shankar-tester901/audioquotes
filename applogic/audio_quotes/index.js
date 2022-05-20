const express = require('express');
const app = express();
const axios = require('axios');
const say = require('say');

app.get("/", (req, res) => {
	var quote = '';
	var author = '';
	var recorded_Speech;



	axios.get('https://api.quotable.io/random')
		.then((myResponse) => {
			quote = myResponse.data.content;
			author = myResponse.data.author;
		}).then(() => {
			var sayThis = author + " said - " + quote;
			say.speak(sayThis, 'Moira', 1.0, (err) => {
				if (err) {
					return res.json({ message: err, error: true });
				}
				return res.send('<h3>' + quote + '</h3>');
				//return res.json({ message: quote });
			})

			var recordAsThis = author + '_recorded.wav';

			// Export spoken audio to a WAV file
			// recorded_Speech = say.export(sayThis, 'Alex', 1.0, recordAsThis, (err) => {
			// 	if (err) {
			// 		return console.error(err)
			// 	}
			// 	else {
			// 		console.log('Text has been saved to ' + recordAsThis);
			// 	}

			// })
			//	console.log('Recorded Speech Object is ' + recorded_Speech);
		});


});

module.exports = app;