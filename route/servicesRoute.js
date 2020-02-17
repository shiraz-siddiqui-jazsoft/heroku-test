const express = require('express');
const router = express.Router();
const Services = require('../modules/ServicesModel');

//Submit a Service

router.post('/new', async (req,res) => {
    const services = new Services ({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedservices = await services.save();
        // res.send(savedUser)
        var ID = savedservices._id.toString();
        var serviceId = ID.slice(ID.length - 5);
    
        Services.findOneAndUpdate({ _id: savedservices._id }, { serviceId }, function(
          err,
          data
        ) {
          if (err) throw err;
          else {
            return res.send(data);
          }
        });
      } catch (err) {
        res.status(400).send(err);
      }
    });

//Get All Services
router.get('/getall', async (req,res) => {
    // res.send('we are on posts');
    try {
        const services = await Services.find();
        res.json(services);
    }
    catch(err){
        res.json({message:err});
    }
});


// Specific Service
router.get('/:servicetId', async (req,res) => {
    try {
   
    const services = await Services.findById(req.params.servicetId);
        res.json(services);
    }
    catch(err){
        res.json({ message: err });
    }
    });
    

// Delete a Service

router.delete('/:servicetId', async (req,res) => {
    try {
   
    const removeservic = await Services.remove({ _id: req.params.servicetId});
        res.json(removeservic);
    }
    catch(err){
        res.json({ message: err });
    }
    });

// Update a Service

router.patch('/:servicetId', async (req,res) => {
    try {
   
    const updateService = await Services.updateOne
        ({ _id: req.params.servicetId}, 
        { $set: {title: req.body.title}});
        res.json(updateService);
    }
    catch(err){
        res.json({ message: err });
    }
    });





module.exports = router;