const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

//Middleware goes here
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Production

if (process.env.NODE_ENV === 'production') {
	//Static folder
	app.use(express.static(__dirname + '/public'));

	//Handle single page application
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = 5000;

app.listen(port, () => console.log(`Server is listening on port: ${port}`));