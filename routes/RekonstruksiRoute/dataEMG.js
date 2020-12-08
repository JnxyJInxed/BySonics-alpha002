const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataEMG = require('../../models/DataRekonstruksi/EMGRekons_Model');

//DATA EMG  
    //get all
    router.get('/All', async (req,res) => {
        try{
            const dataAll = await dataEMG.find(); //ngasih semua data yang udah kesimpan
            res.json(dataAll);
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL EMG'});
        }
    });
    //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const dataEMG_Last = await dataEMG.find().limit(1).sort({$natural:-1});
            res.json(dataEMG_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by EMG ID'});
        }
    });

    //get Last by ID
    router.get('/Lastest_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataEMG_Last = await dataEMG.find(query).limit(1).sort({$natural:-1});
            res.json(dataEMG_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by EMG ID'});
        }
    });

    //get All by ID
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const dataEMG_Last = await dataEMG.find(query);
            res.json(dataEMG_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL EMG by ID'});
        }
    });

    router.post('/save', async (req,res) => { //pake async kalau save CARA 2
        console.log(req.body) //cek Body
        const newData = new dataEMG({ //masukin info dari body ke salam model database Post
                    id_rompi : req.body.id_rompi,
                    id_sensor : req.body.id_sensor, 
                    id_pasien : req.body.id_pasien,
                    dataEMGReal : req.body.dataEMGReal,
                    dataEMGImag : req.body.dataEMGRImag
        });
        // Save and validate
        newData.save()
        .then(newData=> {
            return res.status(200).json({
            message :'Rekonstruksi EMG Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });

    });

module.exports = router;