const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get all retailers
router.get('/', async (req, res) => {
	const collection = await loadReceiptsCollection(), data = await collection.distinct("retailer");
	let meta = {};

	// Add the numbers of retailers to metadata
	meta["numberOfRetailers"] = data.length;

	res.send({ data: data, meta: meta });
});

//Get all retailers and total money spent on each based on days on the past like 7 days ago, 30 days etc. ago until current day
router.get('/sum/:days', async (req, res) => {
	const collection = await loadReceiptsCollection();
	let meta = {};


	//Adds a variable that holds the days in past based on the parameter passed
	let daysInPast = Date.now() - (req.params.days * 24 * 60 * 60 * 1000);
	daysInPast = new Date(daysInPast);
	daysInPast.setHours(00,00,01); //Set it to one second past twelve so all receipts of that days counts in

	//Gets the retailers and sum from the database
	let retailersSum = await collection.aggregate([{$match: {date: {$gt: Date.parse(daysInPast) }}}, { $group: { _id: "$retailer", sum: {$sum: "$sum"}}}]).toArray();

	//Sort and make biggest sum the 0 index of data array
	retailersSum.sort( (a, b) => { return -a.sum - -b.sum});
	
	res.send({ data: retailersSum, meta: meta });
});

//Loads collection from MongoDB
async function loadReceiptsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('receipts');
};

module.exports = router;