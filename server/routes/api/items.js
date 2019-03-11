const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

//Get all items
router.get('/', async (req, res) => {
  const itemsCollection = await loadItemsCollection(), 
  data = await itemsCollection.find({}).toArray();

  let meta = {};

  meta.numberOfItems = data.length;

	res.send({ data: data, meta: meta });
});

//Get all items with a counter based on times it appears in the receipts
router.get('/count', async (req, res) => {
  const itemsCollection = await loadItemsCollection(),
  receiptsCollection =  await loadReceiptsCollection(),
  receiptsData = await receiptsCollection.find({}).toArray(),
  itemData = await itemsCollection.find({}).toArray();

  itemData.forEach(element => element.count = 0 );

  receiptsData.forEach(receipt => {
    receipt.items.forEach( itemReceipt => {
      itemData.forEach(item => {
        if(itemReceipt.description === item.description) {
          item.count = item.count + itemReceipt.count;
        }
      })
    })
  });

	res.send({ data: itemData, meta: {} });
});



async function loadItemsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('items');
};

async function loadReceiptsCollection() {
	const client = await mongodb.MongoClient
		.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true
		});

	return client.db(process.env.MONGO_DB).collection('receipts');
};

module.exports = router;