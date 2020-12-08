const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');

var record = false;

//DATA Accelerometer  
    //get all
    router.post('/start', async (req,res) => {
        try{
            record = true;
            res.json("Recording started.");
        }catch(err){
            console.log(err);
            res.json({message: 'err start Record'});
        }
    });

    router.post('/end', async (req,res) => {
        try{
            record = false;
            res.json("Recording ending");
        }catch(err){
            console.log(err);
            res.json({message: 'err end Record'});
        }
    });
    //get Last
    router.get('/recordStat', async (req,res) => {
        try{
            const recordStat = {
                recordStat: record
            }
            res.json(recordStat); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET Record Stat'});
        }
    });

module.exports = router;