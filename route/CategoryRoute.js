const express = require('express');
const router = express.Router();
const Category = require('../modules/Categorymodel');

//Submit a Category

router.post('/new', async (req,res) => {
    const category = new Category ({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedCategory = await category.save();
        // res.send(savedUser)
        var ID = savedCategory._id.toString();
        var catId = ID.slice(ID.length - 5);
    
        Category.findOneAndUpdate({ _id: savedCategory._id }, { catId }, function(
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

//Get All Categories
router.get('/getall', async (req,res) => {
    // res.send('we are on posts');
    try {
        const category = await Category.find();
        res.json(category);
    }
    catch(err){
        res.json({message:err});
    }
});


// Specific Post
router.get('/:catId', async (req,res) => {
    try {
   
    const category = await Category.findById(req.params.cattId);
        res.json(category);
    }
    catch(err){
        res.json({ message: err });
    }
    });
    

// Delete a Category

router.delete('/:catId', async (req,res) => {
    try {
   
    const removeCategory = await Category.remove({ _id: req.params.catId});
        res.json(removeCategory);
    }
    catch(err){
        res.json({ message: err });
    }
    });

// Update a Category

router.patch('/:catId', async (req,res) => {
    try {
   
    const updateCategory = await Category.updateOne
        ({ _id: req.params.catId}, 
        { $set: {title: req.body.title}});
        res.json(updateCategory);
    }
    catch(err){
        res.json({ message: err });
    }
    });



module.exports = router;