const mongoose = require('mongoose');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "GET, PUT, POST, DELETE");
  next();
});

const port = 5000;

const light_devices = require('./models/light_devices');
const air_conditioning_devices = require('./models/air_conditioning_devices');
const security_devices = require('./models/security_devices');

mongoose.connect('mongodb+srv://ayushsommrt:90R9XFjoQf8yV8RO@cluster0.sfqqmq3.mongodb.net/individual-project', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

/**
* @api {get} /api/light_devices Smart Light Devices - GET
* @apiGroup Smart Light Devices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*      "_id":"645c206a67454ff48d5c7d06",
*      "user":"Light 1",
*      "status":"on",
*      "colorpicker":"#fff",
*      "type":"light"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/


app.get('/api/light_devices', (req, res) => {
  light_devices.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

/**
* @api {post} /api/light_devices Smart Light Devices - POST
* @apiGroup Smart Light Devices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*      "_id":"645c206a67454ff48d5c7d06",
*      "user":"Light 1",
*      "status":"on",
*      "colorpicker":"#fff",
*      "type":"light"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/light_devices', (req, res) => {
  const { user, status, colorpicker, type } = req.body;
  const newDevice = new light_devices({
    user,
    status,
    colorpicker,
    type
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

// Assuming you have a Mongoose model called LightDevice for the light device collection

/**
* @api {put} /api/light_devices Smart Light Devices - PUT
* @apiGroup Smart Light Devices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*      "_id":"645c206a67454ff48d5c7d06",
*      "user":"Light 1",
*      "status":"on",
*      "colorpicker":"#fff",
*      "type":"light"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.put('/api/light_devices', async (req, res) => {
  const { user, status, colorpicker, type } = req.body;
  const check_light = { user: user, type: type };
  const update_light = { status: status, colorpicker: colorpicker };
  // Retrieve the existing record from the database
  console.log(check_light.user);
  console.log(check_light.type);
  try {
    const result = await light_devices.findOneAndUpdate(check_light, update_light).exec();
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }
});

/**
* @api {get} /api/air_conditioning_devices Smart Air Conditioners - GET
* @apiGroup Smart Air Conditioners
* @apiSuccessExample {json} Success-Response:
* [
*  {
*     "_id":"645de9ecb83e8d89b8358713",
*     "user":"AC1",
*     "status":"on",
*     "temperature":16,
*     "type":"air-conditioning"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/air_conditioning_devices', (req, res) => {
  air_conditioning_devices.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

/**
* @api {post} /api/air_conditioning_devices Smart Air Conditioners - POST
* @apiGroup Smart Air Conditioners
* @apiSuccessExample {json} Success-Response:
* [
*  {
*     "_id":"645de9ecb83e8d89b8358713",
*     "user":"AC1",
*     "status":"on",
*     "temperature":16,
*     "type":"air-conditioning"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/air_conditioning_devices', (req, res) => {
  const { user, status, temperature, type } = req.body;
  const newDevice = new air_conditioning_devices({
    user,
    status,
    temperature,
    type
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

/**
* @api {put} /api/air_conditioning_devices Smart Air Conditioners - PUT
* @apiGroup Smart Air Conditioners
* @apiSuccessExample {json} Success-Response:
* [
*  {
*     "_id":"645de9ecb83e8d89b8358713",
*     "user":"AC1",
*     "status":"on",
*     "temperature":16,
*     "type":"air-conditioning"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.put('/api/air_conditioning_devices', async (req, res) => {
  const { user, status, temperature, type } = req.body;
  const check_ac = { user: user, type: type };
  const update_ac = { status: status, temperature: temperature };
  // Retrieve the existing record from the database
  console.log(check_ac.user);
  console.log(check_ac.type);
  try {
    const result = await air_conditioning_devices.findOneAndUpdate(check_ac, update_ac).exec();
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }
});

/**
* @api {get} /api/security_devices Smart Security Devices - GET
* @apiGroup Smart Security Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*     "_id":"645cdf4094a73e847e59bbc4",
*     "user":"Maindoor",
*     "status":"on",
*     "type":"security"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/security_devices', (req, res) => {
  security_devices.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

/**
* @api {post} /api/security_devices Smart Security Devices - POST
* @apiGroup Smart Security Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*     "_id":"645cdf4094a73e847e59bbc4",
*     "user":"Maindoor",
*     "status":"on",
*     "type":"security"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.post('/api/security_devices', (req, res) => {
  const { user, status, type } = req.body;
  const newDevice = new security_devices({
    user,
    status,
    type
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});

/**
* @api {put} /api/security_devices Smart Security Devices - PUT
* @apiGroup Smart Security Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*     "_id":"645cdf4094a73e847e59bbc4",
*     "user":"Maindoor",
*     "status":"on",
*     "type":"security"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.put('/api/security_devices', async (req, res) => {
  const { user, status, type } = req.body;
  const check_security = { user: user, type: type };
  const update_security = { status: status };
  // Retrieve the existing record from the database
  console.log(check_security.user);
  console.log(check_security.type);
  try {
    const result = await security_devices.findOneAndUpdate(check_security, update_security).exec();
    res.send(result);
  }
  catch (error) {
    console.log(error);
  }
});

/**
* @api {delete} /api/light_devices Smart Light Devices - DELETE
* @apiGroup Smart Light Devices
* @apiSuccessExample {json} Success-Response:
* [
*   {
*      "_id":"645c206a67454ff48d5c7d06",
*      "user":"Light 1",
*      "status":"on",
*      "colorpicker":"#fff",
*      "type":"light"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.delete('/api/light_devices', async (req, res) => {
  const { user } = req.body;

  try {
    const result = await light_devices.findOneAndDelete({ user });

    if (result) {
      res.send(result);
    } else {
      res.status(404).send('Light device not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while removing the light device.');
  }
});

/**
* @api {delete} /api/air_conditioning_devices Smart Air Conditioners - DELETE
* @apiGroup Smart Air Conditioners
* @apiSuccessExample {json} Success-Response:
* [
*  {
*     "_id":"645de9ecb83e8d89b8358713",
*     "user":"AC1",
*     "status":"on",
*     "temperature":16,
*     "type":"air-conditioning"
*   }
* ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.delete('/api/air_conditioning_devices', async (req, res) => {
  const { user } = req.body;

  try {
    const result = await air_conditioning_devices.findOneAndDelete({ user });

    if (result) {
      console.log(result)
      res.send(result);
    } else {
      res.status(404).send('Air conditioning device not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while removing the air conditioning device.');
  }
});

/**
* @api {delete} /api/security_devices Smart Security Devices - DELETE
* @apiGroup Smart Security Devices
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*     "_id":"645cdf4094a73e847e59bbc4",
*     "user":"Maindoor",
*     "status":"on",
*     "type":"security"
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.delete('/api/security_devices', async (req, res) => {
  const { user } = req.body;

  try {
    const result = await security_devices.findOneAndDelete({ user });

    if (result) {
      console.log(result)
      res.send(result);
    } else {
      res.status(404).send('Security device not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while removing the security device.');
  }
});


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});