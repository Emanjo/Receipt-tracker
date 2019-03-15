const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get all items
router.get('/', async (req, res) => {
  const collection = await loadReceiptsCollection(), 
  data = await collection.distinct("items.description");
  let meta = {};

  meta.numberOfItems = data.length;

	res.send({ data: data, meta: meta });
});

//Get all items with a counter based on times it appears in the receipts
router.get('/count/:days', async (req, res) => {
  let collection =  await loadReceiptsCollection();

  //Adds a variable that holds the days in past based on the parameter passed
	let daysInPast = Date.now() - (req.params.days * 24 * 60 * 60 * 1000);
	daysInPast = new Date(daysInPast);
	daysInPast.setHours(00,00,01); //Set it to one second past twelve so all receipts of that days counts in

  let itemArray = await collection.aggregate([{$match: {date: {$gt: Date.parse(daysInPast)}}}, {$unwind: "$items"}, {$group: {_id: "$items.description", count: {$sum: "$items.count"}}}]).toArray();

	res.send({ data: itemArray, meta: {} });
});

async function loadReceiptsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('receipts');
};

module.exports = router;