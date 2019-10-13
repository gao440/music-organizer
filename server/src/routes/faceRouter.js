const Router = require('express').Router;
const Face = require('../models/faceModel');

let faceRouter = Router();

faceRouter.post('/', async (req, res) => {
  let data = req.body;
  let doc = new Face({ data });

  try {
    let saveddoc = await doc.save();
    res.status(200).send(saveddoc.id);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
})

faceRouter.get('/latest', async (req, res) => {
  try {
    let docs = await Face.find().exec();
    let data = docs[docs.length - 1].toJSON();
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
})

module.exports = faceRouter;
