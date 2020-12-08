const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataAllSensor = require('../../models/DataRekonstruksi/AllSensorRekons_Model');

//DATA Accelerometer  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataAllSensor.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataAllSensor_Last = await dataAllSensor.find().limit(1).sort({$natural:-1});
            res.json(dataAllSensor_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by All ID'});
        }
    });

    //get Last by ID
    router.get('/Lastest_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataAllSensor_Last = await dataAllSensor.find(query).limit(1).sort({$natural:-1});
            res.json(dataAllSensor_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by All Sensor ID'});
        }
    });

    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataAllSensor_All = await dataAllSensor.find(query);
            console.log(dataAllSensor_All);
            res.json(dataAllSensor_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        console.log(req.body) //cek Body
        const newData = new dataAllSensor({ //masukin info dari body ke salam model database Post
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataAccelerometer_XReal : req.body.dataAccelerometer_XReal,
                    dataAccelerometer_YReal : req.body.dataAccelerometer_YReal,
                    dataAccelerometer_ZReal : req.body.dataAccelerometer_ZReal,
                    //suhu
                    dataSuhuReal : req.body.dataSuhuReal,
                    //ekg
                    dataEKGReal : req.body.dataEKGReal, 
                    //ppg
                    dataPPGReal : req.body.dataPPGReal, 
                    //emg
                    dataEMGReal : req.body.dataEMGReal,
                    //
                    dataAccelerometer_XImag : req.body.dataAccelerometer_XImag,
                    dataAccelerometer_YImag : req.body.dataAccelerometer_YImag,
                    dataAccelerometer_ZImag : req.body.dataAccelerometer_ZImag,
                    //suhu
                    dataSuhuImag : req.body.dataSuhuImag,
                    //ekg
                    dataEKGImag : req.body.dataEKGImag, 
                    //ppg
                    dataPPGImag : req.body.dataPPGImag, 
                    //emg
                    dataEMGImag : req.body.dataEMGReal
        });
        // Save and validate
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Rekonstruksi All Sensor Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;