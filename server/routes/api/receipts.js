const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get receipts
router.get('/', async (req, res) => {
	const receipts = await loadReceiptsCollection(), receiptsData = await receipts.find({}).toArray();
	let receiptsMeta = {}, receiptSums = [];
	const reducer = (acc, curr) => acc + curr;

	//Calculate total price of each receipt
	receiptsData.forEach( element => {
		let itemPrices = [];
		element["items"].forEach( itemPrice => itemPrices.push(itemPrice["pricePerItem"] * itemPrice["count"]));

		//Adds the "sum" key
		element["sum"] = itemPrices.reduce(reducer);

		receiptSums.push(element["sum"]);
	});

	//Calculates total sum of all receipt sums combined
	receiptsMeta["totalSum"] = receiptSums.reduce(reducer);

	res.send({ data: receiptsData, meta: receiptsMeta });
});

console.log(process.env.MONGO_DB)

//Add receipt
router.post('/', async (req, res) => {
	const receipts = await loadReceiptsCollection();
	await receipts.insertOne({
		retailer: req.body.retailer,
        date: Date.now(),
        items: req.body.items
	});
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

module.exports = router;