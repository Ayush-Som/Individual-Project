const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/public`;

const bycrypt = require('bcrypt'); 
const bodyParser = require('body-parser');

const { initializingPassport, protected } = require('./pconfig');
const mongoose = require('mongoose');
const ejs = require('ejs');
const helmet = require('helmet');
const expressSession = require("express-session");
const passport  = require('passport');
const User = require('./credentials');
mongoose.connect('mongodb+srv://ayushsommrt:90R9XFjoQf8yV8RO@cluster0.sfqqmq3.mongodb.net/individual-project', {useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('pages'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize())
app.use(passport.session())

app.use(helmet.dnsPrefetchControl());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.originAgentCluster());
app.use(helmet.hsts());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

initializingPassport(passport);
app.set("view engine","ejs");

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(`${base}/index.html`);
});

app.get('/login', function(req, res) {
  res.render(`login`)
})

app.get('/register', function(req, res) {
  res.render(`register`)
})

app.post('/register', async(req, res) => {
  const user = await User.findOne({username:req.body.username});

  if(user) return res.status(400).send('<script>alert("User already exists"); window.location.href = "/login";</script>');

  const newUser = await User.create(req.body);
  res.redirect('/login');
})

app.post('/login', passport.authenticate('local', {
  failureFlash: true,failureRedirect: "/register"
}), function(req, res) {
  res.redirect('/add-devices');
});

app.get('/add-devices', protected, (req, res) => {
  res.sendFile(`${base}/add-devices.html`);
});

app.get('/air-conditioning', (req, res) => {
  res.sendFile(`${base}/air-conditioning.html`);
});

app.get('/lighting', (req, res) => {
  res.sendFile(`${base}/lighting.html`);
});

app.get('/remove-devices', (req, res) => {
  res.sendFile(`${base}/remove-devices.html`);
});

app.get('/edit-devices', (req, res) => {
  res.sendFile(`${base}/edit-devices.html`);
});

app.get('/edit-lighting', (req, res) => {
  res.sendFile(`${base}/edit/edit-lighting.html`);
});

app.get('/edit-air-conditioning', (req, res) => {
  res.sendFile(`${base}/edit/edit-air-conditioning.html`);
});

app.get('/edit-security', (req, res) => {
  res.sendFile(`${base}/edit/edit-security.html`);
});

app.get('/security', (req, res) => {
  res.sendFile(`${base}/security.html`);
});

app.get('/device-data', (req, res) => {
  res.sendFile(`${base}/device-data.html`);
});

app.delete('/api/light_devices', async (req, res) => {
  // Your code for deleting the light device
});

app.delete('/api/air_conditioning_devices', async (req, res) => {
  // Your code for deleting the light device
});

app.delete('/api/security_devices', async (req, res) => {
  // Your code for deleting the light device
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
