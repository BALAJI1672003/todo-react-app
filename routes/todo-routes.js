const express = require('express');
const router = express.Router();
const Todo= require('../models/Todomodel');
router.post("/", async(req, res) => {
  const todo = new Todo({
    title: req.body.title,
  });
  try {
    const newtodo = await todo.save();
    res.status(201).json(newtodo);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
router.get('/',async(req,res)=>
{
  try {
     const todo=await Todo.find();
     res.json(todo);
  } catch (error) {
    res.status(400).json(error.message);
  } 
});
router.put('/:id',async(req,res)=>{
  try {
    const todo=await Todo.findById(req.params.id);
    if(!todo)
     return res.status(404).json({message:"To do not found"});
      todo.title=req.body.title||todo.title;
      todo.completed=req.body.completed??todo.completed;
      const updatetodo= await todo.save();
      res.json(updatetodo);

  } catch (error) {
    res.status(400).json({message: error.message});
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
