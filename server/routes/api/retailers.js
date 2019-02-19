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

//Get all retailers and total money spent on each based on a certain time like 7 days, 30 days etc.
router.get('/sum', async (req, res) => {
	const collection = await loadRetailersCollection(), data = await collection.find({}).toArray();
	const receiptsCollection = await loadReceiptsCollection(), receiptsData = await receiptsCollection.find({}).toArray();
	let meta = {};

	 //Adds sums to each object in data
	 data.forEach( retailer => {
		retailer.sum = 0;
		receiptsData.forEach( receipt => {
		  if(receipt.retailer === retailer.name) {
			retailer.sum += receipt.sum;
		  }
		});
	  });

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