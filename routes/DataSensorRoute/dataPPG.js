const express = require('express');
const router = express.Router();

const mongoose = require ('mongoose');
//Deklarasi Model
const dataPPG = require('../../models/DataSensor/PPG_Model');

//DATA PPG  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataPPG.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL PPG'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataPPG_Last = await dataPPG.find().limit(1).sort({$natural:-1});
            res.json(dataPPG_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by PPG ID'});
        }
    });

    //get Last by ID
    router.get('/Lastest_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataPPG_Last = await dataPPG.find(query).limit(1).sort({$natural:-1});
            res.json(dataPPG_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by PPG ID'});
        }
    });

    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataPPG_Last = await dataPPG.find(query);
            res.json(dataPPG_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL PPG by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        console.log(req.body) //cek Body
        const newData = new dataPPG({ //masukin info dari body ke salam model database Post
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataPPG : req.body.dataPPG
        });
        // Save and validate
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Data PPG Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;