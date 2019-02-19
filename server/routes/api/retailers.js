const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


//Get all retailers
router.get('/', async (req, res) => {
	const collection = await loadRetailersCollection(), data = await collection.find({}).toArray();
	let meta = {};

	// Add the numbers of retailers to metadata
	meta["numberOfRetailers"] = data.length;

	res.send({ data: data, meta: meta });
});

//Get all retailers and total money spent on each based on days on the past like 7 days ago, 30 days etc. ago until current day
router.get('/sum/:days', async (req, res) => {
	const collection = await loadRetailersCollection(), data = await collection.find({}).toArray();
	const receiptsCollection = await loadReceiptsCollection(), receiptsData = await receiptsCollection.find({}).toArray();
	let meta = {};

	//Adds a variable that holds the days in past based on the parameter
	let daysInPast = Date.now() - (req.params.days * 24 * 60 * 60 * 1000);
	daysInPast = new Date(daysInPast);
	daysInPast.setHours(00,00,01); //Set it to one second past twelve so all receipts of that days counts in

	 //Adds sums to each object in data
	 data.forEach( retailer => {
		retailer.sum = 0;
		receiptsData.forEach( receipt => {
		  if(receipt.retailer === retailer.name && receipt.date > daysInPast ) { // Adds the sum only if it is in the range of x days in the past
			retailer.sum += receipt.sum;
		  } else if (receipt.retailer === retailer.name && req.params.days == 0) { //Is param is 0 then it will show total sum of all time
			retailer.sum += receipt.sum;
		  }
		});
	  });

	//Sort and make biggest sum the 0 index of data array
	data.sort( (a, b) => { return -a.sum - -b.sum});
	
	res.send({ data: data, meta: meta });
});

async function loadRetailersCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
	});

	return client.db(process.env.MONGO_DB).collection('retailers');
};

async function loadReceiptsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('receipts');
};

module.exports = router;