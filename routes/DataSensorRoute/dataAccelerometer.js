const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataAcce = require('../../models/DataSensor/Accelerometer_Model');

//DATA Accelerometer  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataAcce.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Accelerometer'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataAcce_Last = await dataAcce.find().limit(1).sort({$natural:-1});
            res.json(dataAcce_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by Accelerometer ID'});
        }
    });

    //get Last by ID
    router.get('/Lastest_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataAcce_Last = await dataAcce.find(query).limit(1).sort({$natural:-1});
            res.json(dataAcce_Last);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by Accelerometer ID'});
        }
    });

    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataAcce_All = await dataAcce.find(query);
            console.log(dataAcce_All);
            res.json(dataAcce_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Accelerometer by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        console.log(req.body) //cek Body
        const newData = new dataAcce({ //masukin info dari body ke salam model database Post
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataAccelerometer_X : req.body.dataAccelerometer_X,
                    dataAccelerometer_Y : req.body.dataAccelerometer_Y,
                    dataAccelerometer_Z : req.body.dataAccelerometer_Z
        });
        // Save and validate
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Data Accelerometer Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;