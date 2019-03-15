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
router.get('/count', async (req, res) => {
  const receiptsCollection =  await loadReceiptsCollection(),
  receiptsData = await receiptsCollection.find({}).toArray(),
  items = await receiptsCollection.distinct("items.description");

  let itemArray = items.map(element => element = { description: element, count:  0});

  console.log(itemArray);

  receiptsData.forEach(receipt => {
    receipt.items.forEach( itemReceipt => {
      itemArray.forEach(item => {
        if(itemReceipt.description === item.description) {
          item.count = item.count + itemReceipt.count;
        }
      })
    })
  });

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