const { models } = require("mongoose");
const Item = require("../models/models.itemsDB");


module.exports = {
    findAll : (req, res) => {
        Item.find()
            .then(items =>{
                res.json({results:items})
            })
            .catch(err => res.json(err))
    },
    create: (req, res) => {
        Item.create(req.body)
            .then(items => {
                res.json({results:items})
            })
            .catch(err => res.json(err))
    },
    findOne: (req, res) =>{
        Item.findOne({ _id: req.params.id })
        .then(result => res.json({ results: result}))
        .catch(err => res.json({ message: "Can't find this one item yo", error: err }));
    },
    updateItem: (req, res) => {
        Item.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(result => res.json({ results: result }))
            .catch(err => res.json({ message: "Can't update this one item yo", error: err }));
    },
    deleteAnExistingItem: (req, res) =>{
        Item.deleteOne({ _id: req.params.id })
        .then(result => res.json({ results: result }))
        .catch(err => res.json({ message: "Can't delete this one item yo", error: err }));
    },
    randomItem: (req, res) =>{
        Item.aggregate([{ $sample:{ size: 1 }}]) 
        .then(result => res.json({ results: result }))
        .catch(err => res.json({ message: "Can't get this random item", error: err }));
    }
}