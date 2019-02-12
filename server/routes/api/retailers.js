const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


//Get all retailers
router.get('/', async (req, res) => {
	const collection = await loadRetailersCollection(), data = await collection.find({}).toArray();
  let meta = {};
  
  // Add the numbers of retailers to metadata
  meta["totalRetailers"] = data.length;

	res.send({ data: data, meta: meta });
});

async function loadRetailersCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('retailers');
};

module.exports = router;