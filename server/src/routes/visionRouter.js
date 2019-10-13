const Router = require('express').Router;
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const download_file = require('download-file');

let visionRouter = Router();


visionRouter.get('/labeldetect/:uri', async (req, res) => {
  let { uri } = req.params;
  try {
    // Get the url for the file
    let url = decodeURIComponent(uri);
    download_file(url, { directory: './images/label', filename: 'current.png' }, (err) => {
      if (err) throw err;
      client.labelDetection('./images/label/current.png').then((data) => {
        let [ result ] = data;
        res.status(200).send(result.labelAnnotations);
      });
    })
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

visionRouter.get('/facedetect/:uri', async (req, res) => {
  let { uri } = req.params;
  try {
    // Get the url for the file
    let url = decodeURIComponent(uri);
    download_file(url, { directory: './images/face', filename: 'current.png' }, (err) => {
      if (err) throw err;
      client.faceDetection('./images/face/current.png').then((data) => {
        let [ result ] = data;
        res.status(200).send(result.faceAnnotations);
      });
    })
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

visionRouter.get('/textdetect/:uri', async (req, res) => {
  let { uri } = req.params;
  try {
    // Get the url for the file
    let url = decodeURIComponent(uri);
    download_file(url, { directory: './images/text', filename: 'current.png' }, (err) => {
      if (err) throw err;
      client.textDetection('./images/text/current.png').then((data) => {
        let [ result ] = data;
        res.status(200).send(result);
      });
    })
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = visionRouter;
