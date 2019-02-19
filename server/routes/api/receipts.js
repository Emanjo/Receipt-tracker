const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get receipts
router.get('/', async (req, res) => {
	const receipts = await loadReceiptsCollection(), data = await receipts.find({}).toArray();
	let meta = {}, receiptSums = [];

	//Calculates total sum of all receipt sums combined
	data.forEach( receipt => receiptSums.push(receipt["sum"]));
	meta["totalSum"] = receiptSums.reduce((acc, curr) => acc + curr);

	res.send({ data: data, meta: meta });
});

//Add receipt
router.post('/', async (req, res) => {
	const receiptsCollection = await loadReceiptsCollection(), retailersCollection = await loadRetailersCollection();
	const retailersData = await retailersCollection.distinct("name");
	let itemPrices = [], sum = 0;

	// Add sum to a new receipt
	req.body.items.forEach( item => itemPrices.push(item["pricePerItem"] * item["count"]));
	sum = itemPrices.reduce((acc, cur) => acc + cur);

	//Checks if the retailer is in database or not then adds it to the retailer collection
	const resRetailer = req.body.retailer.toLowerCase();

	if (!retailersData.includes(resRetailer)) {

		insertReceipt(receiptsCollection, resRetailer, Date.now(), req.body.items, sum);

		await retailersCollection.insertOne({
			name: resRetailer,
		});

		res.status(201).send();

	} else {

		insertReceipt(receiptsCollection, resRetailer, Date.now(), req.body.items, sum);

		res.status(201).send();
	}
});

//Delete receipt
router.delete('/:id', async (req, res) => {
	const receipts = await loadReceiptsCollection();
	
	await receipts.deleteOne({
		_id: new mongodb.ObjectID(req.params.id)
	});

	res.status(200).send();
});

async function loadReceiptsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('receipts');
};

async function loadRetailersCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('retailers');
};

async function insertReceipt (collection, retailer, date, items, sum) {
	return await collection.insertOne({
		retailer: retailer,
		date: date,
		items: items,
		sum: sum
	});
}

module.exports = router;