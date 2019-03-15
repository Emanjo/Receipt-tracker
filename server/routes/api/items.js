const express = require('express');
const mongodb = require('mongodb');
const date = require('../../helpers/date')
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

  let itemArray = await collection.aggregate([{$match: {date: {$gt: date.dateInPast(req.params.days)}}}, {$unwind: "$items"}, {$group: {_id: "$items.description", count: {$sum: "$items.count"}}}]).toArray();

  //Sort and make biggest sum the 0 index of data array
  itemArray.sort( (a, b) => { return -a.count - -b.count});
  
	res.send({ data: itemArray, meta: {} });
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