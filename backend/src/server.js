import express from "express";
const app = express();
// import AWS from "aws-sdk";
import { getAllProperties, getSinglePropertyByID, insertProperty, deleteSinglePropertyById } from "./Commands.js";

const port = 3000;

app.use(express.json());

// const DocumentClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'users';

app.get('/items', async (req, res) => {
	try {
		const properties = await getAllProperties(TABLE_NAME);
		res.status(200).json(properties);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.post('/items', async (req, res) => {
	const body = req.body;
	try {
		const newProperty = await insertProperty(TABLE_NAME, body);
		console.log('newItem', newProperty);
		res.status(200).json(body);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.get('/items/:id', async (req, res) => {
	let id = req.params.id;
  id = parseInt(id)
  
	try {
		const item = await getSinglePropertyByID(TABLE_NAME, id);
		res.status(200).json(item);
	} catch (err) {
		console.error(err);
    console.log("Is this an int: " + Number.isInteger(id))
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.delete('/items/:id', async (req, res) => {
	let id = req.params.id;
  id = parseInt(id)
	try {
		const item = await deleteSinglePropertyById(TABLE_NAME, id);
		res.status(200).json(item);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
