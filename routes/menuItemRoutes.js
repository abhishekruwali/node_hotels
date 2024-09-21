const express=require('express');
const router=express.Router();

const MenuItem = require("./../models/Menu");

router.post("/", async (req, res) => {
    try {
      const data = req.body; //Assuming the  request body contains the person data
  
      // Create a new person document using the Mongoose model
      const menuPerson = new MenuItem(data);
  
      //save the new person to database
      const response = await menuPerson.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched");
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
    }
  });

  router.get("/:taste", async (req, res) => {
    try {
        const tasteType = req.params.taste; // Extract the work type from the url parameter
        if (tasteType == "sour" || tasteType == "Sweet" || tasteType == "Spicy") {
          const response = await MenuItem.find({ taste: tasteType });
          console.log("response fetched");
          res.status(200).json(response);
        } else {
          res.status(404).json({ error: "Invalid work type" });
        }
      } catch (err) { 
        console.log(err);
        res.status(500).json({ error: "Internal server Error" });
      }
  });

  router.put("/:id", async (req, res) => {
    try {
      const menuId = req.params.id; //Extract the id from url parameter
      const updatedMenuData = req.body; //Updated data for the person
  
      const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
        new: true, //Return the updated document
        runValidators: true, //Run Mongoose validation
      });
  
      if (!response) {
        return res.status(404).json({ error: "Person not found" });
      }
      console.log("data updated");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  // Delete
  
  router.delete('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;//Extract the person id from the url parameter
        const response=await MenuItem.findByIdAndDelete(menuId);
        if(!response){
          return res.status(400).json({error:'Person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person Deleted Successfully'});
    }catch(err){
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
   
    }
  })

  module.exports=router;