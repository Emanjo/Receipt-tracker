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
	const receiptsCollection = await loadReceiptsCollection(), retailersCollection = await loadRetailersCollection(),
	itemsCollection = await loadItemsCollection();

	const retailersData = await retailersCollection.distinct("name"), itemsDescriptionData = await itemsCollection.distinct("description");
	let itemPrices = [], sum = 0;

	// Add sum to a new receipt
	req.body.items.forEach( item => itemPrices.push(item["pricePerItem"] * item["count"]));
	sum = itemPrices.reduce((acc, cur) => acc + cur);

	//Makes inputs to lowercase so you can validate more accuratly
	const resRetailer = req.body.retailer.toLowerCase();
	const resItemsDescription = req.body.items.map( element => element.description.toLowerCase()); //Array of descriptions from items 

	//Checks if the retailer is in database or not then adds it to the retailer collection
	if (!retailersData.includes(resRetailer)) {

		await retailersCollection.insertOne({
			name: resRetailer,
		});

	}

	//Checks if an item is in database or not then adds it to the items collection
	resItemsDescription.forEach(async element => {

		if(!itemsDescriptionData.includes(element)) {

			await itemsCollection.insertOne({
				description: element
			});
		}
	});

	//Construct a new receipt object where description is lowercase
	const resItems = req.body.items.map( element => (
		{
			description: element.description.toLowerCase(),
			pricePerItem: element.pricePerItem,
			count: element.count
		}
	)); 

	insertReceipt(receiptsCollection, resRetailer, req.body.date, resItems, sum);

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

async function loadItemsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('items');
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