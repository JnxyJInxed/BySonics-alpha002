const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');

const sensorDevice = require('../models/SensorDevice/SensorDevice_Model')
var record = false;
    //get sensor record status by ID
    router.get('/recordStat/:ID', async (req,res) => {
        try{
            const query = {
                id_rompi: req.query.rompiID
            }
            console.log(req.query.rompiID);
            const deviceRompi = await sensorDevice.findOne(query);
            res.json(deviceRompi.recordStat); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET Sensor Record Stat'});
        }
    });
    //START RECORD SPESIFIC
    router.post('/start', async (req,res) => {
        try{
            const query = {
                id_rompi: req.body.id_rompi,
                id_pasien: req.body.id_pasien,
                statusRompi: true,
                isPaired : true //tetep kaish biar gak ketuker
            }
            const newRecordStat = {
                recordStat : true
            }
            const deviceRompi = await sensorDevice.updateOne(query, newRecordStat)
            //console.log(deviceRompi);
            if (deviceRompi.n == 1){
               res.status(200).send(
                {
                    message : "Recording User "+  req.body.id_pasien + " Started"
                });
            }else{
                res.status(400).send(
                {
                    message : "Error. Please try to re-pairing"
                });
            }
        }catch(err){
            console.log(err);
            res.json({message: 'err start Record'});
        }
    });
    //START RECORD SPESIFIC
    router.post('/end', async (req,res) => {
        try{
            const query = {
                id_rompi: req.body.id_rompi,
                id_pasien: req.body.id_pasien,
                statusRompi: true,
                isPaired : true //tetep kaish biar gak ketuker
            }
            const newRecordStat = {
                recordStat : false
            }
            const deviceRompi = await sensorDevice.updateOne(query, newRecordStat)
            if (deviceRompi.n == 1){
                res.status(200).send(
                {
                    message : "Recording User "+ req.body.id_pasien+ " Stopped"
                });
            }else{
                res.status(400).send(
                {
                    message : "Error end record"
                });
            }
        }catch(err){
            console.log(err);
            res.json({message: 'err end Record'});
        }
    });

module.exports = router;