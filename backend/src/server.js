import express from "express";
const app = express();
import { getAllProperties, getSinglePropertyByID, insertProperty, deleteSinglePropertyById } from "./Commands.js";

const port = 3000;

app.use(express.json());

//Database format
// {"id": 4, "color":"Green", "name":"This is a real street"}

const TABLE_NAME = 'users';

//Get all the properties
app.get('/properties', async (req, res) => {
	try {
		const properties = await getAllProperties(TABLE_NAME);
		res.status(200).json(properties);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});
// use postman to add a new property
app.post('/properties', async (req, res) => {
	const body = req.body;
	try {
		const newProperty = await insertProperty(TABLE_NAME, body);
		console.log('newProperty', newProperty);
		res.status(200).json(body);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});
// Either run database or run postman to get the property
app.get('/properties/:id', async (req, res) => {
	let id = req.params.id;
  id = parseInt(id)
  
	try {
		const property = await getSinglePropertyByID(TABLE_NAME, id);
		res.status(200).json(property);
	} catch (err) {
		console.error(err);
    console.log("Is this an int: " + Number.isInteger(id))
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});
// Use postman to delete a single item by id
app.delete('/properties/:id', async (req, res) => {
	let id = req.params.id;
  id = parseInt(id)
	try {
		const property = await deleteSinglePropertyById(TABLE_NAME, id);
		res.status(200).json(property);
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json({ message: err.message || 'Something went wrong' });
	}
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
