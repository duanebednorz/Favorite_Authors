const ItemController = require("../controllers/controller.items");
const Item = require("../models/models.itemsDB");

module.exports = (app) => {
    app.get("/api/items", ItemController.findAll);
    app.post("/api/create/item", ItemController.create)
    app.get('/api/items/random', ItemController.randomItem)
    app.get("/api/oneItem/:id", ItemController.findOne)
    app.put("/api/update/:id", ItemController.updateItem)
    app.delete('/api/delete/:id', ItemController.deleteAnExistingItem)
    
}