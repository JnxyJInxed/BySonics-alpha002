//import package
var PORT = process.env.PORT || 3000;
//server
const express = require('express');
const app = express();
//database
const mongoose = require('mongoose');
//body parser
const bodyParser = require('body-parser');
//cors
const cors = require('cors');
//secret params
require('dotenv/config');

//MIDDLEWARE:
//cors: public access
app.use(cors());
//middleware body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


//import routes
const dataPPGRoute = require ('./routes/DataSensorRoute/dataPPG');
const dataAcceRoute = require ('./routes/DataSensorRoute/dataAccelerometer')
const dataEKGRoute = require ('./routes/DataSensorRoute/dataEKG')
const dataEMGRoute = require ('./routes/DataSensorRoute/dataEMG')
const dataSuhuRoute = require ('./routes/DataSensorRoute/dataSuhu')
const dataCameraRoute = require ('./routes/DataSensorRoute/dataImage')
const dataAllRoute = require ('./routes/DataSensorRoute/dataAllSensor')
//
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/dataPPG', dataPPGRoute);
app.use('/dataAccelerometer', dataAcceRoute);
app.use('/dataEKG', dataEKGRoute);
app.use('/dataEMG', dataEMGRoute);
app.use('/dataSuhu', dataSuhuRoute);
app.use('/dataImage', dataCameraRoute);
app.use('/dataAllSensor', dataAllRoute);
//route rekonstruk
//import routes
const rekonstruksiPPGRoute = require ('./routes/RekonstruksiRoute/dataPPG');
const rekonstruksiAcceRoute = require ('./routes/RekonstruksiRoute/dataAccelerometer')
const rekonstruksiEKGRoute = require ('./routes/RekonstruksiRoute/dataEKG')
const rekonstruksiEMGRoute = require ('./routes/RekonstruksiRoute/dataEMG')
const rekonstruksiSuhuRoute = require ('./routes/RekonstruksiRoute/dataSuhu')
const rekonstruksiCameraRoute = require ('./routes/RekonstruksiRoute/dataImage')
const rekonstruksiAllRoute = require ('./routes/RekonstruksiRoute/dataAllSensor')
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/rekonstruksiPPG', rekonstruksiPPGRoute);
app.use('/rekonstruksiAccelerometer', rekonstruksiAcceRoute);
app.use('/rekonstruksiEKG', rekonstruksiEKGRoute);
app.use('/rekonstruksiEMG', rekonstruksiEMGRoute);
app.use('/rekonstruksiSuhu', rekonstruksiSuhuRoute);
app.use('/rekonstruksiImage', rekonstruksiCameraRoute);
app.use('/rekonstruksiSensor', rekonstruksiAllRoute);

//Recording status
const recordingStatus = require('./routes/RecordingStatus')
app.use('/recording', recordingStatus);

//user authentication
//import routes
const userRoute = require ('./routes/auth');
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/user', userRoute);

//ROUTE: neghubungin ke post dan get dkk
app.get('/', (req,res) => {
	res.send('BySonics Home Base Server');
});


//Connect to DB
mongoose.connect(
	process.env.DB_CONNECT_URL,  
	{useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connect to DB moongoose compass'),
);
// const dbBySonics = db.db('BySonics');
// const collectionUser = dbBySonics.collection(User);


//start LISTEN AT PORT:
app.listen(PORT, function () {
	console.log('Server running');
});