const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get receipts
router.get('/', async (req, res) => {
	const collection = await loadReceiptsCollection(), data = await collection.find({}).toArray();
	let meta = {}, receiptSums = [];

	//Calculates total sum of all receipt sums combined
	data.forEach( receipt => receiptSums.push(receipt["sum"]));
	meta["totalSum"] = receiptSums.reduce((acc, curr) => acc + curr);

	res.send({ data: data, meta: meta });
});

//Add receipt
router.post('/', async (req, res) => {
	const receiptsCollection = await loadReceiptsCollection();

	let itemPrices = [], sum = 0;

	// Add sum to a new receipt
	req.body.items.forEach( item => itemPrices.push(item["pricePerItem"] * item["count"]));
	sum = itemPrices.reduce((acc, cur) => acc + cur);

	//Construct a new receipt object where description is lowercase
	const resItems = req.body.items.map( element => (
		{
			description: element.description.toLowerCase(),
			pricePerItem: element.pricePerItem,
			count: element.count
		}
	)); 

	insertReceipt(receiptsCollection, req.body.retailer.toLowerCase(), req.body.date, resItems, sum);

	res.status(201).send();
});

//Delete receipt
router.delete('/:id', async (req, res) => {
	const receipts = await loadReceiptsCollection();
	
	await receipts.deleteOne({
		_id: new mongodb.ObjectID(req.params.id)
	});

	res.status(200).send();
});

//Loads collection from MongoDB
async function loadReceiptsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('receipts');
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